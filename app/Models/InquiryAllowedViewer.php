<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InquiryAllowedViewer extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'inquiry_id',
    ];

    protected $table = 'inquiry_allowed_viewers';

    public $timestamps = true;

    public function inquiry()
    {
        return $this->belongsTo(Inquiry::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
