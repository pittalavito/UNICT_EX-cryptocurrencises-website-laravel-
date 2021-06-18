//--- FUNZIONI PER RICHIEDERE I DATI DEL PORTFOLIO ED I PREZZI IN AGGIORNATI DA COINGECKO

let all_assets   = null ;//<-- data           function => price_request 
let intervall    = 0;    //<-- check inteval  function => price_request
let FloatStoric  = 0;    //<-- span id ="P_L" su html
let ArrayStoric  = null; //<-- rif Movimenti by database

function create_box(elem){
    //CREA IL BOX CON LE INFO E LO RESTITUISCE
    const box = document.createElement('div');
    box.classList.add('box');
    box.setAttribute("data-id",elem.id_crypto);
    box.setAttribute("data-quantita",elem.quantita);
    box.setAttribute("data-img", elem.img);

    const img = document.createElement('img');
    img.src = elem.img;

    const asset = document.createElement('div');
    asset.classList.add('asset');
    asset.textContent = elem.id_crypto.toUpperCase()

    const quantita = document.createElement('div');
    quantita.classList.add('quantita');
    quantita.textContent = parseFloat(elem.quantita).toFixed(2);

    const price = document.createElement('div');
    price.classList.add('price');
    price.textContent ="loading...";
    
    const value_usd = document.createElement('div');
    value_usd.classList.add('value_usd');
    value_usd.textContent ="loading...";

    const button = document.createElement('button');
    button.classList.add('box_button');
    button.textContent = "buy/sell";

    box.appendChild(img);
    box.appendChild(asset);
    box.appendChild(quantita);
    box.appendChild(price);
    box.appendChild(value_usd);
    box.appendChild(button);

    return box;
}

function upload_portfolio(){
    //CHIEDE LE OPERAZIONI APERTE AL DATABASE
    fetch(PORTFOLIO_LOAD , metod_post(null)).then(response => response.json()).then(data_portfolio);
}//<--fetch (PORTFOLIO_LOAD)

function data_portfolio(json){

    FloatStoric = json.balance;
    storic.textContent = FloatStoric;
    
    if(FloatStoric >= 0){
        storic.classList.add('green');
        storic.classList.remove('red');
    }else{
        storic.classList.remove('green');
        storic.classList.remove('red');
    }
    
    if(json.operazioni !== "Portfolio is empty"){
        for(elem of json.operazioni){
            document.querySelector('#operazioni').appendChild(create_box(elem));
            //variabile globale 
            all_assets+='%2C'+elem.id_crypto;
        }
        price_request();
        
        if(intervall === 0){
            setInterval( price_request,8*1000 );
            intervall++;
        }   
    }else{
        //il portfolio è vuoto
        const msg = document.createElement('div');
        msg.classList.add('msg_empty');
        msg.textContent = json.operazioni;
        document.querySelector('#operazioni').appendChild(msg);
        //per la barra inferiore
        capital_gain.textContent = 0;
        patrimonio.textContent   = saldo.textContent;
    }
    //Lista movimenti
    if(json.moviments !== "Nessun movimento"){
        
        listaMoviment.innerHTML="";
        ArrayStoric = json.moviments;

        if(json.moviments.length < 5)button_showAll.classList.add('hidden'); 
        else                       button_showAll.classList.remove('hidden');
        
        let i = 0;
        for(elem of json.moviments){
            listaMoviment.appendChild( create_elem_moviments(elem) );
            if(++i === 5 )break;
        }
        
    }else{
          
        const msg_moviment = document.createElement('div');
        msg_moviment.classList.add('msg_empty');
        msg_moviment.textContent = json.moviments;
        listaMoviment.appendChild(msg_moviment);
        button_showAll.classList.add('hidden');
    }
}//<--return fetch (PORTFOLIO_LOAD)

function price_request(){
    
    function price_return(json){
        //console.log('richiesta prezzo :'+ new Date());

        let tot = 0;
        for(key in json){
            
            const box      = document.querySelector('.box[data-id='+key+']');
            const price    = json[key].usd
            const quantita = box.dataset.quantita;
            
            box.setAttribute('data-price',price);
            box.setAttribute('data-value_attuale' , price*quantita);
            
            box.querySelector('.value_usd').textContent = (price*quantita).toFixed(2)+' $';
            box.querySelector('.price').textContent = price.toFixed(2)+' $';
            
            tot+= price*quantita;
        
            box.querySelector('.box_button').addEventListener('click' , menu_buy_sell);
        }
        //per aggiornare la barra inferiore e storic
        const FloatCapitalGain   =  parseFloat(tot); 
        const FloatPatrimonio    =  parseFloat(saldo.textContent) + FloatCapitalGain;
        const aux                =  (parseFloat(FloatStoric)+FloatCapitalGain).toFixed(2);
        
        capital_gain.textContent =  FloatCapitalGain.toFixed(2) ; 
        patrimonio.textContent   =  FloatPatrimonio.toFixed(2)  ;
        storic.textContent       =  aux;

        if(aux >= 0){
            storic.classList.add('green');
            storic.classList.remove('red');
        }else{
            storic.classList.remove('green');
            storic.classList.add('red');
        }

    }

    const endpoint = 'https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=';
    fetch(endpoint + all_assets).then(response => response.json()).then(price_return);
}//<-- fetch (COINGECKO) + return data

//--- FUNZIONI PER BUY/SELL AL CLICK SULL BOTTONE 'buy/sell' ---------------------------

function create_menu(elem){

    const box = document.createElement('div');
    box.classList.add('menu');
    //chiusura menu
    const row_0 = document.createElement('div');
    row_0.classList.add('row_0');
        const sep = document.createElement('p');
        sep.classList.add('word'); 
        const button_close = document.createElement('p');
        button_close.textContent = "Close";
        button_close.classList.add('close_menu');
    row_0.appendChild(sep);
    row_0.appendChild(button_close);
    //immagine e nome
    const row_1 = document.createElement('div');
    row_1.classList.add('row');
        const  img= document.createElement('img');
        img.src = elem.dataset.img;
        const id_crypto = document.createElement('p');
        id_crypto.classList.add('id_crypto');
        id_crypto.textContent = elem.dataset.id;
    row_1.appendChild(img);
    row_1.appendChild(id_crypto);
    //prezzo corrente
    const row_2 = document.createElement('div');
    row_2.classList.add('row');
        const  word_p = document.createElement('p');
        word_p.classList.add('word');
        word_p.textContent = "Prezzo attuale($):";
        const  price = document.createElement('p');
        price.classList.add('price_shop');
        price.textContent = elem.dataset.price;
    row_2.appendChild(word_p);
    row_2.appendChild(price);
    //valore attuale della posizione aperta
    const row_3 = document.createElement('div');
    row_3.classList.add('row');
        const word_v = document.createElement('p');
        word_v.classList.add('word');
        word_v.textContent = " Posseduto($):";
        const valore = document.createElement('p');
        valore.classList.add('valore_shop');
        valore.textContent =  parseFloat(elem.dataset.value_attuale).toFixed(2);
    row_3.appendChild(word_v);
    row_3.appendChild(valore);
    //saldo
    const row_4 = document.createElement('div');
    row_4.classList.add('row');
        const word_s =document.createElement('p');
        word_s.classList.add('word');
        word_s.textContent = "Saldo disp($):";
        const ssaldo = document.createElement('p');
        ssaldo.classList.add('saldo_shop');
        ssaldo.textContent = saldo.textContent;
    row_4.appendChild(word_s);
    row_4.appendChild(ssaldo);
    //importo
    const row_5 = document.createElement('div');
    row_5.classList.add('row');
        const inv = document.createElement('p');
        inv.textContent = "Importo($):";
        inv.classList.add('word');
        const input = document.createElement('input');
        input.type="number";
        input.min = 0;
    row_5.appendChild(inv);
    row_5.appendChild(input)
    //bottoni
    const row_6 = document.createElement('div');
    row_6.classList.add('row');
        const button_buy = document.createElement('button');
        button_buy.classList.add('button_shop');
        button_buy.textContent = "Compra";
        button_buy.setAttribute("data-action",'buy');
        const button_sell = document.createElement('button');
        button_sell.classList.add('button_shop');
        button_sell.textContent = "Vendi";
        button_sell.setAttribute("data-action",'sell');
    row_6.appendChild(button_buy);
    row_6.appendChild(button_sell);
    //nota menu
    const row_7 = document.createElement('div');
    row_7.classList.add('row');
        const n_b = document.createElement('p');
        n_b.classList.add('N_B');
        n_b.textContent = "N.B non puoi vendere importi inferiori a 5 $";
    row_7.appendChild(n_b);
    //msg di risposta
    const msg = document.createElement('p');
    msg.id ='shop_msg';
    msg.classList.add('hidden');
    msg.textContent="";

    box.appendChild(row_0);
    box.appendChild(row_1);
    box.appendChild(row_2);
    box.appendChild(row_5);
    box.appendChild(row_6);
    box.appendChild(row_3);
    box.appendChild(row_4);
    box.appendChild(row_7);
    box.appendChild(msg);

    return box;
}

function menu_buy_sell(event){

    const elem = create_menu(event.currentTarget.parentNode);
    const modal = view_modal();
    modal.appendChild(elem);
    modal.querySelector('.close_menu').addEventListener('click',close_modal);
    //AGGIUNGO L'EVENTO PER COMPRARE/VENDERE
    const button = modal.querySelectorAll('.button_shop');
    for(b of button)b.addEventListener('click', shop);
}

function shop(event){
       
    const importo   =  parseFloat(document.querySelector('input[type=number]').value).toFixed(2);
    const price     =  parseFloat(document.querySelector('.price_shop').textContent);
    const action    =  event.currentTarget.dataset.action ;
    const id_crypto =  document.querySelector('.id_crypto').textContent;
     
    function call_buy_or_sell(){
        
        const formData = new FormData();
        formData.append("action"       , action);
        formData.append("id_crypto"    , id_crypto);
        formData.append("importo"      , importo);
        formData.append("current_price", price);

        fetch(SHOP, metod_post(formData)).then(response => response.json()).then(shop_response);
    }

    //CONTROLLI PRIMA DI CHIAMARE 'function call_buy_or_sell'
    if(action === "buy"){
        if( parseFloat(saldo.textContent) >= importo && importo > 0) call_buy_or_sell();
        else{
            const row = document.querySelectorAll('.row');
            for(r of row)r.remove();
            const msg = document.querySelector('#shop_msg') ;
            msg.classList.remove('hidden');
            msg.textContent = "Errore importo: ";
            setTimeout(close_modal , 2000);
        }
    }
    if(action === "sell"){
        const quantita_possedute = parseFloat(document.querySelector('.box[data-id='+id_crypto+']').dataset.quantita);
        
        if(quantita_possedute >= (importo/price) && importo >= 5 ) call_buy_or_sell();
        else{
            const row = document.querySelectorAll('.row');
            for(r of row)r.remove();
            const msg = document.querySelector('#shop_msg') ;
            msg.classList.remove('hidden');
            msg.textContent = "Errore importo";
            setTimeout(close_modal , 2000);
        }
    }
}//<-- fetch (SHOP)

function shop_response(json){

    const row = document.querySelectorAll('.row');
    for(r of row)r.remove();
    saldo.textContent = json.saldo;
    const msg = document.querySelector('#shop_msg') ;
    msg.classList.remove('hidden');
    msg.textContent= json.msg;
    setTimeout(close_modal, 2000);
    document.querySelector('#operazioni').innerHTML="";
    upload_portfolio();
}//<-- return fetcH (SHOP)

//-- FUNZIONI PER LA LISTA MOVIMENTI
function create_elem_moviments(elem){
     
    //creo gli elementi html per gestire la lista
    const box = document.createElement('div');
    box.classList.add('box_moviment');

    const assets    = document.createElement('div');
    assets.classList.add('asset_moviment');
    assets.textContent = elem.id_crypto;

    const data_op   = document.createElement('div');
    data_op.classList.add('data_moviment');
    data_op.textContent = elem.since;

    const type_op   = document.createElement('div');
    type_op.classList.add('type_moviment');
    type_op.textContent = elem.tipo === 0 ? 'acquisto' : 'vendita';

    const quantita  = document.createElement('div');
    quantita.classList.add('quantita_moviment');
    quantita.textContent = parseFloat(elem.quantita).toFixed(4);

    const importo   = document.createElement('div');
    importo.classList.add('importo_moviment');
    importo.textContent = elem.importo;
    
    box.append(assets);
    box.append(data_op);
    box.append(type_op);
    box.append(quantita);
    box.append(importo);

    return box;
}

function show_moviment(event){
    
    const moviments = document.querySelector('#moviment');
    
    if(moviments.classList == "hidden"){
        moviments.classList.remove('hidden');
        event.currentTarget.textContent  = "Hide storic";
    }else{
        moviments.classList.add('hidden');
        event.currentTarget.textContent = "Show storic";
    }
}

function showAllMoviments(event){

    listaMoviment.innerHTML="";
    
    if(event.currentTarget.dataset.boolean == 0){
        
        event.currentTarget.dataset.boolean  = 1;
        event.currentTarget.textContent = "Show less";
        for(elem of ArrayStoric)
        listaMoviment.appendChild( create_elem_moviments(elem) );

    }else{
        
        
        event.currentTarget.textContent = "Show all";
        event.currentTarget.dataset.boolean = 0;
        
        let i = 0 ;
        for(elem of ArrayStoric){
            listaMoviment.appendChild( create_elem_moviments(elem ));
            if(++i === 5 )break;
        }   
    }
}

//------------------------------------------------------------------------------------------------

upload_portfolio();

//PER LA BARRA INFERIORE
const capital_gain  = document.querySelector('#capital_gain .balance_usd .value');
const patrimonio    = document.querySelector('#patrimonio .balance_usd .value');
const saldo         = document.querySelector('#disponibile .balance_usd .value');
//PER STORIC PERFORMANCE E LISTA MOVIMENTI
const storic        = document.querySelector('#P_L');
const listaMoviment = document.querySelector('#listMoviment');
//PER I BOTTONI DELLO STORICO MOVIMENTI
const button_moviments = document.querySelector('#button_moviments');
button_moviments.addEventListener('click' , show_moviment);
const button_showAll   = document.querySelector('#showAll');
button_showAll.addEventListener('click' , showAllMoviments);
 