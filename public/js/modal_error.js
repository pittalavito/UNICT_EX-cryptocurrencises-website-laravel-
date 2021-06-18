//prende in ingresso un elemento h1 creato o da js o da php
function modal_error(elem){
    
    if(document.querySelector('#window_error') !== null)document.querySelector('#window_error').remove();

    const modal = document.querySelector('#modal');
    const window_err = document.createElement('div');
    window_err.id = "window_error";
    //posiziono la modale da inizio pagina , disabilito lo scroll , e tolgo la classe hidden
    modal.style.top = window.pageYOffset + 'px';
    document.body.classList.add('no_scroll');
    modal.classList.remove('hidden');
    //creo una finestra dove appendo elem e un bottone per chiudere la modale
    modal.appendChild(window_err);
    window_err.appendChild(elem);
    const button = document.createElement('button');
    button.textContent = "Ok";
    window_err.appendChild(button);
    //aggiungo l'eventListener alla modale per chiuderla
    button.addEventListener('click' , close_modal);  
}

//semplicemente per chiudere la modale
function close_modal(){
    //sblocco lo scroll
    document.body.classList.remove('no_scroll');
    //nascondo e svuoto la modale
    document.querySelector('#modal').classList.add('hidden');
    document.querySelector('#window_error').remove();
}