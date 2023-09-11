//id de div linea 40
const divInfo = document.getElementById("product-info")

document.addEventListener("DOMContentLoaded",()=>
{
    const productInfo = localStorage.getItem('idProduc');
    const urlInfo = `https://japceibal.github.io/emercado-api/products/${productInfo}.json`
    getJSONData(urlInfo)
    .then((infoObj)=>
    {
        if (infoObj.status === "ok") 
        {
            divInfo.innerHTML = "";
            divInfo.innerHTML += 
            `
                <div>
                    <h1>${infoObj.data.name}</h1>
                    <br>
                    <h4>Precio</h4>
                    <p>${infoObj.data.currency}${infoObj.data.cost}</p>
                    <h4>Descripcion</h4>
                    <p>${infoObj.data.description}</p>
                    <h4>Categoria</h4>
                    <p>${infoObj.data.category}</p>
                    <h4>Cantidad de vendidos</h4>
                    <p>${infoObj.data.soldCount}</p>
                    <h4>Imagenes ilustrativas</h4>   
                </div>    
            `;
            infoObj.data.images.forEach(img => 
            {
                    divInfo.innerHTML += `<img src= "${img}">`
            });
        }
        console.log(infoObj);
    });
})
