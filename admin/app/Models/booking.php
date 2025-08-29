<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class booking extends Model
{
    protected $fillable = [
        'name', 'email', 'phone', 'guests',
        'start_date', 'end_date', 'total_price'
    ];
}
