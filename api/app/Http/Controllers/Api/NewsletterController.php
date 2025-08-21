<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class NewsletterController extends Controller
{
    public function subscribe(Request $request)
    {
        $v = Validator::make($request->all(), [
            'email' => ['required','email','max:255'],
            'tags'  => ['sometimes','array'],
            'lang'  => ['sometimes','string','max:10'],
            'source'=> ['sometimes','string','max:50'],
        ]);

        if ($v->fails()) {
            return response()->json(['errors' => $v->errors()], 422);
        }

        $payload = [
            'email' => strtolower($request->email),
            'meta'  => json_encode([
                'tags' => $request->input('tags', []),
                'lang' => $request->input('lang', null),
                'source' => $request->input('source', 'website'),
            ]),
            'created_at' => now(),
            'updated_at' => now(),
        ];

        DB::table('newsletter_subscribers')->updateOrInsert(
            ['email' => $payload['email']],
            $payload
        );

        return response()->json(['ok' => true, 'message' => 'Subscribed']);
    }
}

