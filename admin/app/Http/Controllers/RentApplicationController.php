<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RentApplication;

class RentApplicationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name'      => 'required|string|max:255',
            'last_name'       => 'required|string|max:255',
            'email'           => 'required|email',
            'phone'           => 'required|string|max:20',
            'city'            => 'required|string|max:255',
            'district'        => 'required|string|max:255',
            'neighborhood'    => 'required|string|max:255',
            'num_apartments'  => 'required|string',
            'property_type'   => 'required|string',
            'tourism_license' => 'required|string',
        ]);

        $application = RentApplication::create($validated);

        return response()->json([
            'message' => 'Application submitted successfully!',
            'data' => $application
        ], 201);
    }

    public function index()
    {
        $applications = RentApplication::latest()->orderBy('id','desc')->paginate(10); // paginate for better UX

        return view('rent_applications.index', compact('applications'));
    }
}
