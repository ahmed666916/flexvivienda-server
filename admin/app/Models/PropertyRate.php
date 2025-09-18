<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PropertyRate extends Model
{
    use HasFactory;

    protected $fillable = [
        'property_id',
        'stay_type',
        'min_nights',
        'max_nights',
        'price',
        'rules',
    ];

    protected $casts = [
        'rules' => 'array',
    ];

    // 🔹 Relationships
    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}
