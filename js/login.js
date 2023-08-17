document.addEventListener("DOMContentLoaded", function(){

/*Se extrae el formulario a una variable*/
const formulario = document.getElementById("login-form");

/*Se crea un evento para el momento que se envía el formulario*/
formulario.addEventListener("submit", function(event){

/*Función que frena las acciones por defecto de un submit (recargar la página) */
    event.preventDefault();

    sessionStorage.setItem("estaLogeado", true);

/*Redurección a la página de inicio luego del envío del formulario*/
    window.location.href="index.html"
});

});