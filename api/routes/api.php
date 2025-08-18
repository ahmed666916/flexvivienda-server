<?php

use App\Http\Controllers\Api\PropertyController;

Route::get('/properties', [PropertyController::class, 'index']);
Route::get('/properties/{id}', [PropertyController::class, 'show']);
