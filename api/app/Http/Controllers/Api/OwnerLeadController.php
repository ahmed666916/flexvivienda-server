<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class OwnerLeadController extends Controller
{
    // POST /owner-leads  (public intake)
    public function store(Request $request)
    {
        $v = Validator::make($request->all(), [
            'name'          => ['required','string','max:120'],
            'email'         => ['nullable','email','max:255'],
            'phone'         => ['nullable','string','max:50'],
            'property_type' => ['nullable','string','max:80'],
            'bedrooms'      => ['nullable','integer','min:0','max:50'],
            'bathrooms'     => ['nullable','integer','min:0','max:50'],
            'city'          => ['nullable','string','max:120'],
            'address'       => ['nullable','string','max:255'],
            'photos'        => ['nullable','array'],
            'photos.*'      => ['string','max:1024'],
            'notes'         => ['nullable','string'],
        ]);

        if ($v->fails()) {
            return response()->json(['errors' => $v->errors()], 422);
        }

        $id = DB::table('owner_leads')->insertGetId([
            'name'          => $request->name,
            'email'         => $request->email,
            'phone'         => $request->phone,
            'property_type' => $request->property_type,
            'bedrooms'      => $request->bedrooms,
            'bathrooms'     => $request->bathrooms,
            'city'          => $request->city,
            'address'       => $request->address,
            'photos'        => $request->filled('photos') ? json_encode($request->photos) : null,
            'notes'         => $request->notes,
            'status'        => 'new',
            'created_at'    => now(),
            'updated_at'    => now(),
        ]);

        return response()->json(['ok' => true, 'id' => $id, 'status' => 'new']);
    }

    // GET /owner-leads  (admin only)
    public function index(Request $request)
    {
        abort_unless($request->user() && $request->user()->role === 'admin', 403);

        $q = DB::table('owner_leads')->orderByDesc('created_at');
        if ($request->filled('status')) {
            $q->where('status', $request->status);
        }
        return response()->json(['data' => $q->paginate(20)]);
    }

    // PATCH /owner-leads/{lead}  (admin only)
    public function updateStatus(Request $request, $leadId)
    {
        abort_unless($request->user() && $request->user()->role === 'admin', 403);

        $v = Validator::make($request->all(), [
            'status' => ['required','in:new,contacted,qualified,rejected,converted'],
            'notes'  => ['nullable','string'],
        ]);
        if ($v->fails()) return response()->json(['errors' => $v->errors()], 422);

        $affected = DB::table('owner_leads')
            ->where('id', $leadId)
            ->update([
                'status' => $request->status,
                'notes'  => $request->notes,
                'updated_at' => now(),
            ]);

        if (!$affected) return response()->json(['ok' => false, 'message' => 'Lead not found'], 404);

        return response()->json(['ok' => true]);
    }
}
