<?php

return [

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'http://localhost:5173',   // 👈 add this
        'http://localhost:3000',   // keep if you use CRA
        'https://flexvivienda.com',
        'https://app.flexvivienda.com',
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    // ❌ Keep false if using Bearer tokens
    // ✅ If you plan to use Sanctum cookies, set true
    'supports_credentials' => false,
];
