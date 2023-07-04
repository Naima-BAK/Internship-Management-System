<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdminNotification extends Model
{
    use HasFactory;
    protected $fillable =[
        'type',
        'notification',
        'user_name',
        'user_email',
        'icon'
    ];
}
