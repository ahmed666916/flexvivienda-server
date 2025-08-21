<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SubmissionReviewController extends Controller
{
    // GET /api/admin/submissions?status=pending&type=owner_lead&q=istanbul&per_page=20
    public function index(Request $request)
    {
        $perPage = max(1, min((int)$request->input('per_page', 20), 100));
        $status  = (string) $request->input('status', 'pending'); // SPA asks for 'pending'
        $type    = (string) $request->input('type', 'owner_lead');
        $term    = (string) $request->input('q', '');

        // Bridge: map SPA's 'pending' to owner_leads 'new'
        $ownerLeadStatus = $status === 'pending' ? 'new' : $status;

        $q = DB::table('owner_leads')
            ->select([
                'id',
                DB::raw("'owner_lead' as type"),
                'status',
                'name',
                'city',
                'property_type',
                'bedrooms',
                'photos',
                'notes',
                'created_at',
                'updated_at',
            ])
            ->when($ownerLeadStatus, fn($qq) => $qq->where('status', $ownerLeadStatus))
            ->when($term !== '', function ($qq) use ($term) {
                $like = "%{$term}%";
                $qq->where(function ($w) use ($like) {
                    $w->where('name','like',$like)
                      ->orWhere('city','like',$like)
                      ->orWhere('property_type','like',$like)
                      ->orWhere('notes','like',$like);
                });
            })
            ->orderByDesc('id');

        $rows = $q->paginate($perPage);

        // Normalize output to what the SPA expects
        $items = collect($rows->items())->map(function ($r) {
            return [
                'id'           => $r->id,
                'type'         => 'owner_lead',
                'status'       => $r->status, // new/contacted/qualified/rejected/converted
                'created_at'   => $r->created_at,
                'name'         => $r->name,
                'city'         => $r->city,
                'property_type'=> $r->property_type,
                'bedrooms'     => $r->bedrooms,
                'photos'       => $this->decodePhotos($r->photos),
                'notes'        => $r->notes,
                'payload'      => [
                    'name' => $r->name,
                    'city' => $r->city,
                    'property_type' => $r->property_type,
                    'bedrooms' => $r->bedrooms,
                    'photos' => $this->decodePhotos($r->photos),
                    'notes' => $r->notes,
                ],
            ];
        });

        return response()->json([
            'current_page' => $rows->currentPage(),
            'per_page'     => $rows->perPage(),
            'total'        => $rows->total(),
            'data'         => $items,
        ]);
    }

    // POST /api/admin/submissions/{id}/approve
    public function approve(Request $request, $id)
    {
        // For owner_leads we interpret "approve" as moving to "qualified"
        $affected = DB::table('owner_leads')
            ->where('id', $id)
            ->update([
                'status' => 'qualified',
                'updated_at' => now(),
            ]);

        if (!$affected) {
            return response()->json(['ok' => false, 'message' => 'Submission not found'], 404);
        }
        return response()->json(['ok' => true, 'id' => (int)$id, 'status' => 'approved']);
    }

    // POST /api/admin/submissions/{id}/reject
    public function reject(Request $request, $id)
    {
        $affected = DB::table('owner_leads')
            ->where('id', $id)
            ->update([
                'status' => 'rejected',
                'updated_at' => now(),
            ]);

        if (!$affected) {
            return response()->json(['ok' => false, 'message' => 'Submission not found'], 404);
        }
        return response()->json(['ok' => true, 'id' => (int)$id, 'status' => 'rejected']);
    }

    private function decodePhotos($val)
    {
        if (!$val) return [];
        if (is_array($val)) return $val;
        // MySQL json column returns string; try to decode
        try { $arr = json_decode($val, true); return is_array($arr) ? $arr : []; }
        catch (\Throwable $e) { return []; }
    }
}
