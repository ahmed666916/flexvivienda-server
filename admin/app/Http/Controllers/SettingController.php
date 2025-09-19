<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index()
    {
        return response()->json(['settings' => []]); // placeholder
    }

    public function update(Request $request)
    {
        return response()->json(['ok' => true]);
    }
}
