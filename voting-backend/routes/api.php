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
    Route::get('/logout', 'Api\AuthController@logout');
    Route::get('/user/{account?}', 'Api\AuthController@user');
    // Resource Controller fpr Vote
    Route::resource('votes', 'Api\VoteController');
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
    Route::post('/update/password', 'Api\AuthController@updatePassword');
});

Route::post('/login', 'Api\AuthController@login');
Route::post('/register', 'Api\AuthController@register');
// custom controller for our Questions resouce controller for :filtering and sorting
Route::get('questions/filter/{sort?}/{filter?}', 'Api\QuestionController@filtered');
// custom method for Question resource controller for :searching questions
Route::post('questions/search/', 'Api\QuestionController@searchQuestions'); // req : title, sort
// Resource Controller for Questions
Route::resource('questions', 'Api\QuestionController');
// Resource Controller for Ansers
Route::resource('answers', 'Api\AnswerController');
//  Email Verification
Route::get('email/verify/{id}', 'Api\VerificationApiController@verify')->name('verificationapi.verify');
//  Resend Email Verification
Route::post('email/resend', 'Api\VerificationApiController@resend')->name('verificationapi.resend');
// Send Passwrod Reset Notification
Route::post('/password/email', 'Api\ForgotPasswordController@sendResetLinkEmail'); // req: email
// Reset Password Form
Route::post('/password/reset', 'Api\ResetPasswordController@reset'); // req: token || email || password|| password_confirmation
