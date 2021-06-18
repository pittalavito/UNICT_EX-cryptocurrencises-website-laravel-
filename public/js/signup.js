//per gestire gli errori degli elementimdel form
function form_error(elem , stringa){
    elem.value="";
    elem.classList.add("err");
    elem.setAttribute("placeholder","*"+stringa);
}
//ultimo controllo prima dell'invio del form
function submit(event){
    // Verifica se tutti i campi sono riempiti
    if( form.nome.value.length === 0 ||
        form.cognome.value.length === 0 ||
        form.email.value.length === 0 ||
        form.username.value.length === 0||
        form.password.value.length === 0 ||
        form.conf_password.value.length === 0 )
    {
        // Avvisa utente
        const tmp = document.createElement('h1');
        tmp.textContent="Riempire tutti i campi";
        modal_error(tmp);//----------------------------------------------------modal
        // Blocca l'invio del form
        event.preventDefault();
        return;
    }  
    //verica password 
    /*const check_psw=/^[A-Za-z0-9]{8,12}$/;
    if(!check_psw.test(form.password.value))form_error(form.password , "maiuscole , minuscole , min 8 caratteri");*/
    if (form.password.value.length < 8){
        form_error(form.password , "Min 8 caratteri");
        event.preventDefault();
    }
    if (form.password.value !== form.conf_password.value){
        form_error(form.conf_password ,"Le password non coincidono");
        event.preventDefault();
    }
    //verifica nome
    if(!/^([a-z\-\.\_])+$/.test(form.nome.value)){
        form_error(form.nome ,"formato non valido");
        event.preventDefault();
    }
    //verifica cognome
    if(!/^([a-z\-\.\_])+$/.test(form.nome.value)){
        form_error(form.cognome ,"formato non valido");
        event.preventDefault();
    }
}
//per username e email
function call_db( elem, name_attr){
    
    function check(json){
        if(json)form_error(form[name_attr] , "gia in uso");
        else{
            form[name_attr].classList.remove('err');
            form[name_attr].setAttribute("placeholder","");
        }
    }
    
    function onResponse(response){ return response.json();}
    
    const ROUTE_UNIQUE = 'signup/unique/';
    const obj = 
    {
        name_attr : encodeURIComponent(String(name_attr)),
        value     : encodeURIComponent(String(elem)).toLowerCase()
    };

    fetch(ROUTE_UNIQUE + JSON.stringify(obj)).then(onResponse).then(check);
}

function check_in_db(event){

    const content_text = event.currentTarget.value;
    const name_attr    = event.currentTarget.name.toString();
    if(content_text.length === 0)return;
    if(name_attr === "email"){
        const check_mail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if ( !check_mail.test(form.email.value) )form_error(form.email , "Email non valida");
        else{
            form[name_attr].classList.remove('err');
            form[name_attr].setAttribute("placeholder","");
            call_db(content_text , name_attr);
        }
    }
    else{//name_attr ==="username"
        const check_us = /^[a-zA-Z0-9_]{1,15}$/;
        if ( !check_us.test(form.username.value) )form_error(form.username , "Formato non valido");
        else {
            form[name_attr].classList.remove('err');
            form[name_attr].setAttribute("placeholder","");
            call_db(content_text , name_attr);
        }
    }
}
//per le immagini
function check_img(event )
{   
    const img = form.img.files ;
    const img_size = img['0'].size;
    const img_type = img['0'].type;
    let tmp = null;
        
    if(img_size > 4194304){
        //avvisa l'utenete
        tmp = document.createElement('h1');
        tmp.textContent="Dimensione eccessiva (max 4mb)";
        modal_error(tmp);//-------------------------------------------------------------
        event.currentTarget = null;
    }
    
    if(!(img_type == "image/png" || 
        img_type == "image/jpg"  || 
        img_type == "image/jpeg" ||
        img_type == "image/gif"  )){
        //avvisa l'utente
        tmp = document.createElement('h1');
        tmp.textContent="Non è un immagine";
        modal_error(tmp);//---------------------------------------------------------------
        
        event.currentTarget.value = null;
    }
}

const form = document.forms["signup"];
//aggiungo i Listener
form.addEventListener('submit', submit);
form['username'].addEventListener('blur',check_in_db);
form['email'].addEventListener('blur',check_in_db);
form["img"].addEventListener('change', check_img);


