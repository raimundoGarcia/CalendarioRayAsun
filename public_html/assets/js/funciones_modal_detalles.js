


//calcula la diferencia de días entre el día de consulta de la previsión del tiempo con el día de inicio del viaje
// se llama dentro de la función para mostrar detalle evento (ventana modal)
function diferenciaDiasClima(hoy, inicioViaje) {
    //obtener fecha hoy en milisegundos    
    var ms_hoy = hoy.getTime();

    //obtener fecha inicio viaje en ms
    var inicio = new Date(inicioViaje);
    var ms_inicio = inicio.getTime();


    //diferencia entre fechas en ms
    var timeDifference = ms_inicio - ms_hoy;


    // en horas
    var timeDifferenceInHours = timeDifference / 3600000;

    // and finaly, in days :)
    var timeDifferenceInDays = timeDifferenceInHours / 24;

    return timeDifferenceInDays;
}
//Detecta el navegador IExplorer devolviendo la versión del IE o False en caso de ser distinto navegador
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

//Convierte base64 a blob, pasando como parámetros el String en base64 y el content-type. Retorna el blob.

function b64toBlob(b64Data, contentType) {

//procesamiento de byteCharacters en trozos más pequeños de 512 bytes
    contentType = contentType || '';

    var sliceSize = 512;

    b64Data = b64Data.replace(/^[^,]+,/, '');

    b64Data = b64Data.replace(/\s/g, '');
// atob() decodifica base64-encoded string en un nuevo string con un caracter por cada byte de la info en binario.
    var byteCharacters = window.atob(b64Data);

    var byteArrays = [];


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

function showInfoFlightWarning(aviso) {
    $('<div class="toaster toast-warning">' + aviso + '</div>').insertAfter($('#googlesearchvuelo'));
    $('#googlesearchvuelo').addClass('isDisabled');
    setTimeout(function () {
        $('.toaster').fadeOut('slow', 'linear');
        $('#googlesearchvuelo').removeClass('isDisabled');
    }, 3000);
}

// Show event detail -- mostrar detalles de los eventos

