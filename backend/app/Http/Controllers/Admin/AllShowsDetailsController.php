<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AllShowsDetailsRequest;
use App\Models\Admin\AllShowsDetails;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class AllShowsDetailsController extends Controller
{
    public function shows_list(){
        $shows = AllShowsDetails::where('status','active')->get();
        return response()->json([
            'status' => 200,
            'shows' => $shows
        ]);
    }

    public function shows_store(AllShowsDetailsRequest $request){
        $request->validated();
        $showsImage = null;
        if($request->hasFile('shows_image')){
            $showsImage = 'Shows_Image_'.rand('111111','999999').'.'.$request->file('shows_image')->getClientOriginalExtension();
            $request->file('shows_image')->move('assets/images/AllShows/', $showsImage);
        }
        AllShowsDetails::create([
            'shows_type' => $request->shows_type,
            'shows_name' => $request->shows_name,
            'shows_slug' => Str::slug($request->shows_name),
            'shows_image' => $showsImage,
            'status' => $request->status,
        ]);

        return response()->json([
            'status' => 200,
            'msg' => 'Show Added Successfully'
        ]);
    }
}
