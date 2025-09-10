<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Blog;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blogs = Blog::latest()->paginate(10);
        return view('blogs.index', compact('blogs'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('blogs.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'date' => 'required|date',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'body' => 'required|string',
        ]);

        $path = $request->file('image')?->store('blogs', 'public');

        Blog::create([
            'title' => $request->title,
            'date' => $request->date,
            'image' => $path,
            'body' => $request->body,
        ]);

        return redirect()->route('blogs.index')->with('success', 'Blog created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Blog $blog)
    {
         return view('blogs.edit', compact('blog'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Blog $blog)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'date' => 'required|date',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'body' => 'required|string',
        ]);

        $path = $blog->image;
        if ($request->hasFile('image')) {
            if ($path) Storage::disk('public')->delete($path);
            $path = $request->file('image')->store('blogs', 'public');
        }

        $blog->update([
            'title' => $request->title,
            'date' => $request->date,
            'image' => $path,
            'body' => $request->body,
        ]);

        return redirect()->route('blogs.index')->with('success', 'Blog updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        if ($blog->image) {
            Storage::disk('public')->delete($blog->image);
        }
        $blog->delete();

        return redirect()->route('blogs.index')->with('success', 'Blog deleted successfully!');
    }

    public function apiIndex()
    {
        $blogs = Blog::latest()->get();

        // Transform response so frontend gets excerpt + full image URL
        $blogs = $blogs->map(function ($blog) {
            return [
                'id' => $blog->id,
                'title' => $blog->title,
                'date' => $blog->date,
                'excerpt' => \Str::limit(strip_tags($blog->body), 120), // short preview
                'image' => $blog->image ? asset('storage/' . $blog->image) : null,
                'body' => $blog->body,
            ];
        });

        return response()->json($blogs);
    }

    public function apiShow($id)
    {
        $blog = Blog::findOrFail($id);

        return response()->json([
            'id' => $blog->id,
            'title' => $blog->title,
            'date' => $blog->date,
            'image' => $blog->image ? asset('storage/' . $blog->image) : null,
            'body' => $blog->body,
        ]);
    }


}
