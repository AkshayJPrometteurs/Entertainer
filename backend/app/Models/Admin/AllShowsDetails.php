<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AllShowsDetails extends Model
{
    use HasFactory;
    protected $fillable = [
        'shows_type',
        'shows_name',
        'shows_image',
        'shows_status',
    ];
}
