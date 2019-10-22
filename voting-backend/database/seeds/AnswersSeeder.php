<?php

use App\Answer;
use Illuminate\Database\Seeder;

class AnswersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Answer::create([
            "id" => 1,
            "title" => "Vuejs",
            "question_id" => 1,
        ]);
        Answer::create([
            "id" => 2,
            "title" => "Reactjs",
            "question_id" => 1,
        ]);
        Answer::create([
            "id" => 3,
            "title" => "Angularjs or Angular 2+",
            "question_id" => 1,
        ]);
        Answer::create([
            "id" => 4,
            "title" => "Retail Employees",
            "question_id" => 2,
        ]);
        Answer::create([
            "id" => 5,
            "title" => "Freelance Writers",
            "question_id" => 2,
        ]);
        Answer::create([
            "id" => 6,
            "title" => "Developers/Programmers",
            "question_id" => 2,
        ]);
        Answer::create([
            "id" => 7,
            "title" => "Mac OS",
            "question_id" => 3,
        ]);
        Answer::create([
            "id" => 8,
            "title" => "Linux",
            "question_id" => 3,
        ]);
        Answer::create([
            "id" => 9,
            "title" => "Windows",
            "question_id" => 3,
        ]);
        Answer::create([
            "id" => 10,
            "title" => "Eating Sweeets",
            "question_id" => 4,
        ]);
        Answer::create([
            "id" => 11,
            "title" => "Watch Movies",
            "question_id" => 4,
        ]);
        Answer::create([
            "id" => 12,
            "title" => "Exercise or any Pysical Activities",
            "question_id" => 4,
        ]);
        Answer::create([
            "id" => 13,
            "title" => "Sleep",
            "question_id" => 4,
        ]);
        Answer::create([
            "id" => 14,
            "title" => "Wordpress",
            "question_id" => 5,
        ]);

        Answer::create([
            "id" => 15,
            "title" => "Square space",
            "question_id" => 5,
        ]);
        Answer::create([
            "id" => 16,
            "title" => "Drupal",
            "question_id" => 5,
        ]);
        Answer::create([
            "id" => 17,
            "title" => "Jomla",
            "question_id" => 5,
        ]);

    }
}
