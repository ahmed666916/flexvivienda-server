@extends('layouts.app')

@section('header')
  <div class="d-flex align-items-center justify-content-between">
    <div>
      <h2 class="mb-0 fw-semibold">Dashboard</h2>
      <div class="text-muted small">Welcome back, {{ auth()->user()->name ?? 'Admin' }}</div>
    </div>
    <div class="d-flex gap-2">
      <a href="{{ route('properties.create') }}" class="btn btn-primary">
        <i class="bi bi-plus-lg me-1"></i> New Property
      </a>
      <a href="{{ route('admin.bookings.index') }}" class="btn btn-outline-secondary">
        <i class="bi bi-calendar-check me-1"></i> Bookings
      </a>
    </div>
  </div>
@endsection

@section('content')
<div class="container-fluid">

  {{-- TOP STATS --}}
  <div class="row g-3 mb-4">
    @php
      $stats = $stats ?? [
        'properties' => $stats['properties'] ?? 0,
        'blogs'      => $stats['blogs'] ?? 0,
        'bookings'   => $stats['bookings'] ?? 0,
        'users'      => $stats['users'] ?? 0,
        // optional extras if your controller provides them:
        'occupancy'  => $stats['occupancy'] ?? null,   // %
        'revenue'    => $stats['revenue'] ?? null,     // currency number for this month
      ];
    @endphp

    <div class="col-6 col-lg-3">
      <div class="card card-k">
        <div class="card-body">
          <div class="text-muted small">Total Properties</div>
          <div class="d-flex justify-content-between align-items-center mt-1">
            <h3 class="mb-0">{{ $stats['properties'] }}</h3>
            <i class="bi bi-building text-primary fs-4"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="col-6 col-lg-3">
      <div class="card card-k">
        <div class="card-body">
          <div class="text-muted small">Total Blogs</div>
          <div class="d-flex justify-content-between align-items-center mt-1">
            <h3 class="mb-0">{{ $stats['blogs'] }}</h3>
            <i class="bi bi-journal-text text-success fs-4"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="col-6 col-lg-3">
      <div class="card card-k">
        <div class="card-body">
          <div class="text-muted small">Total Bookings</div>
          <div class="d-flex justify-content-between align-items-center mt-1">
            <h3 class="mb-0">{{ $stats['bookings'] }}</h3>
            <i class="bi bi-calendar2-week text-warning fs-4"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="col-6 col-lg-3">
      <div class="card card-k">
        <div class="card-body">
          <div class="text-muted small">Total Users</div>
          <div class="d-flex justify-content-between align-items-center mt-1">
            <h3 class="mb-0">{{ $stats['users'] }}</h3>
            <i class="bi bi-people text-danger fs-4"></i>
          </div>
        </div>
      </div>
    </div>
  </div>

  {{-- MAIN GRID: Today / Calendar / Listings / Messages --}}
  <div class="row g-4">
    {{-- TODAY panel (Airbnb-style left column) --}}
    <div class="col-xl-6">
      <div class="card card-k h-100">
        <div class="card-header bg-white border-0 pb-0">
          <div class="d-flex align-items-center justify-content-between">
            <h5 class="mb-0">Today</h5>
            <div class="btn-group btn-group-sm" role="group" aria-label="today-upcoming">
              <a href="{{ route('admin.bookings.index') }}?tab=today" class="btn btn-light active">Today</a>
              <a href="{{ route('admin.bookings.index') }}?tab=upcoming" class="btn btn-light">Upcoming</a>
            </div>
          </div>
        </div>

        <div class="list-group list-group-flush">
          @forelse(($today ?? []) as $item)
            {{-- $item should have: time, timezone_note, guest_name, group_size, action ("checks in/out"), property_title, avatar_url --}}
            <div class="list-group-item d-flex align-items-center">
              <div class="me-3 text-center" style="width:84px">
                <div class="fw-semibold">{{ $item['time'] }}</div>
                @if(!empty($item['timezone_note']))
                  <div class="text-muted small">({{ $item['timezone_note'] }})</div>
                @endif
              </div>
              <div class="flex-grow-1">
                <div class="fw-semibold">
                  {{ $item['guest_name'] }}’s group of {{ $item['group_size'] }} {{ $item['action'] }}
                </div>
                <div class="text-muted small">{{ $item['property_title'] }}</div>
              </div>
              <img class="rounded-circle object-fit-cover ms-2" src="{{ $item['avatar_url'] ?? 'https://ui-avatars.com/api/?name='.urlencode($item['guest_name']) }}"
                   alt="avatar" width="40" height="40">
            </div>
          @empty
            <div class="list-group-item text-muted">No reservations today.</div>
          @endforelse
        </div>

        <div class="card-footer bg-white border-0">
          <a href="{{ route('admin.bookings.index') }}" class="btn btn-outline-secondary btn-sm">
            View all reservations
          </a>
        </div>
      </div>
    </div>

    {{-- CALENDAR snapshot --}}
    <div class="col-xl-6">
      <div class="card card-k h-100">
        <div class="card-header bg-white border-0 pb-0 d-flex justify-content-between align-items-center">
          <h5 class="mb-0">Calendar</h5>
          <a href="{{ route('admin.bookings.index') }}" class="btn btn-outline-secondary btn-sm">Open Calendar</a>
        </div>
        <div class="card-body">
          {{-- Small month grid preview --}}
          <div class="row row-cols-7 g-2 small text-center">
            @foreach(($calendar ?? []) as $day)
              <div class="col">
                <div class="p-2 rounded border bg-light-subtle">
                  <div class="fw-semibold">{{ $day['day'] }}</div>
                  @if(isset($day['price']))
                    <div class="text-muted">${{ $day['price'] }}</div>
                  @endif
                  @if(!empty($day['occupied']))
                    <div class="badge bg-secondary-subtle text-secondary-emphasis mt-1">●</div>
                  @endif
                </div>
              </div>
            @endforeach
          </div>

          @if(isset($stats['occupancy']) || isset($stats['revenue']))
            <div class="mt-3 d-flex gap-3 flex-wrap">
              @isset($stats['occupancy'])
                <div class="pill">
                  Occupancy (30d): <strong>{{ $stats['occupancy'] }}%</strong>
                </div>
              @endisset
              @isset($stats['revenue'])
                <div class="pill">
                  Revenue (MTD): <strong>${{ number_format($stats['revenue']) }}</strong>
                </div>
              @endisset
            </div>
          @endif
        </div>
      </div>
    </div>

    {{-- LISTINGS preview --}}
    <div class="col-xl-6">
      <div class="card card-k h-100">
        <div class="card-header bg-white border-0 pb-0 d-flex justify-content-between align-items-center">
          <h5 class="mb-0">Your listings</h5>
          <a href="{{ route('properties.index') }}" class="btn btn-outline-secondary btn-sm">Manage</a>
        </div>
        <ul class="list-group list-group-flush">
          @forelse(($listings ?? []) as $p)
            <li class="list-group-item d-flex align-items-center">
              <img src="{{ $p['thumb'] ?? 'https://picsum.photos/seed/'.$p['id'].'/80/80' }}"
                   class="rounded me-3 object-fit-cover" width="56" height="56" alt="thumb">
              <div class="flex-grow-1">
                <div class="fw-semibold">{{ $p['title'] }}</div>
                <div class="text-muted small">{{ $p['location'] }}</div>
              </div>
              <span class="badge {{ $p['status'] === 'Listed' ? 'bg-success-subtle text-success-emphasis' : 'bg-secondary-subtle text-secondary-emphasis' }}">
                {{ $p['status'] }}
              </span>
            </li>
          @empty
            <li class="list-group-item text-muted">No listings yet.</li>
          @endforelse
        </ul>
        <div class="card-footer bg-white border-0">
          <a href="{{ route('properties.create') }}" class="btn btn-primary btn-sm">
            <i class="bi bi-plus-lg me-1"></i>Add listing
          </a>
        </div>
      </div>
    </div>

    {{-- MESSAGES preview --}}
    <div class="col-xl-6">
      <div class="card card-k h-100">
        <div class="card-header bg-white border-0 pb-0 d-flex justify-content-between align-items-center">
          <h5 class="mb-0">Messages</h5>
          <a href="{{ route('admin.bookings.index') }}?tab=messages" class="btn btn-outline-secondary btn-sm">Open inbox</a>
        </div>
        <ul class="list-group list-group-flush">
          @forelse(($messages ?? []) as $m)
            {{-- $m: { guest, snippet, property, time, avatar_url } --}}
            <li class="list-group-item d-flex align-items-start">
              <img class="rounded-circle object-fit-cover me-3" width="40" height="40"
                   src="{{ $m['avatar_url'] ?? 'https://ui-avatars.com/api/?name='.urlencode($m['guest']) }}" alt="guest">
              <div class="flex-grow-1">
                <div class="d-flex justify-content-between">
                  <div class="fw-semibold">{{ $m['guest'] }}</div>
                  <div class="text-muted small">{{ $m['time'] }}</div>
                </div>
                <div class="text-muted small">{{ $m['property'] }}</div>
                <div class="mt-1">{{ Str::limit($m['snippet'], 100) }}</div>
              </div>
            </li>
          @empty
            <li class="list-group-item text-muted">No recent messages.</li>
          @endforelse
        </ul>
      </div>
    </div>
  </div>

  {{-- QUICK MANAGEMENT (your existing buttons, made compact) --}}
  <div class="card card-k mt-4">
    <div class="card-body">
      <div class="row g-3">
        <div class="col-6 col-md">
          <a href="{{ route('properties.index') }}" class="btn btn-light w-100 py-3">
            <i class="bi bi-building me-1"></i> Manage Properties
          </a>
        </div>
        <div class="col-6 col-md">
          <a href="{{ route('blogs.index') }}" class="btn btn-light w-100 py-3">
            <i class="bi bi-journal-text me-1"></i> Manage Blogs
          </a>
        </div>
        <div class="col-6 col-md">
          <a href="{{ route('rent-applications.index') }}" class="btn btn-light w-100 py-3">
            <i class="bi bi-person-badge me-1"></i> Rental Requests
          </a>
        </div>
        <div class="col-6 col-md">
          <a href="{{ route('admin.bookings.index') }}" class="btn btn-light w-100 py-3">
            <i class="bi bi-calendar-check me-1"></i> Manage Bookings
          </a>
        </div>
        <div class="col-6 col-md">
          <a href="{{ route('users.index') }}" class="btn btn-light w-100 py-3">
            <i class="bi bi-people me-1"></i> Manage Users
          </a>
        </div>
      </div>
    </div>
  </div>

</div>
@endsection
