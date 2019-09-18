<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }
    public function answers()
    {
        return $this->hasMany(Answer::class, 'question_id');
    }
    public function votes()
    {
        return $this->hasMany(Vote::class, 'question_id');
    }
}
