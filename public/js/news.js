function create_box_n (element){
    //creo il box
    const box = document.createElement('div');
    box.classList.add('box_n');
    //creo gli elementi del box
    const save = document.createElement('div');
    save.classList.add('save');
    save.textContent = "💾";
    save.addEventListener('click',GoSave);
    const aux = document.createElement('div');
    aux.classList.add('aux');
    aux.appendChild(save);
    
    const title = document.createElement('p');
    title.textContent = element.title;
    title.classList.add('title');

    const image = document.createElement('img');
    image.src = element.image;

    const description = document.createElement('p');
    description.textContent = element.description;
    description.classList.add('description');

    const link = document.createElement('a');
    link.href = element.url;
    link.textContent = "Go to the article";

    //sistemazione del box
    box.appendChild(aux);
    box.appendChild(title);
    box.appendChild(image);
    box.appendChild(description);
    box.appendChild(link);

    return box;
}

//CARICAMENTO PAGINA
function result_load(json){
    
    const load = document.querySelector('#italian_news .load');
    if( load !== null)load.remove()
    
    const it_news = document.querySelector('#i_n');
    it_news.innerHTML="";
    
    //NOTIZIE IN PRIMO PIANO
    for(j of json.gnews){
        const box = create_box_n(j);
        it_news.appendChild(box);
    }
    //LISTA PREFERITI
    load_favorites(json.watchlist);
}

function load_favorites(json){
    
    if(json !== "No result found"){
        
        document.querySelector('#s_a').innerHTML ="";
        const saved_art = document.querySelector('#s_a');

        for(j of json){

            const box = create_box_n(j);
            saved_art.appendChild(box);
            box.setAttribute("data-id",j.id);
            const ex_save = box.querySelector('.save');
            ex_save.classList.remove('save');
            ex_save.classList.add('delete');
            ex_save.textContent="❌";
            ex_save.removeEventListener('click',GoSave);
            ex_save.addEventListener('click',detele_news);
        }
    }
}
let ida = 0;
function load_page(){
    console.log(ida++);
    const formData = new FormData();
    formData.append("action","load" );
    fetch(NEWS_LOAD, metod_post(formData)).then(response => response.json()).then(result_load);
}

function show_whatchlist(){
    const watchlist = document.querySelector('#Saved_articles');
    if(watchlist.classList.value === "hidden"){
        watchlist.classList.remove('hidden');
        button_watchlist.querySelector('.text_w').textContent = "Hide saved list ";

        //se è presente la sezione di ricerca la elimina
        if(document.querySelector('#Search_news').classList.value !== "hidden")close_search();
    }
    else{
        watchlist.classList.add("hidden");
        button_watchlist.querySelector('.text_w').textContent = "Show saved list ";
    }
}
//NOTIZIE CERCATE
function result_search(json){
    
    const section_search = document.querySelector('#search_news');

    const box_presenti = section_search.querySelectorAll('.box_n');
    if(box_presenti.length !== 0 )for(b of box_presenti)b.remove();

    const load = section_search.querySelector('.load');
    if( load !== null)load.remove()

    if(json === "No result found"){
        const tmp = document.createElement('div');
        tmp.classList.add('box_n');
        tmp.textContent = json;
        section_search.querySelector('#s_n').appendChild(tmp);
    }else{
        for(j of json){
            const box = create_box_n(j);
            section_search.querySelector('#s_n').appendChild(box);
        } 
    }
    //chiudi la watchlist se aperta
    if(document.querySelector('#Saved_articles').classList.value !== "hidden")show_whatchlist();
    
    section_search.querySelector('button').addEventListener('click',close_search);
    section_search.classList.remove('hidden');
}

function search_notice(){
    if(!/^([a-z\-\_])+$/.test(search_text.value.toLowerCase()))console.log('invalid search');
    else {
        const formData = new FormData();
        formData.append("action", "search");
        formData.append("value" ,  search_text.value);
        fetch(NEWS_LOAD, metod_post(formData)).then(response => response.json()).then(result_search);
    }
}

function close_search(){
    const tmp =  document.querySelector('#search_news');
    tmp.classList.add("hidden");
    const box = document.querySelector('#s_n').querySelectorAll('.box_n');
    for(b of box)b.remove();
}

//PER SALVARE ED ELIMINARE LE NOTIZIE DALLA WATCHLIST
function GoSave(event){
    
    let box = event.currentTarget.parentNode.parentNode;
    
    const formData = new FormData();
    formData.append('action'     ,"add");
    formData.append('title'      ,box.querySelector('.title').textContent);
    formData.append('description',box.querySelector('.description').textContent);
    formData.append('image'      ,box.querySelector('img').src);
    formData.append('url'        ,box.querySelector('a').href );

    fetch(WATCHLIST_NEWS,metod_post(formData)).then(response => response.json()).then(result_save);
}

function result_save(json){
    
    
    const n_nwes = document.querySelector('.num_w');
    n_nwes.textContent = "("+json+")";
    
    if(parseInt(json) === 1) button_watchlist.classList.remove('hidden');
    if(parseInt(json) === 0) {
        button_watchlist.classList.add('hidden');
        //nascondi la watchlist
        show_whatchlist();
    }
    //----Ricarica lista favoriti------//
    const formData = new FormData();
    formData.append('action' , 'watchlist');
    fetch( NEWS_LOAD ,metod_post(formData)).then(response => response.json()).then(load_favorites);
    //--------------------------------//
}

function detele_news(event){
    
    const formData = new FormData();
    formData.append('id'    , event.currentTarget.parentNode.parentNode.dataset.id);
    formData.append('action', "delete" );
    fetch('updateNews', metod_post(formData)).then(response => response.json()).then(result_save);
}

//---------------------------------------------------------------------------------------------------//

load_page();
setInterval(load_page, /*45*60*1000*/ 10*1000);//45minuti


//bottoni e input
const search_text = document.querySelector('input[name="search_news"]');
const button_search = document.querySelector('button.search');
button_search.addEventListener('click', search_notice);
const button_watchlist = document.querySelector('.watchlist');
button_watchlist.addEventListener('click', show_whatchlist);

if(button_watchlist.querySelector('.num_w').textContent === '(0)')
button_watchlist.classList.add('hidden');