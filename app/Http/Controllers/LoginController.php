<?php

//OK COMPLETE
namespace App\Http\Controllers;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Request;
use Illuminate\Routing\Controller as BaseController;
use App\Models\User;

class LoginController extends BaseController 
{    
    public function login(){
        if(session('id') != null) return redirect("home");
        
        $old_username = Request::old('username');
        return view('login')
        ->with('csrf_token', csrf_token())
        ->with('old_username', $old_username)
        ;
    }

    public function checkLogin() {
        $user = User:: where('username', request('username'))->first();
            
        if($user !== null  && password_verify( request('password'), $user->password) ) {
            Session::put('id' , $user->id );
            return redirect('home');
        }
        return redirect('login')->withInput();
    }

    public function logout() {
        Session::flush();
        return redirect('login');
    }
}

?>
