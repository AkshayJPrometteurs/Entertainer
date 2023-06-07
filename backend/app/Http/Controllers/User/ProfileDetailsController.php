<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\PlanDetailsRequest;
use App\Models\User;
use App\Models\User\PlanDetails;
use Illuminate\Http\Request;

class ProfileDetailsController extends Controller
{
    public function get_user_details_with_plans($user_id){
        $user_data = User::where('id', $user_id)->first();
        $plan_details = PlanDetails::where('user_id', $user_id)->first();
        return response()->json([
            'status' => 200,
            'user_data' => $user_data,
            'plan_details' => $plan_details,
        ]);
    }
    public function profile_update(Request $request){
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,'.$request->user_id.'',
            'mobile' => 'required|unique:users,mobile,'.$request->user_id.'',
            'gender' => 'required',
            'dob' => 'required',
        ]);
        // $user = User::find($request->user_id);
        // $imageName = $user->profile_image;
        // if($request->hasFile('profile_image')){
        //     $imageName = 'ProfileImage_'.rand('111111','999999').'.'.$request->file('profile_image')->getClientOriginalExtension();
        //     $request->file('profile_image')->move('assets/images/ProfileImages/',$imageName);
        // }
        // $user->update([
        //     'name' => $request->name,
        //     'email' => $request->email,
        //     'gender' => $request->gender,
        //     'mobile' => $request->mobile,
        //     'dob' => $request->dob,
        //     'profile_image' => $imageName,
        // ]);
        // return response()->json([
        //     'status' => 200,
        //     'msg' => 'Profile Updated Successfully',
        // ]);
    }

    public function plan_store(PlanDetailsRequest $request, $user_id){
        $request->validated();
        PlanDetails::where('user_id', $user_id)->update([
            'user_id' => $user_id,
            'plan_name' => $request->plan_name,
            'plan_validity' => $request->plan_validity,
            'plan_expired_on' => $request->plan_expired_on,
        ]);
        return response()->json([
            'status' => 200,
            'msg' => ucfirst($request->plan_name).' Plan Successfully Purchased'
        ]);
    }
}
