<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Http\Models\User;
use App\Http\Models\Company;

class Internship extends Model
{
    use HasFactory;
    protected $fillable =
    [
        'theme',
        'user_id',
        'company_id',
        'university_supervisor',
        'internship_supervisor',
        'start_date',
        'end_date'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
