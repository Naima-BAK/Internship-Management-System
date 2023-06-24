<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;
    protected $fillable =[
        'contact_email','contact_localization','contact_phone','facebook',
        'instagram','linkedin','website_name','website_logo','website_favicon'
    ];
}
