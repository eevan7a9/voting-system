<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->client = DB::table('oauth_clients')->where('id', 2)->first();
    }
    /**
     * Store a newly loged-in user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     * json_encode(["mesage" => $request->all()]);
     */
    public function login(Request $request)
    {
        if (Auth::attempt(['email' => request('email'), 'password' => request('password')])) {
            $user = Auth::user();
            if ($user->email_verified_at !== null) {
                $request->request->add([
                    'grant_type' => 'password',
                    'client_id' => $this->client->id,
                    'client_secret' => $this->client->secret,
                    'username' => $request->email,
                    'password' => $request->password,
                    'scope' => '*',
                ]);
                $proxy = Request::create(
                    'oauth/token',
                    'POST'
                );
                return Route::dispatch($proxy);
            } else {
                $message = ['error' => 'email', 'message' => 'Please Verify Email'];
                return response()->json($message, 401);
            }
        } else {
            $message = ['error' => 'credentials', 'message' => 'invalid credentials'];

            return response()->json($message, 401);
        }
    }
    /**
     * Register new user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);
        if (!$validated) {
            return response()->json($validated->errors, 400);
        }
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();

        $user->sendApiEmailVerificationNotification(); // we send email verification notice
        $success = ["message" => "$user->email have successully registered"];
        return response()->json($success, 200);
    }
    /**
     * Logout user by invoking access token
     */
    public function logout()
    {
        // we get the authenticated user
        $user = Auth::user()->token();
        // we set revoked to 1
        $user->revoke();
        return response()->json("successfully loged out!!!");

        /** if you want to logout the user from all devices
         *
         * DB::table('oauth_access_tokens')
         *   ->where('user_id', Auth::user()->id)
         *   ->update([
         *       'revoked' => true
         *     ]);
         */
    }
    /**
     * We get the basic information of the current user
     */
    public function user($account = null)
    {
        $user = Auth::user();
        if ($account) {
            $user->questions; // to show questins user created
            $user->votes; // to show all the votes users made
        }
        return response()->json($user);
    }
    public function updatePassword(Request $request)
    {
        $request->validate([
            'new' => "required|string|min:6|confirmed",
        ]);
        $user = Auth::user();
        $response = "";
        if (Hash::check($request->current, $user->password)) {

            $user->password = Hash::make($request->new);
            $user->update();
            $response = ["message" => "Success, password changed."];
            return response()->json($response, 200);

        } else {
            $response = [
                "message" => "Current password is incorrect",
                "errors" => ["current" => ["Current password is in correct"]],
            ];
            return response()->json($response, 401);

        }
        return response()->json($response);
    }
}
