<?php

namespace App\Http\Controllers;

use App\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class QuestionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->except(['index', 'show']);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $questions = Question::orderBy('created_at', 'desc')->get(); // order by newest
        foreach ($questions as $question) {
            $question->answers->makeHidden('votes'); // we want to show the hasMany retationship of question
        }
        return response()->json($questions);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        $request->validate([
            'title' => "required|string",
        ]);
        $question = new Question();
        $question->user_id = $user->id;
        $question->title = $request->title;
        $question->description = $request->description;
        $question->additional_info = $request->additional_info;
        $question->save();

        return response()->json($question);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function show(Question $question)
    {
        $question->answers; // to show the hasMany relationship of questions
        $question->user; // we want to show the belongsTo retationship of question
        return response()->json($question);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function edit(Question $question)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Question $question)
    {
        $request->validate([
            "title" => "required|string",
        ]);
        $question->title = $request->title;
        $question->description = $request->description;
        $question->additional_info = $request->additional_info;
        $question->update();
        return response()->json($question);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function destroy(Question $question)
    {
        $question->delete();
        return response()->json($question);
    }
    /**
     *
     * Filter and Sorter of the specified resource from storage.
     *
     */

    public function filtered($sort = "newest", $filter = "voted")
    {
        $questions = []; // holds our questions
        $order = $sort == "newest" ? "desc" : "asc"; // check if not newest then sort to oldest

        switch ($filter) {
            case 'not-voted': // we get if user did not vote on the question
                $questions = Question::whereDoesntHave('votes', function ($vote) {
                    $user_id = Auth::user()->id;
                    $vote->where('user_id', $user_id);
                })->orderBy('created_at', $order)->get();

                break;
            default: // we get if user voted on the question
                $questions = Question::whereHas('votes', function ($vote) {
                    $user_id = Auth::user()->id;
                    $vote->where('user_id', $user_id);
                })->orderBy('created_at', $order)->get();

                break;
        }

        return response()->json($questions);

    }

}
