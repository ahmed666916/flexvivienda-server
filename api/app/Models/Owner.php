<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Owner extends Model {
    protected $fillable = ['user_id','company_name','tax_id','iban','payout_prefs'];
    protected $casts = ['payout_prefs'=>'array'];
    public function user(){ return $this->belongsTo(User::class); }
    public function properties(){ return $this->hasMany(Property::class); }
}
