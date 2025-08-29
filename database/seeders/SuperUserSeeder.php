<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SuperUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the NOC role
        $nocRole = Role::where('name', 'NOC')->first();

        if (!$nocRole) {
            $this->command->error('NOC role not found. Please run RoleSeeder first.');
            return;
        }

        // Create or update the superuser
        $user = User::updateOrCreate(
            ['email' => 'irfanthepun@gmail.com'],
            [
                'name' => 'Irfan NOC Superuser',
                'email' => 'irfanthepun@gmail.com',
                'password' => Hash::make('12345'),
                'role_id' => $nocRole->id,
                'email_verified_at' => now(),
            ]
        );

        $this->command->info("Superuser created: {$user->name} ({$user->email}) with role: {$nocRole->name}");
    }
}