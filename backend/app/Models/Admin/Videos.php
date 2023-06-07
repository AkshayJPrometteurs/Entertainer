<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Videos extends Model
{
    use HasFactory;
    public $fillable = [
        'category',
        'subcategory',
        'video_title',
        'poster',
        'video_slug',
        'duration',
        'released_year',
        'star_casts',
        'director',
        'tv_channel',
        'tv_shows',
        'seasons',
        'language',
        'captions',
        'status',
        'upload_video',
        'upload_video_url',
        'description',
    ];
}
