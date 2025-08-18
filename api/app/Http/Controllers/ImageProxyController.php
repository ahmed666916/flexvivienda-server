<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class ImageProxyController extends Controller
{
        public function show(Request $request)
{
    $raw = $request->query('u');
    if (!$raw) abort(400, 'Missing image URL');

    // decode urlencoded or base64 inputs
    if (preg_match('/^https?%3A/i', $raw) || str_contains($raw, '%2F')) $raw = urldecode($raw);
    if (!preg_match('#^https?://#i', $raw)) {
        $decoded = base64_decode($raw, true);
        if ($decoded !== false) $raw = $decoded;
    }
    $url = $raw;
    if (!preg_match('#^https?://#i', $url)) abort(400, 'Invalid image URL');

    // allowlist (optional)
    // $host = parse_url($url, PHP_URL_HOST);
    // if (!Str::endsWith($host, ['a0.muscache.com','airbnb.com'])) abort(403);

    // 👇 DEV-ONLY: disable SSL verification when app is local
    $verifyOpt = app()->isLocal() ? false : true;

    $resp = Http::withOptions(['verify' => $verifyOpt])
        ->timeout(15)
        ->withHeaders(['User-Agent' => 'Flex Image Proxy', 'Accept' => 'image/*,*/*'])
        ->get($url);

    if (!$resp->ok()) abort(404, 'Image not found');

    return response($resp->body(), 200)
        ->header('Content-Type', $resp->header('Content-Type', 'image/jpeg'))
        ->header('Cache-Control', 'public, max-age=86400');
}

}
