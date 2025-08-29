<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\TicketAssignment
 *
 * @property int $id
 * @property int $ticket_id
 * @property int $user_id
 * @property int $assigned_by
 * @property \Illuminate\Support\Carbon $assigned_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Ticket $ticket
 * @property-read \App\Models\User $user
 * @property-read \App\Models\User $assignedBy
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|TicketAssignment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketAssignment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketAssignment query()
 * @method static \Illuminate\Database\Eloquent\Builder|TicketAssignment whereAssignedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketAssignment whereAssignedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketAssignment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketAssignment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketAssignment whereTicketId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketAssignment whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TicketAssignment whereUserId($value)
 * @method static \Database\Factories\TicketAssignmentFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class TicketAssignment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'ticket_id',
        'user_id',
        'assigned_by',
        'assigned_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'assigned_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the ticket for this assignment.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function ticket(): BelongsTo
    {
        return $this->belongsTo(Ticket::class);
    }

    /**
     * Get the assigned user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the user who made this assignment.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function assignedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_by');
    }
}