<?php

use App\Question;
use Illuminate\Database\Seeder;

class QuestionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Question::create([
            "id" => 1,
            "user_id" => 1,
            "title" => "What's your favorite Javascript Frame Work?",
            "description" => "A JavaScript framework is an application framework written in JavaScript. It differs from a JavaScript library in its control flow:[1] A library offers functions to be called by its parent code, whereas a framework defines the entire application design.",
            "additional_info" => "### Other Javascript Frameworks
 - Mithril
 - WebRx
 - Polymer
 - Backbone",
        ]);
        Question::create([
            "id" => 2,
            "user_id" => 2,
            "title" => "What profession doesn’t get enough credit or respect??",
            "description" => "A profession is something a little more than a job, it is a career for someone that wants to be part of society, who becomes competent in their chosen sector through training",
        ]);
        Question::create([
            "id" => 3,
            "user_id" => 1,
            "title" => "What OS Is Best for a Home Server and Personal Use?",
            "description" => "A server operating system, also called a server OS, is an operating system specifically designed to run on servers, which are specialized computers that operate within a client/server architecture to serve the requests of client computers on the network.",
        ]);
        Question::create([
            "id" => 4,
            "user_id" => 1,
            "title" => "What do you do to improve your mood when you are in a bad mood?",
            "description" => "In psychology, a mood is an emotional state. In contrast to emotions, feelings, or affects, moods are less specific, less intense and less likely to be provoked or instantiated by a particular stimulus or event. Moods are typically described as having either a positive or negative valence. In other words, people usually talk about being in a good mood or a bad mood.",
        ]);
        Question::create([
            "id" => 5,
            "user_id" => 1,
            "title" => "What do you think is the Best CMS of 2019?",
            "description" => "Content plays a major role in the journey of building your online presence and brand. Without it, you're going to struggle in today’s ruthless business world. In fact, digital marketing is arguably one of the most important areas of commerce, although it’s often neglected.",
            "additional_info" => "
# [WordPress](https://wordpress.com/)

| Pros | Cons |
| ---- | ---- |
| Loads of tools | Learning Curve |
| Great selection of themes |  |
| Affordably priced business plan |  |

# [Squarespace](https://www.squarespace.com/)

| Pros | Cons |
| ---- | ---- |
| Beginner friendly | Not Opensource |
| Intuitive UI |  |
| Loads of themes |  |

# Others:",
        ]);

    }
}
