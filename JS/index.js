


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
            <p class="descripcion subItem">${art.descripcion}</p>
            <p class="descripcion subItem">ANTES: <strike>${art.precioAnt}</strike></p>
            <p class="descripcion subItem">AHORA: $${art.precio}ARS</p>
            <p class="descripcion subItem"> ${art.stock}</p>
            <button id=${art.codigo} class="btn-item" onclick="agregar(id)"><i class="fa-solid fa-cart-plus"></i></button>
        </div>
        `

    })

}


vistaArticulos()

var carroArt = [];
const agregar = (id) => {
    document.querySelector("#vista-carro").classList.add("vista-carro-on")
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
           return(console.log(carroArt),vistaCarro(carroArt),totalCarro(),window.location.href="#body")
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
        return(console.log(carroArt),vistaCarro(carroArt),totalCarro(),window.location.href="#body")
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
    carroArt.length!==0? document.querySelector("#vista-carro").classList.add("vista-carro-on"):null
    document.querySelector("#vista-carro").innerHTML=""
    
   
    carroArt.forEach(carItem => {
        
        document.querySelector("#vista-carro").innerHTML+=`
            <div id="items">
                <div id="items-desc">
                <span><b> ${carItem.cant}</b></span>
                <span> ${carItem.descripcion}</span>
                <span>P/UNID: $${carItem.precio}</span>
                
                <div id="box-btn-carro"><span style="font-size:14px;font-weight:bold;margin-right:20px"> $${carItem.subTotal}</span><button class="agregar" id=${carItem.codigo} onclick="agregar(id)"><i class="fa-solid fa-cart-plus"></i></button><button class="restar" id=${carItem.codigo} onclick="restarItem(id)"><i class="fa-solid fa-cart-arrow-down"></i></i></button><button class="eliminar" id=${carItem.codigo} onclick="eliminarItem(id)"><i class="fa-solid fa-trash"></i></button></div>
                </div>
                
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
    <div class="box-total"> <p style="font-size:24px;width:100px;font-weight:bold"> $${total}</p>
    <a class="link-pagar" href="pagar.html" target="__blank"><i class="fa-brands fa-cc-amazon-pay"></i></a><button class="btn-salir" onclick="salir()"><i class="fa-regular fa-circle-xmark"></i></button>
    </div>
    `:null
   ,localStorage.setItem("total",total),total===0?(document.querySelector("#vista-carro").classList.remove("vista-carro-on"),total=0,localStorage.setItem("total",JSON.stringify(total)),localStorage.removeItem("carroArt")):null)
}


const salir=()=>{
    document.querySelector("#vista-carro").classList.remove("vista-carro-on")

    
}


const totalCarro=()=>{
    var total=localStorage.getItem("total")
    total=JSON.parse(total)
    document.querySelector("#total-carro").innerTex=""
    document.querySelector("#total-carro").innerText=` $${total}`
}





