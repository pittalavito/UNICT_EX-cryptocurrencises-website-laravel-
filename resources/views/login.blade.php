@extends('layouts.login_signup')
@section('title', '| LOGIN')
@section('script')
<script src='{{ url("js/login.js")}}' defer="true"></script>
@endsection


@section('content')
<section>
        <header>
            <h1>Crypto Market</h1>
            <p>
                In un momento in cui media e influencer invogliano la gente ad investire in criptovalute, 
                nasce Crypto Market pensato per far acquistare consapevolezza di cosa siano realmente le criptovalute 
                e di come tale mercato puo essere profittevole ma allo stesso tempo rischioso se guardato dal punto di vista economico.
            </p>
            <p>Forniamo:</p>
            <p>-Notizie e dati aggiornati in tempo reale </p>
            <p>-La possibilita di creare un portfolio virtuale</p>
            <p>-Un saldo di 100000 $ "virtuali"</p>
        </header>
        
        <div class ="login">
            <h1>Benvenuto </h1>
            <form name='login' method='post'  autocomplete="off">
                <input type='hidden' name='_token' value ='{{ $csrf_token }}'>
                <div>
                    <label>Username<input type='text' name='username' value='{{ old('username') }}'></label>
                </div>
                <div>
                    <label>Password <input type='password' name='password'></label>
                </div>
                <!--<div> 
                    <label><span>Ricordami<input type="checkbox" name='cookie'></span></label>
                </div>-->
                <div>
                    <div class="label"><input type='submit'value="Accedi"></div>
                </div>
            </form>
            <p>Non hai un accaunt?</p>
            <a href="{{ route('signup') }}">Clicca qui</a>
            
        </div>
</section>
@if(isset( $old_username ) )<h1 id="err">  Credenziali errate </h1>@endif
<div id="modal" class="hidden"></div>

@endsection
