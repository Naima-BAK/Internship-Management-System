<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doc extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'file',
        'user_id',
        'user_name',
        'sent_by',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
}
