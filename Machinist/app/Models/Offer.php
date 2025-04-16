<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Offer extends Model
{
    protected $fillable = [
        'thread_id',
        'description',
        'price',
        'delivery_time',
        'mop',
        'mod',
    ];

    public function thread(): BelongsTo
    {
        return $this->belongsTo(OfferThread::class, 'thread_id');
    }
}
