<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Submission;
use Illuminate\Http\Request;

class SubmissionReviewController extends Controller
{
    // GET /api/admin/submissions
    public function index(Request $request)
    {
        $perPage = max(1, min((int)$request->input('per_page', 20), 100));

        $q = Submission::query()->with(['user:id,name,email', 'reviewer:id,name']);

        if ($request->filled('status')) {
            $q->where('status', (string) $request->input('status'));
        }
        if ($request->filled('type')) {
            $q->where('type', (string) $request->input('type'));
        }
        if ($request->filled('q')) {
            $term = '%'.(string)$request->input('q').'%';
            // Portable search: LIKE on text columns + raw JSON blob
            $q->where(function ($w) use ($term) {
                $w->where('notes', 'like', $term)
                  ->orWhere('admin_notes', 'like', $term)
                  ->orWhere('payload', 'like', $term); // works even if payload is a JSON string
            });
        }

        $rows = $q->orderByDesc('id')->paginate($perPage);

        return response()->json($rows);
    }

    public function approve(Request $request, $id)
    {
        $sub = Submission::findOrFail($id);

        if ($sub->status !== 'approved') {
            $sub->status      = 'approved';
            $sub->reviewed_by = $request->user()->id;
            $sub->reviewed_at = now();
            if ($request->filled('admin_notes')) {
                $sub->admin_notes = (string)$request->input('admin_notes');
            }
            $sub->save();
        }

        return response()->json(['ok' => true, 'id' => $sub->id, 'status' => 'approved']);
    }

    public function reject(Request $request, $id)
    {
        $sub = Submission::findOrFail($id);

        $sub->status      = 'rejected';
        $sub->reviewed_by = $request->user()->id;
        $sub->reviewed_at = now();
        if ($request->filled('reason')) {
            $sub->admin_notes = (string)$request->input('reason');
        }
        $sub->save();

        return response()->json(['ok' => true, 'id' => $sub->id, 'status' => 'rejected']);
    }
}
