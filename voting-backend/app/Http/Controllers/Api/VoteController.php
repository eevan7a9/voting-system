<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Vote;
use Illuminate\Http\Request;

class VoteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $votes = Vote::all();
        return response()->json($votes);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // we make validation to only allow user to vote only once per question
        $check_vote = Vote::where('question_id', $request->question_id)
            ->where('user_id', $request->user_id)
            ->first();

        $request->validate([
            "question_id" => "required|integer",
            "answer_id" => "required|integer",
            "user_id" => "required|integer",

        ]);

        if ($check_vote) {
            $response = [
                "message" => "You already voted for this question",
                "error" => "Vote, already exists",
            ];
            return response()->json($response);
        } else {
            $vote = new Vote();
            $vote->question_id = $request->question_id;
            $vote->answer_id = $request->answer_id;
            $vote->user_id = $request->user_id;
            $vote->save();
            $vote->message = "Success, Vote submitted";
            return response()->json($vote);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Vote  $vote
     * @return \Illuminate\Http\Response
     */
    public function show(Vote $vote)
    {
        return response()->json($vote);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Vote  $vote
     * @return \Illuminate\Http\Response
     */
    public function edit(Vote $vote)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Vote  $vote
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Vote $vote)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Vote  $vote
     * @return \Illuminate\Http\Response
     */
    public function destroy(Vote $vote)
    {
        $vote->delete();
        return response()->json($vote);
    }
}
