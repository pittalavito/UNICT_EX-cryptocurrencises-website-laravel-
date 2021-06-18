@extends('layouts.login_signup')
@section('title', '| SIGNUP')
@section('script')
<script src='{{ url("js/signup.js") }}' defer="true"></script>
@endsection

@section('content')
<section>
    <header>
        <h1>Crypto Market</h1>
    </header>     
    <div class ="login">
        <form name='signup' method='post' enctype="multipart/form-data" autocomplete="off">
            <input type='hidden' name='_token' value ='{{ csrf_token() }}'>
            <div>
                <label>Nome<input type='text' name='nome' value='{{ old('nome') }}'></label>
            </div>
            <div>
                <label>Cognome<input type='text' name='cognome' value='{{ old('cognome') }}'></label>
            </div>
            <div>
                <label>Email<input type='text' name='email' value='{{ old('email') }}'></label>
            </div>
            <div>
                <label>Username<input type='text' name='username' value='{{ old('username') }}'></label>
            </div>
            <div>
                <label>Password <input type='password' name='password' ></label>
            </div>
            <div>
                <label>Conferma Password <input type='password' name='conf_password'></label>
            </div>
            <div>
                <label>Immagine profilo<input type ='file' name='img' ></label>
            </div>
            <div>
                <div class="label"><input type='submit'value="Registrati" ></div>
            </div>
        </form>
        <a href="{{ route('login') }}">🠔 Login </a>;
    </div>
</section>
<div id="modal" class="hidden"></div>

@endsection