const totalCarro=()=>{
    var total=localStorage.getItem("total")
    total=JSON.parse(total)
    document.querySelector("#total-factura").innerHTML=""
    document.querySelector("#total-factura").innerHTML=`<label for="factura">Total</label><input style="width:80px;text-align:center;padding:3px" id="factura" name="factura" value=${total}></input>`
}
totalCarro()