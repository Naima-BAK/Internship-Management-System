<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Http\Models\Internship;

class Company extends Model
{
    use HasFactory;
    protected $fillable = [

        'name',
        'email',
        'activity',
        'city',
        'logo',
        'country',
        'website',
        'address',
        'phone'
        
    ];
    public function internship()
    {
        return $this->hasMany(Internship::class);
    }
    
}
