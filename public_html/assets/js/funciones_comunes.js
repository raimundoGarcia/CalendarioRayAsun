/**
 * @description da formato al asunto mostrado en la cabecera, añadiendole un icono segun el tipo, remplazando "-- >"
 *  por un icono de flecha, y en el caso del calendario, adaptando los caracteres maximos a la resolucion
 * @param {string} asunto dato recogido por la petición a la API, será la "cabecera" de nuestros eventos
 * @param {string} tipo -Tipo de evento que tiene lugar ( aereo, hotel, tren, barco, coche, etc...)
 * @param {string} formato , uno de los tres formatos disponibles ( calendario, lista, modal )
 * @param {Number} maxCaracter (limitador de caracteres máximos)
 * @returns {String} Cabecera formateada dependiendo del tipo de formato en el que se va a presentar
 * @see 
 */

function formatCabecera(asunto, tipo, formato, maxCaracter) {
    var texto = "";
    switch (formato) {
        case "calendario":
            switch (tipo) { // añade el icono correspondiente, recorta el texto acorde a la resolución, y sustituye la flecha por un icono de flecha
                case "Aereo":
                    var cabecera = asunto.replace("-- >", "$");
                    texto = '<i class="fas fa-plane"></i>&nbsp;' + getShortText(cabecera, maxCaracter).replace("$", '<i class="fas fa-arrow-right"></i>');
                    break;
                case "Hotel":
                    texto = '<i class="fas fa-h-square"></i>&nbsp;' + getShortText(asunto, maxCaracter);
                    break;
                case "Tren":
                    var cabecera = asunto.replace("-->", "$");
                    texto = '<i class="fas fa-train"></i>&nbsp;' + getShortText(cabecera, maxCaracter).replace("$", '<i class="fas fa-arrow-right"></i>');
                    break;
                case "Barco":
                    var cabecera = asunto.replace("-->", "$");
                    texto = '<i class="fas fa-ship"></i>&nbsp;' + getShortText(cabecera, maxCaracter).replace("$", '<i class="fas fa-arrow-right"></i>');
                    break;
                case "Coche":
                    texto = '<i class="fas fa-car"></i>&nbsp;' + getShortText(asunto, maxCaracter);
                    break;
                case "Otros":

                    break;
                case "Parking":

                    break;
                case "Seguro":

                    break;
                default:

                    break;
            }
            break;
        case "lista":
            switch (tipo) { // añade el icono según tipo, remplaza la flecha por el incono de flecha, y recorte la hora mostrada al principio en algunos de los eventos 
                case "Aereo":
                    texto = '<i class="fas fa-plane"></i>&nbsp;' + asunto.replace("-- >", '<i class="fas fa-arrow-right"></i>').substring(5);
                    break;
                case "Hotel":
                    texto = '<i class="fas fa-h-square"></i>&nbsp;' + asunto;
                    break;
                case "Tren":
                    texto = '<i class="fas fa-train"></i>&nbsp;' + asunto.replace("-->", '<i class="fas fa-arrow-right"></i>').substring(5);
                    break;
                case "Barco":
                    texto = '<i class="fas fa-ship"></i>&nbsp;' + asunto.replace("-->", '<i class="fas fa-arrow-right"></i>').substring(5);
                    break;
                case "Coche":
                    texto = '<i class="fas fa-car"></i>&nbsp;' + asunto.substring(5);
                    break;
                case "Otros":

                    break;
                case "Parking":

                    break;
                case "Seguro":

                    break;
                default:

                    break;
            }
            break;

        case "modal":
            switch (tipo) {  // añade el icono según tipo, remplaza la flecha por el incono de flecha, y recorte la hora mostrada al principio en algunos de los eventos 
                case "Aereo":
                    texto = '<i class="fas fa-plane"></i>&nbsp;' + asunto.replace("-- >", '<i class="fas fa-arrow-right"></i>').substring(5);
                    break;
                case "Hotel":
                    texto = '<i class="fas fa-h-square"></i>&nbsp;' + asunto;
                    break;
                case "Tren":
                    texto = '<i class="fas fa-train"></i>&nbsp;' + asunto.replace("-->", '<i class="fas fa-arrow-right"></i>').substring(5);
                    break;
                case "Barco":
                    texto = '<i class="fas fa-ship"></i>&nbsp;' + asunto.replace("-->", '<i class="fas fa-arrow-right"></i>').substring(5);
                    break;
                case "Coche":
                    texto = '<i class="fas fa-car"></i>&nbsp;' + asunto.substring(5);
                    break;
                case "Otros":

                    break;
                case "Parking":

                    break;
                case "Seguro":

                    break;
                default:

                    break;
            }
            break;

        default:

            break;
    }
    return texto;
}


//////////////////////
function timeTo12HrFormat(time) //convierte el formato de 24:00 horas, en formato de 12:00 horas AM y PM
{
    var time_part_array = time.split(":");
    var ampm = 'AM';

    if (time_part_array[0] >= 12) {
        ampm = 'PM';
    }

    if (time_part_array[0] > 12) {
        time_part_array[0] = time_part_array[0] - 12;// el +2 es por la franja horaria, 
    }

    var formatted_time = time_part_array[0] + ':' + time_part_array[1] + ' ' + ampm;

    return formatted_time;
}




