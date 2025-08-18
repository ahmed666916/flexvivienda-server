<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StayType extends Model
{
    protected $fillable = ['code','name'];
    public function properties(){
        return $this->belongsToMany(Property::class, 'property_stay_types')
            ->withPivot(['min_nights','max_nights','min_months','max_months','monthly_rate','deposit_amount','contract_required'])
            ->withTimestamps();
    }
}
