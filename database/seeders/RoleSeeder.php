<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create([
            'name' => 'CS',
            'description' => 'Customer Service representative - Can create and manage complaint tickets'
        ]);

        Role::create([
            'name' => 'TSO Agent',
            'description' => 'Technical Support Officer Agent - Can assign and resolve technical issues'
        ]);

        Role::create([
            'name' => 'NOC',
            'description' => 'Network Operations Center - Can assign tickets and escalate issues'
        ]);
    }
}