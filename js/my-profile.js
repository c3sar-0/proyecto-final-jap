document.addEventListener("DOMContentLoaded", () => {
  const logeado = localStorage.getItem("estaLogeado");

  if (!logeado) {
    window.location.href = "/login.html";
  }

  const formulario = document.getElementById("formProfile");
  const fotoPerfil = document.getElementById("fotoPerfil");
  fotoPerfil.addEventListener("change", (e) => {
    console.log(e.target.value);
  });

  function saveFileToLocalStorage() {
    const fileInput = document.getElementById("fotoPerfil");

    // Check if a file has been selected
    if (fileInput.files.length === 0) {
      return;
    }

    // Get the selected file
    const selectedFile = fileInput.files[0];

    // Create a FileReader to read the file
    const reader = new FileReader();

    // Define a function to execute when the file is read
    reader.onload = function (event) {
      const fileContent = event.target.result;

      // Save the file content to local storage
      localStorage.setItem("profile_picture", fileContent);
    };

    // Read the file as a data URL
    reader.readAsDataURL(selectedFile);
  }

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
      };
      saveFileToLocalStorage();
      console.log(profile);
      localStorage.setItem("profile", JSON.stringify(profile));
    }

    formulario.classList.add("was-validated");
  });

  let profile = JSON.parse(localStorage.getItem("profile"));

  const imgPerfil = document.getElementById("imgPerfil");
  imgPerfil.src =
    localStorage.getItem("profile_picture") || "/img/img_perfil.png";

  primerNombre.value = profile.primerNombre || "";
  segundoNombre.value = profile.segundoNombre || "";
  primerApellido.value = profile.primerApellido || "";
  segundoApellido.value = profile.segundoApellido || "";
  telefono.value = profile.telefono || "";
  email.value = localStorage.getItem("correo");
});
