document.addEventListener("DOMContentLoaded", function () {
  /*Se extrae el formulario a una variable*/
  const formulario = document.getElementById("login-form");
  const mail = document.getElementById("correo");
  const url = "http://localhost:3000/login";

  /*Se crea un evento para el momento que se envía el formulario*/
  formulario.addEventListener("submit", function (event) {
    /*Función que frena las acciones por defecto de un submit (recargar la página) */
    event.preventDefault();

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: mail.value,
        password: document.getElementById("password").value,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        /*Funcion que almacenacena la información de que el usuario está logeado al enviar el formulario*/
        localStorage.setItem("estaLogeado", true);
        //Guardo el valor del mail en un item "correo"
        localStorage.setItem("correo", mail.value);
        // Guardamos la variable profile en el localStorage, que contiene la información del usuario (ahora solo contiene el email)
        localStorage.setItem("profile", JSON.stringify({ email: mail.value }));
        window.location.href = "index.html";
      });
  });
});
