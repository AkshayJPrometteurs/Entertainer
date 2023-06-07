<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AdminAuthController extends Controller
{
    public function login(Request $request){
        $request->validate(['email' => 'required', 'password' => 'required']);
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password, 'access_type' => 'admin'])){
            $admin = User::where('email', $request->email)->first();
            $token = $admin->createToken('admin-login')->plainTextToken;
            return response()->json([
                'status' => 200,
                'msg' => 'Admin Login Successfully',
                'adminToken' => $token
            ]);
        }
        throw ValidationException::withMessages(['credentials_error' => 'Invalid Credentials']);
    }

    public function logout(Request $request){
        $admin = User::find($request->admin_id);
        $admin->tokens->each(function($token, $key) {
            $token->delete();
        });

        return response()->json([
            'status' => 200,
            'msg' => 'Admin Logout Successfully',
        ]);
    }
}
