<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Booking extends Model
{
    protected $fillable = [
        'ref','property_id','user_id','start_date','end_date','guests',
        'total_price','status','payment_status','channel'
    ];
    protected $casts = ['start_date'=>'date','end_date'=>'date'];

    protected static function booted(): void
    {
        static::creating(function ($b) {
            if (!$b->ref) $b->ref = 'BK-'.now()->format('ymd').'-'.strtoupper(Str::random(4));
        });
    }

    public function property(){ return $this->belongsTo(Property::class); }
    public function user(){ return $this->belongsTo(\App\Models\User::class); }
}
