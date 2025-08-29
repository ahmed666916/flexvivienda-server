@extends('layouts.app')

@section('content')
<div class="container py-4">
    <h2>Edit Blog</h2>

    @if($errors->any())
        <div class="alert alert-danger">
            <ul class="mb-0">
                @foreach($errors->all() as $e)
                    <li>{{ $e }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form method="POST" action="{{ route('blogs.update', $blog->id) }}" enctype="multipart/form-data">
        @csrf
        @method('PUT')

        <div class="mb-3">
            <label class="form-label">Title</label>
            <input type="text" name="title" class="form-control" value="{{ old('title', $blog->title) }}" required>
        </div>

        <div class="mb-3">
            <label class="form-label">Date</label>
            <input type="date" name="date" class="form-control" value="{{ old('date', $blog->date) }}" required>
        </div>

        <div class="mb-3">
            <label class="form-label">Image</label>
            @if($blog->image)
                <div class="mb-2">
                    <img src="{{ Storage::url($blog->image) }}" width="100">
                </div>
            @endif
            <input type="file" name="image" class="form-control">
        </div>

        <div class="mb-3">
            <label class="form-label">Blog Body</label>
            <textarea name="body" class="form-control" rows="6" required>{{ old('body', $blog->body) }}</textarea>
        </div>

        <button type="submit" class="btn btn-warning">Update Blog</button>
    </form>
</div>
@endsection
