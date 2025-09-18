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
        'address',     // new for admin
        'city',        // new for admin
        'country',     // new for admin
        'location',    // keep old for now (could deprecate later)
        'latitude',
        'longitude',
        'size',
        'bedrooms',
        'bathrooms',
        'max_persons',
        'price_per_day',  // legacy, may phase out in favor of property_rates
        'featured',
        'rules',
        'cancellation',
        'neighborhood',
        'amenities',
        'property_type',
        'status',
        'ical_url',
        'google_calendar_id',
        'owner_id',    // new foreign key
    ];

    protected $appends = ['full_images'];

    protected $casts = [
        'featured'     => 'boolean',
        'amenities'    => 'array',
        'rules'        => 'array',
        'cancellation' => 'array',
        'neighborhood' => 'array',
        'property_type'=> 'array',
    ];

    // 🔹 Relationships
    public function images()
    {
        return $this->hasMany(PropertyImage::class);
    }

    public function rates()
    {
        return $this->hasMany(PropertyRate::class);
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    // 🔹 Accessors
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
