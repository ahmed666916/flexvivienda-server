<?php


namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Property extends Model {
    protected $fillable = [
        'owner_id','city_id','title','slug','description','address_line',
        'lat','lng','bedrooms','bathrooms','max_guests','currency',
        'price_per_night','price_per_month','status','is_featured',
        'listing_source','external_id','require_manual_approval'
    ];
    
    public function owner(){ return $this->belongsTo(Owner::class); }
    public function city(){ return $this->belongsTo(City::class); }
    public function amenities(){ return $this->belongsToMany(Amenity::class); }
    public function categories(){ return $this->belongsToMany(Category::class); }
    public function stayTypes()
{
    return $this->belongsToMany(StayType::class, 'property_stay_type');
}
public function images() { return $this->hasMany(\App\Models\PropertyImage::class); }
public function favoritedBy() { return $this->belongsToMany(\App\Models\User::class, 'favorites'); }


}