<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReportController extends Controller
{
    /**
     * Display reports dashboard.
     */
    public function index()
    {
        // Tickets handled per user
        $userPerformance = User::with('role')
            ->withCount([
                'assignedTickets',
                'assignedTickets as resolved_tickets_count' => function ($query) {
                    $query->where('status', 'Solved');
                }
            ])
            ->having('assigned_tickets_count', '>', 0)
            ->orderBy('assigned_tickets_count', 'desc')
            ->get();

        // Average resolution time
        $avgResolutionTime = Ticket::whereNotNull('resolved_at')
            ->selectRaw('AVG(EXTRACT(EPOCH FROM (resolved_at - created_at))/3600) as avg_hours')
            ->first();

        // Most frequent complaint types
        $complaintTypes = Ticket::select('category', DB::raw('COUNT(*) as count'))
            ->groupBy('category')
            ->orderBy('count', 'desc')
            ->get();

        // Frequent customers (by customer_id)
        $frequentCustomers = Ticket::select('customer_id', 'customer_name', DB::raw('COUNT(*) as ticket_count'))
            ->groupBy('customer_id', 'customer_name')
            ->having('ticket_count', '>', 1)
            ->orderBy('ticket_count', 'desc')
            ->limit(10)
            ->get();

        // Monthly ticket trends
        $monthlyTrends = Ticket::selectRaw('
                DATE_TRUNC(\'month\', created_at) as month,
                COUNT(*) as total_tickets,
                COUNT(CASE WHEN status = \'Solved\' THEN 1 END) as resolved_tickets
            ')
            ->where('created_at', '>=', now()->subMonths(12))
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        // Status distribution
        $statusDistribution = Ticket::select('status', DB::raw('COUNT(*) as count'))
            ->groupBy('status')
            ->orderBy('count', 'desc')
            ->get();

        // Priority distribution
        $priorityDistribution = Ticket::select('priority', DB::raw('COUNT(*) as count'))
            ->groupBy('priority')
            ->orderBy('count', 'desc')
            ->get();

        return Inertia::render('reports/index', [
            'userPerformance' => $userPerformance,
            'avgResolutionTime' => round($avgResolutionTime->avg_hours ?? 0, 2),
            'complaintTypes' => $complaintTypes,
            'frequentCustomers' => $frequentCustomers,
            'monthlyTrends' => $monthlyTrends,
            'statusDistribution' => $statusDistribution,
            'priorityDistribution' => $priorityDistribution,
        ]);
    }

    /**
     * Show export form.
     */
    public function create(Request $request)
    {
        $query = Ticket::with(['creator', 'assignees'])
            ->orderBy('created_at', 'desc');

        // Apply filters if provided
        if ($request->has('start_date') && $request->start_date) {
            $query->whereDate('created_at', '>=', $request->start_date);
        }

        if ($request->has('end_date') && $request->end_date) {
            $query->whereDate('created_at', '<=', $request->end_date);
        }

        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        $tickets = $query->get();

        // Generate CSV content
        $csvContent = "ID,Customer ID,Customer Name,Problem Description,Priority,Category,Status,Created By,Assigned To,Created At,Resolved At\n";

        foreach ($tickets as $ticket) {
            /** @var \App\Models\Ticket $ticket */
            $assignees = $ticket->assignees->pluck('name')->implode('; ');
            
            $csvContent .= sprintf(
                "%d,\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\"\n",
                $ticket->id,
                $ticket->customer_id,
                $ticket->customer_name,
                str_replace('"', '""', $ticket->problem_description),
                $ticket->priority,
                $ticket->category,
                $ticket->status,
                $ticket->creator->name,
                $assignees,
                $ticket->created_at->format('Y-m-d H:i:s'),
                $ticket->resolved_at ? $ticket->resolved_at->format('Y-m-d H:i:s') : ''
            );
        }

        return response($csvContent, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="tickets_export_' . date('Y-m-d') . '.csv"',
        ]);
    }
}