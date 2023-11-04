const totalCarro = () => {
    var total = localStorage.getItem("total")
    total = JSON.parse(total)
    document.querySelector("#total-factura").innerHTML = ""
    document.querySelector("#total-form").innerText = `Total: $${total}`
    document.querySelector("#total-factura").innerHTML = `<label for="factura">Total</label><input style="width:80px;text-align:center;padding:3px;font-weight:bold" id="factura" name="factura" value=${total}></input>`
}
totalCarro()





const tipodDescuento = document.querySelectorAll('[name=tipo-tarjeta]')


tipodDescuento.forEach(input => {
    input.addEventListener('input', (e) => {
        console.log(e.target.value)
        let desc = e.target.value
        var total = localStorage.getItem("total")
        total = JSON.parse(total)

        if (desc === "credito") {
            let recargo = (total * 10) / 100
            total = total + recargo
        } else if (desc === "debito") {
            let descuento = (total * 15) / 100
            total = total - descuento
        }
         else if (desc === "jubilados") {
            let descuento = (total * 20) / 100
            total = total - descuento
        }

        return (document.querySelector("#total-factura").innerHTML = "", document.querySelector("#total-form").innerText = `Total: $${total}`,
            document.querySelector("#total-factura").innerHTML = `<label for="factura">Total</label><input style="width:80px;text-align:center;padding:3px;font-weight:bold" id="factura" name="factura" value=${total}></input>`)

    })

});


