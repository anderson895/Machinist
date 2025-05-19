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
        'proof_of_payment',
        'cancelled_by_user_date',
        'proof_of_delivery',
        'purchase_order'
    ];

    public function offer()
    {
        return $this->belongsTo(Offer::class);
    }
}
