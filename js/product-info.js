document.addEventListener("DOMContentLoaded", async () => {
  //id de div linea 40
  /*(E3) Creamos constantes donde almacenamos la información que creamos en el html, 
    además guardamos la url con el producto y los llamamos según el id.*/

  const divInfo = document.getElementById("product-info");
  const divComentario = document.getElementById("comentario");
  const productInfo = localStorage.getItem("idProduc");
  let puntuacion = 0;
  const stars = document.querySelectorAll(".star");
  const urlInfo = `https://japceibal.github.io/emercado-api/products/${productInfo}.json`;
  const categoryUrl =
    "https://japceibal.github.io/emercado-api/cats_products/" +
    localStorage.getItem("catID") +
    ".json";

  /* (E3) con el JSONData accedemos ala información de cada producto y creamos el cuerpo del html*/
  const res1 = await getJSONData(urlInfo);
  divInfo.innerHTML = "";
  divInfo.innerHTML += `
      <div>
          <h3 id="nomProducto">${res1.data.name}</h3>
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
  res1.data.images.forEach((img) => {
    divInfo.innerHTML += `<img src= "${img}" class="imgProductos">`;
  });

  //(E4)se crea funcion para mostrar productos relacionados
  const relatedProduct = async () => {
    const promise = await getJSONData(categoryUrl);
    const divRelated = document.getElementById("related");
    divRelated.innerHTML += `
                            <div>
                              <h4>Productos relacionados</h4>
                            </div>
                            `;
    promise.data.products.forEach((product) => {
      if (product.id != productInfo) {
        const html = `
                      <div id="${product.id}" onclick="productoRecomendado(id)">
                        <img src="${product.image}" alt="car image" class="imgProductos"> 
                        <h4>${product.name}</h4>
                      </div>
                      `;
        divRelated.innerHTML += html;
      }
    });
  };
  relatedProduct();
  correoNav();

  function generateComment(user, dateTime, score, description) {
    const html = `
    <div class="comentario">
        <br>
        <p><strong> ${user} </strong> - ${dateTime} - 
            <span class="fa fa-star ${score >= 1 && "checked"}"></span>
            <span class="fa fa-star ${score >= 2 && "checked"}"></span>
            <span class="fa fa-star ${score >= 3 && "checked"}"></span>
            <span class="fa fa-star ${score >= 4 && "checked"}"></span>
            <span class="fa fa-star ${score == 5 && "checked"}"></span> </p>
        <p>${description}</p>
    </div>    
`;
    return html;
  }

  //(E3)Accedemos al json de los comentarios
  //(E3)Con un forEach recorremos el array para poder mostrar los comentarios y puntajes de cada uno de los productos
  const urlComments = `https://japceibal.github.io/emercado-api/products_comments/${productInfo}.json`;
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

function productoRecomendado(id) {
  localStorage.setItem("idProduc", id);
  window.location.reload();
}
