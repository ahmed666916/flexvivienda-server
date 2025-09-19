<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PropertyCalendar extends Model
{
    protected $table = 'property_calendar';

    protected $fillable = [
        'property_id',
        'date',
        'price',
        'status',
        'min_stay',
    ];

    protected $casts = [
        'date' => 'date', // 👈 makes $row->date a Carbon instance
    ];

    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}

