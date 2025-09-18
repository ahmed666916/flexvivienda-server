<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function summary(Request $r)
    {
        $yearStart = now()->startOfYear();

        // 🔹 Monthly revenue + booking count
        $bookings = Booking::selectRaw('DATE_FORMAT(check_in, "%Y-%m") ym, SUM(total_amount) revenue, COUNT(*) cnt')
            ->where('check_in', '>=', $yearStart)
            ->groupBy('ym')
            ->orderBy('ym')
            ->get();

        // 🔹 Occupancy (confirmed nights per property)
        $occupancy = DB::table('bookings')
            ->selectRaw('property_id, COUNT(*) nights')
            ->where('status', 'confirmed')
            ->groupBy('property_id')
            ->get();

        // 🔹 Breakdown by stay type (short/mid/long rates configured)
        $byStayType = DB::table('property_rates')
            ->select('stay_type', DB::raw('COUNT(*) as cnt'))
            ->groupBy('stay_type')
            ->get();

        // 🔹 Revenue in last 7 days
        $revenue7d = Booking::where('created_at', '>=', now()->subDays(7))
            ->sum('total_amount');

        return response()->json(compact(
            'bookings',
            'occupancy',
            'byStayType',
            'revenue7d'
        ));
    }
}
