<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
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
        return  Route::dispatch($proxy);
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

        return response()->json($validated, 200);
    }
    public function logout(Request $request)
    {
        return json_encode(["mesage" => "logout"]);
    }
}
