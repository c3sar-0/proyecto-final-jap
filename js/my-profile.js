document.addEventListener("DOMContentLoaded", () => {
  const logeado = localStorage.getItem("estaLogeado");

  if (!logeado) {
    window.location.href = "/login.html";
  }

  let profile = JSON.parse(localStorage.getItem("profile"));

  const form = document.getElementById("formProfile");
  primerNombre.value = profile.primerNombre || "";
  segundoNombre.value = profile.segundoNombre || "";
  primerApellido.value = profile.primerApellido || "";
  segundoApellido.value = profile.segundoApellido || "";
  telefono.value = profile.telefono || "";
  email.value = localStorage.getItem("correo");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    profile = {
      primerNombre: primerNombre.value,
      segundoNombre: segundoNombre.value,
      primerApellido: primerApellido.value,
      segundoApellido: segundoApellido.value,
      email: email.value,
      telefono: telefono.value,
    };
    console.log(profile);
    localStorage.setItem("profile", JSON.stringify(profile));
  });

  (function () {
    "use strict";

    var forms = document.querySelectorAll(".needs-validation");

    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
  })();
});
