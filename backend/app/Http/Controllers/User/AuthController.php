<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\SignInRequest;
use App\Http\Requests\User\SignUpRequest;
use App\Mail\OTPVerification;
use App\Mail\RegistrationMail;
use App\Models\User;
use App\Models\User\PlanDetails;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function signup(SignUpRequest $request){
        $request->validated();
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'mobile' => $request->mobile,
            'password' => Hash::make($request->password),
            'access_type' => 'user',
        ]);
        PlanDetails::create([
            'user_id' => $user->id,
            'plan_name' => $request->plan_name,
            'plan_validity' => $request->plan_validity,
            'plan_expired_on' => $request->plan_expired_on,
        ]);
        $token = $user->createToken('signup')->plainTextToken;
        $mail_data = [
            'name' => $request->name,
            'email' => $request->email,
        ];
        Mail::to('akshay.j@prometteur.in')->send(new RegistrationMail($mail_data));
        return response()->json([
            'status' => 200,
            'message' => 'Signup Successfully',
            'token' => $token
        ]);
    }

    public function signin(SignInRequest $request){
        $request->validated();
        $user = User::where('mobile',$request->mobile)->where('access_type','!=','admin')->first();
        if($user){
            $otp = rand('1111111','9999999');
            $user->update(['otp_verification' => $otp]);
            $mail_data = [
                'name' => $user->name,
                'email' => $user->email,
                'otp' => $otp
            ];
            Mail::to('akshay.j@prometteur.in')->send(new OTPVerification($mail_data));
            return response()->json([
                'status' => 200,
                'message' => 'OTP Send Successfully',
                'otp' => $otp,
                'mobile' => $request->mobile
            ]);
        }else{
            throw ValidationException::withMessages(['mobile' => ['The provided mobile number not registered.']]);
        }
    }

    public function otp_verification(Request $request){
        $request->validate(['otp' => 'required']);
        $user = User::where('mobile', $request->mobile)->where('access_type','!=','admin')->first();
        if($request->otp == $user->otp_verification){
            $token = $user->createToken('signin')->plainTextToken;
            $user->update([
                'otp_verification' => null
            ]);
            return response()->json([
                'status' => 200,
                'message' => 'Sign In Successfully',
                'token' => $token
            ]);
        }else{
            throw ValidationException::withMessages(['otp' => ['Invalid OTP']]);
        }
    }

    public function signout(Request $request){
        $user = User::find($request->user_id);
        $user->tokens->each(function($token, $key) {
            $token->delete();
        });

        return response()->json([
            'status' => 200,
            'msg' => 'Signout Successfully',
        ]);
    }
}
