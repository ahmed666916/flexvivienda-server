<?php
// app/Support/url.php
if (! function_exists('base64url')) {
    function base64url(string $s): string {
        return rtrim(strtr(base64_encode($s), '+/', '-_'), '=');
    }
}

if (! function_exists('proxy_url')) {
    /**
     * Build your image proxy URL from a raw remote URL.
     * Requires a named route 'image.proxy' that accepts ?u= (base64url) and sizing params.
     */
    function proxy_url(?string $url, array $opts = []): ?string
    {
        if (!$url) return null;

        // Don’t proxy local files
        $appUrl = rtrim(config('app.url'), '/');
        if (preg_match('#^(?:/|https?://(?:localhost|127\.0\.0\.1)|' . preg_quote($appUrl, '#') . ')#i', $url)) {
            return $url;
        }

        return route('image.proxy', array_merge(['u' => base64url($url)], $opts));
    }
}
