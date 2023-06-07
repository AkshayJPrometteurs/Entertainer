<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubCategory extends Model
{
    use HasFactory;
    public $fillable = [
        'category',
        'sub_category_name',
        'sub_category_slug',
        'icon',
        'status',
    ];
}
