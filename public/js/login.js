function submit(event)
{   
    let tmp = null;
    // Verifica se tutti i campi sono riempiti
    if(form.username.value.length == 0 ||form.password.value.length == 0)
    {
        // Avvisa utente
        tmp = document.createElement('h1');
        tmp.textContent="Riempire tutti i campi";
        // Blocca l'invio del form
        modal_error(tmp);
        event.preventDefault();
        return 0;
    }
    
    if(!/^([a-z\-\.\_])+$/.test(form.username.value)){
        
        tmp = document.createElement('h1');
        tmp.textContent="l'username non puo contenere spazi , o caratteri strani";
        // Blocca l'invio del form
        modal_error(tmp);
        event.preventDefault();
        return 0;
    }
}
// se le credenziali inviate non sono valide
//console.log(document.querySelector("#err") !== null);
if (document.querySelector("#err") !== null)modal_error(document.querySelector("#err"));

// Riferimento al form
const form = document.forms['login'];
form.addEventListener('submit', submit);
