<?php

use App\Http\Controllers\Api\PropertyController;
use App\Http\Controllers\ImageProxyController;

Route::get('/properties', [PropertyController::class, 'index']);
Route::get('/properties/{id}', [PropertyController::class, 'show']);
Route::get('/img', [ImageProxyController::class, 'show']);
// routes/api.php
Route::get('/ping', fn() => response()->json(['ok' => true, 'time' => now()]));

