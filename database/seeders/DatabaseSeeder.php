<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            SuperUserSeeder::class,
        ]);

        // Create demo users for each role
        $csRole = \App\Models\Role::where('name', 'CS')->first();
        $tsoRole = \App\Models\Role::where('name', 'TSO Agent')->first();
        $nocRole = \App\Models\Role::where('name', 'NOC')->first();

        // Create CS users
        \App\Models\User::factory()->create([
            'name' => 'CS Agent',
            'email' => 'cs@helpdesk.com',
            'role_id' => $csRole->id,
        ]);

        // Create TSO Agent users
        \App\Models\User::factory()->create([
            'name' => 'TSO Agent',
            'email' => 'tso@helpdesk.com',
            'role_id' => $tsoRole->id,
        ]);

        // Create NOC users
        \App\Models\User::factory()->create([
            'name' => 'NOC Engineer',
            'email' => 'noc@helpdesk.com',
            'role_id' => $nocRole->id,
        ]);

        // Create additional demo users and tickets
        $users = \App\Models\User::factory(10)->create([
            'role_id' => function () use ($csRole, $tsoRole, $nocRole) {
                return fake()->randomElement([$csRole->id, $tsoRole->id, $nocRole->id]);
            }
        ]);

        // Create demo tickets
        $tickets = \App\Models\Ticket::factory(50)->create([
            'created_by' => function () {
                return \App\Models\User::whereHas('role', function ($query) {
                    $query->where('name', 'CS');
                })->inRandomOrder()->first()->id;
            }
        ]);

        // Create some ticket assignments
        foreach ($tickets->random(30) as $ticket) {
            $assignees = $users->random(random_int(1, 3));
            foreach ($assignees as $assignee) {
                \App\Models\TicketAssignment::create([
                    'ticket_id' => $ticket->id,
                    'user_id' => $assignee->id,
                    'assigned_by' => $users->random()->id,
                    'assigned_at' => fake()->dateTimeBetween('-1 month', 'now'),
                ]);
            }
        }
    }
}
