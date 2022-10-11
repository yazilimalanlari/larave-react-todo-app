<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required'
        ]);
 
        if ($validator && Auth::attempt($request->all())) {
            $request->session()->regenerate();
            return [ 'status' => 'success' ];
        }
        
        return response('Unauthorized', 401);
    }
    
    public function register(Request $request) {
        $data = $request->all();
        $validator = Validator::make($data, [
            'name' => 'required',
            'email' => 'required',
            'password' => 'required|min:6',
            'role' => ['required', Rule::in(User::getRoleCases())]
        ]);

        if ($validator->fails()) return response('invalid values', 400);

        $data['password'] = Hash::make($data['password']);
        return User::create($data);
    }
}
