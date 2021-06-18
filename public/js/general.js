function metod_post(formData){ 
    const obj = 
    {      
        method : 'POST', 
        body   : formData, 
        headers: {"X-CSRF-TOKEN": document.querySelector("meta[name='csrf-token']").content}
    }
    return obj;
}
//---- FUNZIONI PER GESTIRE LE MODALI -------//
function close_modal(){
    //sblocco lo scroll
    document.body.classList.remove('no_scroll');
    //nascondo e svuoto la modale
    document.querySelector('#modal').classList.add('hidden');
    document.querySelector('#modal').innerHTML="";
}
function view_modal(){
    //ritorna la modale che poi andro ad utilizzare con le varie chiamate
    const modal = document.querySelector('#modal');
    modal.style.top = window.pageYOffset + 'px';
    document.body.classList.add('no_scroll');
    modal.classList.remove('hidden');
    //aggiungo l'eventListener alla modale per chiuderla
    return modal;
}
//----- ROUTE ------------//
const HOME_LOAD        ="home/load";
const NEWS_LOAD        ="news/load";
const PORTFOLIO_LOAD   ="portfolio/load";
const WATCHLIST_ASSETS ="updateAssets";
const WATCHLIST_NEWS   ="updateNews";
const SHOP             ="updateShop";
