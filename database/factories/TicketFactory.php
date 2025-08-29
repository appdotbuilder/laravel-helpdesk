<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ticket>
 */
class TicketFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'customer_id' => fake()->numerify('CUST-####'),
            'customer_name' => fake()->name(),
            'customer_address' => fake()->address(),
            'problem_description' => fake()->paragraph(),
            'priority' => fake()->randomElement(['Low', 'Medium', 'High', 'Urgent']),
            'category' => fake()->randomElement(['Broadband', 'Dedicated', 'Reseller']),
            'status' => fake()->randomElement(['New', 'In Progress', 'Pending', 'Cancel', 'Solved', 'Investigation']),
            'created_by' => User::factory(),
            'resolved_at' => fake()->boolean(30) ? fake()->dateTimeBetween('-1 month', 'now') : null,
        ];
    }

    /**
     * Indicate that the ticket is urgent.
     */
    public function urgent(): static
    {
        return $this->state(fn (array $attributes) => [
            'priority' => 'Urgent',
            'status' => 'In Progress',
        ]);
    }

    /**
     * Indicate that the ticket is resolved.
     */
    public function resolved(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'Solved',
            'resolved_at' => fake()->dateTimeBetween('-1 month', 'now'),
        ]);
    }

    /**
     * Indicate that the ticket is fresh.
     */
    public function fresh(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'New',
            'resolved_at' => null,
        ]);
    }
}