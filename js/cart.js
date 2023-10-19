//(E6)
const precioSubTotal = document.getElementById("sub");
const precioEnvio = document.getElementById("costEnvio");
const precioTotal = document.getElementById("pagoTotal");
const radios = document.getElementById("radios");
const infoCostos = document.getElementById("infoCostos");
//(E6)lista con identificador y precio/ variabes para subtotal, envio y total
let subProductos=[];
let subTotal=0
let envio=0;
let total=0;

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("products-container");
  const url = "https://japceibal.github.io/emercado-api/user_cart/25801.json";

  correoNav();

  //(E5) busco los datos para trabajar con ellos
  const carrito = JSON.parse(localStorage.getItem("carrito"));
  let products;
  if (!carrito) {
    const promesa = await fetch(url);
    const datosCompra = await promesa.json();
    products = datosCompra.articles;
  } else {
    products = carrito;
  }

  /*(E5)se crea una estructura prototipo con id para usarlos en el evento "input"*/
  let numProduct = 0;
  products.forEach((articulo) => {
    const input = document.createElement("input");
    input.classList.add("cantidadArticulos");
    input.setAttribute("type", "number");
    input.setAttribute("value", articulo.count);
    input.setAttribute("id", articulo.id);
    input.setAttribute("min", 0);
    input.addEventListener("change", (e) => {
      const subTotalElem = document.getElementById(`subTotal-${articulo.id}`);
      subTotalElem.innerHTML =
        articulo.currency + " " + articulo.unitCost * e.target.value;
      const productIndex = carrito.findIndex((p) => p.id == articulo.id);
      carrito[productIndex].count = e.target.value;
      localStorage.setItem("carrito", JSON.stringify(carrito));
        //(E6) cuando se detecta un cambio en el imput agregamos ese cambio al precio del producto en la lista
        subProductos.forEach(producto=>
          {
            if(articulo.id==producto.id)
            {
              producto.precio=articulo.unitCost * e.target.value;
            }
          })   
    });

    const row = document.createElement("tr", { id: "Art" + articulo.id });
    row.innerHTML += `
        <td class="d-lg-block d-md-none d-sm-none d-none"><img class="cart-img" src="${articulo.image}"></td>
        <td>${articulo.name}</td>
        <td class="d-lg-table-cell d-md-none d-sm-none d-none">${articulo.currency} ${articulo.unitCost}</td>
        <td></td>
        <td id="subTotal-${articulo.id}">${articulo.currency} ${articulo.unitCost}</td>
        <td><input type="button" id="${numProduct}" onclick="eliminarArt(id)"></td>
      `;
    container.appendChild(row);

    row.querySelector("th:nth-child(4)").appendChild(input);
    numProduct++;
    //(E6) vamos agregando id y precio a medida que estructuramos los productos en el html
    subProductos.push({id:articulo.id,precio:articulo.unitCost})

  });
//(E6) calculamos el sub total y lo mostramos en su apartado
subProductos.forEach(producto=>
  {
    subTotal=subTotal+producto.precio
  })
precioSubTotal.innerHTML=subTotal
//(E6) detectamos cualquier cambio dentro de la etiqueta container y modificamos el subTotal en consecuencia
container.addEventListener("change",()=>
{
  subTotal=0
  subProductos.forEach(producto=>
    {
      subTotal=subTotal+producto.precio
    })
    precioSubTotal.innerHTML=subTotal
    if(envio!=0)
    {
    total=envio+subTotal;
    precioTotal.innerHTML=total;
    }
})

radios.addEventListener("click",()=>
{
  var opciones = document.getElementsByName('envio');
    for (var radio of opciones)
    {
        if (radio.checked) {
            envio=Math.trunc(subTotal*(radio.value/100));
        }
    }
  precioEnvio.innerHTML=envio
  total=envio+subTotal;
  precioTotal.innerHTML=total;
})

});

function eliminarArt(id) {
  let nuevaArray = JSON.parse(localStorage.getItem("carrito"));
  nuevaArray.splice(id, 1);

  localStorage.setItem("carrito", JSON.stringify(nuevaArray));
  location.reload();
}

