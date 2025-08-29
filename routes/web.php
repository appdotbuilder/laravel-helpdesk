<?php

use App\Http\Controllers\TicketController;
use App\Http\Controllers\TicketAssignmentController;
use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Main helpdesk dashboard on home page - authenticated users see tickets, visitors see welcome
Route::get('/', function () {
    if (auth()->check()) {
        return app(TicketController::class)->index(request());
    }
    
    // Show welcome page with stats for visitors
    $stats = [
        'total' => \App\Models\Ticket::count(),
        'new' => \App\Models\Ticket::where('status', 'New')->count(),
        'in_progress' => \App\Models\Ticket::where('status', 'In Progress')->count(),
        'resolved' => \App\Models\Ticket::where('status', 'Solved')->count(),
        'urgent' => \App\Models\Ticket::where('priority', 'Urgent')->count(),
    ];
    
    return Inertia::render('welcome', ['stats' => $stats]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Ticket management routes
    Route::resource('tickets', TicketController::class);
    Route::post('tickets/{ticket}/assignments', [TicketAssignmentController::class, 'store'])->name('tickets.assignments.store');
    Route::delete('tickets/{ticket}/assignments/{user}', [TicketAssignmentController::class, 'destroy'])->name('tickets.assignments.destroy');

    // Reports and analytics
    Route::get('reports', [ReportController::class, 'index'])->name('reports.index');
    Route::get('reports/export', [ReportController::class, 'create'])->name('reports.export');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
