<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Amenity;

class AmenitySeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            'Wi-Fi',
            'Air Conditioning',
            'Heating',
            'Kitchen',
            'Washer',
            'Dryer',
            'Free Parking',
            'TV',
            'Elevator',
            'Gym',
            'Pool',
            'Hot Tub',
            'Pets Allowed',
            'Smoking Allowed',
            'Wheelchair Accessible',
            'Breakfast',
            'Workspace',
            'Security Cameras',
            '24/7 Security',
            'Garden',
        ];

        foreach ($items as $name) {
            $slug = Str::slug($name); // e.g. "Wi-Fi" -> "wi-fi"
            Amenity::updateOrCreate(
                ['slug' => $slug],                 // unique key
                ['name' => $name, 'slug' => $slug] // set/refresh fields
            );
        }
    }
}
