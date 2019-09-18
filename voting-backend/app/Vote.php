<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function answer()
    {
        return $this->belongsTo(Answer::class, 'answer_id');
    }
    public function question()
    {
        return $this->belongsTo(Question::class, 'question_id');
    }
}
