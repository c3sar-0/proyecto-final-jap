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

      <div class="row">
        <div class="col text-end">
          <div class="btn-group btn-group-toggle mb-4" data-bs-toggle="buttons">
            <input type="radio" class="btn-check" name="options" id="sortAsc">
            <label class="btn btn-light" for="sortAsc"><i class="fas fa-sort-amount-down mr-1"></i>$</label>
            <input type="radio" class="btn-check" name="options" id="sortDesc">
            <label class="btn btn-light" for="sortAsc"><i class="fas fa-sort-amount-up mr-1"></i>$</label>
            <input type="radio" class="btn-check" name="options" id="sortByCount" checked>
            <label class="btn btn-light" for="sortByCount"><i class="fas fa-sort-amount-down mr-1"></i>Rel</label>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 offset-lg-6 col-md-12 mb-1 container">
          <div class="row container p-0 m-0">
            <div class="col">
              <p class="font-weight-normal text-end my-2">Cant.</p>
            </div>
            <div class="col">
              <input class="form-control" type="number" placeholder="min." id="rangeFilterCountMin">
            </div>
            <div class="col">
              <input class="form-control" type="number" placeholder="máx." id="rangeFilterCountMax">
            </div>
            <div class="col-3 p-0">
              <div class="btn-group" role="group">
                <button class="btn btn-light btn-block" id="rangeFilterCount">Filtrar</button>
                <button class="btn btn-link btn-sm" id="clearRangeFilter">Limpiar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
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

