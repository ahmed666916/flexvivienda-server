<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\RentApplicationController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Admin\PropertyAdminController;
use App\Http\Controllers\Owner\OwnerPropertyController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ReportController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| All routes in this file are automatically prefixed with /api
|--------------------------------------------------------------------------
*/

// -------------------------
// OWNER ROUTES
// -------------------------
Route::middleware('auth:sanctum')->prefix('owner')->group(function () {
    Route::post('/properties', [OwnerPropertyController::class, 'store']);
    Route::put('/properties/{property}', [OwnerPropertyController::class, 'update'])
        ->middleware('can:update,property'); // optional policy
});

// -------------------------
// ADMIN ROUTES
// -------------------------
Route::middleware(['auth:sanctum'])->prefix('admin')->group(function () {
    Route::get('/stats', [DashboardController::class, 'stats']);
    Route::get('/properties/pending', [PropertyAdminController::class, 'pending']);
    Route::post('/properties/{property}/approve', [PropertyAdminController::class, 'approve']);
    Route::post('/properties/{property}/reject', [PropertyAdminController::class, 'reject']);
    Route::put('/properties/{property}/rates', [PropertyAdminController::class, 'updateRates']);
    Route::get('/reports/summary', [ReportController::class, 'summary']);
    Route::get('/bookings', [BookingController::class, 'allBookings']); // admin-only view
});

// -------------------------
// CALENDAR + AVAILABILITY
// -------------------------
Route::get('/properties/{property}/calendar', [CalendarController::class, 'availability']);
Route::post('/airbnb/ical/import', [CalendarController::class, 'importIcal']); // add auth if needed

// -------------------------
// PAYMENTS
// -------------------------
Route::post('/payments/intent', [PaymentController::class, 'createIntent'])->middleware('auth:sanctum');
Route::post('/payments/webhook', [PaymentController::class, 'webhook']); // no auth for Stripe webhook

// -------------------------
// PUBLIC ROUTES
// -------------------------
Route::get('/properties', [PropertyController::class, 'apiIndex']);
Route::get('/properties/{id}', [PropertyController::class, 'show']);
Route::get('/getFeaturedProperties/{feature}', [PropertyController::class, 'getFeaturedPropertiesCommit']);
Route::get('/getAllProperties', [PropertyController::class, 'getAllPropertiesCommit']);
Route::get('/getLongMediumTermProperties/{type}', [PropertyController::class, 'getLongMediumTermPropertiesCommit']);

Route::get('/blogs', [BlogController::class, 'apiIndex']);
Route::get('/blogs/{id}', [BlogController::class, 'apiShow']);

Route::post('/rent-applications', [RentApplicationController::class, 'store']);
Route::post('/send-email', [ContactController::class, 'sendEmail']);

// -------------------------
// AUTH ROUTES
// -------------------------
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/me', [AuthController::class, 'me'])->middleware('auth:sanctum');

// -------------------------
// USER-ONLY PROTECTED ROUTES
// -------------------------
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::delete('/bookings/{id}', [BookingController::class, 'destroy']);
    Route::get('/bookings/my', [BookingController::class, 'myBookings']);
});

Route::get('/properties/{propertyId}/booked-dates', [BookingController::class, 'bookedDates']);

// -------------------------
// MISC
// -------------------------
Route::get('/ping', fn() => response()->json(['message' => 'pong']));
