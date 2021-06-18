
<html>
<head>
    <title>{{ config('app.name', 'Laravel') }} @yield('title')</title>
    <!--css------------------------------------------------------------------------------------------->
    <link rel="stylesheet" href='{{url("css/root.css") }}'  >
    <link rel="stylesheet" href='{{url("css/global.css") }}'>
    
    <!--font------------------------------------------------------------------------------------------>
    <link href="https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Syne+Mono&display=swap" rel="stylesheet">
        
    <!--meta------------------------------------------------------------------------------------------>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!--script --------------------------------------------------------------------------------------->
    <script src='{{ url("js/general.js") }}' defer="true"></script>
    @yield('script')
    
</head>

<body>
    <header>
        <h1>Crypto-Market</h1>
        <div id="profilo">
            @if ($user['img'] != NULL)<img src = {{ $user['img'] }}  >
            @else   <img src = '{{ url("img/us.jpg") }}'  >   
            @endif  
            <h1 class="user">              {{ $user['username'] }} </h1>
            <h1 id="saldo" class="hidden"> {{ $user['saldo'] }}    </h1>
            <a href=" {{ route('logout') }}"><button class="logout">Logout</button></a>
        </div>
    </header>
    
    <nav>@yield('nav')</nav>
    
    <section>@yield('content')</section>
    
    <div id="modal" class="hidden"></div>

    <footer>0460013163 Pittala Vito Emanuele</footer>

</body>

</html>
