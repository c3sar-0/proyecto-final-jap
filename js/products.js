/*(E1)Se crea una constante con el link donde se va a realizar el fetch*/
const carCategoryUrl =
  "https://japceibal.github.io/emercado-api/cats_products/" + localStorage.getItem('catID') + ".json";
/*(E1)Se crea una constante para tomar a la etiqueta*/
const carsContainer = document.getElementById("cars-container");
//(E2)se crea variable para mantener la lista de productos
let currentProductsArr = [];
//(E2) Se crea variable para mantener lista de productos filtrados
let filteredProductsArr= [];
//(E2) nombre de la categoria
let nameCategory;

//(E2) se crea una const que tiene una funcion flecha con un paramerto el cual me crea el cuerpo de products.html
const showProducts = (productsArr) => {
//(E1)agregamos un primer fragmento a la etiqueta anteriormente llamada
//=>Se recorre con un forEach en la parte de "products" de los datos obtenidos, para asi agregarlos posteriormente a la etiqueta llamada
<<<<<<< Updated upstream
  getJSONData(carCategoryUrl).then((res) => {
    if (res.status == "ok") {
      carsContainer.innerHTML += `
      <center>
        <h1>Productos</h1>
          <h3>Verás aquí todos los productos de la categoría ${res.data.catName}</h3>   
      </center>
      `;
      res.data.product.forEach((product) => {
=======
    carsContainer.innerHTML= "";
      document.getElementById("catName").innerHTML = nameCategory;
        productsArr.forEach((product) => {
>>>>>>> Stashed changes
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

