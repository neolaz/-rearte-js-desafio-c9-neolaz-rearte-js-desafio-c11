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
const cancelarElement = document.getElementById("cancelar");
const cabecerasListadoElement = document.getElementById("cabecerasListado");
const documentoRowElement = document.getElementById("documentoRow");

let idEnUso = 0;
let modo = 'ins';

// Calcula el total del documento.
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

// Ordena los documentos por Tipo de Documento, Centro Emisor y Número.
const ordernarDocumentos = () => {
    let listaDocumentosJson = localStorage.getItem('listaDocumentos');
    let listaDocumentos = JSON.parse(listaDocumentosJson);

    if(listaDocumentos != null){
        for(let i = 0; i < listaDocumentos.length; i++){
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
    listaDocumentosJson = JSON.stringify(listaDocumentos);
    localStorage.setItem('listaDocumentos', listaDocumentosJson);
}

// Muestra el listado de Documentos.
const mostrarListadoDocumentos = () => {    
    let listaDocumentosJson = localStorage.getItem('listaDocumentos');
    let listaDocumentos = JSON.parse(listaDocumentosJson);
    documentoRowElement.innerHTML = '';

    if(listaDocumentos == null || listaDocumentos.length == 0){
        cabecerasListadoElement.innerHTML = `
        <div class="col-xl-2 offset-md-5">
            <div class="containerInput alignCenter">
                <span class="textGeneric displayInlineBlock" for="numero">Aún no hay Documentos generados</span>
            </div>
        </div>
        `;
    }
    if(listaDocumentos != null && listaDocumentos.length > 0){
        cabecerasListadoElement.innerHTML = `
            <div class="col-xl-2 offset-md-1">
                <div class="containerInput alignCenter">
                    <span class="textGeneric displayInlineBlock" for="TipoDocumento">Tipo de Documento</span>
                </div>
            </div>
            <div class="col-xl-1">
                <div class="containerInput alignCenter">
                    <span class="textGeneric displayInlineBlock" for="CentroEmisor">Centro Emisor</span>
                </div>
            </div>
            <div class="col-xl-1">
                <div class="containerInput alignCenter">
                    <span class="textGeneric displayInlineBlock" for="Numero">Número</span>
                </div>
            </div>
            <div class="col-xl-2">
                <div class="containerInput alignCenter">
                    <span class="textGeneric displayInlineBlock" for="Cliente">Cliente</span>
                </div>
            </div>
            <div class="col-xl-2">
                <div class="containerInput alignCenter">
                    <span class="textGeneric displayInlineBlock" for="Total">Total</span>
                </div>
            </div>
            <div class="col-xl-2">
            </div>
        `;

        ordernarDocumentos();
        documentoRowElement.innerHTML = '';
    
        listaDocumentos.forEach( (doc) => { 
            documentoRowElement.innerHTML += `
                <div class="row">
                    <div class="col-xl-2 offset-md-1 gridRowColor">
                        <div class="containerInput alignCenter">
                            <p class="textGeneric">${doc.tipo}</p>
                        </div>
                    </div>
                    <div class="col-xl-1 gridRowColor">
                        <div class="containerInput alignCenter">
                            <p class="textGeneric">${doc.centroEmisor}</p>
                        </div>
                    </div>
                    <div class="col-xl-1 gridRowColor">
                        <div class="containerInput alignCenter">
                            <p class="textGeneric">${doc.numero}</p>
                        </div>
                    </div>
                    <div class="col-xl-2 gridRowColor">
                        <div class="containerInput alignCenter">
                            <p class="textGeneric">${doc.cliente}</p>
                        </div>
                    </div>
                    <div class="col-xl-2 gridRowColor">
                        <div class="containerInput alignCenter">
                            <p class="textGeneric">${doc.total}</p>
                        </div>
                    </div>
                    <div class="col-xl-2 gridRowColor">
                        <div class="alignCenter">
                            <a class="buttonGrid" onclick="gestionarVisualizarDocumento(${doc.id})">
                                <img src="img/search.png" alt="Visuaizar Documento" title="Visualizar">
                            </a>
                            <a class="buttonGrid" onclick="gestionarModificarDocumento(${doc.id})">
                                <img src="img/edit.png" alt="Modificar Documento" title="Modificar">
                            </a>
                            <a class="buttonGrid" onclick="eliminarDocumento(${doc.id})">
                                <img src="img/delete.png" alt="Eliminar Documento" title="Eliminar">
                            </a>
                        </div>
                    </div>
                </div>
            `;
        });
    }
}

// Muestro los Documentos que están en el Local Storage.
mostrarListadoDocumentos();

// Valida que se haya seleccionado Cliente.
const validarCliente = (msgError) => {
    let cliente = clientElement.value;

    if (cliente == '') msgError += 'Seleccione Cliente\n';  
    return msgError;
}

// Valida que se haya seleccionado Tipo de Documento.
const validarTipoDocumento = (msgError) => {
    let tipoDocumento = tipoDocumentoElement.value;

    if(tipoDocumento == '' ) msgError += 'Seleccione Tipo de Documento\n';
    return msgError;
}

// Valida que se haya seleccionado Centro Emisor.
const validarCentroEmisor = (msgError) => {
    let centroEmisor = centroEmisorElement.value;

    if (centroEmisor == '') msgError += 'Seleccione Centro Emisor\n';
    return msgError;
}

// Valida que se haya cargado correctamente el detalle del Documento.
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

// Valida que se hayan cargado correctamente los atributos del Documento.
const validarInputs = () => {
    let msgError = '';

    msgError = validarCliente(msgError);
    msgError = validarTipoDocumento(msgError);
    msgError = validarCentroEmisor(msgError);
    msgError = validarDetalle(msgError);
    return msgError;
}

// Muestra mensaje de error.
const mostrarError = (msgError) => {
    alert(msgError);
}

// Asigna el Número del Documento. Busca el último Documento generado para el mismo Tipo de Documento y Centro Emisor y le agrega uno.
const asignarNumero = (tipoDocumento, centroEmisor) => {
    let listaDocumentosJson = localStorage.getItem('listaDocumentos');
    let listaDocumentos = JSON.parse(listaDocumentosJson);
    let documentosFiltrados = [];
    let numero;
    let numeroStr = '00000000';
    let difLength = 0;

    if(listaDocumentos != null) documentosFiltrados = listaDocumentos.filter( (d) => d.tipo == tipoDocumento && d.centroEmisor == centroEmisor);    // Consigo los documentos del mismo tipo y centro emisor.
    if (listaDocumentos == null || documentosFiltrados.length == 0) return '00000001';
    documentosFiltrados.sort( (a,b) => b.numero - a.numero); // Ordeno los documentos filtrados de mayor a menor para obtener el más grande fácilmente.
    numero = parseInt(documentosFiltrados[0].numero) + 1;
    numeroStr += numero;
    difLength = numeroStr.length - 8;
    numeroStr = numeroStr.substring(difLength)
    return numeroStr;
}

// Crea el detalle del Documento.
const crearDetalle = () => {
    let cantidadInput;
    let productoInput;
    let documentoDetalle;
    let listaDocumentoDetalle = [];

    for (let i = 1; i < 6; i++) {
        cantidadInput = document.getElementById(`cantidad${i}`).value;
        productoInput = document.getElementById(`producto${i}`).value;
        if (cantidadInput > 0 && productoInput != ""){
            productoInput -= 1;
            documentoDetalle = new DocumentoDetalle(productos[productoInput], cantidadInput);
            listaDocumentoDetalle.push(documentoDetalle);
        }
    }
    return listaDocumentoDetalle;
}

// Reinicia el form dejando todos los inputs en vacíos.
const reinciarForm = () => {
    clientElement.value = '';
    clientElement.disabled = false;
    tipoDocumentoElement.value = '';
    tipoDocumentoElement.disabled = false;
    centroEmisorElement.value = '';
    centroEmisorElement.disabled = false;
    numeroElement.innerHTML = '00000000';
    totalElement.innerHTML = 0;
    for (let i = 1; i < 6; i++) {
        document.getElementById(`cantidad${i}`).value = 0;
        document.getElementById(`cantidad${i}`).disabled = false;
        document.getElementById(`producto${i}`).value = '';
        document.getElementById(`producto${i}`).disabled = false;
        document.getElementById(`precio${i}`).innerHTML = 0;
        document.getElementById(`impuesto${i}`).innerHTML = 0;
        document.getElementById(`impuesto${i}`).disabled = false;
        document.getElementById(`subtotal${i}`).innerHTML = 0;
    } 
    idEnUso = 0;
    modo = 'ins';
}

// Muestra el Documento para visualizar/modificar.
const mostrarDocumento = (id) => {
    let listaDocumentosJson = localStorage.getItem('listaDocumentos');
    let listaDocumentos = JSON.parse(listaDocumentosJson);
    let documentosFiltrados = [];
    let documento;
    let index;

    if(listaDocumentos != null){
        documentosFiltrados = listaDocumentos.filter( (d) => d.id == id);
        documento = documentosFiltrados[0];

        clientElement.value = documento.cliente;
        tipoDocumentoElement.value = documento.tipo;
        centroEmisorElement.value = documento.centroEmisor;
        numeroElement.innerHTML = documento.numero;
        totalElement.innerHTML = documento.total;
        for (let i = 1; i < 6; i++) {
            if(i <= documento.listaDocumentoDetalle.length){
                index = i - 1;
                document.getElementById(`cantidad${i}`).value = documento.listaDocumentoDetalle[index].cantidad;
                document.getElementById(`producto${i}`).value = documento.listaDocumentoDetalle[index].producto.id;
                document.getElementById(`precio${i}`).innerHTML = documento.listaDocumentoDetalle[index].producto.precio;
                document.getElementById(`impuesto${i}`).innerHTML = documento.listaDocumentoDetalle[index].producto.impuesto;
                document.getElementById(`subtotal${i}`).innerHTML = documento.listaDocumentoDetalle[index].cantidad * documento.listaDocumentoDetalle[index].producto.precio * (1 + documento.listaDocumentoDetalle[index].producto.impuesto / 100);
            } else {
                document.getElementById(`cantidad${i}`).value = 0;
                document.getElementById(`producto${i}`).value = '';
                document.getElementById(`precio${i}`).innerHTML = 0;
                document.getElementById(`impuesto${i}`).innerHTML = 0;
                document.getElementById(`subtotal${i}`).innerHTML = 0;
            }     
        } 
    }
}

// Crea un nuevo documento con los datos cargados en pantalla.
const crearDocumento = () => {
    let listaDocumentosJson = localStorage.getItem('listaDocumentos');
    let listaDocumentos = JSON.parse(listaDocumentosJson);
    let cliente = clientElement.value;
    let tipoDocumento = tipoDocumentoElement.value;
    let centroEmisor = centroEmisorElement.value;
    let numero = numeroElement.innerHTML;
    let listaDocumentoDetalle = crearDetalle();
    let ultimoDocumentoId = localStorage.getItem('ultimoDocumentoId');

    ultimoDocumentoId == null ? ultimoDocumentoId = 1 : ultimoDocumentoId++;
    let documento = new Documento(ultimoDocumentoId, cliente, tipoDocumento, centroEmisor, numero, listaDocumentoDetalle);
    if(listaDocumentos == null) listaDocumentos = [];
    listaDocumentos.push(documento); 
    listaDocumentosJson = JSON.stringify(listaDocumentos);
    localStorage.setItem('listaDocumentos', listaDocumentosJson);
    localStorage.setItem('ultimoDocumentoId', ultimoDocumentoId);
    mostrarListadoDocumentos();
    reinciarForm(); 
}

// Modifica el documento con los datos cargados en pantalla.
const modificarDocumento = (id) => {
    let listaDocumentosJson = localStorage.getItem('listaDocumentos');
    let listaDocumentos = JSON.parse(listaDocumentosJson);
    let listaDocumentoDetalle = crearDetalle();

    if(listaDocumentos != null){
        listaDocumentos.forEach( (d) => {
            if(d.id == id){
                d.listaDocumentoDetalle = listaDocumentoDetalle;
                d.total = calcularTotal(listaDocumentoDetalle);
            }
        });
        listaDocumentosJson = JSON.stringify(listaDocumentos);
        localStorage.setItem('listaDocumentos', listaDocumentosJson);
        mostrarListadoDocumentos();
        reinciarForm(); 
    }
}

// Setea la pantalla para visualizar el Documento. Todos los campos estarán como readonly.
const gestionarVisualizarDocumento = (id) => {
    reinciarForm();
    idEnUso = id;
    modo = 'dis';
    mostrarDocumento(id);
    clientElement.disabled = true;
    tipoDocumentoElement.disabled = true;
    centroEmisorElement.disabled = true;
    for (let i = 1; i < 6; i++) {
        document.getElementById(`cantidad${i}`).disabled = true;
        document.getElementById(`producto${i}`).disabled = true;
    } 
}

// Setea la pantalla para modificar el Documento. Todos los campos estarán como readonly salvo el detalle, será lo único que se podra modificar. La cabecera no puede modificarse.
const gestionarModificarDocumento = (id) => {
    reinciarForm();
    idEnUso = id;
    modo = 'upd';
    mostrarDocumento(id);
    clientElement.disabled = true;
    tipoDocumentoElement.disabled = true;
    centroEmisorElement.disabled = true;
}

// Eliminar el Documento.
const eliminarDocumento = (id) => {
    let listaDocumentosJson = localStorage.getItem('listaDocumentos');
    let listaDocumentos = JSON.parse(listaDocumentosJson);

    if(listaDocumentos != null){
        listaDocumentos = listaDocumentos.filter(d => d.id != id);
        listaDocumentosJson = JSON.stringify(listaDocumentos);
        localStorage.setItem('listaDocumentos', listaDocumentosJson);
        reinciarForm();
        mostrarListadoDocumentos();
    }
}

// Se encarga de crear/modificar/visualizar un Documento.
const gestionarConfirmar = () => {
    let msgError = '';

    msgError = validarInputs();
    if (msgError != '') mostrarError(msgError);
    if (msgError == '' && modo == 'ins') crearDocumento();
    if (msgError == '' && modo == 'upd') modificarDocumento(idEnUso);
    if (msgError == '' && modo == 'dis') reinciarForm();
}

// Se encarga de asignar el número cuando se cambia de Centro Emisor o Tipo de Documento
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

// Obtiene un Producto.
const obtenerProducto = (id) => {
    let productosFiltrados;

    productosFiltrados = productos.filter( (p) => p.id == id);
    return productosFiltrados[0];
}

// Se encarga de traer todos los datos del Producto seleccionado y calcula su total teniendo en cuenta la cantidad ingresada.
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

confirmarElement.addEventListener("click", gestionarConfirmar);
cancelarElement.addEventListener("click", reinciarForm)
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