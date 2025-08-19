<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Owner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    public function register(Request $r) {
        $data = $r->validate([
            'name'=>'required|string|max:255',
            'email'=>['required','email','max:255', Rule::unique('users','email')],
            'password'=>'required|string|min:8',
            'role'=>['nullable', Rule::in(['user','owner'])], // admin is manual via DB
            'phone'=>'nullable|string|max:32'
        ]);

        $user = User::create([
            'name'=>$data['name'],
            'email'=>$data['email'],
            'password'=>Hash::make($data['password']),
            'role'=>$data['role'] ?? 'user',
            'phone'=>$data['phone'] ?? null,
        ]);

        if (($data['role'] ?? null) === 'owner') {
            Owner::create(['user_id'=>$user->id]);
        }

        $token = $user->createToken('auth')->plainTextToken;
        return response()->json(['token'=>$token,'user'=>$user]);
    }

    public function login(Request $r) {
        $data = $r->validate(['email'=>'required|email','password'=>'required']);
        $user = User::where('email',$data['email'])->first();
        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json(['message'=>'Invalid credentials'], 422);
        }
        $token = $user->createToken('auth')->plainTextToken;
        return response()->json(['token'=>$token,'user'=>$user]);
    }

    public function logout(Request $r) {
        $r->user()->currentAccessToken()->delete();
        return response()->json(['ok'=>true]);
    }

    public function me(Request $r) {
        return $r->user();
    }
}