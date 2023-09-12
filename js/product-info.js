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
                    <h3 id="nomProducto">${infoObj.data.name}</h3>
                    <hr id="hrProductos">
                    <strong>Precio</strong>
                    <p>${infoObj.data.currency}${infoObj.data.cost}</p>
                    <strong>Descripción</strong>
                    <p>${infoObj.data.description}</p>
                    <strong>Categoría</strong>
                    <p>${infoObj.data.category}</p>
                    <strong>Cantidad de vendidos</strong>
                    <p>${infoObj.data.soldCount}</p>
                    <strong>Imágenes ilustrativas</strong>   
                </div>    
            `;
            infoObj.data.images.forEach(img => 
            {
                divInfo.innerHTML += `<img src= "${img}" id="imgProductos">`
            });    
        }
        console.log(infoObj);
    });

    correoNav();
    
    //(E3)Accedemos al json de los comentarios
    //(E3)Con un forEach recorremos el array para poder mostrar los comentarios y puntajes de cada uno de los productos
    const urlComments = `https://japceibal.github.io/emercado-api/products_comments/${productInfo}.json`;
    getJSONData(urlComments)
    .then(infoObj=> {
        if(infoObj.status === "ok"){
            divInfo.innerHTML += `
            <h4 id="tituloComentarios">Comentarios</h4>`
            infoObj.data.forEach(element => {
                divInfo.innerHTML += `
                <div id="comentario">
                    <br>
                    <p><strong> ${element.user} </strong> - ${element.dateTime} - 
                        <span class="fa fa-star ${element.score >= 1 && "checked"}"></span>
                        <span class="fa fa-star ${element.score >= 2 && "checked"}"></span>
                        <span class="fa fa-star ${element.score >= 3 && "checked"}"></span>
                        <span class="fa fa-star ${element.score >= 4 && "checked"}"></span>
                        <span class="fa fa-star ${element.score == 5 && "checked"}"></span> </p>
                    <p>${element.description}</p>
                </div>    
            `;
            });   
        }
    });
})

