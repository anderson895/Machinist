<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'offer_id',
        'status',
        'total_amount',
        'notes',
    ];

    public function offer()
    {
        return $this->belongsTo(Offer::class);
    }
}
