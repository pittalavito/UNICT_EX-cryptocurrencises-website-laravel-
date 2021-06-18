<html>
<head>
    <title>{{ config('app.name', 'Laravel') }} @yield('title')</title>
    <!--css------------------------------------------------------------------------------------------->
    
    <link rel="stylesheet" href='{{url("css/login_signup.css")}}' >
    <link rel="stylesheet" href='{{url("css/root.css") }}' >
    
    <!--font------------------------------------------------------------------------------------------>
    
    <link href="https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Syne+Mono&display=swap" rel="stylesheet">
    
    <!--meta------------------------------------------------------------------------------------------>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!--script---------------------------------------------------------------------------------------->
    <script src='{{ url("js/modal_error.js")}}' defer="true"></script>
    @yield('script')
</head>
<body> @yield('content') </body>
</html>
