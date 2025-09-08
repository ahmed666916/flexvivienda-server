<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PropertyImage extends Model
{
    protected $fillable = [
        'property_id',
        'image_path',   // ✅ not image_url
    ];

    public function property()
    {
        return $this->belongsTo(Property::class);
    }

    public function getFullUrlAttribute()
    {
        return asset('storage/' . $this->image_path);
    }
}
