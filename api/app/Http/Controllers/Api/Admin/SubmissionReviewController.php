<?php
// app/Http/Controllers/Api/Admin/SubmissionReviewController.php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SubmissionReviewController extends Controller
{
    // GET /api/admin/submissions
    public function index(Request $request)
    {
        // TODO: return paginated list of owner submissions awaiting review
        return response()->json(['data' => []]);
    }

    // POST /api/admin/submissions/{id}/approve
    public function approve($id)
    {
        // TODO: mark submission approved and (optionally) create a Property
        return response()->json(['ok' => true, 'id' => $id, 'status' => 'approved']);
    }

    // POST /api/admin/submissions/{id}/reject
    public function reject($id)
    {
        // TODO: mark submission rejected (and store reason)
        return response()->json(['ok' => true, 'id' => $id, 'status' => 'rejected']);
    }
}
