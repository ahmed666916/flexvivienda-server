<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Submission extends Model
{
    protected $fillable = [
        'type','status','user_id','property_id','payload','notes','admin_notes','reviewed_by','reviewed_at'
    ];

    protected $casts = [
        'payload' => 'array',        // OK even if DB column is text
        'reviewed_at' => 'datetime',
    ];

    public function user()     { return $this->belongsTo(\App\Models\User::class); }
    public function reviewer() { return $this->belongsTo(\App\Models\User::class, 'reviewed_by'); }
    public function property() { return $this->belongsTo(\App\Models\Property::class); }
}
