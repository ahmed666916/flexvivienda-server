<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\RentApplicationController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Routes in this file are automatically prefixed with /api.
| Example: /api/properties
|
*/

// Public routes
Route::get('/properties', [PropertyController::class, 'apiIndex']);
Route::get('/properties/{id}', [PropertyController::class, 'show']);
Route::get('/getFeaturedProperties/{feature}', [PropertyController::class, 'getFeaturedPropertiesCommit']);
Route::get('/getAllProperties', [PropertyController::class, 'getAllPropertiesCommit']);
Route::get('/getLongMediumTermProperties/{type}', [PropertyController::class, 'getLongMediumTermPropertiesCommit']);

Route::get('/blogs', [BlogController::class, 'apiIndex']);
Route::get('/blogs/{id}', [BlogController::class, 'apiShow']);

Route::post('/rent-applications', [RentApplicationController::class, 'store']);
Route::post('/send-email', [ContactController::class, 'sendEmail']);

// ✅ Auth routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/me', [AuthController::class, 'me'])->middleware('auth:sanctum');

// ✅ Protected routes (requires login)
Route::middleware('auth:sanctum')->group(function () {
    // Bookings for logged-in users
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::delete('/bookings/{id}', [BookingController::class, 'destroy']);
    Route::get('/bookings/my', [BookingController::class, 'myBookings']);
});

// ✅ Admin-only bookings view
Route::middleware(['auth:sanctum'])->get('/admin/bookings', [BookingController::class, 'allBookings']);

Route::get('/ping', fn() => response()->json(['message' => 'pong']));
