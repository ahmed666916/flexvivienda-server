<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Owner\OwnerPropertyController;
use App\Http\Controllers\Api\Owner\SubmissionController as OwnerSubmissionController;
use App\Http\Controllers\Api\Admin\AdminPropertyController;
use App\Http\Controllers\Api\Admin\SubmissionReviewController;
use App\Http\Controllers\Api\Public\PropertyBrowseController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\Admin\OwnerController as AdminOwnerController;
use App\Http\Controllers\Api\Admin\BookingController as AdminBookingController;
use App\Http\Controllers\Api\NewsletterController;
use App\Http\Controllers\Api\FavoriteController;
use App\Http\Controllers\Api\OwnerLeadController;

// ------------------- Public -------------------
Route::get('/properties', [PropertyBrowseController::class, 'index']);
Route::get('/properties/{slug}', [PropertyBrowseController::class, 'show']);
Route::post('/bookings', [BookingController::class, 'store']);
Route::post('/newsletter/subscribe', [NewsletterController::class, 'subscribe']);

// Owner Lead intake (public)
Route::post('/owner-leads', [OwnerLeadController::class, 'store']);

// ------------------- Auth -------------------
Route::post('/auth/register', [AuthController::class, 'register']); // role=user default; role=owner allowed
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/auth/me', [AuthController::class, 'me'])->middleware('auth:sanctum');

// Favorites (auth only)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/favorites/{property}', [FavoriteController::class, 'toggle']);
    Route::get('/favorites', [FavoriteController::class, 'index']);
});

// ------------------- Owner portal -------------------
Route::middleware(['auth:sanctum','role:owner|admin'])->group(function () {
    Route::get('/owner/properties', [OwnerPropertyController::class, 'index']);
    Route::post('/owner/properties', [OwnerPropertyController::class, 'store']);
    Route::put('/owner/properties/{id}', [OwnerPropertyController::class, 'update']);

    Route::get('/owner/submissions', [OwnerSubmissionController::class, 'index']);
    Route::post('/owner/submissions', [OwnerSubmissionController::class, 'store']);
});

// ------------------- Admin portal -------------------
Route::middleware(['auth:sanctum','role:admin'])->group(function () {
    // Submissions review (used by /admin/submissions page)
    Route::get('/admin/submissions', [SubmissionReviewController::class, 'index']);
    Route::post('/admin/submissions/{id}/approve', [SubmissionReviewController::class, 'approve']);
    Route::post('/admin/submissions/{id}/reject',  [SubmissionReviewController::class, 'reject']);

    // Properties moderation
    Route::get('/admin/properties', [AdminPropertyController::class, 'index']);
    Route::post('/admin/properties/{id}/publish', [AdminPropertyController::class, 'publish']);
    Route::post('/admin/properties/{id}/unpublish', [AdminPropertyController::class, 'unpublish']);

    // Admin: owners
    Route::get('/admin/owners',            [AdminOwnerController::class,'index']);
    Route::get('/admin/owners/{id}',       [AdminOwnerController::class,'show']);
    Route::post('/admin/owners/{id}/verify',   [AdminOwnerController::class,'verify']);
    Route::post('/admin/owners/{id}/unverify', [AdminOwnerController::class,'unverify']);
    Route::post('/admin/owners/{id}/disable',  [AdminOwnerController::class,'disable']);
    Route::post('/admin/owners/{id}/enable',   [AdminOwnerController::class,'enable']);

    // Admin: bookings
    Route::get('/admin/bookings',              [AdminBookingController::class,'index']);
    Route::get('/admin/bookings/{id}',         [AdminBookingController::class,'show']);
    Route::post('/admin/bookings/{id}/confirm',[AdminBookingController::class,'confirm']);
    Route::post('/admin/bookings/{id}/cancel', [AdminBookingController::class,'cancel']);
    Route::post('/admin/bookings/{id}/pay',    [AdminBookingController::class,'markPaid']);
    Route::post('/admin/bookings/{id}/refund', [AdminBookingController::class,'refund']);
});
