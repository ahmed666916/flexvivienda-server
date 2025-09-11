<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Property extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'location',
        'latitude',
        'longitude',
        'size',
        'bedrooms',
        'bathrooms',
        'max_persons',
        'price_per_day',
        'featured',
        'rules',
        'cancellation',
        'neighborhood',
        'amenities',
        'property_type',
        'status',
        'ical_url',
    ];

    protected $appends = ['full_images'];

     protected $casts = [
        'featured' => 'boolean',
        'amenities' => 'array',
        'rules' => 'array',
        'cancellation' => 'array',
        'neighborhood' => 'array',
        'property_type' => 'array',
    ];

   public function images()
    {
        return $this->hasMany(PropertyImage::class);
    }

   public function getFullImagesAttribute()
    {
        if (!$this->relationLoaded('images')) {
            return [];
        }

        return $this->images->map(function ($img) {
            return $img->full_url;
        })->toArray();
    }
}
