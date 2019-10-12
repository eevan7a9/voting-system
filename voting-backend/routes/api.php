<?php

use App\Answer;
use Illuminate\Http\Request;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::group(['middleware' => ['auth:api']], function () {
    Route::get('/logout', 'AuthController@logout');
    Route::get('/user/{account?}', 'AuthController@user');
    // Resource Controller fpr Vote
    Route::resource('votes', 'VoteController');
    // our route for saving multiple answers
    Route::post('answers/multiple', function (Request $request) {
        // we validate arrays of objects
        $request->validate([
            'answers' => 'present|array',
            'answers.*.title' => 'required|string',
            'answers.*.question_id' => 'required|integer',
        ]);
        // we save them individualy
        foreach ($request->answers as $answer) {
            $new_answer = new Answer();
            $new_answer->title = $answer['title'];
            $new_answer->question_id = $answer['question_id'];
            $new_answer->save();
        }

        return response()->json($request->answers);
    });
    Route::post('/update/password', 'AuthController@updatePassword');
});

Route::post('/login', 'AuthController@login');
Route::post('/register', 'AuthController@register');
// custom controller for our Questions resouce controller for :filtering and sorting
Route::get('questions/filter/{sort?}/{filter?}', 'QuestionController@filtered');
// Resource Controller for Questions
Route::resource('questions', 'QuestionController');
// Resource Controller for Ansers
Route::resource('answers', 'AnswerController');
//  Email Verification
Route::get('email/verify/{id}', 'VerificationApiController@verify')->name('verificationapi.verify');
//  Resend Email Verification
Route::post('email/resend', 'VerificationApiController@resend')->name('verificationapi.resend');
