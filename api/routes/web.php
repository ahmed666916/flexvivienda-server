<?php

use App\Http\Controllers\ImageProxyController;

Route::get('/proxy/img', [ImageProxyController::class, 'show'])
     ->name('image.proxy');
