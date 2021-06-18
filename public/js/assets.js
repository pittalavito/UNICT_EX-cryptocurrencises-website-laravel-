//---- MANIPOLANO I DATI RITORNATI DAL CONTROLLER HOME ----------------------------------------

function create_box(elem){
    //prende in ingresso un elemento del json che ricevo in risposta e ritorna il box con tutte le info
    //e gli eventi abbinati
    const box = document.createElement('div');
    box.classList.add('coin_box');
    //setto gli attributi
    box.setAttribute("data-symbol",elem.symbol);
    box.setAttribute("data-name",elem.name);
    box.setAttribute("data-watchlist",elem.watchlist);
    box.setAttribute("data-id",elem.id);
    box.setAttribute("data-img",elem.img);
    box.setAttribute("data-rank",elem.rank);
    box.setAttribute("data-price",elem.price);
    box.setAttribute("data-mk",elem.mk);
    box.setAttribute("data-var_day",elem.var_day);
    
    //creo i contenuti del box
    const img = document.createElement('img');    
    img.src = elem.img; 

    const rank = document.createElement('p');     
    rank.textContent = '#'+elem.rank;        
    rank.classList.add('rank');
    
    const name = document.createElement('p');     
    name.textContent = box.dataset.name;
    name.classList.add('name');

    const symbol = document.createElement('p');   
    symbol.textContent = box.dataset.symbol.toUpperCase();
    symbol.classList.add('symbol');

    const price = document.createElement('p');    
    price.textContent = parseFloat(elem.price).toFixed(3)+ "  $";
    price.classList.add('price');

    const var_day = document.createElement('p');  
    var_day.textContent = parseFloat(elem.var_day).toFixed(2)+"  %";
    if(elem.var_day < 0)var_day.classList.add('var_day_red');
    else var_day.classList.add('var_day_green');

    const mk = document.createElement('p');      
    mk.textContent = elem.mk + "  $";
    mk.classList.add('mk');
    
    const like = document.createElement('div');
    if(box.dataset.watchlist === "0")like.classList.add('unlike');
    else like.classList.add('like');
    like.textContent = "★";
    like.addEventListener('click', update_like);
    

    const buy = document.createElement('div');
    buy.classList.add('buy');
    buy.textContent="💰";
    buy.addEventListener('click',modal_buy);
    

    const chart = document.createElement('div');
    chart.classList.add('chart');
    chart.textContent = "📈";
    chart.addEventListener('click', modal_view_chart);

    //appendo tutto al box
    box.appendChild(rank);
    box.appendChild(img);
    box.appendChild(name);
    box.appendChild(symbol);
    box.appendChild(price);
    box.appendChild(var_day);
    box.appendChild(mk);
    box.appendChild(chart);
    box.appendChild(buy);
    box.appendChild(like);
    
    return box;
}
function list_return(json){
    
    const load = document.querySelector('#coin .load');
    if(load != null) load.remove();
    
    const existing_coin = document.querySelectorAll('#coin .coin_box' , '#watchlist .coin_box');
    if(existing_coin.length !== 0) for(box of existing_coin) 
    box.remove();

    const existing_pref = document.querySelectorAll('#watchlist .coin_box');
    if(existing_pref.length !== 0) for(box of existing_pref) 
    box.remove();
    
    //lista top 45
    for(elem of json.Top45){
        const coin      = document.querySelector('#coin');
        coin.appendChild( create_box(elem) );
    }
    //lista preferiti
    if(json.watchlist !== "isempty"){
        for(elem of json.watchlist){
            const watchlist = document.querySelector('#watchlist');
            watchlist.append( create_box(elem) );
        }
    }
}

//---- RICHIESTA AL CONTROLLER HOME LOAD-----------------------------------------------
function upload_lists(){

    const formData = new FormData();
    formData.append("q", "list");
    fetch( HOME_LOAD, metod_post(formData)).then(response => response.json()).then(list_return);
}

//---- FUNZIONI PER LA LISTA PREFERITI ------------------------------------------------------------------ 
function updated_like(json){
    
    const num_w = document.querySelector('.num_w').textContent = "("+json.num_like+")" ;
    const box   = document.querySelectorAll('.coin_box[data-id='+json.id_crypto+']');
    let i = 0; //per evitare di copiare due volte nella watchlist
    
    if(parseInt(json.num_like) === 0){
        button_watchlist.classList.add('hidden');
        document.querySelector('#watchlist').classList.add('hidden');
    }
    else button_watchlist.classList.remove('hidden');

    for(b of box){
        if(json.action == 0){//deve essere aggiunta alla lista preferiti  
            const unlike = b.querySelector('.unlike');
            unlike.classList.add('like');
            unlike.classList.remove('unlike');
            b.dataset.watchlist = 1;
            if(b.parentNode.id !== "watchlist" && i === 0 ){
                const new_box = b.cloneNode(true);
                document.querySelector('#watchlist').append(new_box);
                new_box.querySelector('.like').addEventListener('click' , update_like);
                new_box.querySelector('.chart').addEventListener('click', modal_view_chart);
                new_box.querySelector('.buy').addEventListener('click',modal_buy);
                i++;
            }
        }
        if(json.action == 1)//si trova gia nella lista preferiti
        if(b.parentNode.id === "watchlist")b.remove();
        else{
            const like = b.querySelector('.like');
            like.classList.add('unlike');
            like.classList.remove('like');
            b.dataset.watchlist = 0 ;
        }
    }
}
function update_like(event){
    
    const id_crypto = event.currentTarget.parentNode.dataset.id;
    const bool_watchlist = parseInt(event.currentTarget.parentNode.dataset.watchlist);

    const formData = new FormData();
    formData.append("action"    , bool_watchlist);
    formData.append("id_crypto" , id_crypto);
    
    fetch( WATCHLIST_ASSETS, metod_post(formData)).then(response => response.json()).then(updated_like);
}
function show_whatchlist(){
    
    const watchlist = document.querySelector('#watchlist');
    if(watchlist.classList.value === "hidden"){
        watchlist.classList.remove('hidden');
        button_watchlist.querySelector('.text_w').textContent = "Hide watchlist ";

        //se è presente la sezione di ricerca la elimina
        if(document.querySelector('#tmp_search').classList.value !== "hidden")close_search();
    }
    else{
        watchlist.classList.add("hidden");
        button_watchlist.querySelector('.text_w').textContent = "Show watchlist ";
    }
}

//---- FUNZIONI PER LA RICERCA ------------------------------------------------------------------------
function search_crypto(){
        
    const formData = new FormData();
    formData.append("q","id");
    formData.append("value" , search_text.value.toLowerCase()); 

    fetch( HOME_LOAD, metod_post(formData)).then(response => response.json()).then(result_search);
    
}
function result_search(json){
    
    
    const section_search = document.querySelector('#tmp_search');
    
    const box_presenti = section_search.querySelector('.coin_box');
    if(box_presenti !== null)box_presenti.remove();
    
    //chiudi la watchlist se aperta
    if(document.querySelector('#watchlist').classList.value !== "hidden")show_whatchlist();

    if(json === "No result found"){
        const tmp = document.createElement('div');
        tmp.classList.add('coin_box');
        tmp.textContent = json;
        section_search.appendChild(tmp);
    }else{
        for(j of json){
            const box =create_box(j);
            section_search.appendChild(box);
        }
    }
    section_search.classList.remove('hidden');
    
    section_search.querySelector('button').addEventListener('click',close_search);
}
function close_search(){
    document.querySelector('#tmp_search').classList.add("hidden");
    document.querySelector('#tmp_search').querySelector('.coin_box').remove();
}

//--- FUNZIONI PER MOSTRARE IL GRAFICO DELLA CRYPTOVALUTA AL CLIK SULL' "emoji grafico"
function create_widget(box){
    
    const div_c_modal = document.createElement('div');
    div_c_modal.classList.add('modal_c');
    //---info elemento-----------------------------------------------------------------------------------
    const box_c_modal = document.createElement('div');
    box_c_modal.classList.add('box_c_modal');
    //elementi del box
    const name = document.createElement('h1');
    name.textContent = box.dataset.id;
    const image =  document.createElement('img');
    image.src =  box.dataset.img;
    const rank = document.createElement('p');
    rank.textContent = "Rank: " + box.dataset.rank + "°";
    const market_cap = document.createElement('p');
    market_cap.textContent ="Market cap:  " + box.dataset.mk + " $";
    const price = document.createElement('p');
    price.textContent = "Price:  " + box.dataset.price + " $";
    const price_var24 = document.createElement('p');
    price_var24.textContent = "Var 24h:  "+ box.dataset.var_day + " %";
    //appendo gli elmenti al box
    const div1 = document.createElement('div');
    div1.appendChild(name);
    div1.appendChild(image);
    div1.appendChild(rank);
    box_c_modal.appendChild(div1);
    const div2 = document.createElement('div');
    div2.appendChild(market_cap);
    div2.appendChild(price);
    div2.appendChild(price_var24);
    box_c_modal.appendChild(div2);
    //---widget grafico----------------------------------------------------------------------------------
    const script_2 = document.createElement('script');
    script_2.src = "https://widgets.coingecko.com/coingecko-coin-compare-chart-widget.js";
    const widget_2 = document.createElement('coingecko-coin-compare-chart-widget');
    widget_2.coinIds = box.dataset.id;
    widget_2.currency = "usd";
    widget_2.locale = "en";
    //---creo un bottone per chiudere
    const close = document.createElement('button');
    close.textContent = "close modal";
    div_c_modal.appendChild(box_c_modal);
    div_c_modal.appendChild(script_2);
    div_c_modal.appendChild(widget_2);
    div_c_modal.appendChild(close);
    return div_c_modal;  
}
function modal_view_chart(event){
    const elem = create_widget(event.currentTarget.parentNode);
    const modal = view_modal();
    modal.appendChild(elem);
    modal.querySelector('button').addEventListener('click',close_modal);
}

//---- FUNZIONI PER "COMPERARE" QUANDO SI CLICCA SUL "sacchetto di $""
function create_buy_table(elem){
    //crea la tabella per l'acquisto ritorna il box cosi siffato
    const box = document.createElement('div');
    box.classList.add('buy_box');
    
    const row_0 = document.createElement('div');
    row_0.classList.add('row_0');
        const sep = document.createElement('p');
        sep.classList.add('p_row'); 
        const button_close = document.createElement('p');
        button_close.textContent = "Close";
        button_close.classList.add('close_buy');
    row_0.appendChild(sep);
    row_0.appendChild(button_close);

    const row_1 = document.createElement('div');
    row_1.classList.add('row');
        const img = document.createElement('img');
        img.src = elem.dataset.img;
        const id_crypto = document.createElement('p');
        id_crypto.classList.add('id_crypto');
        id_crypto.textContent = elem.dataset.id;
    row_1.appendChild(img);
    row_1.appendChild(id_crypto);

    const row_2 = document.createElement('div');
    row_2.classList.add('row');
        const price = document.createElement('p');
        price.textContent = "Prezzo attuale($):";
        price.classList.add('p_row');
        const current_price = document.createElement('p');
        current_price.textContent=elem.dataset.price;
        current_price.classList.add('current_price');
    row_2.appendChild(price);
    row_2.appendChild(current_price);
    
    const row_3 = document.createElement('div');
    row_3.classList.add('row');
        const inv = document.createElement('p');
        inv.textContent = "Importo($):";
        inv.classList.add('p_row');
        const input = document.createElement('input');
        input.type="number";
        input.min = 0;
    row_3.appendChild(inv);
    row_3.appendChild(input)

    const row_4 = document.createElement('div');
    row_4.classList.add('row');
        const saldo = document.createElement('p');
        saldo.textContent = "Saldo attuale($):";
        saldo.classList.add('p_row');
        const value_saldo = document.createElement('p');
        value_saldo.textContent= document.querySelector('#saldo').textContent;
        value_saldo.classList.add('balance');
    row_4.appendChild(saldo);
    row_4.appendChild(value_saldo);
    
    const row_5 = document.createElement('div');
    row_5.classList.add('row');
        const button_buy = document.createElement('button');
        button_buy.classList.add('button_buy');
        button_buy.textContent = "Compra";
    row_5.appendChild(button_buy);
    
    const buy_msg = document.createElement('p');
    buy_msg.id ='buy_msg';
    buy_msg.classList.add('hidden');
    buy_msg.textContent="";
    
    box.appendChild(row_0);
    box.appendChild(row_1);
    box.appendChild(row_2);
    box.appendChild(row_3);
    box.appendChild(row_4);
    box.appendChild(row_5);
    box.appendChild(buy_msg);

    return box;    
}
function modal_buy(event){
    const elem = create_buy_table(event.currentTarget.parentNode);
    const modal = view_modal();
    modal.appendChild(elem);
    modal.querySelector('.close_buy').addEventListener('click',close_modal);
    const button_buy = modal.querySelector('.button_buy');
    button_buy.addEventListener('click', buy);
}
function buy(){
    //per inviare la conferma della quantita "virtualmente acquistata"  
    const saldo     =  parseFloat(document.querySelector('#saldo').textContent);
    const importo   =  parseFloat(document.querySelector('input[type=number]').value);
    if( saldo > importo && importo > 0){
        const formData = new FormData();
        formData.append("action","buy");
        formData.append("id_crypto"     ,document.querySelector('.id_crypto').textContent);
        formData.append("img"           ,document.querySelector('.row img').src);
        formData.append("importo"       ,importo);
        formData.append("current_price" ,parseFloat(document.querySelector('.current_price').textContent));
        
        fetch( SHOP, metod_post(formData)).then(response => response.json()).then(buy_response);
    }else{
        const row = document.querySelectorAll('.row');
        for(r of row)r.remove();
        const msg = document.querySelector('#buy_msg') ;
        msg.classList.remove('hidden');
        msg.textContent = "Errore controllare l'importo";
        setTimeout(close_modal , 2000);
    };
}
function buy_response(json){
    
    const row = document.querySelectorAll('.row');
    for(r of row)r.remove();
    document.querySelector('#saldo').textContent = json.saldo;
    const msg = document.querySelector('#buy_msg') ;
    msg.classList.remove('hidden');
    msg.textContent= json.msg;
    setTimeout(close_modal, 2000);
}

upload_lists(); 
setInterval(upload_lists, 10*1000); //ogni 10 secendi

//bottone watchlist
const button_watchlist = document.querySelector('.watchlist');
button_watchlist.addEventListener('click',show_whatchlist);
if(button_watchlist.querySelector('.num_w').textContent === '(0)')
button_watchlist.classList.add('hidden');
//bottone e input text per ricerca
const search_text = document.querySelector('input[name="search_crypto"]');
const button_search = document.querySelector('button.search');
button_search.addEventListener('click', search_crypto);







