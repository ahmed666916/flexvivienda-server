<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Owner;
use Illuminate\Http\Request;

class OwnerController extends Controller
{
    public function index(Request $r)
    {
        $q = Owner::query()
            ->with(['user:id,name,email,phone'])
            ->withCount('properties')
            ->when($r->filled('status'),   fn($qq)=>$qq->where('status', $r->status))
            ->when($r->filled('verified'), fn($qq)=>$qq->where('verified', filter_var($r->verified, FILTER_VALIDATE_BOOLEAN)))
            ->when($r->filled('q'), function ($qq) use ($r) {
                $s = '%'.$r->q.'%';
                $qq->where(function($w) use ($s) {
                    $w->whereHas('user', fn($u)=>$u->where('name','like',$s)->orWhere('email','like',$s)->orWhere('phone','like',$s))
                      ->orWhere('company_name','like',$s)
                      ->orWhere('tax_id','like',$s);
                });
            })
            ->orderByDesc('id');

        return $q->paginate($r->integer('per_page', 20));
    }

    public function show(int $id)
    {
        return Owner::with(['user:id,name,email,phone'], 'properties:id,owner_id,title,slug,status')
            ->withCount('properties')
            ->findOrFail($id);
    }

    public function verify(int $id){ return $this->setVerify($id, true); }
    public function unverify(int $id){ return $this->setVerify($id, false); }
    public function disable(int $id){ return $this->setStatus($id, 'disabled'); }
    public function enable(int $id){ return $this->setStatus($id, 'active'); }

    protected function setVerify(int $id, bool $value)
    {
        $o = Owner::findOrFail($id);
        $o->update(['verified'=>$value]);
        return ['ok'=>true,'owner'=>$o->fresh()];
    }
    protected function setStatus(int $id, string $status)
    {
        abort_unless(in_array($status, ['active','disabled'], true), 422);
        $o = Owner::findOrFail($id);
        $o->update(['status'=>$status]);
        return ['ok'=>true,'owner'=>$o->fresh()];
    }
}
