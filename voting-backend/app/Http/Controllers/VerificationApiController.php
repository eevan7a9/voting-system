<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\VerifiesEmails;
use Illuminate\Http\Request;

class VerificationApiController extends Controller
{

    use VerifiesEmails;

    /**

     * Show the email verification notice.

     *

     */

    public function show()
    {

        //

    }

    /**

     * Mark the authenticated user’s email address as verified.

     *

     * @param \Illuminate\Http\Request $request

     * @return \Illuminate\Http\Response

     */

    public function verify(Request $request)
    {

        $userID = $request["id"];
        $user = User::findOrFail($userID);
        $date = date("Y-m-d g:i:s");
        $user->email_verified_at = $date; // to enable the “email_verified_at"

        $user->save();
        return redirect('https://survey-maker.netlify.com/#/login'); // redirect to the application
    }

    /**

     * Resend the email verification notification.

     *

     * @param \Illuminate\Http\Request $request

     * @return \Illuminate\Http\Response

     */

    public function resend(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if ($user->hasVerifiedEmail()) { // if user is already verified
            return response()->json(["message" => 'User already have verified email!'], 422);
        }
        $user->sendApiEmailVerificationNotification(); // resend if user is not yet verified
        return response()->json(["message" => 'The notification has been resubmitted']);
    }

}
