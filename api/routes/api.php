<?php

// routes/api.php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Owner\OwnerPropertyController;
use App\Http\Controllers\Api\Owner\SubmissionController;
use App\Http\Controllers\Api\Admin\AdminPropertyController;
use App\Http\Controllers\Api\Admin\SubmissionReviewController;
use App\Http\Controllers\Api\Public\PropertyBrowseController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\Admin\OwnerController as AdminOwnerController;
use App\Http\Controllers\Api\Admin\BookingController as AdminBookingController;
use App\Http\Controllers\Api\NewsletterController;
use App\Http\Controllers\Api\FavoriteController;
use App\Http\Controllers\Api\OwnerLeadController;

// Public
Route::get('/properties', [PropertyBrowseController::class, 'index']);
Route::get('/properties/{slug}', [PropertyBrowseController::class, 'show']);
Route::post('/bookings', [BookingController::class, 'store']); // allow guest checkout later if needed

// Auth
Route::post('/auth/register', [AuthController::class, 'register']);   // role=user by default, role=owner allowed
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/auth/me', [AuthController::class, 'me'])->middleware('auth:sanctum');

// Owner portal
Route::middleware(['auth:sanctum','role:owner,admin'])->group(function () {
    Route::get('/owner/properties', [OwnerPropertyController::class, 'index']);
    Route::post('/owner/properties', [OwnerPropertyController::class, 'store']);       // creates draft -> pending_review
    Route::put('/owner/properties/{id}', [OwnerPropertyController::class, 'update']);   // only if not published
    Route::get('/owner/submissions', [SubmissionController::class, 'index']);
    Route::post('/owner/submissions', [SubmissionController::class, 'store']);         // multi‑step wizard save
});

// Admin portal
Route::middleware(['auth:sanctum','role:admin'])->group(function () {
    Route::get('/admin/properties', [AdminPropertyController::class, 'index']);
    Route::post('/admin/properties/{id}/publish', [AdminPropertyController::class, 'publish']);
    Route::post('/admin/properties/{id}/unpublish', [AdminPropertyController::class, 'unpublish']);
    Route::get('/admin/submissions', [SubmissionReviewController::class, 'index']);
    Route::post('/admin/submissions/{id}/approve', [SubmissionReviewController::class, 'approve']);
    Route::post('/admin/submissions/{id}/reject', [SubmissionReviewController::class, 'reject']);
});

Route::get('/admin/owners',            [AdminOwnerController::class,'index']);
Route::get('/admin/owners/{id}',       [AdminOwnerController::class,'show']);
Route::post('/admin/owners/{id}/verify',   [AdminOwnerController::class,'verify']);
Route::post('/admin/owners/{id}/unverify', [AdminOwnerController::class,'unverify']);
Route::post('/admin/owners/{id}/disable',  [AdminOwnerController::class,'disable']);
Route::post('/admin/owners/{id}/enable',   [AdminOwnerController::class,'enable']);

Route::get('/admin/bookings',              [AdminBookingController::class,'index']);
Route::get('/admin/bookings/{id}',         [AdminBookingController::class,'show']);
Route::post('/admin/bookings/{id}/confirm',[AdminBookingController::class,'confirm']);
Route::post('/admin/bookings/{id}/cancel', [AdminBookingController::class,'cancel']);
Route::post('/admin/bookings/{id}/pay',    [AdminBookingController::class,'markPaid']);
Route::post('/admin/bookings/{id}/refund', [AdminBookingController::class,'refund']);

Route::post('/newsletter/subscribe', [NewsletterController::class, 'subscribe']);

// Favorites require auth (Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/favorites/{property}', [FavoriteController::class, 'toggle']);
    Route::get('/favorites', [FavoriteController::class, 'index']);
});

// Public Owner Lead intake (list-your-home form)
Route::post('/owner-leads', [OwnerLeadController::class, 'store']);

// (Optional) Admin-only listing of leads — protect with your admin middleware
Route::middleware(['auth:sanctum', 'can:isAdmin'])->group(function () {
    Route::get('/owner-leads', [OwnerLeadController::class, 'index']);
    Route::patch('/owner-leads/{lead}', [OwnerLeadController::class, 'updateStatus']);
});

Route::prefix('admin')->middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/submissions', [AdminSubmissionController::class, 'index']);
});



