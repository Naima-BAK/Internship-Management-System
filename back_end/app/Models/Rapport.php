<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rapport extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'file',
        'version',
        'user_id',
        'user_name',
        'sent_by',
        'encadrant_id',
        'encadrant_name'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
