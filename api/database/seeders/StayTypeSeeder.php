<?php

namespace Database\Seeders;

use App\Models\StayType;
use Illuminate\Database\Seeder;

class StayTypeSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            ['code'=>'short','name'=>'Short Stay'],
            ['code'=>'mid','name'=>'Mid Stay'],
            ['code'=>'long','name'=>'Long Stay'],
        ];
        foreach ($items as $i) {
            StayType::firstOrCreate(['code'=>$i['code']], $i);
        }
    }
}
