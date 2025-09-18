<?php

namespace Database\Seeders;

# database/seeders/RoleSeeder.php
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder {
  public function run(): void {
    foreach (['admin','owner','guest'] as $r) Role::findOrCreate($r);
  }
}

