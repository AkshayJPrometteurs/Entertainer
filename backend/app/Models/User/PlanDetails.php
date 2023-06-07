<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlanDetails extends Model
{
    use HasFactory;
    public $fillable = [
        'user_id',
        'plan_name',
        'plan_validity',
        'plan_expired_on',
    ];
}
