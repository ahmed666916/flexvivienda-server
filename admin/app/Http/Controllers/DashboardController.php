<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Property;
use App\Models\Booking;
use App\Models\User;
use App\Models\Blog;

class DashboardController extends Controller
{
    public function stats()
    {
        return response()->json([
            'properties'        => Property::count(),
            'bookings'          => Booking::count(),
            'users'             => User::count(),
            'blogs'             => Blog::count(),
            'pendingProperties' => Property::where('status', 'pending')->count(),
            'revenueMonth'      => Booking::whereBetween('created_at', [
                                        now()->startOfMonth(),
                                        now(),
                                    ])->sum('total_amount'),
        ]);
    }
}
