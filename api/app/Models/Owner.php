<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Owner extends Model
{
    protected $fillable = ['user_id','company_name','payout_preference'];

    protected $casts = ['payout_preference' => 'array'];

    public function user(){ return $this->belongsTo(User::class); }
    public function properties(){ return $this->hasMany(Property::class); }
}
