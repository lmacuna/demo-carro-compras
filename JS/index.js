


const getArticulos = async () => {

    var data, token;
    var url = 'Mock/articulos.json'
    var metodo = 'GET'
    var res = await peticiones(data, metodo, url, token)

    return (console.log(res), localStorage.setItem("articulos", JSON.stringify(res.data)))
}


getArticulos()


const vistaArticulos = () => {

    let articulos = localStorage.getItem("articulos")
    articulos = JSON.parse(articulos)

    articulos.forEach(art => {
        document.querySelector("#root").innerHTML += `
        <div class="card-item">
            <img class="descripcion" src=${art.img}></img>
            <p class="descripcion">${art.descripcion}</p>
            <p class="descripcion">${art.precio}</p>
            <button id=${art.codigo} class="btn-item" onclick="agregar(id)">Add</button>
        </div>
        `

    })

}


vistaArticulos()

var carroArt = [];
const agregar = (id) => {
    id = parseInt(id)
    let articulos = localStorage.getItem("articulos")
    articulos = JSON.parse(articulos)


    let art = articulos.find(a => a.codigo === id)
    console.log(art)

    let carr = carroArt.find(ca => ca.codigo === id)
    if (!carr) {
       
        var objetocarro = {
            codigo: art.codigo,
            descripcion: art.descripcion,
            precio:art.precio,
            cant:1,
            subTotal:art.precio
        }
           carroArt=[...carroArt,objetocarro]
           localStorage.setItem("carroArt",JSON.stringify(carroArt))
           carroArt=localStorage.getItem("carroArt")
           carroArt=JSON.parse(carroArt)
           return(console.log(carroArt),vistaCarro(carroArt),totalCarro())
    } else if(carr) {
      
       carr.cant++
       carr.subTotal=carr.precio*carr.cant
        objetocarro = {
            codigo: carr.codigo,
            descripcion: carr.descripcion,
            precio:carr.precio,
            cant:carr.cant,
            subTotal:carr.subTotal
        }
        carroArt=[...carroArt]
        localStorage.setItem("carroArt",JSON.stringify(carroArt))
        carroArt=localStorage.getItem("carroArt")
        carroArt=JSON.parse(carroArt)
        return(console.log(carroArt),vistaCarro(carroArt),totalCarro())
    }

   
}

const restarItem=(id)=>{
    console.log(id)
    id=parseFloat(id)
    carroArt=localStorage.getItem("carroArt")
    carroArt=JSON.parse(carroArt)

    let carr=carroArt.find(c=>c.codigo===id)
    let index=carroArt.indexOf(carr)
    console.log(index)
    carr.cant--
       carr.subTotal=carr.precio*carr.cant
        objetocarro = {
            codigo: carr.codigo,
            descripcion: carr.descripcion,
            precio:carr.precio,
            cant:carr.cant,
            subTotal:carr.subTotal
        }
        carroArt = carroArt.filter(c => c.codigo !== id)


        carroArt.splice(index, 0, objetocarro)
        carroArt=carroArt.filter(c=>c.cant!==0)
        localStorage.setItem("carroArt",JSON.stringify(carroArt))
        carroArt=localStorage.getItem("carroArt")
        carroArt=JSON.parse(carroArt)
        return(console.log(carroArt),vistaCarro(carroArt),totalCarro()) 

}

const eliminarItem=(id)=>{
     id=parseInt(id)
     carroArt=localStorage.getItem("carroArt")
     carroArt=JSON.parse(carroArt)
     carroArt = carroArt.filter(c => c.codigo !== id)

     localStorage.setItem("carroArt",JSON.stringify(carroArt))

     carroArt=localStorage.getItem("carroArt")
     carroArt=JSON.parse(carroArt)
     return(console.log(carroArt),vistaCarro(carroArt),totalCarro()) 

}
const vistaCarro=(carroArt)=>{

    document.querySelector("#vista-carro").innerHTML=""
    
   
    carroArt.forEach(carItem => {
        
        document.querySelector("#vista-carro").innerHTML+=`
            <div id="items">
                <p>CANT: ${carItem.cant}</p>
                <p>ART: ${carItem.descripcion}</p>
                <p>PRECIO: $${carItem.precio}</p>
                <p>SubTotal:${carItem.subTotal}</p>

                <div><button id=${carItem.codigo} onclick="agregar(id)">+</button><button id=${carItem.codigo} onclick="restarItem(id)">-</button><button id=${carItem.codigo} onclick="eliminarItem(id)">DEL</button></div>
            </div>
        `
      
       
    })
    totalVista()
}



const totalVista=()=>{

    let cuentaCarro=localStorage.getItem("carroArt")
       cuentaCarro=JSON.parse(cuentaCarro)
       var total=0;
       cuentaCarro.forEach(c=>{
       total=total+c.subTotal
       })
   return(total? document.querySelector("#vista-carro").innerHTML+=`
    <p><b>Total: ${total}</b></p>
    <div><a href="pagar.html" target="__blank">Pagar</a><button onclick="salir()">X</button><div>
    `:null
   ,localStorage.setItem("total",total),total===0?(total=0,localStorage.setItem("total",JSON.stringify(total)),localStorage.removeItem("carroArt")):null)
}


const salir=()=>{
    document.querySelector("#vista-carro").innerHTML="" 
}


const totalCarro=()=>{
    var total=localStorage.getItem("total")
    total=JSON.parse(total)
    document.querySelector("#total-carro").innerTex=""
    document.querySelector("#total-carro").innerText=total
}




