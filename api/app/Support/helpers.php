<?php

use Illuminate\Support\Arr;

if (! function_exists('proxy_url')) {
    function proxy_url(?string $url, array $opts = []): ?string
    {
        if (!$url) return null;

        $params = array_filter([
            'u' => $url,                 // leave raw; route() will encode safely
            'w' => $opts['w'] ?? null,
            'q' => $opts['q'] ?? null,
        ], fn($v) => $v !== null && $v !== '');

        return route('image.proxy', $params);
    }
}
