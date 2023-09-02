/*(E1)Se crea una constante con el link donde se va a realizar el fetch*/
const carCategoryUrl =
  "https://japceibal.github.io/emercado-api/cats_products/" +
  localStorage.getItem("catID") +
  ".json";

/*(E1)Se crea una constante para tomar a la etiqueta*/
const carsContainer = document.getElementById("cars-container");
//(E2)se crea variable para mantener la lista de productos
let currentProductsArr = [];
//(E2) Se crea variable para mantener lista de productos filtrados
let filteredProductsArr = [];
//(E2) nombre de la categoria
let nameCategory;
//(E2) Se crea variable para guardar el filtro del navbar
let searchProductsArr = [];

//(E2) se crea una const que tiene una funcion flecha con un paramerto el cual me crea el cuerpo de products.html
const showProducts = (productsArr) => {
  //(E1)agregamos un primer fragmento a la etiqueta anteriormente llamada
  //=>Se recorre con un forEach en la parte de "products" de los datos obtenidos, para asi agregarlos posteriormente a la etiqueta llamada
  carsContainer.innerHTML = "";
  document.getElementById("catName").innerHTML = nameCategory;
  productsArr.forEach((product) => {
    const html = ` 
        <div class="list-group-item list-group-item-action cursor-active"> 
          <div class="row"> 
            <div class="col-3"> 
            <img src="${product.image}" alt="car image" class="img-thumbnail"> 
              </div> 
                <div class="col"> 
                  <div class="d-flex w-100 justify-content-between"> 
                  <div class="mb-1"> 
                  <small class="text-muted">${product.soldCount} vendidos</small> 
                  <h4>${product.name} - ${product.cost}${product.currency}</h4> 
                  <p>${product.description}</p> 
                </div> 
              </div> 
            </div> 
          </div> 
        </div> 
        `;
    carsContainer.innerHTML += html;
  });
};

const searchProducts = (array) => {
  if (navbar.value == "") {
    return filteredProductsArr.slice();
  } else {
    return array.filter((product) =>
      product.name
        .toLowerCase()
        .includes(
          navbar.value.toLowerCase() ||
            product.description
              .toLowerCase()
              .includes(navbar.value.toLowerCase())
        )
    );
  }
};

//(E2)Se cambia el fragmento de "getJSONData" a este sector
//(E1)Se utiliza la funcion "getJSONData" para hacer la peticion a la URL
//=>Evaluamos la respuesta y vemos que los datos se obtuvieron correctamente
//=>En caso de que sea positiva la evaluacion
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(carCategoryUrl).then(function (resultObj) {
    if (resultObj.status === "ok") {
      currentProductsArr = resultObj.data.products;
      nameCategory = resultObj.data.catName;
      filteredProductsArr = currentProductsArr.slice();
      searchProductsArr = currentProductsArr.slice();
      showProducts(currentProductsArr);
    }
  });
  //(E2)cuando se le da click a la etiqueta designada, se ordena en orden ascendiente (precio)
  document.getElementById("sortAsc").addEventListener("click", () => {
    filteredProductsArr.sort((a, b) => a.cost - b.cost);
    showProducts(filteredProductsArr);
  });
  //(E2)cuando se le da click a la etiqueta designada, se ordena en orden descendiente (precio)
  document.getElementById("sortDesc").addEventListener("click", () => {
    filteredProductsArr.sort((a, b) => b.cost - a.cost);

    showProducts(filteredProductsArr);
  });
  //(E2)cuando se le da click a la etiqueta designada, se ordena de menos vendidos a mas vendidos
  document.getElementById("sortByCount").addEventListener("click", () => {
    filteredProductsArr.sort((a, b) => b.soldCount - a.soldCount);
    showProducts(filteredProductsArr);
  });

  //(E2)cuando se le da click a la etiqueta designada, filtro segun un rango de precios
  document.getElementById("rangeFilterCount").addEventListener("click", () => {
    let min = document.getElementById("rangeFilterCountMin").value;
    let max = document.getElementById("rangeFilterCountMax").value;

    //(E2) Arreglo Desafio
    filteredProductsArr = searchProductsArr.filter(
      (product) => product.cost >= min && product.cost <= max
    );
    showProducts(filteredProductsArr);
  });
  //(E2) cuando se le da click a la etiqueta designada, limpia los filtros
  document.getElementById("clearRangeFilter").addEventListener("click", () => {
    filteredProductsArr = currentProductsArr.slice();
    searchProductsArr = searchProducts(currentProductsArr);
    showProducts(searchProductsArr);
  });

  //Agrega el correo en el nav
  correoNav();

  //(E2) Se crea el evento para la barra de navegación
  document.getElementById("navbar").addEventListener("input", () => {
    //(E2) Arreglo Desafio
    searchProductsArr = searchProducts(filteredProductsArr);
    showProducts(searchProductsArr);
  });
});
