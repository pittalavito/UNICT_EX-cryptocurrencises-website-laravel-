@extends('layouts.general')
@section('title', '| NEWS')
@section('script')
<script src='{{ url("js/news.js") }}' defer="true"></script>
<link rel="stylesheet" href='{{ url("css/news.css") }}' />
@endsection

@section('nav')
<a href='{{ url("home") }}'>Assets</a>
<a id="here">News</a>
<a href='{{ url("portfolio") }}'>Portfolio</a>-->
@endsection

@section('content')
<div class="division">
    <button class="watchlist ">
        <span class="text_w">Show saved articles</span> 
        <span class="num_w">({{ $user['n_news'] }})</span>
    </button>
    <div class="search">
        <input type="text" name="search_news" placeholder="...search news 🔍">
        <button class="search">Search</button>
    </div>
</div>

<div id="Saved_articles" class="hidden">
    <h1>Saved articles</h1>
    <div id="s_a">
    </div>
</div>

<div id="Search_news" class="hidden">
    <div class="division">
        <h1>Search result</h1>
        <button>X</button>
    </div>
    <div id="s_n">
        <div class="load">
            <img src=img/loading.gif>
        </div>
    </div>
</div>

<div id="italian_news">
    <h1>Last News </h1>
    <div id="i_n">
        <div class="load">
            <img src=img/loading.gif>
        </div>
    </div>
</div>
@endsection