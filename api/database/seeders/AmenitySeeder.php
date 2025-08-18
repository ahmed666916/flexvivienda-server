<?php

namespace Database\Seeders;

use App\Models\Amenity;
use Illuminate\Database\Seeder;

class AmenitySeeder extends Seeder
{
    public function run(): void
    {
        $names = ['Wi-Fi','Parking','Pool','Air Conditioning','Heating','Kitchen','Washer','Dryer','TV','Elevator'];
        foreach ($names as $n) {
            Amenity::firstOrCreate(['name'=>$n]);
        }
    }
}
