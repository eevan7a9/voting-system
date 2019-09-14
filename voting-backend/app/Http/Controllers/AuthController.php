<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    /**
     * Store a newly loged-in user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     * json_encode(["mesage" => $request->all()]);
     */
    public function login(Request $request)
    {
        return json_encode(["mesage" => $request->all()]);
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
            'password' => 'required|string|min:8|confirmed',
        ]);
        if (!$validated) {
            return response()->json($validated->errors, 400);
        }
        return response()->json($validated, 200);
    }
    public function logout(Request $request)
    {
        return json_encode(["mesage" => "logout"]);
    }
}
