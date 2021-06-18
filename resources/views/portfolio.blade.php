@extends('layouts.general')
@section('title', '| PORTFOLIO')
@section('script')
<script src='{{ url("js/portfolio.js") }}' defer="true"></script>
<link rel="stylesheet" href='{{ url("css/portfolio.css") }}' />
@endsection


@section('nav')
<a href='{{ url("home") }}'>Asset</a>
<a href='{{ url("news") }}'>News</a>
<a id="here">Portfolio</a>
@endsection

@section('content')
    <div id="transactions">
        <button id="button_moviments">Show storic</button>
        <div id="profitt" >
            <span class="profitt">Storic performance => $ </span>
            <span id = "P_L">...</span>
        </div>
    </div>

    <div id="moviment" class = "hidden">
        
        <div id="bar_moviments">
            <div class="asset_moviment">Assets</div>
            <div class="data_moviment" >Data </div>
            <div class="type_moviment" >Tipo </div>
            <div class="quantita_moviment">Quantita</div>
            <div class="importo_moviment">Importo </div> 
        </div>
        <div id="listMoviment"></div>
        <div id="ShowAll" data-boolean = "0">Show all</div>
    </div>

    <div id="portfolio">
        <div id="bar">
            <div class="aux"></div>
            <div class="asset">Asset</div>
            <div class="quantita">Quantita'</div>
            <div class="price">Price($)</div>
            <div class="value_usd">Valore($)</div>
            <div class="aux_b"></div>
        </div>
        <div id="operazioni"></div>
    </div>

    <div id="balance">
        <div id="disponibile">
            <div class="balance_usd">
                <h1>$</h1>
                <p class="value">{{ $user['saldo']}}</p> 
            </div>
            <div class="balace_text">DISPONIBILE</div>
        </div>
        <span>+</span>
        <div id="capital_gain">
            <div class="balance_usd">
                <h1>$</h1>
                <p class="value">loading..</p> 
            </div>
            <div class="balace_text">CAPITAL GAIN</div>
        </div>
        <span>=</span>
        <div id="patrimonio">
            <div class="balance_usd">
                <h1>$</h1>
                <p class="value">loading..</p> 
            </div>
            <div class="balace_text">PATRIMONIO</div>
        </div>
    </div>
@endsection