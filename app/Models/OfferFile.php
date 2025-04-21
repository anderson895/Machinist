<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OfferFile extends Model
{
    use HasFactory;

    protected $fillable = [
        'offer_id',
        'file_name',
        'label',
    ];

    public function offer()
    {
        return $this->belongsTo(Offer::class);
    }
}
