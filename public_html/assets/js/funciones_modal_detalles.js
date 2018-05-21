/**
 * El método calcula la diferencia de días entre el día de consulta de la previsión del tiempo con el día de inicio del viaje
 * se llama dentro de la función para mostrar detalle evento (ventana modal)
 * @param {Object} hoy, Objeto Date fecha del sistema en el momento de ejecución de la función
 * @param {Object} inicioViaje, fecha inicial del evento
 * @returns {Number} devuelve la diferencia de tiempo en días (puede ser decimal)
 */

function diferenciaDiasClima(hoy, inicioViaje) {
    //obtener fecha hoy en milisegundos    
    var ms_hoy = hoy.getTime();
    
    //obtener fecha inicio viaje en ms
    var inicio = new Date(inicioViaje);
    var ms_inicio = inicio.getTime();


    //diferencia entre fechas en ms
    var timeDifference = ms_inicio - ms_hoy;


    // transformar los milisegundos en horas
    var timeDifferenceInHours = timeDifference / 3600000;

    // y finalmente, en días
    var timeDifferenceInDays = timeDifferenceInHours / 24;

    return timeDifferenceInDays;
}
/**
 * Método que detecta el navegador IExplorer devolviendo la versión del IE o False en caso de ser distinto navegador
 * @returns {Boolean} o un String con la versión del navegador IE
 */


function detectIE() {

    var ua = window.navigator.userAgent;

    // Test values; Uncomment to check result …
    // IE 10
    // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

    // IE 11
    // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

    // Edge 12 (Spartan)
    // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

    // Edge 13
    // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

    var msie = ua.indexOf('MSIE ');

    if (msie > 0) {

        // IE 10 or older => return version number

        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);

    }

    var trident = ua.indexOf('Trident/');

    if (trident > 0) {

        // IE 11 => return version number

        var rv = ua.indexOf('rv:');

        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);

    }

    var edge = ua.indexOf('Edge/');

    if (edge > 0) {

        // Edge (IE 12+) => return version number

        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);

    }

    // other browser

    return false;

}

/**
 * Método que convierte la cadena base64 en un objeto blob para ser manipulado por el navegador
 * y poder descargarse en el dispositivo del usuario.
 * @param {String} b64Data, cadena en base 64 con la información contenida en el archivo.
 * @param {String} contentType, cadena que indica el tipo de archivo (pdf, txt, xlsx...)
 * @returns {Blob} Devuelve el objeto blob correspondiente al archivo en cuestión.
 */


function b64toBlob(b64Data, contentType) {

    contentType = contentType || '';
    //procesamiento de byteCharacters en trozos más pequeños de 512 bytes
    var sliceSize = 512;

    b64Data = b64Data.replace(/^[^,]+,/, '');

    b64Data = b64Data.replace(/\s/g, '');
// atob() decodifica base64-encoded string en un nuevo string con un caracter por cada byte de la info en binario.
    var byteCharacters = window.atob(b64Data);

    var byteArrays = [];

//recorre la cadena por secciones según el tamanyo establecido
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {

        var slice = byteCharacters.slice(offset, offset + sliceSize); //hace porciones de 512 en 512 bytes.


        var byteNumbers = new Array(slice.length); //crea un array del tamanyo del slice

        for (var i = 0; i < slice.length; i++) {

            byteNumbers[i] = slice.charCodeAt(i); //lo llena con los caracteres

        }


        var byteArray = new Uint8Array(byteNumbers); //genera array de entero sin signo de 8 bits, param: typedarray


        byteArrays.push(byteArray);

    }

    var blob = new Blob(byteArrays, {type: contentType}); //genera el objeto blob a partir de

    return blob;

}
/**
 * Método que muestra información advertencia cuando se consulta vuelos de los que no es posible tener información de google.
 * @param {String} aviso, texto que aparecerá en el cartel de aviso cuando se consulta vuelos pasados o fuera de rango.
 * @returns {undefined}
 */

function showInfoFlightWarning(aviso) {
    //mostrar aviso en la ventana
    $('<div class="toaster toast-warning">' + aviso + '</div>').insertAfter($('#googlesearchvuelo'));
    //deshabilitar el botón mientras el aviso esté en pantalla.
    $('#googlesearchvuelo').addClass('isDisabled');
    //Retardo de 3 segundos para hacer desaparecer el aviso y volver a habilitar el botón.
    setTimeout(function () {
        $('.toaster').fadeOut('slow', 'linear');
        $('#googlesearchvuelo').removeClass('isDisabled');
    }, 3000);
}

// Show event detail -- mostrar detalles de los eventos


/**
 *  Método que construye los elementos necesarios para descargar en el dispositivo
 *  del usuario un archivo de tipo ICS que podrá visualizar en una aplicación por 
 *  defecto o importar en otra aplicación de calendario.
 * @param: {integer} id , número entero que identifica a un evento dentro del array de eventos totales consultia_events[] o el array diario events[]
 *
 * @see showEventDetail(id)
 */

function descargaICS(id){
     //creación de la cadena de texto para el contenido del archivo ICS (formato según estándar internacional)
        var icsFormat =
                'BEGIN:VCALENDAR\n' +
                'PRODID:-//Schedule a Meeting\n' +
                'VERSION:2.0\n' +
                'METHOD:REQUEST\n' +
                'BEGIN:VEVENT\n' +
                'DTSTART:' + consultia_events[id]._fechaInicio.replace("-", "") + '\n' + //reemplazo de guiones en las fechas
                'DTSTAMP:' + consultia_events[id]._fechaInicio.replace("-", "") + '\n' +
                'DTEND:' + consultia_events[id]._fechaFin.replace("-", "") + '\n' +
                'LOCATION:' + consultia_events[id]._ubicacion + '\n' +
                'UID:40ddbba4-abb2-4969-b9b6-9c75c3b9f5c2\n' +
                icsDescription + //variable cuyo valor depende del tipo de reserva(evento) y se le asigna en los bloques específicos
                'BEGIN:VALARM\n' +
                'TRIGGER:-PT48H\n' +
                'ACTION:DISPLAY\n' +
                'DESCRIPTION:Reminder\n' +
                'END:VALARM\n' +
                'END:VEVENT\n' +
                'END:VCALENDAR';
        //Asignación del evento al botón de descarga del archivo ICS en función del navegador, distinguiendo entre Internet Explorer y resto.
        //Si es IE, 
        if (detectIE()) {
            //eliminamos el atributo 'download' del elemento anchor <a> porque no funciona con iexplorer 
            document.getElementsByClassName('descargaics')[0].removeAttribute('download');
                //si el navegador tiene la propiedad msSaveBlob
            if (window.navigator.msSaveBlob) {
                //generamos el objeto blob (equivalente a un archivo)
                var blob = new Blob([icsFormat]);
                //asignamos evento al vínculo para descarga
                document.getElementsByClassName('descargaics')[0].onclick = function () {
                    //función que ejecuta la descarga desde el navegador y le asigna nombre al archivo a guardar
                    window.navigator.msSaveBlob(blob, 'documento.ics');

                };

            }
            //Si no es IE,
        } else {

            //Descarga de archivo en formato ICS usando el atributo 'download' del anchor
            $(".descargaics").on("click", function () {

                //anyadiendo url descarga al vínculo 
                this.href = 'data:text/calendar;charset=utf-8,' + icsFormat;


            });

        }
}
/**
 * Método para abrir una pestaña nueva en el navegador que consulta con google
 * los detalles del vuelo en tiempo real. Google ofrece información del vuelo en el
 * día en que se realiza la consulta y como máximo uno o dos antes o después, 
 * dependiendo si hay o no vuelo para ese código.
 * @param {String} codigoV , número de vuelo en formato ejemplo: UX0851
 * @returns {undefined}
 * @see showEventDetail(id)
 */

function seguimientoVueloGoogle(codigoV) {
    //Hacer visible la caja que muestra el botón de búsqueda del vuelo en google.
    document.getElementById("googlesearchvuelo").style.display = "block";

    //Obtención de la fecha de salida del vuelo en cuestión.
    var fechaInicioVuelo = new Date(fechaInicioViaje); //obtener la fecha en formato válido para utilizar .toLocaleDateString()
    var options = {month: 'short', day: 'numeric'}; //mes corto y día númerico
    var fechaConsultaVuelo = fechaInicioVuelo.toLocaleDateString('es', options); //y en español
    fechaConsultaVuelo = fechaConsultaVuelo.replace(".", " "); //formatear la fecha para el buscador, ejemplo formato de salida:  12 abr 
    //dar formato a la query para el buscador
    var q = codigoV + " " + fechaConsultaVuelo;  //ejemplo de formato: LX3556 12 abr
    //Asignación evento al botón de búsqueda de la ventana modal detalles
    document.getElementById("googlesearchvuelo").onclick = function () {
        //uso de variable global diasDif para realizar la búsqueda o no, en función 
        //de si la diferencia de días entre la fecha de consulta y la fecha de inicio del vuelo
        // es 0 (consulto el mismo día que vuelo), 1(vuelo mañana) o 2(vuelo pasado mañana)
        if ((diasDif >= 0) && (diasDif <= 2)) { 
            //Apertura de pestanya en navegador
            window.open('http://www.google.com/search?q=' + q);
        //No se ofrece información de vuelos para ayer...
        } else if (diasDif < -1) {
            variableAviso = '<div class="toast-text">La fecha del vuelo es anterior. Información no disponible.</div>';
            showInfoFlightWarning(variableAviso);
        //o más lejanos   
        } else {
            variableAviso = '<div class="toast-text">La fecha del vuelo es demasiado lejana. Información no disponible.</div>';
            showInfoFlightWarning(variableAviso);
        }


    };
}


/**
 * Método para mostrar en googlemaps la ruta del evento (si tiene origen y destino) o 
 * simplemente la ubicación (si se trata de una reserva de hotel, por ejemplo). Asociado a un evento click de botón.
 * @param {integer} id, número entero que identifica a un evento dentro del array de eventos totales consultia_events[] o el array diario events[]
 * @param {number} lat, latitud en el punto origen en coordenadas decimales
 * @param {number} lon, longitud en el punto origen en coordenadas decimales
 * @param {number} latDestino, latitud en el punto destino en coordenadas decimales
 * @param {number} lonDestino, longitud en el punto destino en coordenadas decimales
 * @param {String} tipoReserva, texto que indica el tipo de reserva/evento (Aereo, Tren, etc.)
 * @returns {undefined}
 * @see showEventDetail(id)
 */

function mostrarMapa(id,lat,lon,latDestino,lonDestino,tipoReserva){
    //Obtener la ubicación o dirección postal del destino para mostrarla en la ventana modal detalle
    var ubicacion = consultia_events[id]._ubicacion;
    document.getElementById("ubicacion").innerHTML = "<h5 class='p5 modaltext'>" + ubicacion + "</h5>";
   //Asignación del evento al botón de la ventana modal
    document.getElementById("verMapa").addEventListener("click", function () {
        //Dependiendo del tipo de evento, se abrirá la pestanya del navegador con la url adecuada para mostrar el mapa
        if (tipoReserva === "Aereo") {
            window.open(' https://www.google.com/maps/dir/?api=1&origin=' + lat + ',' + lon + '&destination=' + latDestino + ',' + lonDestino + '&travelmode=fly');
        } else if (tipoReserva === "Tren") {
            window.open(' https://www.google.com/maps/dir/?api=1&origin=' + lat + ',' + lon + '&destination=' + latDestino + ',' + lonDestino + '&travelmode=transit&mode[]=train');
        } else if (tipoReserva === "Barco") {
            window.open(' https://www.google.com/maps/dir/?api=1&origin=' + lat + ',' + lon + '&destination=' + latDestino + ',' + lonDestino + '&travelmode=transit');
        } else {
            window.open('http://maps.google.es/?q=' + lat + "%20" + lon);
        }
        ;
    });
    
}

/**
 * Método para abrir el navegador y mostrar la página de información del ministerio 
 * de asuntos exteriores de Espanya, para el país de destino (siempre que sea distinto
 * de Espanya).
 * @param {number} latDestino, latitud en el punto destino en coordenadas decimales
 * @param {number} lonDestino, longitud en el punto destino en coordenadas decimales
 * @returns {undefined}
 */
function mostrarInfoInteresDestino(latDestino, lonDestino){
    
    var geocoder = new google.maps.Geocoder;
    //coordenadas del punto destino
    var localizacion = {lat: latDestino, lng: lonDestino};
    // var localizacion = {lat: 45.808123, lng: 3.085775};

    geocoder.geocode({'location': localizacion}, function (results, status) {
        if (status === 'OK') {
            pais = results[results.length - 1].formatted_address; // aqui se filtra el listado para obtener el pais
            var campoCiudad = results[results.length - 3].formatted_address;
            ciudad = campoCiudad.split(",")[0];  //aquí se obtiene la ciudad
        }

        // Mostrar la información recomendada según el pais de destino 
        document.getElementById("info-lugar").addEventListener("click", function () { // esta funcion obtiene un listado de resultados con la dirección, siendo el pais la ultima 
            if (pais === "España") { //No se muestra para Espanya
                alert("No hay recomendaciones para viajes en España");
            } else {
                buscarPais = "recomendaciones+viaje+" + pais + "&btnI"; // usamos google "im feeling lucky" para acceder a una buscada y abrir el primer resultado
                window.open('http://www.google.com/search?q=' + buscarPais);
            }
        });

    });
    
}

/**
 * Método para construir elementos en la ventana modal (uno por adjunto existente, que permitan 
 * descargar y guardar en el dispositivo los documentos asociados a un evento.
 * @param {integer} id, número entero que identifica a un evento dentro del array de eventos totales consultia_events[] o el array diario events[]
 * @returns {undefined}
 * @see b64toBlob(stringBase64, content_type)
 */

function mostrarAdjuntosEvento(id){
    //PRUEBAS PARA COMPROBAR EL BUEN FUNCIONAMIENTO CUANDO EL ARRAY DE ADJUNTOS CONTIENE VARIOS DOCUMENTOS
    //consultia_events[id]._adjuntos se sustituye por Adjuntos.vectordocus
    //consultia_events[id]._adjuntos[n] se sustituye por Adjuntos.vectordocus[n]
    //DESCOMENTAR PARA PRUEBAS (NOTA: hay imágenes previstas para pdf, xlsx y txt)
    //var Adjuntos = {"vectordocus":[{"idAdjunto": "179232", "Nombre": "Resumen", "Tipo": "pdf"},{"idAdjunto": "179228", "Nombre": "ejemplo_excel", "Tipo": "xlsx"}]};
    
        if (consultia_events[id]._adjuntos !== null) { //el campo Adjuntos o es null o es un array con una posición mínimo

        var adjuntos = "";
        var numdocs = consultia_events[id]._adjuntos.length; //obtener el número de documentos resultantes

        for (n = 0; n < numdocs; n++) {
            var tipodoc = consultia_events[id]._adjuntos[n].Tipo.toLowerCase(); //cada imagen asociada a un documento tendrá el nombre del tipo de documento y la misma extensión (png en este caso)
            var idadjunto = consultia_events[id]._adjuntos[n].idAdjunto; //obtener el identificador del documento para consultar después la base datos (API)
            var nombreAdjunto = consultia_events[id]._adjuntos[n].Nombre; //obtener el nombre del adjunto para nombrar por defecto el archivo si el usuario lo descarga

            //Si el navegador es iexplorer...
            if (detectIE()) {
                //el vínculo se generará sin el atributo 'download'
                adjuntos += '<a id="' + idadjunto + '" class="linkadjunto mimeType" title="' + nombreAdjunto + '"><img class="" src="assets/images/' + tipodoc + '.png" alt="" ></a>';
            //En caso contrario, se generará con el atributo 'download' y tomará el valor del nombre por defecto con el que el archivo será descargado
            } else {

                adjuntos += '<a id="' + idadjunto + '" class="linkadjunto mimeType" title="' + nombreAdjunto + '" download="' + nombreAdjunto + '.' + tipodoc + '"><img class="" src="assets/images/' + tipodoc + '.png" alt="" ></a>';
            }

        }
        //visualizar en el frontend el html con los anchor y las imágenes que simbolizan los documentos
        document.getElementById("docs").innerHTML = adjuntos;
        //una vez incluidos en el html, se pueden seleccionar y formar un array
        var arrayAdjuntos = $('a.linkadjunto');
        //recorrer el array de adjuntos
        $.each(arrayAdjuntos, function () {  //para cada elemento de la clase 'linkadjunto'
            //obtener el id
            var numadjunto = $(this).attr("id");
            //llamar a la API para obtener el adjunto en base64, cuando el elemento esté listo
            $(this).ready(function () {

                $.ajax({
                    url: "http://192.168.0.250:5556/api/Calendario?idUsuario=2&idadjunto=" + numadjunto,
                    type: 'GET',
                    dataType: 'json',
                    success: function (churro) {

                        var cuatroDigitosCadena = churro.substring(0, 4);

                        //Si el String que devuelve la API de adjuntos no es del tipo data:[mime-type];base64;[...]
                        if (cuatroDigitosCadena !== 'data') {
                            //ocultar la caja <div> de la ventana modal que muestra los adjuntos para descargar.
                            document.getElementById('adjuntos').style.display = 'none';
                            
//                            //OPCIÓN SI SE QUIERE MOSTRAR EL ERROR AL USUARIO mensaje error personalizable
//                            var mensajeErrorAdjunto = 'Ha habido un problema con el archivo.';
//                            //anyadir clase para que modifique el tipo de cursor a 'prohibido'
//                            $('#' + numadjunto).addClass('cursor-not-allowed');
//                            //etiqueta informativa al acercar el ratón por encima de la imagen del adjunto
//                            document.getElementById(numadjunto).setAttribute('title', mensajeErrorAdjunto);
                        //Si no, tratar el string que devuelve la API
                        } else {
                            //Sacar el content-type y asignarlo a variable para parámetro de la función b64toBlob para obtener el objeto Blob
                            var arrayString = churro.split(":"); //genera un array de 2 elementos, 'data' y el resto del churro 
                            var contentType = arrayString[1].split(";");  //genera un array de 2 elementos, el primero es el content-type y el segundo es  'base64,stringchurro'
                            var content_type = contentType[0]; //string del content-type

                            //Sacar el string en base64 para pasarlo por parámetro a la función b64b64toBlob()
                            var arrayBase64 = contentType[1].split(',');
                            var stringBase64 = arrayBase64[1];  //string en base64 


                            //Detectado IE ...
                            if (detectIE()) {

                                if (window.navigator.msSaveBlob) {

                                    //generamos el objeto blob a partir del String en base64 (churro) con la función b64toBlob
                                    var blob = b64toBlob(stringBase64, content_type);

                                    //asignamos evento al vínculo para que se descargue en el click, con un nombre de archivo por defecto
                                    $('#' + numadjunto).on('click', function () {

                                        window.navigator.msSaveBlob(blob, 'Adjunto_' + numadjunto + '.' + tipodoc);

                                    });

                                }

                            } else {
                                

                                var blob = b64toBlob(stringBase64, content_type);
                                //generar la URL para el link a partir del blob creado
                                var descargarAdjunto = URL.createObjectURL(blob);
                                //en navegadores distintos de IE se anyade el atributo href 
                                //con el valor del String base64 para que se produzca la descarga del archivo
                                $('#' + numadjunto).attr("href", descargarAdjunto);

                            }
                        }

                    }, //se mostrará un mensaje de error en consola en caso de error en funcionamiento de la API.
                    error: function () {
                        console.log("Se ha producido un error API adjuntos u otra causa.");
                    }


                }); //cierre ajax

            });

        }); //cierre $.each 

    //si desde la API se devuelve null porque no hay adjuntos, 
    } else if (consultia_events[id]._adjuntos === null) {

          //ocultar la caja <div> de la ventana modal que muestra los adjuntos para descargar.
          document.getElementById('adjuntos').style.display = 'none';
    }
}
/**
 * Método que muestra en la ventana modal las tarjetas para ofrecer la previsión 
 * metereológica al usuario. Se ofrece 5 días de previsión a contar desde el día en que
 * se hace la consulta del evento en cuestión.
 * @param {integer} id, número entero que identifica a un evento dentro del array 
 * de eventos totales consultia_events[] o el array diario events[]
 * @param {number} latDestino, latitud en el punto destino en coordenadas decimales
 * @param {number} lonDestino, longitud en el punto destino en coordenadas decimales
 * @param {number} diasDif, diferencia en días entre la fecha actual del sistema 
 * y el día de comienzo del evento para el que se consulta la previsión.
 * @returns {undefined}
 */

function previsionMeteo(id,latDestino,lonDestino,diasDif){
    //si hay información sobre las coordenadas en la base de datos
    if (latDestino !== null && lonDestino !== null) {
        //construimos la URL para acceder 
        var urlclima = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + latDestino + '&lon=' + lonDestino + '&lang=es&units=metric&APPID=eb49663a0809388193782a1fa7698518&cnt=40';  //cnt es la cantidad de líneas (máximo 40 para el plan gratuito suscrito)

        //Asignar evento al botón del clima
        $("#info-clima").on('click', function () {
            $('.iconos').html(""); 
            //caso1: si la diferencia es de 5 días (anteriores a hoy), pero el evento dura como mínimo hasta hoy (hoy es primer día previsión meteo)
            //caso2: eventos con fecha inicio desde hoy hasta 5 días después  
            //caso3: eventos con fechas inicio anteriores 5 días desde hoy cuya duración llega hasta hoy (hoy es primer día previsión meteo)
            if (((diasDif >= -5) && (consultia_events[id].duration >= Math.abs(diasDif))) || ((diasDif <= 5) && (diasDif >= 0)) || ((diasDif < -5) && (consultia_events[id].duration >= Math.abs(diasDif)))) {
                //interruptor para cambiar la id del elemento html que alberga los paneles de metereología. 
               
                if ($(".iconos").attr("id") === "iconos") {
                    $(".iconos").attr("id", "noMostrar");
                } else {
                    $(".iconos").attr("id", "iconos");
                }
                var listadoMediciones = [];
                var fechasUnicas = [];
                var paneles = "";
                //Llamada a API externa openweathermap.org
                $.ajax({

                    url: urlclima,
                    type: 'get',
                    dataType: 'json',

                    success: function (datosClima) {
                        //mostrar texto indicando ciudad y país del destino/ubicación donde se ofrece la previsión. 
                        //Las variables toman valor en la función mostrarInfoInteresDestino(latDestino,lonDestino)
                        paneles += ' <h2 class="card-tittle">' + ciudad + ',&nbsp;&nbsp;' + pais + '</h2>  '; 
                        //recorrer el JSON para obtener las 40 mediciones como máximo que retorna la API (5 días, datos cada 3 horas -> 40 mediciones)
                        datosClima.list.forEach(function (medicion) {
                            listadoMediciones.push(medicion.dt_txt.substring(0, 10));  //generar array con todas las fechas (40 máximo)  
                            fechasUnicas = Array.from(new Set(listadoMediciones)); //agrupa datos por coincidencias -> fecha y horas que pertenecen a un mismo día 
                        });

                        //para cada grupo de fechas (día)
                        for (var i = 0; i < fechasUnicas.length; i++) {
                            var dias = [];

                            var array_id_meteo = [];
                            //recorremos la lista de mediciones que devuelve la API
                            for (var j = 0; j < datosClima.list.length; j++) {
                                //si la medición corresponde a la fecha en la posición i del array de fechas 
                                if (datosClima.list[j].dt_txt.substring(0, 10) === fechasUnicas[i]) {
                                    //el elemento de la lista de mediciones se anyade al array 'dias' , que contendrá las mediciones para un día concreto
                                    dias.push(datosClima.list[j]);

                                }
                            }
                             
                            var temp_minima = 100;
                            var temp_maxima = -200;
                            var humedad = 0;
                            //recorremos los datos de las temperaturas máxima y mínima para las mediciones de un día concreto
                            for (var k = 0; k < dias.length; k++) {
                                //comparación con la temperatura mínima establecida de referencia obtener finalmente la menor de las mínimas.
                                if (temp_minima > dias[k].main.temp_min) {
                                    temp_minima = dias[k].main.temp_min;
                                }
                                //comparación con la temperatura máxima establecida de referencia obtener finalmente la mayor de las máximas.
                                if (temp_maxima < dias[k].main.temp_max) {
                                    temp_maxima = dias[k].main.temp_max;
                                }
                                //sumatorio de las humedades para un día
                                humedad += dias[k].main.humidity;
                                //obtención del código identificador para la descripción del clima y la obtención del icono del diccionario de iconos (info_meteoro.js)
                                var codClima = dias[k].weather[0].id;
                                var codClima = codClima.toString();
                                var cod = codClima.charAt(0);
                                //si el código comienza por 8 (serie de los 8xx)
                                //se cambia por un 1 para que corresponda con los códigos de nuestro diccionario, 
                                //para tener en cuenta la gravedad posteriormente (100 es menos grave que 600, p.e.)
                                if (cod === '8') {
                                    codClima = codClima.replace('8', '1');
                                }

                                var intId = parseInt(codClima);
                                array_id_meteo.push(intId); //construye un array (para cada día) con los id asociados a los iconos/descripción para ese día
                            }

                            maximo = Math.max.apply(null, array_id_meteo); //obtencion del máximo en el array de códigos (para cada día)
                            //para obtener las condiciones más graves para colocar posteriormente el icono

                            var descripcion = "";
                            icono_meteo = "";
                            //recorrer el diccionario de descripciones de fenómenos metereológicos.
                            info_meteoro.forEach(function (medicion) {
                               //cuando el código de identificación de las condiciones meteo coincida con el máximo obtenido
                                if (medicion.id == maximo) {
                                    //sacar los datos y la imagen para mostrar en el panel
                                    descripcion = medicion.descripcion;
                                    icono_meteo = medicion.icono;

                                }
                                if (icono_meteo === null || icono_meteo === "" || icono_meteo === 'undefined') { // Si la previsión corresponde a los grupos sin icono 90x , 9xx
                                    icono_meteo = 'Consultia'; //aparecerá el logo de consultia o cualquier otra imagen que se establezca como genérica.
                                }

                            });

                            var diaSemana = new Date(fechasUnicas[i]);
                            //cálculo de la media de la humedad díaria
                            var mediaHumedad = humedad / dias.length;
                            //mostrar el panel con los datos para un día concreto
                            paneles += '   <div id="' + fechasUnicas[i] + '" class="card card-cascade narrower">  ' +
                                    '                <h4 style="color:' + 'green' + '";><b>' + diasSemana[diaSemana.getDay()] + ', ' + fechasUnicas[i].substring(8, 10) + '</b></h4>  ' +
                                    '                <!--Card image-->  ' +
                                    '                <div class="view overlay hm-white-slight">  ' +
                                    '                <img src="' + 'assets/images/iconos_meteo/' + icono_meteo + '.png' + '" class="img-fluid iconos__logo" alt="">  ' +
                                    '                <a>  ' +
                                    '                <div class="mask"></div>  ' +
                                    '                </a>  ' +
                                    '                </div>  ' +
                                    '                <!--/.Card image-->  ' +
                                    '                <!--Card content-->  ' +
                                    '                <div class="card-body">  ' +
                                    '                <!--Title-->  ' +
                                    '                <!--Text-->  ' +
                                    '                <p class="card-text"><b>Temperatura: </b><br>' + '<b>Min </b>' + temp_minima + '<b>ºC - Max </b>' + temp_maxima + 'ºC</p>  ' +
                                    '                <p class="card-text"><b> ' + descripcion + '</b></p>  ' +
                                    '                <p class="card-text"><b>Humedad: </b>' + mediaHumedad.toFixed(2) + '%</p>  ' +
                                    '                </div>  ' +
                                    '               </div>  ';
                        }//cierre del primer bucle que recorre días (fechas agrupadas por día)

                        $(".iconos").html("");
                        $(".iconos").append(paneles);
                    },
                    error: function () {
                        console.log("Se ha producido un error API u otra causa.");
                    }
                });

            

            } else { //resto de casos, cuando la diferencia de días con la fecha de inicio es mayor a 5 en el pasado (y el evento no dura hasta hoy mínimo)
                // o más de 5 días en el futuro(supera días máximos previsión desde hoy)

                variableTexto = '<div class="toast-text">Evento pasado o demasiado lejano, no hay previsiones disponibles.</div>';
                $('<div class="toaster toast-warning">' + variableTexto + '</div>').insertBefore($('#info-lugar'));
                $('#info-clima').addClass('isDisabled');
                setTimeout(function () {
                    $('.toaster').fadeOut('slow', 'linear');
                    $('#info-clima').removeClass('isDisabled');
                }, 3000);

            }

        }); //fin información clima
//si no hay datos de coordenadas del destino, se oculta el botón (código comentado) o bien se puede deshabilitar 
    } else {
        // document.getElementById('info-clima').style.display = 'none';
       $('#info-clima').addClass('isDisabled');
    }
}