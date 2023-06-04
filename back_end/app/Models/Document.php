<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;
    protected $fillable = 
    [
        'user_id',
        'confirmation_pdf_name',
        'confirmation_pdf',
        'demande_stage_name',
        'demande_stage_pdf',
        'Attestation_name',
        'Attestation_pdf',
        'convention_name',
        'convention_pdf',
        'notes_name',
        'notes_pdf',
        'Assurance_name',
        'Assurances_pdf'
    ];
}
