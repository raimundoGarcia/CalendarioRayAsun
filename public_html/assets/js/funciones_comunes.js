/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function formatCabecera(asunto, tipo, formato, maxCaracter) {
    var texto = "";
    switch (formato) {
        case "calendario":
            switch (tipo) {
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
            switch (tipo) {
                case "Aereo":
                    texto = '<i class="fas fa-plane"></i>&nbsp;' + asunto.replace("-- >", '<i class="fas fa-arrow-right"></i>').substring(5);
                    break;
                case "Hotel":
                    texto = '<i class="fas fa-h-square"></i>&nbsp;' + asunto;
                    break;
                case "Tren":
                    texto = '<i class="fas fa-train"></i>&nbsp;' + asunto.replace("-->", '<i class="fas fa-arrow-right"></i>');
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
            switch (tipo) {
                case "Aereo":
                    texto = '<i class="fas fa-plane"></i>&nbsp;' + asunto.replace("-- >", '<i class="fas fa-arrow-right"></i>').substring(5);
                    break;
                case "Hotel":
                    texto = '<i class="fas fa-h-square"></i>&nbsp;' + asunto;
                    break;
                case "Tren":
                    texto = '<i class="fas fa-train"></i>&nbsp;' + asunto.replace("-->", '<i class="fas fa-arrow-right"></i>');
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
function timeTo12HrFormat(time) //convierte el formato de 24 horas, en formato de 12 horas AM y PM
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




