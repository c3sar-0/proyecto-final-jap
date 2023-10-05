document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("products-container");
  const url = "https://japceibal.github.io/emercado-api/user_cart/25801.json";

  getJSONData(url).then((res) =>
    res.data.articles.forEach((articulo) => {
      console.log(articulo);
      container.innerHTML += `
      <tr>
        <th><img class="cart-img" src="${articulo.image}"></th>
        <th>${articulo.name}</th>
        <th>${articulo.currency} ${articulo.unitCost}</th>
        <th><input type="number" value=${articulo.count} id="asd" ></th>
        <th>${articulo.currency}</th>
      </tr>
    `;
    })
  );
});
