@extends('layouts.general')
@section('title', '| HOME')
@section('script')
<script src='{{ url("js/assets.js") }}' defer="true"></script>
<link rel="stylesheet" href='{{ url("css/assets.css") }}' />
@endsection

@section('nav')
<a id="here">Assets</a>
<a href= '{{ url("news") }}'>News</a>
<a href='{{ url("portfolio") }}'>Portfolio</a>-->
@endsection

@section('content')
    <!--TRADING VIEW GRAFICO  -->

    <div id="total_mc">
        <h1>Capitalizzazione globale criptovalute</h1>
        <!-- TradingView Widget BEGIN -->
        <div class="tradingview-widget-container">
            <div id="tradingview_7e10f"></div>
            <div class="tradingview-widget-copyright"><a href="https://it.tradingview.com/symbols/CRYPTOCAP-TOTAL/" rel="noopener" target="_blank"><span class="blue-text">Grafico TOTAL</span></a> da TradingView</div>
            <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
            <script type="text/javascript">
                new TradingView.widget(
                    {
                    "autosize": true,
                    "symbol": "CRYPTOCAP:TOTAL",
                    "interval": "D",
                    "timezone": "Etc/UTC",
                    "theme": "dark",
                    "style": "3",
                    "locale": "it",
                    "toolbar_bg": "#f1f3f6",
                    "enable_publishing": false,
                    "container_id": "tradingview_7e10f"
                    }
                );
            </script>
        </div>
        </div>    
        </div>
    <div>
    <!-- END TRADINGVIEW WIDGET-->

        <div class="division">
            <button class="watchlist ">
                <span class="text_w">Show watchlist </span> 
                <span class="num_w">({{ $user['n_watch'] }})</span>
            </button>
            <div class="search">
                <input type="text" name="search_crypto" placeholder="...search crypto 🔍">
                <button class="search">Search</button>
            </div>
        </div>
        <div id="tmp_search" class="hidden">
            <div class="division">
                <h1>Search</h1>
                <button>X</button>
            </div>
                <div class="coin_bar">
                    <p class ="rank">Rank</p>
                    <div class="img"></div>
                    <p class="name">Name</p>
                    <p class="symbol">Symbol</p>
                    <p class="price">Price</p>
                    <p class="var_day">1D var%</p>
                    <p class="mk">Market cap</p>
                    <div class="op"></div>
                    <div class="op"></div>
                    <div class="op"></div>
                </div>
        </div>
        <div id="watchlist" class="hidden">
            <h1>Watchlist</h1>
            <div class="coin_bar">
                <p class ="rank">Rank</p>
                <div class="img"></div>
                <p class="name">Name</p>
                <p class="symbol">Symbol</p>
                <p class="price">Price</p>
                <p class="var_day">1D var%</p>
                <p class="mk">Market cap</p>
                <div class="op"></div>
                <div class="op"></div>
                <div class="op"></div>
            </div>
        </div>
    </div>    
    <div id ="coin">
        <h1>Assets</h1>
        <div class="coin_bar">
            <p class ="rank">Rank</p>
            <div class="img"></div>
            <p class="name">Name</p>
            <p class="symbol">Symbol</p>
            <p class="price">Price</p>
            <p class="var_day">1D var%</p>
            <p class="mk">Market cap</p>
            <div class="op"></div>
            <div class="op"></div>
            <div class="op"></div>
        </div>
        <div class="load">
            <img src=img/loading.gif>
        </div>
    </div>
@endsection

