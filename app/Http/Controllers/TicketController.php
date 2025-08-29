<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;

use App\Models\Ticket;
use App\Models\User;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Ticket::with(['creator', 'assignees.role'])
            ->latest();

        // Filter by status
        if ($request->has('status') && $request->status !== '') {
            $query->where('status', $request->status);
        }

        // Filter by priority
        if ($request->has('priority') && $request->priority !== '') {
            $query->where('priority', $request->priority);
        }

        // Filter by category
        if ($request->has('category') && $request->category !== '') {
            $query->where('category', $request->category);
        }

        // Filter by assigned user (for current user's assignments)
        if ($request->has('my_tickets') && $request->my_tickets) {
            $query->whereHas('assignees', function ($q) {
                $q->where('users.id', auth()->id());
            });
        }

        $tickets = $query->paginate(10)->withQueryString();

        // Get summary statistics
        $stats = [
            'total' => Ticket::count(),
            'new' => Ticket::where('status', 'New')->count(),
            'in_progress' => Ticket::where('status', 'In Progress')->count(),
            'resolved' => Ticket::where('status', 'Solved')->count(),
            'urgent' => Ticket::where('priority', 'Urgent')->count(),
        ];

        return Inertia::render('tickets/index', [
            'tickets' => $tickets,
            'stats' => $stats,
            'filters' => $request->only(['status', 'priority', 'category', 'my_tickets']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('tickets/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTicketRequest $request)
    {
        $ticket = Ticket::create([
            ...$request->validated(),
            'created_by' => auth()->id(),
            'status' => 'New',
        ]);

        return redirect()->route('tickets.show', $ticket)
            ->with('success', 'Ticket created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Ticket $ticket)
    {
        $ticket->load(['creator', 'assignees.role', 'assignments.assignedBy']);
        
        $users = User::with('role')->get();

        return Inertia::render('tickets/show', [
            'ticket' => $ticket,
            'users' => $users,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ticket $ticket)
    {
        $ticket->load(['creator', 'assignees']);

        return Inertia::render('tickets/edit', [
            'ticket' => $ticket,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTicketRequest $request, Ticket $ticket)
    {
        $data = $request->validated();
        
        // If status is being changed to Solved, set resolved_at
        if (isset($data['status']) && $data['status'] === 'Solved' && $ticket->status !== 'Solved') {
            $data['resolved_at'] = now();
        }

        $ticket->update($data);

        return redirect()->route('tickets.show', $ticket)
            ->with('success', 'Ticket updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ticket $ticket)
    {
        $ticket->delete();

        return redirect()->route('tickets.index')
            ->with('success', 'Ticket deleted successfully.');
    }


}