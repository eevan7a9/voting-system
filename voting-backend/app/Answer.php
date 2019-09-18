<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    public function question()
    {
        return $this->belongsTo(Question::class, 'question_id');
    }
    public function votes()
    {
        return $this->hasMany(Vote::class, 'answer_id');
    }
}
