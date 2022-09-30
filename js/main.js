const clientElement = document.getElementById("cliente");
const tipoDocumentoElement = document.getElementById("tipoDocumento");
const centroEmisorElement = document.getElementById("centroEmisor");
const numeroElement = document.getElementById("numero");
const cantidad1Element = document.getElementById("cantidad1");
const producto1Element = document.getElementById("producto1");
const precio1Element = document.getElementById("precio1");
const impuesto1Element = document.getElementById("impuesto1");
const subtotal1Element = document.getElementById("subtotal1");
const cantidad2Element = document.getElementById("cantidad2");
const producto2Element = document.getElementById("producto2");
const precio2Element = document.getElementById("precio2");
const impuesto2Element = document.getElementById("impuesto2");
const subtotal2Element = document.getElementById("subtotal2");
const cantidad3Element = document.getElementById("cantidad3");
const producto3Element = document.getElementById("producto3");
const precio3Element = document.getElementById("precio3");
const impuesto3Element = document.getElementById("impuesto3");
const subtotal3Element = document.getElementById("subtotal3");
const cantidad4Element = document.getElementById("cantidad4");
const producto4Element = document.getElementById("producto4");
const precio4Element = document.getElementById("precio4");
const impuesto4Element = document.getElementById("impuesto4");
const subtotal4Element = document.getElementById("subtotal4");
const cantidad5Element = document.getElementById("cantidad5");
const producto5Element = document.getElementById("producto5");
const precio5Element = document.getElementById("precio5");
const impuesto5Element = document.getElementById("impuesto5");
const subtotal5Element = document.getElementById("subtotal5");
const totalElement = document.getElementById("total");
const confirmarElement = document.getElementById("confirmar");
const cabecerasListadoElement = document.getElementById("cabecerasListado");
const documentoRowElement = document.getElementById("documentoRow");

let listaDocumentos = [];
let ultimoDocumentoId = 0;

const calcularTotal = (listaDocumentoDetalle) => {
    let impuesto;
    let total = 0;

    listaDocumentoDetalle.forEach( (det) => {
        impuesto = 1 + det.producto.impuesto / 100;
        total += det.producto.precio * det.cantidad * impuesto;
    });
    return total;
}

class Producto{
    constructor (id, nombre, precio, impuesto){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.impuesto = impuesto;
    }
}

class Documento{
    constructor (id, cliente, tipo, centroEmisor, numero, listaDocumentoDetalle){
        this.id = id;
        this.cliente = cliente;
        this.tipo = tipo;
        this.centroEmisor = centroEmisor;
        this.numero = numero;
        this.listaDocumentoDetalle = listaDocumentoDetalle;
        this.total = calcularTotal(listaDocumentoDetalle);
    }
}

class DocumentoDetalle{
    constructor (producto, cantidad){
        this.producto = producto;
        this.cantidad = cantidad;
    }
}

let productos = [new Producto(1, 'Microfono', 25000, 21), new Producto(2, 'Monitor', 80000, 0), new Producto(3, 'Mouse', 20000, 21), new Producto(4, 'Parlantes', 50000, 27), new Producto(5, 'Teclado', 30000, 0)];

const validarCliente = (msgError) => {
    let cliente = clientElement.value;

    if (cliente == '') msgError += 'Seleccione Cliente\n';  
    return msgError;
}

const validarTipoDocumento = (msgError) => {
    let tipoDocumento = tipoDocumentoElement.value;

    if(tipoDocumento == '' ) msgError += 'Seleccione Tipo de Documento\n';
    return msgError;
}

const validarCentroEmisor = (msgError) => {
    let centroEmisor = centroEmisorElement.value;

    if (centroEmisor == '') msgError += 'Seleccione Centro Emisor\n';
    return msgError;
}

const validarDetalle = (msgError) => {
    let cantidadInput;
    let productoInput;
    let algunaLineaCargada = false;

    for (let i = 1; i < 6; i++) {
        cantidadInput = document.getElementById(`cantidad${i}`).value;
        productoInput = document.getElementById(`producto${i}`).value;
        if (cantidadInput <= 0 && productoInput != ""){
            algunaLineaCargada = true;
            msgError += `Ingrese la cantidad en la línea ${i} del detalle\n`;
        }
        if (cantidadInput > 0 && productoInput == ""){
            algunaLineaCargada = true;
            msgError += `Seleccione el producto en la línea ${i} del detalle\n`;
        }
        if(cantidadInput > 0 && productoInput != "") algunaLineaCargada = true;
    }
    if (!algunaLineaCargada) msgError += 'Ingrese alguna línea del detalle\n';
    return msgError
}

const validarInputs = () => {
    let msgError = '';

    msgError = validarCliente(msgError);
    msgError = validarTipoDocumento(msgError);
    msgError = validarCentroEmisor(msgError);
    msgError = validarDetalle(msgError);
    return msgError;
}

const mostrarError = (msgError) => {
    alert(msgError);
}

const asignarNumero = (tipoDocumento, centroEmisor) => {
    let documentosFiltrados;
    let numero;
    let numeroStr = '00000000';
    let difLength = 0;

    documentosFiltrados = listaDocumentos.filter( (d) => d.tipo == tipoDocumento && d.centroEmisor == centroEmisor);    // Consigo los documentos del mismo tipo y centro emisor.
    if (documentosFiltrados.length == 0) return '00000001';
    documentosFiltrados.sort( (a,b) => b.numero - a.numero); // Ordeno los documentos filtrados de mayor a menor para obtener el más grande fácilmente.
    numero = parseInt(documentosFiltrados[0].numero) + 1;
    numeroStr += numero;
    difLength = numeroStr.length - 8;
    numeroStr = numeroStr.substring(difLength)
    return numeroStr;
}

const crearDetalle = () => {
    let cantidadInput;
    let productoInput;
    let documentoDetalle;
    let listaDocumentoDetalle = [];

    for (let i = 1; i < 6; i++) {
        cantidadInput = document.getElementById(`cantidad${i}`).value;
        productoInput = document.getElementById(`producto${i}`).value;
        if (cantidadInput > 0 && productoInput != ""){
            documentoDetalle = new DocumentoDetalle(productos[productoInput], cantidadInput);
            listaDocumentoDetalle.push(documentoDetalle);
        }
    }
    return listaDocumentoDetalle;
}

const ordernarDocumentos = () => {
    for(let i = 0; i < listaDocumentos.length; i++){    // Ordeno por Tipo de Documento, Centro Emisor y Número.
        for(let j = 0; j < listaDocumentos.length - 1; j++){
            if ((listaDocumentos[j].tipo > listaDocumentos[j + 1].tipo) ||
                (listaDocumentos[j].tipo == listaDocumentos[j + 1].tipo && listaDocumentos[j].centroEmisor > listaDocumentos[j + 1].centroEmisor) ||
                (listaDocumentos[j].tipo == listaDocumentos[j + 1].tipo && listaDocumentos[j].centroEmisor == listaDocumentos[j + 1].centroEmisor && listaDocumentos[j].numero > listaDocumentos[j + 1].numero)) {
                let documentoAux = listaDocumentos[j];
                listaDocumentos[j] = listaDocumentos[j + 1];
                listaDocumentos[j + 1] = documentoAux;
            }
        }
    }
}

const eliminarDocumento = (id) => {
    listaDocumentos = listaDocumentos.filter(d => d.id != id);
    mostrarListadoDocumentos();
}

const mostrarListadoDocumentos = () => {    
    if(listaDocumentos.length == 0){
        cabecerasListadoElement.innerHTML = `
        <div class="col-xl-2 offset-md-5">
            <div class="containerInput alignCenter">
                <span class="textGeneric" for="numero">Aún no hay Documentos generados</span>
            </div>
        </div>
        `;
    }
    if(listaDocumentos.length == 1){
        cabecerasListadoElement.innerHTML = `
            <div class="col-xl-1 offset-md-1">
            </div>
            <div class="col-xl-2">
                <div class="containerInput alignCenter">
                    <span class="textGeneric" for="numero">Tipo Documento</span>
                </div>
            </div>
            <div class="col-xl-1">
                <div class="containerInput alignCenter">
                    <span class="textGeneric" for="producto">Centro Emisor</span>
                </div>
            </div>
            <div class="col-xl-2">
                <div class="containerInput alignCenter">
                    <span class="textGeneric" for="precio">Numero</span>
                </div>
            </div>
            <div class="col-xl-2">
                <div class="containerInput alignCenter">
                    <span class="textGeneric" for="impuesto">Cliente</span>
                </div>
            </div>
            <div class="col-xl-2">
                <div class="containerInput alignCenter">
                    <span class="textGeneric" for="subtotal">Total</span>
                </div>
            </div>
        `;
    }

    ordernarDocumentos();
    documentoRowElement.innerHTML = '';

    listaDocumentos.forEach( (doc) => { 
        documentoRowElement.innerHTML += `
            <div class="row">
                <div class="col-xl-1 offset-md-1">
                    <div class="alignRigth">
                        <a class="buttonGrid" onclick="eliminarDocumento(${doc.id})">
                            <img src="img/delete.png" alt="Eliminar Documento">
                        </a>
                    </div>
                </div>
                <div class="col-xl-2">
                    <div class="containerInput alignCenter">
                        <p class="textGeneric">${doc.tipo}</p>
                    </div>
                </div>
                <div class="col-xl-1">
                    <div class="containerInput alignCenter">
                        <p class="textGeneric">${doc.centroEmisor}</p>
                    </div>
                </div>
                <div class="col-xl-2">
                    <div class="containerInput alignCenter">
                        <p class="textGeneric">${doc.numero}</p>
                    </div>
                </div>
                <div class="col-xl-2">
                    <div class="containerInput alignCenter">
                        <p class="textGeneric">${doc.cliente}</p>
                    </div>
                </div>
                <div class="col-xl-2">
                    <div class="containerInput alignCenter">
                        <p class="textGeneric">${doc.total}</p>
                    </div>
                </div>
            </div>
        `;
    });
}

const reinciarForm = () => {
    clientElement.value = '';
    tipoDocumentoElement.value = '';
    centroEmisorElement.value = '';
    numeroElement.innerHTML = '00000000';
    totalElement.innerHTML = 0;
    for (let i = 1; i < 6; i++) {
        document.getElementById(`cantidad${i}`).value = 0;
        document.getElementById(`producto${i}`).value = '';
        document.getElementById(`precio${i}`).innerHTML = 0;
        document.getElementById(`impuesto${i}`).innerHTML = 0;
        document.getElementById(`subtotal${i}`).innerHTML = 0;     
    } 
}

const crearDocumento = () => {
    let cliente = clientElement.value;
    let tipoDocumento = tipoDocumentoElement.value;
    let centroEmisor = centroEmisorElement.value;
    let numero = numeroElement.innerHTML;
    let listaDocumentoDetalle = crearDetalle();
    ultimoDocumentoId++;
    let documento = new Documento(ultimoDocumentoId, cliente, tipoDocumento, centroEmisor, numero, listaDocumentoDetalle);
    listaDocumentos.push(documento); 
    mostrarListadoDocumentos();
    reinciarForm(); 
}

const gestionarCreacionDocumento = () => {
    let msgError = '';

    msgError = validarInputs();
    msgError == ''? crearDocumento() : mostrarError(msgError);
}

const gestionarNumero = () => {
    let tipoDocumentoInput;
    let centroEmisorInput;
    let numero;

    tipoDocumentoInput = tipoDocumentoElement.value;
    centroEmisorInput = centroEmisorElement.value;
    
    if(tipoDocumentoInput != '' && centroEmisorInput != ''){
        numero = asignarNumero(tipoDocumentoInput, centroEmisorInput);   
        numeroElement.innerHTML = numero;
    } else {
        numeroElement.innerHTML = '00000000';
    }
}

const obtenerProducto = (id) => {
    let productosFiltrados;

    productosFiltrados = productos.filter( (p) => p.id == id);
    return productosFiltrados[0];
}

const gestionarLineaDetalle = (nroLinea) => {
    let cantidadInput;
    let productoInput;
    let subtotalInput;
    let totalInput;
    let total;
    let producto;

    cantidadInput =  document.getElementById(`cantidad${nroLinea}`).value;
    productoInput = document.getElementById(`producto${nroLinea}`).value; 
    subtotalInput =  parseInt(document.getElementById(`subtotal${nroLinea}`).innerHTML);             
    totalInput = parseInt(totalElement.innerHTML);
    total = totalInput - subtotalInput;
        
    if(cantidadInput > 0 && productoInput != ''){
        producto = obtenerProducto(productoInput);
        document.getElementById(`precio${nroLinea}`).innerHTML = producto.precio;
        document.getElementById(`impuesto${nroLinea}`).innerHTML = producto.impuesto;
        document.getElementById(`subtotal${nroLinea}`).innerHTML = cantidadInput * producto.precio * (1 + producto.impuesto / 100);
    } else {
        document.getElementById(`precio${nroLinea}`).innerHTML = 0;
        document.getElementById(`impuesto${nroLinea}`).innerHTML = 0;
        document.getElementById(`subtotal${nroLinea}`).innerHTML = 0;
    }

    total += parseInt(document.getElementById(`subtotal${nroLinea}`).innerHTML);
    totalElement.innerHTML = total;
}

confirmarElement.addEventListener("click", gestionarCreacionDocumento);
tipoDocumentoElement.addEventListener("change", gestionarNumero);
centroEmisorElement.addEventListener("change", gestionarNumero);
cantidad1Element.addEventListener("focusout", () => gestionarLineaDetalle(1));
producto1Element.addEventListener("change", () => gestionarLineaDetalle(1));
cantidad2Element.addEventListener("focusout", () => gestionarLineaDetalle(2));
producto2Element.addEventListener("change", () => gestionarLineaDetalle(2));
cantidad3Element.addEventListener("focusout", () => gestionarLineaDetalle(3));
producto3Element.addEventListener("change", () => gestionarLineaDetalle(3));
cantidad4Element.addEventListener("focusout", () => gestionarLineaDetalle(4));
producto4Element.addEventListener("change", () => gestionarLineaDetalle(4));
cantidad5Element.addEventListener("focusout", () => gestionarLineaDetalle(5));
producto5Element.addEventListener("change", () => gestionarLineaDetalle(5));