<?php

use App\Http\Controllers\Api\PropertyController;
use App\Http\Controllers\ImageProxyController;

Route::get('/properties', [PropertyController::class, 'index']);
Route::get('/properties/{id}', [PropertyController::class, 'show']);
Route::get('/img', [ImageProxyController::class, 'show']);
