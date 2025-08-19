<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Illuminate\Http\Request;

class AdminPropertyController extends Controller
{
    public function index(Request $r) {
        $q = Property::with('owner.user','city','images')
            ->when($r->status, fn($qq)=>$qq->where('status',$r->status))
            ->orderByDesc('id');

        return $q->paginate(20);
    }

    public function publish(int $id) {
        $p = Property::findOrFail($id);
        $p->update(['status'=>'published']);
        return ['ok'=>true, 'property'=>$p];
    }

    public function unpublish(int $id) {
        $p = Property::findOrFail($id);
        $p->update(['status'=>'draft']);
        return ['ok'=>true, 'property'=>$p];
    }
}