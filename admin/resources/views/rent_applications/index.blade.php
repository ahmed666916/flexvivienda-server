@extends('layouts.app') {{-- Or your admin layout --}}

@section('content')
<div class="container">
    <h2 class="mb-4">Rent Applications</h2>

    <table class="table table-bordered table-striped">
        <thead>
            <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>City</th>
                <th>District</th>
                <th>Neighborhood</th>
                <th>Num. Apartments</th>
                <th>Property Type</th>
                <th>Tourism License</th>
                <th>Submitted At</th>
            </tr>
        </thead>
        <tbody>
            @forelse($applications as $application)
                <tr>
                    <td>{{ $application->id }}</td>
                    <td>{{ $application->first_name }}</td>
                    <td>{{ $application->last_name }}</td>
                    <td>{{ $application->email }}</td>
                    <td>{{ $application->phone }}</td>
                    <td>{{ $application->city }}</td>
                    <td>{{ $application->district }}</td>
                    <td>{{ $application->neighborhood }}</td>
                    <td>{{ $application->num_apartments }}</td>
                    <td>{{ $application->property_type }}</td>
                    <td>{{ $application->tourism_license }}</td>
                    <td>{{ $application->created_at->format('Y-m-d H:i') }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="12" class="text-center">No applications found.</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    {{-- Pagination --}}
    <div>
        {{ $applications->links() }}
    </div>
</div>
@endsection
