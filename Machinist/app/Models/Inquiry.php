<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
}
