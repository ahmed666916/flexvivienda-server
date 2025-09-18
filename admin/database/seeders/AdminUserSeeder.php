<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@flex.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('123456'), // 🔑 default password
                'role' => 'admin',
            ]
        );
    }
}
