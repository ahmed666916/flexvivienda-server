<?php

namespace App\Http\Controllers\Api\Owner;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SubmissionController extends Controller
{
    // GET /api/owner/submissions
    public function index(Request $request)
    {
        // TODO: replace with real data
        return response()->json([
            ['id' => 1, 'title' => 'Sample submission', 'status' => 'pending'],
        ]);
    }

    // POST /api/owner/submissions
    public function store(Request $request)
    {
        // TODO: validate & persist
        return response()->json(['ok' => true, 'id' => 1], 201);
    }

    // If you later add these routes:
    public function approve($id) { return response()->json(['ok' => true, 'id' => $id, 'status' => 'approved']); }
    public function reject($id)  { return response()->json(['ok' => true, 'id' => $id, 'status' => 'rejected']); }
}
