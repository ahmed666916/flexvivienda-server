<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// ❌ Remove require __DIR__.'/auth.php'
// ❌ Remove profile routes that depend on Blade login

// If you want a catch-all to serve React, add something like:
// Route::view('/{any}', 'welcome')->where('any', '.*');
