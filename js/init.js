const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
};

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
};

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      hideSpinner();
      return result;
    });
};
//Agrega el correo en el nav
function correoNav() {
  if (!localStorage.getItem("estaLogeado")) {
    window.location.href = "login.html";
  }

  // En caso de que haya un correo ingresado, se cambia el texto de "Iniciar Sesion" a el valor del correo.
  // (E4) Se agrega un menú desplegable.
  const mostrarLogin = document.getElementById("login");
  if (localStorage.getItem("correo")) {
    mostrarLogin.innerHTML = ` <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              ${localStorage.getItem("correo")}
            </a>
            <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
              <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
              <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
              <li><a class="dropdown-item" href="#" id ="cambiarModo">Cambiar modo</a></li>
              <li><a class="dropdown-item" id = 'logOut'>Cerrar sesión</a></li>
            </ul>
          </li>
        </ul>
      </div>`;
  }

  //(E4) Se llama por id al botón "cerrar sesion" del menú desplegable y al hacerle click se elminan
  //del localStorage los datos del usuario anteriormente logeado, y lurgo redirige a la pantalla de login.

  const logOut = document.getElementById("logOut");

  logOut.addEventListener("click", (e) => {
    e.preventDefault();

    localStorage.removeItem("estaLogeado");
    localStorage.removeItem("correo");

    window.location.href = "login.html";
  });

  const cambiarModo = document.getElementById("cambiarModo");
  const body = document.querySelector("body");

  // (E4) Función para cambiar modo día y noche
  function cambiarModoActual() {

    if (body.classList.contains("darkmode")) {
      body.classList.remove("darkmode");
      localStorage.setItem("Modo", "Light");
    } else {
      body.classList.add("darkmode");
      localStorage.setItem("Modo", "Dark");
    }
    
  };

  // (E4) Verificar el modo actual en localStorage y aplicarlo
  if (localStorage.getItem("Modo") === "Dark") {
    body.classList.add("darkmode");
  };

  cambiarModo.addEventListener("click", (e) => {
    e.preventDefault();
    cambiarModoActual();
  });
};
