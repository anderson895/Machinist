<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Inquiry extends Model
{
    //
    protected $fillable = [
        'user_id',
        'description',
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
}
