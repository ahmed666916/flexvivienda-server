<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Property;

class PropertySeeder extends Seeder
{
    public function run(): void
    {
        Property::create([
            'owner_id' => null,
            'city_id' => null,
            'title' => 'Modern Apartment in Downtown',
            'slug' => 'modern-apartment-downtown',
            'description' => 'A stylish modern apartment with 2 bedrooms in the heart of downtown.',
            'address_line' => '123 Main Street',
            'lat' => 40.7128,
            'lng' => -74.0060,
            'bedrooms' => 2,
            'bathrooms' => 1,
            'max_guests' => 4,
            'currency' => 'EUR',
            'price_per_night' => 120,
            'price_per_month' => 2800,
            'status' => 'published',
            'is_featured' => true,
            'listing_source' => 'manual',
            'external_id' => null,
            'require_manual_approval' => false,
            'rating_avg' => 4.5,
            'rating_count' => 12,
        ]);

        Property::create([
            'title' => 'Cozy Cottage by the Lake',
            'slug' => 'cozy-cottage-lake',
            'description' => 'A peaceful lakeside cottage with beautiful views.',
            'address_line' => '456 Lakeview Road',
            'lat' => 46.9470,
            'lng' => 7.4474,
            'bedrooms' => 3,
            'bathrooms' => 2,
            'max_guests' => 6,
            'currency' => 'EUR',
            'price_per_night' => 90,
            'price_per_month' => 2000,
            'status' => 'published',
            'is_featured' => false,
            'listing_source' => 'manual',
            'external_id' => null,
            'require_manual_approval' => true,
            'rating_avg' => 4.8,
            'rating_count' => 5,
        ]);
    }
}
