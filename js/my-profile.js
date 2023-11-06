document.addEventListener("DOMContentLoaded", () => {
  const logeado = localStorage.getItem("estaLogeado");

  if (!logeado) {
    window.location.href = "/login.html";
  }

  /*(function () {
    "use strict";

    let forms = document.querySelectorAll(".needs-validation");

    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          } else {
            
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
  })();*/

  const formulario = document.getElementById("formProfile");
  const fotoPerfil = document.getElementById("fotoPerfil");

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!formulario.checkValidity()) {
      e.stopPropagation();
    } else {
      profile = {
        primerNombre: primerNombre.value,
        segundoNombre: segundoNombre.value,
        primerApellido: primerApellido.value,
        segundoApellido: segundoApellido.value,
        email: email.value,
        telefono: telefono.value,
        fotoPerfil: fotoPerfil.src,
      };
      console.log(profile);
      localStorage.setItem("profile", JSON.stringify(profile));
    }

    formulario.classList.add("was-validated");
  });

  let profile = JSON.parse(localStorage.getItem("profile"));

  console.log(profile.fotoPerfil);

  primerNombre.value = profile.primerNombre || "";
  segundoNombre.value = profile.segundoNombre || "";
  primerApellido.value = profile.primerApellido || "";
  segundoApellido.value = profile.segundoApellido || "";
  telefono.value = profile.telefono || "";
  email.value = localStorage.getItem("correo");
  fotoPerfil.src = profile.fotoPerfil || fotoPerfil.src;
});
