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


