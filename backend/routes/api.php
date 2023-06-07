<?php

use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Admin\AllShowsDetailsController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\SubCategoryController;
use App\Http\Controllers\Admin\TVChannelsController;
use App\Http\Controllers\Admin\VideoLanguagesController;
use App\Http\Controllers\Admin\VideosController;
use App\Http\Controllers\User\AuthController;
use App\Http\Controllers\User\ProfileDetailsController;
use App\Http\Controllers\User\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function(){
    Route::controller(AuthController::class)->group(function(){
        Route::post('signout', 'signout');
    });

    Route::controller(ProfileDetailsController::class)->group(function(){
        Route::get('get_user_details_with_plans/{user_id}', 'get_user_details_with_plans');
        Route::post('profile_update', 'profile_update');
        Route::post('plan_store/{user_id}', 'plan_store');
    });

    Route::post('/admin/logout',[AdminAuthController::class, 'logout']);

    Route::controller(CategoryController::class)->group(function(){
        Route::get('/admin/category_list','category_list');
        Route::post('/admin/category_store','category_store');
    });

    Route::controller(SubCategoryController::class)->group(function(){
        Route::post('/admin/sub_category_store','sub_category_store');
        Route::get('/admin/sub_category_list','sub_category_list');
        Route::get('/admin/categorywise_sub_category_list/{category}','categorywise_sub_category_list');
    });

    Route::controller(VideosController::class)->group(function(){
        Route::post('/admin/video_store','video_store');
        Route::get('/admin/videos_list','videos_list');
        Route::get('/admin/user_video_list','user_video_list');
        Route::get('/admin/get_video_content_list','get_video_content_list');
    });

    Route::controller(VideoLanguagesController::class)->group(function (){
        Route::get('/admin/languages_list', 'languages_list');
        Route::post('/admin/languages_store','languages_store');
    });

    Route::controller(TVChannelsController::class)->group(function (){
        Route::get('/admin/tv_channels_list', 'tv_channels_list');
        Route::post('/admin/tv_channels_store','tv_channels_store');
    });

    Route::controller(AllShowsDetailsController::class)->group(function (){
        Route::get('/admin/shows_list', 'shows_list');
        Route::post('/admin/shows_store','shows_store');
    });
});

Route::controller(UserController::class)->group(function(){
    Route::get('/user_contentwise_video_list/{category}/{subCategorySlug}','user_contentwise_video_list');
    Route::get('/user_related_videos/{slug}/{contentSlug}','user_related_videos');

    Route::get('/user_tv_shows_details/{category}','user_tv_shows_details');
    Route::get('/user_movies_details/{category}','user_movies_details');
    Route::get('/user_sports_details/{category}','user_sports_details');
    Route::get('/user_web_series_details/{category}','user_web_series_details');

    Route::post('/user_watchlist/{user_id}/{video_id}','user_watchlist');
    Route::get('/single_video_details/{category}/{subCategorySlug}/{contentSlug}/{user_id}','single_video_details');
    Route::get('/get_language_category_video_lists/{category}/{language}','get_language_category_video_lists');
    Route::get('/get_tv_channel_video_lists/{category}/{tvChannel}','get_tv_channel_video_lists');
    Route::get('/get_tv_shows_video_lists/{category}/{tvShow}','get_tv_shows_video_lists');
    Route::get('/get_season_tv_shows/{category}/{tvShow}/{season}','get_season_tv_shows');
});

Route::controller(AuthController::class)->group(function(){
    Route::post('/user/signup', 'signup');
    Route::post('/user/signin', 'signin');
    Route::post('/user/otp_verification', 'otp_verification');
});

Route::post('/admin/login',[AdminAuthController::class, 'login']);
