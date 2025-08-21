<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role; // ignore if unused
use App\Models\StayType;

class StayTypeSeeder extends Seeder
{
    public function run(): void
    {
        $rows = [
            ['code' => 'short', 'name' => 'Short Stay'],
            ['code' => 'mid',   'name' => 'Mid Stay'],
            ['code' => 'long',  'name' => 'Long Stay'],
        ];

        foreach ($rows as $r) {
            // Use code as the canonical slug (stable & unique)
            $slug = $r['code']; // or Str::slug($r['name'])
            StayType::updateOrCreate(
                ['code' => $r['code']],
                ['name' => $r['name'], 'slug' => $slug]
            );
        }
    }
}
