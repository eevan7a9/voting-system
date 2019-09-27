<?php

use App\Vote;
use Illuminate\Database\Seeder;

class VotesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Vote::create([
            "question_id" => 1,
            "answer_id" => 2,
            "user_id" => 1
        ]);
        Vote::create([
            "question_id" => 1,
            "answer_id" => 2,
            "user_id" => 2
        ]);
        Vote::create([
            "question_id" => 1,
            "answer_id" => 2,
            "user_id" => 3
        ]);
        Vote::create([
            "question_id" => 1,
            "answer_id" => 1,
            "user_id" => 4
        ]);
        Vote::create([
            "question_id" => 1,
            "answer_id" => 2,
            "user_id" => 5
        ]);
        Vote::create([
            "question_id" => 1,
            "answer_id" => 3,
            "user_id" => 6
        ]);
        //          End of Question 1 Votes
        Vote::create([
            "question_id" => 2,
            "answer_id" => 5,
            "user_id" => 1
        ]);
        Vote::create([
            "question_id" => 2,
            "answer_id" => 4,
            "user_id" => 2
        ]);
        Vote::create([
            "question_id" => 2,
            "answer_id" => 4,
            "user_id" => 3
        ]);
        Vote::create([
            "question_id" => 2,
            "answer_id" => 4,
            "user_id" => 4
        ]);
        Vote::create([
            "question_id" => 2,
            "answer_id" => 6,
            "user_id" => 5
        ]);
        Vote::create([
            "question_id" => 2,
            "answer_id" => 6,
            "user_id" => 6
        ]);
        //              End of Question 2 Votes
        Vote::create([
            "question_id" => 3,
            "answer_id" => 8,
            "user_id" => 1
        ]);
        Vote::create([
            "question_id" => 3,
            "answer_id" => 8,
            "user_id" => 2
        ]);
        Vote::create([
            "question_id" => 3,
            "answer_id" => 8,
            "user_id" => 3
        ]);
        Vote::create([
            "question_id" => 3,
            "answer_id" => 8,
            "user_id" => 4
        ]);
        Vote::create([
            "question_id" => 3,
            "answer_id" => 7,
            "user_id" => 5
        ]);
        Vote::create([
            "question_id" => 3,
            "answer_id" => 9,
            "user_id" => 6
        ]);
        //                  End of Question 3 Votes
        Vote::create([
            "question_id" => 4,
            "answer_id" => 13,
            "user_id" => 1
        ]);
        Vote::create([
            "question_id" => 4,
            "answer_id" => 13,
            "user_id" => 2
        ]);
        Vote::create([
            "question_id" => 4,
            "answer_id" => 11,
            "user_id" => 3
        ]);
        Vote::create([
            "question_id" => 4,
            "answer_id" => 11,
            "user_id" => 4
        ]);
        Vote::create([
            "question_id" => 4,
            "answer_id" => 11,
            "user_id" => 5
        ]);
        Vote::create([
            "question_id" => 4,
            "answer_id" => 13,
            "user_id" => 6
        ]);
    }
}
