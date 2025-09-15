<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RentApplicationController;
use App\Models\Property;
use App\Models\Blog;
use App\Models\User;



Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    $stats = [
        'properties' => Property::count(),
        'blogs' => blog::count(),
        'bookings' => 0,
        'users' => User::count(),
    ];

    return view('dashboard', compact('stats'));
})->middleware(['auth'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

    

//Route::resource('properties', PropertyController::class)->middleware('auth');
Route::middleware('auth')->group(function () {
    Route::get('/properties', [PropertyController::class, 'index'])->name('properties.index');
    Route::get('/properties/create', [PropertyController::class, 'create'])->name('properties.create');
    Route::post('/properties', [PropertyController::class, 'store'])->name('properties.store');
    Route::get('/properties/{property}/edit', [PropertyController::class, 'edit'])->name('properties.edit');
    Route::put('/properties/{property}', [PropertyController::class, 'update'])->name('properties.update');
    Route::delete('/properties/images/{image}', [App\Http\Controllers\PropertyController::class, 'destroyImage'])
        ->name('properties.images.destroy');
});




// Blogs
Route::resource('blogs', BlogController::class)->middleware('auth');

// Owner Listing Requests
//Route::resource('owner/requests', OwnerRequestController::class)->names([
  //  'index' => 'owner.requests.index',
    //'create' => 'owner.requests.create',
    //'store' => 'owner.requests.store',
    //'show' => 'owner.requests.show',
    //'edit' => 'owner.requests.edit',
    //'update' => 'owner.requests.update',
    //'destroy' => 'owner.requests.destroy',
//])->middleware('auth');

// Bookings
Route::resource('bookings', BookingController::class)->middleware('auth');

// Users (admin-only usually)
Route::resource('users', UserController::class)->middleware('auth');

Route::get('/admin/rent-applications', [RentApplicationController::class, 'index'])
    ->name('rent-applications.index');

    Route::get('/admin/bookings', [BookingController::class, 'index'])->name('admin.bookings.index');



require __DIR__.'/auth.php';
