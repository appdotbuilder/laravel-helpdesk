<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\AssignTicketRequest;
use App\Models\Ticket;
use App\Models\User;
use App\Models\TicketAssignment;
use Illuminate\Http\Request;

class TicketAssignmentController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(AssignTicketRequest $request, Ticket $ticket)
    {
        $userIds = $request->validated()['user_ids'];

        foreach ($userIds as $userId) {
            // Check if assignment already exists
            $existingAssignment = TicketAssignment::where('ticket_id', $ticket->id)
                ->where('user_id', $userId)
                ->first();

            if (!$existingAssignment) {
                TicketAssignment::create([
                    'ticket_id' => $ticket->id,
                    'user_id' => $userId,
                    'assigned_by' => auth()->id(),
                    'assigned_at' => now(),
                ]);
            }
        }

        return redirect()->route('tickets.show', $ticket)
            ->with('success', 'Ticket assigned successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ticket $ticket, User $user)
    {
        TicketAssignment::where('ticket_id', $ticket->id)
            ->where('user_id', $user->id)
            ->delete();

        return redirect()->route('tickets.show', $ticket)
            ->with('success', 'Assignment removed successfully.');
    }
}