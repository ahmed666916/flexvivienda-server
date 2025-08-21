<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Amenity extends Model
{
    protected $fillable = ['name','icon','slug'];

    public function properties()
    {
        return $this->belongsToMany(Property::class);
    }

    protected static function booted()
    {
        static::creating(function ($m) {
            if (empty($m->slug)) {
                $m->slug = Str::slug($m->name);
            }
        });

        static::updating(function ($m) {
            if (empty($m->slug)) {
                $m->slug = Str::slug($m->name);
            }
        });
    }
}
