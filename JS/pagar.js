const totalCarro = () => {
    document.querySelector("#jubilados").classList.remove("radio-verde")
    document.querySelector("#debito").classList.remove("radio-verde")
    document.querySelector("#credito").classList.remove("radio-verde")
    var total = localStorage.getItem("total")
    total = JSON.parse(total)
    document.querySelector("#total-factura").innerHTML = ""
    document.querySelector("#total-form").innerText = `Total: $${total}`
    document.querySelector("#total-factura").innerHTML = `<label for="factura"></label><span style="width:80px;text-align:center;padding:3px;font-weight:bold" id="factura" name="factura">Total $${total}</span>`
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
           
            document.querySelector("#credito").classList.add("radio-verde")
            document.querySelector("#debito").classList.remove("radio-verde")
            document.querySelector("#jubilados").classList.remove("radio-verde")
        } else if (desc === "debito") {
            let descuento = (total * 15) / 100
            total = total - descuento
            document.querySelector("#debito").classList.add("radio-verde")
            document.querySelector("#credito").classList.remove("radio-verde")
            document.querySelector("#jubilados").classList.remove("radio-verde")
        }
         else if (desc === "jubilados") {
            let descuento = (total * 20) / 100
            total = total - descuento
            document.querySelector("#jubilados").classList.add("radio-verde")
            document.querySelector("#debito").classList.remove("radio-verde")
            document.querySelector("#credito").classList.remove("radio-verde")
        }

        return (document.querySelector("#total-factura").innerHTML = "", document.querySelector("#total-form").innerText = `Total: $${total}`,
            document.querySelector("#total-factura").innerHTML = `<label for="factura"></label><span style="width:80px;text-align:center;padding:3px;font-weight:bold" id="factura" name="factura">Total $${total}</span>`)

    })

});


