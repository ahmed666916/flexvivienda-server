<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    protected $fillable = [
        'owner_id','city_id','title','slug','summary','description','address',
        'lat','lng','bedrooms','beds','bathrooms','max_guests','price_per_night',
        'base_currency','is_featured','listing_source','status','raw'
    ];

    protected $casts = [
        'raw' => 'array',
        'is_featured' => 'boolean',
    ];

    public function owner(){ return $this->belongsTo(Owner::class); }
    public function city(){ return $this->belongsTo(City::class); }
    public function images(){ return $this->hasMany(PropertyImage::class); }
    public function amenities(){ return $this->belongsToMany(Amenity::class); }
    public function categories(){ return $this->belongsToMany(Category::class); }
    public function stayTypes(){ return $this->belongsToMany(StayType::class, 'property_stay_types')->withPivot([
        'min_nights','max_nights','min_months','max_months','monthly_rate','deposit_amount','contract_required'
    ])->withTimestamps(); }
}
