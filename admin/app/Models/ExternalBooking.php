<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExternalBooking extends Model
{
    use HasFactory;

    public $timestamps = false;   

    protected $fillable = [
        'property_id',
        'check_in',
        'check_out',
        'source',
        'external_id',
    ];

    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}
