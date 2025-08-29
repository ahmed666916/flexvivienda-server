@extends('layouts.app') {{-- or layouts.admin if you have an admin layout --}}

@section('content')
<div class="container mt-5">
    <h2 class="mb-4">📖 All Bookings</h2>

    <div class="card shadow-sm">
        <div class="card-body">
            <table class="table table-bordered table-striped align-middle">
                <thead class="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Guests</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Total Price</th>
                        <th>Booked At</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($bookings as $booking)
                        <tr>
                            <td>{{ $loop->iteration }}</td>
                            <td>{{ $booking->name }}</td>
                            <td>{{ $booking->email }}</td>
                            <td>{{ $booking->phone }}</td>
                            <td>{{ $booking->guests }}</td>
                            <td>{{ \Carbon\Carbon::parse($booking->start_date)->format('M d, Y') }}</td>
                            <td>{{ \Carbon\Carbon::parse($booking->end_date)->format('M d, Y') }}</td>
                            <td><strong>${{ number_format($booking->total_price, 2) }}</strong></td>
                            <td>{{ $booking->created_at->format('M d, Y H:i') }}</td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="9" class="text-center">No bookings yet.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection
