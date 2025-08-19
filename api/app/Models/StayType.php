<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StayType extends Model
{
    protected $fillable = ['code','name'];
    public function properties()
{
    return $this->belongsToMany(Property::class, 'property_stay_type');
}

}
