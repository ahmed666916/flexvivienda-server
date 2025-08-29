@extends('layouts.app')

@section('header')
    <h2 class="h4 mb-0">Dashboard</h2>
@endsection

@section('content')
<div class="container">
    <div class="row g-4 mb-5">

        <!-- Stats Cards -->
        <div class="col-6 col-lg-3">
            <div class="card shadow-sm border-0">
                <div class="card-body">
                    <div class="text-muted small">Total Properties</div>
                    <div class="d-flex justify-content-between align-items-center mt-2">
                        <h3 class="mb-0">{{ $stats['properties'] ?? 0 }}</h3>
                        <i class="bi bi-building text-primary fs-4"></i>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-6 col-lg-3">
            <div class="card shadow-sm border-0">
                <div class="card-body">
                    <div class="text-muted small">Total Blogs</div>
                    <div class="d-flex justify-content-between align-items-center mt-2">
                        <h3 class="mb-0">{{ $stats['blogs'] ?? 0 }}</h3>
                        <i class="bi bi-journal-text text-success fs-4"></i>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-6 col-lg-3">
            <div class="card shadow-sm border-0">
                <div class="card-body">
                    <div class="text-muted small">Total Bookings</div>
                    <div class="d-flex justify-content-between align-items-center mt-2">
                        <h3 class="mb-0">{{ $stats['bookings'] ?? 0 }}</h3>
                        <i class="bi bi-calendar-check text-warning fs-4"></i>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-6 col-lg-3">
            <div class="card shadow-sm border-0">
                <div class="card-body">
                    <div class="text-muted small">Total Users</div>
                    <div class="d-flex justify-content-between align-items-center mt-2">
                        <h3 class="mb-0">{{ $stats['users'] ?? 0 }}</h3>
                        <i class="bi bi-people text-danger fs-4"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Management Buttons -->
    <div class="row g-4">
        <div class="col-md-4">
            <a href="{{ route('properties.index') }}" class="btn btn-primary w-100 py-4 shadow-sm">
                <i class="bi bi-building me-2"></i> Manage Properties
            </a>
        </div>
        <div class="col-md-4">
            <a href="{{ route('blogs.index') }}" class="btn btn-success w-100 py-4 shadow-sm">
                <i class="bi bi-journal-text me-2"></i> Manage Blogs
            </a>
        </div>
        <div class="col-md-4">
            <a href="{{ route('rent-applications.index') }}" class="btn btn-warning w-100 py-4 shadow-sm">
                <i class="bi bi-person-badge me-2"></i> Rental Requests
            </a>
        </div>
        <div class="col-md-4">
            <a href="{{ route('admin.bookings.index') }}" class="btn btn-info w-100 py-4 shadow-sm">
                <i class="bi bi-calendar-check me-2"></i> Manage Bookings
            </a>
        </div>
        <div class="col-md-4">
            <a href="{{ route('users.index') }}" class="btn btn-danger w-100 py-4 shadow-sm">
                <i class="bi bi-people me-2"></i> Manage Users
            </a>
        </div>
    </div>
</div>
@endsection
