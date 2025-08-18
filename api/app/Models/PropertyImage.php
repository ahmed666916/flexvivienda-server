<?php

// app/Models/PropertyImage.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class PropertyImage extends Model
{
    protected $table = 'property_images';
    protected $fillable = ['property_id','url','position'];
    protected $appends = ['full_url'];

    public function property()
    {
        return $this->belongsTo(Property::class);
    }

    public function getFullUrlAttribute(): ?string
    {
        $u = $this->attributes['url'] ?? null;
        // if it's already an absolute URL (Airbnb etc.), use it
        if ($u && preg_match('#^https?://#i', $u)) return $u;

        // else treat it as a local storage path
        return $u ? Storage::url($u) : null; // needs APP_URL + storage:link
    }
}
