<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\VideoRequest;
use App\Models\Admin\Category;
use App\Models\Admin\TVChannels;
use App\Models\Admin\TVShows;
use App\Models\Admin\VideoLanguages;
use App\Models\Admin\Videos;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class VideosController extends Controller
{
    public function videos_list(){
        $videos = Videos::join('categories', 'categories.id', '=', 'category')
        ->select('videos.*','categories.category_name')
        ->get();
        return response()->json([
            'status' => 200,
            'data' => $videos
        ]);
    }

    public function video_store(Request $request){
        // if($request->category == 1 || $request->category == 2){
        //     $request->validate(
        //         [
        //             'category' => 'required',
        //             'subcategory' => 'required',
        //             'video_title' => 'required|unique:videos,video_title',
        //             'poster' => 'required',
        //             'duration' => 'required',
        //             'released_year' => 'required',
        //             'star_casts' => 'required',
        //             'director' => 'required',
        //             'tv_channel' => 'required',
        //             'tv_shows' => 'required',
        //             'language' => 'required',
        //             'captions' => 'required',
        //             'status' => 'required',
        //             'description' => 'required',
        //         ],
        //         [ 'video_title.required' => '', ]
        //     );
        // }else{
        //     $request->validate(
        //         [
        //             'category' => 'required',
        //             'subcategory' => 'required',
        //             'video_title' => 'required|unique:videos,video_title',
        //             'poster' => 'required',
        //             'duration' => 'required',
        //             'language' => 'required',
        //             'captions' => 'required',
        //             'status' => 'required',
        //             'description' => 'required',
        //         ],
        //         [ 'video_title.required' => '', ]
        //     );
        // }
        $poster = rand('11111111111','99999999999').'.'.$request->file('poster')->getClientOriginalExtension();
        $request->file('poster')->move('assets/images/posters/',$poster);
        if($request->hasFile('upload_video')){
            $video_name = rand('1111111111','9999999999').".".$request->file('upload_video')->getClientOriginalExtension();
            $request->file('upload_video')->move('assets/videos/',$video_name);
            Videos::create([
                'category' => $request->category,
                'subcategory' => $request->subcategory,
                'video_title' => $request->video_title,
                'video_slug' => Str::slug($request->video_title),
                'poster' => $poster,
                'duration' => $request->duration,
                'released_year' => $request->released_year,
                'star_casts' => $request->star_casts,
                'director' => $request->director,
                'tv_channel' => $request->tv_channel,
                'seasons' => $request->seasons,
                'tv_shows' => $request->tv_shows,
                'language' => $request->language,
                'captions' => $request->captions,
                'status' => $request->status,
                'upload_video' => $video_name,
                'upload_video_url' => $request->upload_video_url,
                'description' => $request->description,
            ]);
        }else{
            Videos::create([
                'category' => $request->category,
                'subcategory' => $request->subcategory,
                'video_title' => $request->video_title,
                'video_slug' => Str::slug($request->video_title),
                'poster' => $poster,
                'duration' => $request->duration,
                'released_year' => $request->released_year,
                'star_casts' => $request->star_casts,
                'director' => $request->director,
                'tv_channel' => $request->tv_channel,
                'seasons' => $request->seasons,
                'tv_shows' => $request->tv_shows,
                'language' => $request->language,
                'captions' => $request->captions,
                'status' => $request->status,
                'upload_video' => null,
                'upload_video_url' => $request->upload_video_url,
                'description' => $request->description,
            ]);
        }

        return response()->json([
            'status' => 200,
            'msg' => 'Video Added Successfully'
        ]);
    }

    public function get_video_content_list(){
        $category = Category::get();
        $languages = VideoLanguages::get();
        $tv_channels = TVChannels::get();
        $tv_shows = TVShows::get();
        $response = [
            'category' => $category,
            'languages' => $languages,
            'tv_channels' => $tv_channels,
            'tv_shows' => $tv_shows,
        ];
        return response()->json([
            'status' => 200,
            'data' => $response
        ]);
    }
}
