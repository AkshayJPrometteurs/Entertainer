<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\TVChannelsRequest;
use App\Models\Admin\TVChannels;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TVChannelsController extends Controller
{
    public function tv_channels_list(){
        $tv_channel = TVChannels::get();
        return response()->json([
            'status' => 200,
            'tv_channel' => $tv_channel
        ]);
    }

    public function tv_channels_store(TVChannelsRequest $request){
        $request->validated();
        $tv_channel = new TVChannels();
        $tv_channel->tv_channel_name = $request->tv_channel_name;
        $tv_channel->tv_channel_slug = Str::slug($request->tv_channel_name);
        if($request->hasFile('tv_channel_image')){
            $tvChannelImage = 'TV_Channel_'.rand('111111','999999').'.'.$request->file('tv_channel_image')->getClientOriginalExtension();
            $request->file('tv_channel_image')->move('assets/images/TVChannels/', $tvChannelImage);
            $tv_channel->tv_channel_image = $tvChannelImage;
        }
        $tv_channel->status = $request->status;
        $tv_channel->save();

        return response()->json([
            'status' => 200,
            'msg' => 'TV Channel Added Successfully'
        ]);
    }
}
