<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\RentApplicationController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ContactController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Routes in this file are automatically prefixed with /api.
| Example: /api/properties
|
*/

Route::middleware('api')->group(function () {
    Route::get('/properties', [PropertyController::class, 'apiIndex']);
    Route::get('/properties/{id}', [PropertyController::class, 'show']);
    Route::get('/getFeaturedProperties/{feature}', [PropertyController::class, 'getFeaturedPropertiesCommit']);
    Route::get('/getAllProperties', [PropertyController::class, 'getAllPropertiesCommit']);

    Route::get('/getLongMediumTermProperties/{type}', [PropertyController::class, 'getLongMediumTermPropertiesCommit']);

    Route::get('/blogs', [BlogController::class, 'apiIndex']);
    Route::get('/blogs/{id}', [BlogController::class, 'apiShow']);
    Route::post('/rent-applications', [RentApplicationController::class, 'store']);
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::post('/send-email', [ContactController::class, 'sendEmail']);
});