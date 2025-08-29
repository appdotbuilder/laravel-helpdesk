<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Role>
 */
class RoleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->unique()->randomElement(['CS', 'TSO Agent', 'NOC']),
            'description' => fake()->sentence(),
        ];
    }

    /**
     * Indicate that the role is CS.
     */
    public function cs(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'CS',
            'description' => 'Customer Service representative',
        ]);
    }

    /**
     * Indicate that the role is TSO Agent.
     */
    public function tsoAgent(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'TSO Agent',
            'description' => 'Technical Support Officer Agent',
        ]);
    }

    /**
     * Indicate that the role is NOC.
     */
    public function noc(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'NOC',
            'description' => 'Network Operations Center',
        ]);
    }
}