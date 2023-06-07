<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\VideoLanguagesRequest;
use App\Models\Admin\VideoLanguages;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class VideoLanguagesController extends Controller
{
    public function languages_list(){
        $languages = VideoLanguages::get();
        return response()->json([
            'status' => 200,
            'languages' => $languages
        ]);
    }

    public function languages_store(VideoLanguagesRequest $request){
        $request->validated();
        $languages = new VideoLanguages();
        $languages->languages_name = $request->languages_name;
        $languages->languages_slug = Str::slug($request->languages_name);
        $languages->status = $request->status;
        $languages->save();

        return response()->json([
            'status' => 200,
            'msg' => 'Languages Added Successfully'
        ]);
    }
}
