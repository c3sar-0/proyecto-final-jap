

document.addEventListener("DOMContentLoaded", async () => {
  //id de div linea 40
  /*(E3) Creamos constantes donde almacenamos la información que creamos en el html, 
    además guardamos la url con el producto y los llamamos según el id.*/

  const divInfo = document.getElementById("product-info");
  const divCarrusel = document.getElementById("carousel");
  const divComentario = document.getElementById("comentario");
  const productInfo = localStorage.getItem("idProduc");
  let puntuacion = 0;
  const stars = document.querySelectorAll(".star");
  const urlInfo = `${PRODUCT_INFO_URL}${productInfo}.json`;

  function productCarrito(compra) {
    
    fetch(CART_INFO_URL, 
      {
        method: "POST",
         headers: 
        {
          "Content-type": "application/json",
          "access-token": localStorage.getItem("token"),
        },
        body:
        JSON.stringify({
        
        "id": compra.data.id,
        "unitCost": compra.data.cost,
        "currency": compra.data.currency,
        "name": compra.data.name,
        "count": 1,
        "image": compra.data.images[0]
        })
      })
  }

  /* (E3) con el JSONData accedemos ala información de cada producto y creamos el cuerpo del html*/
  const res1 = await getJSONData(urlInfo);
  divInfo.innerHTML = "";
  divInfo.innerHTML += `
      <div>
          <div class="d-flex justify-content-between mt-5">
            <h3 id="nomProducto">${res1.data.name}</h3>
            <button class="btn btn-outline-warning text-secondary" id="btnComprar">Comprar</button>
          </div>
          <hr id="hrProductos">
          <strong>Precio</strong>
          <p>${res1.data.currency}${res1.data.cost}</p>
          <strong>Descripción</strong>
          <p>${res1.data.description}</p>
          <strong>Categoría</strong>
          <p>${res1.data.category}</p>
          <strong>Cantidad de vendidos</strong>
          <p>${res1.data.soldCount}</p>
          <strong>Imágenes ilustrativas</strong>   
      </div>    
  `;
  const imagenes = res1.data.images;
  document.getElementById("btnComprar").addEventListener("click", () => {
    fetch(CART_INFO_URL,
      {
        headers: 
        {
          "access-token": localStorage.getItem("token"),
        }
      })
    .then ((response)=>response.json())
    .then((data)=>
    {
      let existe=false;
      data.forEach(product=>
      {
        if(product.id==res1.data.id)
        {
          existe=true
        }
      });
    if(!existe)
    {
      productCarrito(res1)
    }
    })
  });

  //(E4) Se crea una imagen del carrusel con "active" y el resto de las imagenes con un bucle for
  divCarrusel.innerHTML += `
  <div class="carousel-item active">
                          <img src= "${res1.data.images[0]}" class="imgProductos">
                          </div>`;
  for (let i = 1; i < imagenes.length; i++) {
    divCarrusel.innerHTML += `<div class="carousel-item">
                          <img src= "${imagenes[i]}" class="imgProductos">
                          </div>`;
  }
  divCarrusel.innerHTML += `</div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>`;

  //(E4)se crea funcion para mostrar productos relacionados

  const relatedProduct = async () => {
    const products = res1.data.relatedProducts;
    const divRelated = document.getElementById("related");
    //(E4) Se crean divs con la imagen y nombre de los productos relacionados
    //Al hacer click en ellos te envia al producto correspondiente
    products.forEach((product) => {
      divRelated.innerHTML += `<div class ="borde" id="${product.id}" onclick="productoRecomendado(id)">
      <img src="${product.image}" class = "imgProducts">
      <p class="parrafoProductInfo">${product.name}</p>
    </div>`;
    });
  };
  relatedProduct();

  function generateComment(user, dateTime, score, description) {
    const html = `
    <div class="comentario">
        <br>
        <p><strong> ${user} </strong> - ${dateTime}</p>
        <p class="descripcionComentario">${description}</p>
        <p><span class="fa fa-star ${score >= 1 && "checked"}"></span>
        <span class="fa fa-star ${score >= 2 && "checked"}"></span>
        <span class="fa fa-star ${score >= 3 && "checked"}"></span>
        <span class="fa fa-star ${score >= 4 && "checked"}"></span>
        <span class="fa fa-star ${score == 5 && "checked"}"></span></p>
    </div>    
`;
    return html;
  }

  //(E3)Accedemos al json de los comentarios
  //(E3)Con un forEach recorremos el array para poder mostrar los comentarios y puntajes de cada uno de los productos
  const urlComments = `${PRODUCT_INFO_COMMENTS_URL}${productInfo}.json`;
  const res2 = await getJSONData(urlComments);
  divComentario.innerHTML += `
          <h4 id="tituloComentarios">Comentarios</h4>`;
  res2.data.forEach((element) => {
    divComentario.innerHTML += generateComment(
      element.user,
      element.dateTime,
      element.score,
      element.description
    );
  });

  /*(E3) cuando el usuario envía la información, pasa a mostrarse en pantalla junto al resto de las opiniones*/
  document.getElementById("formPuntuacion").addEventListener("submit", (e) => {
    e.preventDefault();
    divComentario.innerHTML += generateComment(
      localStorage.getItem("correo"),
      new Date().toLocaleDateString(),
      puntuacion,
      document.getElementById("opinionUsuario").value
    );

    //(E3) una vez que se manda la info, se limpia el valor del textarea y la calificación por estrellas
    document.getElementById("opinionUsuario").value = "";
    stars.forEach((star) => {
      star.classList.remove("checked");
    });
  });

  //(E3) Creamos funcion que pinte estrellas segun la calificacion del usuario
  stars.forEach((star, index) => {
    star.addEventListener("click", function () {
      for (let i = 0; i <= index; i++) {
        stars[i].classList.add("checked");
        puntuacion = i + 1;
      }
      for (let i = index + 1; i < stars.length; i++) {
        stars[i].classList.remove("checked");
      }
    });
  });
});

//(E4) Cambia el producto recomendado
function productoRecomendado(id) {
  localStorage.setItem("idProduc", id);
  window.location.reload();
}
