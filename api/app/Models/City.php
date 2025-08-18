<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    protected $fillable = ['name','region','country'];
    public function properties(){ return $this->hasMany(Property::class); }
}
