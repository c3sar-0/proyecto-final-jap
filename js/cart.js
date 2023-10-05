document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("products-container");
  const url = "https://japceibal.github.io/emercado-api/user_cart/25801.json";

  //(E5) busco los datos para trabajar con ellos
  const promesa = await fetch(url)
  const datosCompra = await promesa.json()
  //(E5)en el comentario de abajo creo una posible estructura dandole un parametro, pero por ahora queda anulada, igualmente seria descomentar y 
   //cambiar  en el forEach"datosCompra" por "compra"
  //const estructura = (compra) =>
  //{
    /*(E5)se crea una estructura prototipo con id para usarlos en el evento "input"*/
    datosCompra.articles.forEach((articulo) => 
    {
      container.innerHTML += `
                              <tr>
                                <th><img class="cart-img" src="${articulo.image}"></th>
                                <th>${articulo.name}</th>
                                <th>${articulo.currency} ${articulo.unitCost}</th>
                                <th><input type="number" value=${articulo.count} id="inputTable" min="0"></th>
                                <th id="subTotal">${articulo.currency}${articulo.unitCost}</th>
                              </tr>
                            `;
    })
  //}
  //estructura(datosCompra);
  container.addEventListener("input",()=>
  {
    //(E5) obtengo el valor de input cada vez que cambia
    let valInput = parseFloat(document.getElementById("inputTable").value);
    //console.log(typeof valInput)
    /*(E5) se borra el contenido del ultimo th y se le agrega un nuevo contenido a base de la cantidad de articulos a comprar*/
    document.getElementById("subTotal").innerHTML="";
    datosCompra.articles.forEach((articulo)=>
    {
      document.getElementById("subTotal").innerHTML+=`${articulo.currency}${articulo.unitCost*valInput}`;
    });
  });
});
