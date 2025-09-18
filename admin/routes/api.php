<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    AuthController, DashboardController, CalendarController, PaymentController, ReportController,
    Admin\PropertyAdminController, Owner\OwnerPropertyController,
    UserController, ModerationController, SettingController,
    PropertyController, BlogController, RentApplicationController, BookingController, ContactController
};

// -------------------------
// AUTH ROUTES (public)
// -------------------------
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']); // optional

// -------------------------
// PROTECTED ROUTES
// -------------------------
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // OWNER
    Route::prefix('owner')->middleware('role:owner|admin')->group(function () {
        Route::post('/properties', [OwnerPropertyController::class, 'store']);
        Route::put('/properties/{property}', [OwnerPropertyController::class, 'update']);
    });

    // USER
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::delete('/bookings/{id}', [BookingController::class, 'destroy']);
    Route::get('/bookings/my', [BookingController::class, 'myBookings']);
});

// -------------------------
// ADMIN ROUTES (TEMP BYPASS – NO AUTH)
// -------------------------
Route::prefix('admin')->group(function () {
    Route::get('/stats', [DashboardController::class, 'stats']);

    Route::get('/properties/pending', [PropertyAdminController::class, 'pending']);
    Route::post('/properties/{property}/approve', [PropertyAdminController::class, 'approve']);
    Route::post('/properties/{property}/reject', [PropertyAdminController::class, 'reject']);
    Route::put('/properties/{property}/rates', [PropertyAdminController::class, 'updateRates']);

    Route::get('/users', [UserController::class, 'index']);
    Route::put('/users/{user}/role', [UserController::class, 'updateRole']);

    Route::get('/reports/summary', [ReportController::class, 'summary']);
    Route::get('/payments', [PaymentController::class, 'index']);

    Route::get('/moderation/flags', [ModerationController::class, 'index']);
    Route::post('/moderation/flags/{flag}/status', [ModerationController::class, 'setStatus']);

    Route::get('/settings', [SettingController::class, 'index']);
    Route::put('/settings', [SettingController::class, 'update']);
});

// -------------------------
// PUBLIC ROUTES
// -------------------------
Route::get('/properties', [PropertyController::class, 'apiIndex']);
Route::get('/properties/{id}', [PropertyController::class, 'show']);
Route::get('/properties/{propertyId}/booked-dates', [BookingController::class, 'bookedDates']);

Route::get('/blogs', [BlogController::class, 'apiIndex']);
Route::get('/blogs/{id}', [BlogController::class, 'apiShow']);

Route::post('/rent-applications', [RentApplicationController::class, 'store']);
Route::post('/send-email', [ContactController::class, 'sendEmail']);

Route::get('/properties/{property}/calendar', [CalendarController::class, 'availability']);
Route::post('/airbnb/ical/import', [CalendarController::class, 'importIcal']); 

// Stripe
Route::post('/payments/intent', [PaymentController::class, 'createIntent'])->middleware('auth:sanctum');
Route::post('/payments/webhook', [PaymentController::class, 'webhook']);

// Ping
Route::get('/ping', fn () => response()->json(['message' => 'pong']));
