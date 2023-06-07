<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Admin\Category;
use App\Models\Admin\SubCategory;
use App\Models\Admin\TVChannels;
use App\Models\Admin\TVShows;
use App\Models\Admin\VideoLanguages;
use App\Models\Admin\Videos;
use App\Models\User\Watchlist;

class UserController extends Controller
{
    public function user_contentwise_video_list($category, $subCategorySlug){
        if($category == 'tv-shows' || $category == 'web-series'){
            $videos = Videos::join('sub_categories','sub_categories.id','=','subcategory')
            ->join('categories','categories.id','sub_categories.category')
            ->join('t_v_shows','t_v_shows.tv_shows_slug','videos.tv_shows')
            ->select('videos.*','sub_categories.sub_category_name','sub_categories.sub_category_slug','t_v_shows.tv_shows_slug','t_v_shows.tv_shows_image')
            ->where('categories.category_slug', $category)
            ->where('sub_categories.sub_category_slug',$subCategorySlug)
            ->where('videos.status', 'active')
            ->groupBy('tv_shows')
            ->get();
            $trendingVideos = Videos::join('sub_categories','sub_categories.id','=','subcategory')
            ->join('categories','categories.id','sub_categories.category')
            ->join('t_v_shows','t_v_shows.tv_shows_slug','videos.tv_shows')
            ->select('videos.*','sub_categories.sub_category_name','sub_categories.sub_category_slug','t_v_shows.tv_shows_slug','t_v_shows.tv_shows_image')
            ->where('categories.category_slug', $category)
            ->where('videos.p_t_status', 'trending')
            ->where('videos.status', 'active')
            ->groupBy('tv_shows')
            ->get();
        }else{
            $videos = Videos::join('sub_categories','sub_categories.id','=','subcategory')
            ->join('categories','categories.id','sub_categories.category')
            ->select('videos.*','sub_categories.sub_category_name','sub_categories.sub_category_slug')
            ->where('categories.category_slug', $category)
            ->where('sub_categories.sub_category_slug',$subCategorySlug)
            ->where('videos.status', 'active')
            ->get();
            $trendingVideos = Videos::join('sub_categories','sub_categories.id','=','subcategory')
            ->join('categories','categories.id','sub_categories.category')
            ->select('videos.*','sub_categories.sub_category_name','sub_categories.sub_category_slug')
            ->where('categories.category_slug', $category)
            ->where('videos.p_t_status', 'trending')
            ->where('videos.status', 'active')
            ->get();
        }
        $relatedSubCategories = SubCategory::join('categories','categories.id','category')
        ->where('categories.category_slug', $category)
        ->where('sub_categories.sub_category_slug', '!=', $subCategorySlug)
        ->get();
        $videoLanguages = VideoLanguages::all();
        $tvChannels = TVChannels::all();
        $forTitle = SubCategory::join('categories','categories.id','category')
        ->where('categories.category_slug', $category)
        ->where('sub_categories.sub_category_slug', $subCategorySlug)
        ->first();
        $response = [
            'videos' => $videos,
            'relatedSubCategories' => $relatedSubCategories,
            'trendingVideos' => $trendingVideos,
            'videoLanguages' => $videoLanguages,
            'tvChannels' => $tvChannels,
            'forTitle' => $forTitle
        ];
        return response()->json([
            'status' => 200,
            'data' => $response,
        ]);
    }

    public function user_related_videos($slug, $contentSlug){
        $videos = Videos::join('sub_categories','sub_categories.id','=','subcategory')
        ->select('videos.*','sub_categories.sub_category_name','sub_categories.sub_category_slug')
        ->where('videos.video_slug' ,'!=', $contentSlug)
        ->where('sub_categories.sub_category_slug', $slug)
        ->where('videos.status', 'active')
        ->inRandomOrder()
        ->get();
        return response()->json([
            'status' => 200,
            'data' => $videos,
        ]);
    }

    public function user_tv_shows_details($category){
        $categories = SubCategory::join('categories','categories.id','=','category')
        ->select('sub_categories.*','categories.category_slug')
        ->where('categories.category_slug',$category)
        ->get();
        $tvShows = TVShows::where('tv_shows_slug','!=','others')->where('status','active')->get();
        $tvChannels = TVChannels::where('status','active')->get();
        return response()->json([
            'status' => 200,
            'categories' => $categories,
            'tvShows' => $tvShows,
            'tvChannels' => $tvChannels,
        ]);
    }

    public function user_sports_details($category){
        $categories = SubCategory::join('categories','categories.id','=','category')
        ->select('sub_categories.*','categories.category_slug')
        ->where('categories.category_slug',$category)
        ->get();
        $recentlyAddedSports = Videos::join('categories','categories.id','=','category')
        ->where('categories.category_slug', $category)
        ->where('videos.status', 'active')
        ->orderBy('videos.created_at', 'desc')
        ->limit(6)
        ->get();
        return response()->json([
            'status' => 200,
            'categories' => $categories,
            'recentlyAddedSports' => $recentlyAddedSports,
        ]);
    }

    public function user_web_series_details($category){
        $categories = SubCategory::join('categories','categories.id','=','category')
        ->select('sub_categories.*','categories.category_slug')
        ->where('categories.category_slug',$category)
        ->get();
        $webSeries = Videos::join('categories','categories.id','=','category')
        ->where('categories.category_slug', $category)
        ->where('videos.status', 'active')
        ->get();
        return response()->json([
            'status' => 200,
            'categories' => $categories,
            'webSeries' => $webSeries,
        ]);
    }

    public function user_movies_details($category){
        $categories = SubCategory::join('categories','categories.id','=','category')
        ->select('sub_categories.*','categories.category_slug')
        ->where('categories.category_slug',$category)
        ->get();
        $recentlyAddedMovies = Videos::join('sub_categories','sub_categories.id','=','subcategory')
        ->join('categories','categories.id','sub_categories.category')
        ->select('videos.*','sub_categories.sub_category_name','sub_categories.sub_category_slug')
        ->where('categories.category_slug', $category)
        ->where('videos.status', 'active')
        ->orderBy('videos.created_at','desc')
        ->limit(6)
        ->get();
        $popularMovies = Videos::join('sub_categories','sub_categories.id','=','subcategory')
        ->join('categories','categories.id','sub_categories.category')
        ->select('videos.*','sub_categories.sub_category_name','sub_categories.sub_category_slug')
        ->where('categories.category_slug', $category)
        ->where('videos.p_t_status', 'popular')
        ->where('videos.status', 'active')
        ->orderBy('videos.created_at','desc')
        ->limit(6)
        ->get();
        $trendingMovies = Videos::join('sub_categories','sub_categories.id','=','subcategory')
        ->join('categories','categories.id','sub_categories.category')
        ->select('videos.*','sub_categories.sub_category_name','sub_categories.sub_category_slug')
        ->where('categories.category_slug', $category)
        ->where('videos.p_t_status', 'trending')
        ->where('videos.status', 'active')
        ->orderBy('videos.created_at','desc')
        ->limit(6)
        ->get();
        return response()->json([
            'status' => 200,
            'categories' => $categories,
            'recentlyAddedMovies' => $recentlyAddedMovies,
            'popularMovies' => $popularMovies,
            'trendingMovies' => $trendingMovies,
        ]);
    }

    public function user_watchlist($user_id, $video_id){
        $check_watchlist = Watchlist::where(['user_id'=>$user_id, 'video_id'=>$video_id])->first();
        if($check_watchlist){
            $check_watchlist->delete();
            return response()->json([
                'status' => 200,
                'msg' => 'Removed From Watchlist'
            ]);
        }else{
            Watchlist::create([
                'user_id' => $user_id,
                'video_id' => $video_id,
            ]);
            return response()->json([
                'status' => 200,
                'msg' => 'Added To Watchlist'
            ]);
        }
    }

    public function single_video_details($category, $subCategorySlug, $contentSlug, $user_id){
        $videos = Videos::join('sub_categories','sub_categories.id','=','videos.subcategory')
        ->join('categories','categories.id','=','videos.category')
        ->select('videos.*','categories.category_name','sub_categories.sub_category_slug','sub_categories.sub_category_name')
        ->where(['sub_categories.sub_category_slug' => $subCategorySlug, 'video_slug' => $contentSlug])
        ->first();
        $watchlist = Watchlist::where(['user_id' => $user_id, 'video_id' => $videos->id])->first();
        $relatedVideos = Videos::join('sub_categories','sub_categories.id','=','subcategory')
        ->join('categories','categories.id','=','videos.category')
        ->select('videos.*','sub_categories.sub_category_name','sub_categories.sub_category_slug','categories.category_slug')
        ->where('videos.video_slug' ,'!=', $contentSlug)
        ->where('categories.category_slug', $category)
        ->where('videos.status', 'active')
        ->inRandomOrder()
        ->get();
        $response = [
            'videos' => $videos,
            'watchlist' => $watchlist,
            'relatedVideos' => $relatedVideos,
        ];
        return response()->json([
            'status' => 200,
            'data' => $response
        ]);
    }

    public function get_language_category_video_lists($category, $language){
        if($category == 'tv-shows'){
            $videos = Videos::join('t_v_shows','t_v_shows.tv_shows_slug','tv_shows')
            ->join('categories','categories.id','videos.category')
            ->select('videos.tv_shows','t_v_shows.tv_shows_image')
            ->where('language', $language)
            ->where('categories.category_slug', $category)
            ->groupBy('tv_shows')
            ->get();
        }else{
            $videos = Videos::join('categories','categories.id', 'videos.category')
            ->join('sub_categories','sub_categories.id','videos.subcategory')
            ->where('videos.language', $language)
            ->where('categories.category_slug', $category)
            ->get();
        }
        $forTitle = Category::where('category_slug', $category)->first();
        $videoLanguages = VideoLanguages::where('status','active')->get();
        return response()->json([
            'status' => 200,
            'videos' => $videos,
            'videoLanguages' => $videoLanguages,
            'forTitle' => $forTitle,
        ]);
    }

    public function get_tv_channel_video_lists($category, $tvChannel){
        $videos = Videos::join('t_v_shows','t_v_shows.tv_shows_slug','tv_shows')
        ->select('videos.tv_shows','t_v_shows.tv_shows_image')
        ->where('tv_channel', $tvChannel)
        ->groupBy('tv_shows')
        ->get();
        $tvChannels = TVChannels::where('status','active')->get();
        return response()->json([
            'status' => 200,
            'videos' => $videos,
            'tvChannels' => $tvChannels,
        ]);
    }

    public function get_tv_shows_video_lists($category, $tvShows){
        $videos = Videos::join('sub_categories','sub_categories.id','=','subcategory')
        ->join('categories','categories.id','sub_categories.category')
        ->select('videos.*','sub_categories.sub_category_name','sub_categories.sub_category_slug')
        ->where([
            'categories.category_slug' => $category,
            'videos.status' => 'active',
            'videos.tv_shows' => $tvShows,
            'videos.seasons' => 1
        ])->get();
        $seasons = Videos::join('sub_categories','sub_categories.id','=','subcategory')
        ->join('categories','categories.id','sub_categories.category')
        ->select('videos.seasons')
        ->where([
            'categories.category_slug' => $category,
            'videos.status' => 'active',
            'videos.tv_shows' => $tvShows,
        ])->groupBy('seasons')
        ->get();
        $forTitle = Videos::join('categories','categories.id','videos.category')
        ->join('t_v_shows','t_v_shows.tv_shows_slug','videos.tv_shows')
        ->select('categories.category_name','t_v_shows.tv_shows_name')
        ->where(['categories.category_slug' => $category, 't_v_shows.tv_shows_slug' => $tvShows])
        ->first();
        $tvShows = TVShows::where('tv_shows_slug','!=','others')->where('status','active')->get();
        $tvChannels = TVChannels::where('status','active')->get();
        return response()->json([
            'status' => 200,
            'videos' => $videos,
            'tvChannels' => $tvChannels,
            'tvShows' => $tvShows,
            'seasons' => $seasons,
            'forTitle' => $forTitle,
        ]);
    }

    public function get_season_tv_shows($category, $tvShows, $season){
        $videos = Videos::join('sub_categories','sub_categories.id','=','subcategory')
        ->join('categories','categories.id','sub_categories.category')
        ->select('videos.*','sub_categories.sub_category_name','sub_categories.sub_category_slug')
        ->where([
            'categories.category_slug' => $category,
            'videos.status' => 'active',
            'videos.tv_shows' => $tvShows,
            'videos.seasons' => $season
        ])->get();
        $seasons = Videos::join('sub_categories','sub_categories.id','=','subcategory')
        ->join('categories','categories.id','sub_categories.category')
        ->select('videos.seasons')
        ->where([
            'categories.category_slug' => $category,
            'videos.status' => 'active',
            'videos.tv_shows' => $tvShows,
        ])->groupBy('seasons')->get();
        $forTitle = Videos::join('categories','categories.id','videos.category')
        ->join('t_v_shows','t_v_shows.tv_shows_slug','videos.tv_shows')
        ->select('categories.category_name','t_v_shows.tv_shows_name')
        ->where(['categories.category_slug' => $category, 't_v_shows.tv_shows_slug' => $tvShows])
        ->first();
        $tvShows = TVShows::where('tv_shows_slug','!=','others')->where('status','active')->get();
        $tvChannels = TVChannels::where('status','active')->get();
        return response()->json([
            'status' => 200,
            'videos' => $videos,
            'tvChannels' => $tvChannels,
            'tvShows' => $tvShows,
            'seasons' => $seasons,
            'forTitle' => $forTitle,
        ]);
    }
}
