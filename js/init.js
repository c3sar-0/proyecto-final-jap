const CATEGORIES_URL = "http://localhost:3000/cats/";
const PUBLISH_PRODUCT_URL = "http://localhost:3000/sell/publish/";
const PRODUCTS_URL = "http://localhost:3000/cats_products/";
const PRODUCT_INFO_URL = "http://localhost:3000/products/";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/products_comments/";
const CART_INFO_URL = "http://localhost:3000/user_cart/";
const CART_BUY_URL = "http://localhost:3000/cart/buy/";
const EXT_TYPE = ".json";
//localStorage.setItem('carrito',JSON.stringify([]));
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
    mostrarLogin.innerHTML = ` 
    <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              ${localStorage.getItem("correo")}
            </a>
            <ul class="dropdown-menu dropdown-menu-dark bg-dark">
              <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
              <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
              <li><a class="dropdown-item" href="#" id ="cambiarModo">Cambiar modo</a></li>
              <li><a class="dropdown-item" id = 'logOut'>Cerrar sesión</a></li>
            </ul>
          </li>`;
  }

  //(E4) Se obtiene la etiqueta anchor del menú desplegable
  const cambiarModo = document.getElementById("cambiarModo");

  cambiarModo.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    //(E4) Se guarda el modo en localStorage.
    if (document.body.classList.contains("dark")) {
      localStorage.setItem("dark-mode", "true");
    } else {
      localStorage.setItem("dark-mode", "false");
    }
  });

  //(E4) Se obtiene el modo actual y se añade o remueve la clase dark al body.
  if (localStorage.getItem("dark-mode") === "true") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}

async function loadCart() {
  const url = CART_INFO_URL;
  const carrito = localStorage.getItem("carrito");
  if (!carrito || JSON.parse(carrito).length == 0) {
    const promesa = await fetch(url, {
      method: "GET",
      headers: {
        "access-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzAwNTg3Nzc1fQ.ePga1TU1V7_h88FRdUrhtOKJ-YiK25gjEIb12_Gvkik",
      },
    });
    if (promesa.ok) {
      const datosCompra = await promesa.json();
      localStorage.setItem("carrito", JSON.stringify(datosCompra.articles));
    } else {
      console.log("error");
    }
  }
}

loadCart();
correoNav();

//(E4) Se llama por id al botón "cerrar sesion" del menú desplegable y al hacerle click se elminan
//del localStorage los datos del usuario anteriormente logeado, y luego redirige a la pantalla de login.

const logOut = document.getElementById("logOut");

logOut.addEventListener("click", (e) => {
  localStorage.removeItem("estaLogeado");
  localStorage.removeItem("correo");
  localStorage.removeItem("profile");
  localStorage.removeItem("profile_picture");
  window.location.href = "login.html";
});
