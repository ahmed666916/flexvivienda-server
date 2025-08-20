<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function index(Request $r)
    {
        $q = Booking::query()
            ->with([
                'property:id,title,city_id',
                'property.city:id,name',
                'user:id,name,email'
            ])
            ->when($r->filled('status'), fn($qq)=>$qq->where('status', $r->status))
            ->when($r->filled('payment_status'), fn($qq)=>$qq->where('payment_status', $r->payment_status))
            ->when($r->filled('q'), function($qq) use ($r) {
                $s = '%'.$r->q.'%';
                $qq->where(function($w) use ($s){
                    $w->where('ref','like',$s)
                      ->orWhereHas('property', fn($p)=>$p->where('title','like',$s))
                      ->orWhereHas('user', fn($u)=>$u->where('name','like',$s)->orWhere('email','like',$s));
                });
            })
            ->orderByDesc('id');

        return $q->paginate($r->integer('per_page', 20));
    }

    public function show(int $id)
    {
        return Booking::with([
            'property:id,title,city_id',
            'property.city:id,name',
            'user:id,name,email'
        ])->findOrFail($id);
    }

    public function confirm(int $id){ return $this->setStatus($id,'confirmed'); }
    public function cancel(int $id){  return $this->setStatus($id,'cancelled'); }
    public function markPaid(int $id){ return $this->setPayment($id,'paid'); }
    public function refund(int $id){   return $this->setPayment($id,'refunded'); }

    protected function setStatus(int $id, string $status)
    {
        abort_unless(in_array($status, ['pending','confirmed','cancelled','awaiting_admin'], true), 422);
        $b = Booking::findOrFail($id);
        // simple guard: can't confirm cancelled, etc.
        if ($b->status === 'cancelled' && $status === 'confirmed') {
            return response()->json(['message'=>'Cannot confirm a cancelled booking'], 422);
        }
        $b->update(['status'=>$status]);
        return ['ok'=>true,'booking'=>$b->fresh()];
    }

    protected function setPayment(int $id, string $payment)
    {
        abort_unless(in_array($payment, ['unpaid','paid','refunded'], true), 422);
        $b = Booking::findOrFail($id);
        $b->update(['payment_status'=>$payment]);
        return ['ok'=>true,'booking'=>$b->fresh()];
    }
}
