<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Inquiry extends Model
{
    //
    protected $fillable = [
        'user_id',
        'description',
        'price',
        'qty',
        'files',
        'delivery_time',
        'mop',
        'mod',
    ];

    public function files()
    {
        return $this->hasMany(InquiryFile::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function offerThreads(): HasMany
    {
        return $this->hasMany(OfferThread::class);
    }

    public function allowedViewers(): HasMany
    {
        return $this->hasMany(InquiryAllowedViewer::class);
    }
}
