// Create calendar   CREAR CALENDARIO
/**
 * @description crea la tabla del calendario, y le asigna el número a cada día.
 * @param {integer} firstDay dia en el que empieza la primera semana del mes
 * @param {integer} numbDays número de dias que tiene el mes
 * @param {integer} monthNum numero del mes
 * @param {integer} yearNum año
 * @returns {undefined}
 */
function createCalendar(firstDay, numbDays, monthNum, yearNum) {
    calendarString = '';
    daycounter = 0;

    calendarString += '<table class=\"calendar-table table table-bordered\">'; // crea la tabla en la que se introducen todos los datos del calendario ( el esqueleto )
    calendarString += '<tbody>';
    calendarString += '<tr>';
    //crea los botones del encabezado del calendario, para poder cambiar de mes o de año, la celda central es el nombre del mes.
    calendarString += '<td class=\"calendar-btn\"><span onClick=\"changedate(\'prevyr\')\">« <span class="btn-change-date">' + prev_year + '<\/span><\/span><\/td>';
    calendarString += '<td class=\"calendar-btn\"><span onClick=\"changedate(\'prevmo\')\">« <span class="btn-change-date">' + prev_month + '<\/span><\/span><\/td>';
    calendarString += '<td class=\"calendar-title\" colspan=\"3\"><span><i class=\"far fa-calendar-alt\"><\/i>&nbsp;&nbsp;' + wordMonth[monthNum - 1] + '&nbsp;&nbsp;' + yearNum + '<\/span><\/td>';
    calendarString += '<td class=\"calendar-btn\"><span onClick=\"changedate(\'nextmo\')\"><span class="btn-change-date">' + next_month + '<\/span> »<\/span><\/td>';
    calendarString += '<td class=\"calendar-btn\"><span onClick=\"changedate(\'nextyr\')\"><span class="btn-change-date">' + next_year + '<\/span> »<\/span><\/td>';

    calendarString += '<\/tr>'; //fin de cabecera botones

    calendarString += '<tr class="active">';
    for (var m = 0; m < wordDay.length; m++) {
        if ($(window).width() < resolucionMinimaCalendario) {
            calendarString += '<th>' + wordDay[m].substring(0, 3) + '<\/th>';  //ACORTADOR STRING DÍAS DE LA SEMANA para cabecera días semana
        } else {
            calendarString += '<th>' + wordDay[m] + '<\/th>';
        }

    }
    calendarString += '<\/tr>';

    thisDate === 1;

    for (var i = 1; i <= 6; i++) {
        var k = (i - 1) * 7 + 1; //corresponde con el día de la semana (día del mes) que cae en domingo (en nuestro caso, programado para comenzar la semana en lunes
        if (k < (firstDay + numbDays)) {  //( día semana del día 1 del mes + num días del mes )
            calendarString += '<tr>';
            for (var x = 1; x <= 7; x++) {
                daycounter = (thisDate - firstDay) + 1;
                thisDate++;
                if ((daycounter > numbDays) || (daycounter < 1)) { //crea las celdas de la tabla del calendario, recorriendo los diás del més uno a uno y asignadoles su numero
                    calendarString += '<td class=\"calendar-day-blank\">&nbsp;<\/td>';
                } else {
                    // Saturday or Sunday
                    if (date_start === 'sunday') { // asingna la clase encargada de poner los fines de la semana en rojo.
                        if ((x === 1) || (x === 7)) { //en este caso en el primer dia de la semana y el último
                            daycounter_s = '<span class=\"calendar-day-weekend\">' + daycounter + '</span>';
                        } else {
                            daycounter_s = daycounter;
                        }
                    } else {
                        if ((x === 6) || (x === 7)) { //en este caso el los dos últimos días de la semana, tal y como se hace en España
                            daycounter_s = '<span class=\"calendar-day-weekend\">' + daycounter + '</span>';
                        } else {
                            daycounter_s = daycounter;
                        }
                    }

                    if ((todaysDate === daycounter) && (todaysMonth === monthNum)) {
                        calendarString += '<td class=\"calendar-day-normal calendar-day-today\">';
                    } else {
                        calendarString += '<td class=\"calendar-day-normal\">';
                    }
                    if (checkEvents(daycounter, monthNum, yearNum)) { //comprueba si hay o no eventos en un dia ( comprueba tanto los eventos de un dia como los de larga duración)

                        calendarString += '<div class=\"calendar-day-event\">';

                        calendarString += daycounter_s;

                        // Get events of day

                        var events = getEvents(daycounter, monthNum, yearNum);

                        for (var t = 0; t < events.length; t++) {

                            if (typeof events[t] !== "undefined") { //si existe evento en esa posición del array de eventos DE UN DÍA CONCRETO (no undefined)

                                color = events[t].color ? events[t].color : 1; //recupera el codigo numerico que asigna color a un evento, si no encuenta una referencia asigna el valor por defecto

                                var event_class = "one-day"; //valor por defecto de un evento, valor con duración de un día

                                if (events[t].first_day && !events[t].last_day) {  // si un evento tiene fecha inicial pero no final se le asigna el tipo "primer dia" del evento
                                    event_class = "first-day";

                                } else if (events[t].last_day && !events[t].first_day) { //si un evento tiene dia final, pero no dia inicia se le asigna el tipo "ultimo dia" del evento
                                    event_class = "last-day";

                                } else if (!events[t].first_day && !events[t].last_day) { //si un evento carece de dia inicial y dia final, se le asigna el tipo "dia intermedio" del evento
                                    event_class = "middle-day";
                                }

                                var tipoEvento = event_class; // recupera el tipo de evento
                                var duracion = events[t].duracion; // recupera la duración del evento
                                var diaSemana = wordDay[x - 1]; //recupera el dia de la semana, en formato String ( lunes, martes, etc...) 
                                var tamanyoEvento = filtroEventoDuraciónDiaSemana(tipoEvento, duracion, diaSemana);
                                // esta función recupera un array con los datos que asignan a cada evento
                                //su tamaño, tamaño máximo y el número de caracteres en relación al tipo de evento, su duración y al día de la semana en el que ocurre
                                // (el dia de la semana se tiene en cuenta, ya que no se puede escribir el mismo texto en un domingo, siendo final de row, que en un lunes,
                                //  que es el principio y tiene 7 celdas en las que escribir

                                var divSize = tamanyoEvento[0]; //recupera el tamaño del div
                                var maxDiv = tamanyoEvento[1];  //recupera el tamaño máximo del div
                                var multiploDeCaracteresSegunDuracion = tamanyoEvento[2]; //asigna un factor de multiplicación de caracteres en base a la duración del evento
                                var divMaxSegunDiaSemana = tamanyoEvento[3]; //recupera el tamaño máximo del div en función a el dia de la semana



                                // selecciona el numero menor de palabras teniendo en cuenta el tamaño del div, y el dia de la semana
                                var modificadorCaracteresEvento = Math.min(multiploDeCaracteresSegunDuracion, divMaxSegunDiaSemana);

                                //renderiza eventos
                               
                                if (event_class === "first-day" || event_class === "one-day") { //carga la parte inicial de los eventos de larga duración, y los de duracion 1 dia
                                    calendarString += '<div class=\"calendar-event-name ' + event_class + maxDiv + divSize + ' color-' + color + '\" id=\"' + events[t].id +
                                            ' \" onclick=\"showEventDetail(' + events[t].id + ')\"> <span class="event-name"  >' +
                                            formatCabecera(events[t].name, events[t].tipo, "calendario", modificadorCaracteresEvento) +
                                            '</span><\/div>';
                                } else if (event_class === "last-day" && (events[t].diferenteMes || events[t].diferenteAnyo)) { //carga información en la última parte de un evento, si hay un cambio de més 
                                    calendarString += '<div class=\"calendar-event-name ' + event_class + ' cambioMes' + ' color-' + color + '\" id=\"' + events[t].id +
                                            ' \" onclick=\"showEventDetail(' + events[t].id + ')\"> <span class="event-name"  >' +
                                            formatCabecera(events[t].name, events[t].tipo, "calendario", 1) + //el número 1 corresponde a la expresión mínima en lo que ha texto se refiere 
                                            '</span></div>';
                                } else { // carga las partes sin contenido de los eventos de larga duración
                                    calendarString += '<div class=\"calendar-event-name ' + event_class + maxDiv + divSize + ' color-' + color + '\" id=\"' + events[t].id +
                                            '\" onclick=\"showEventDetail( ' + events[t].id + ' )"> <span class="event-name"  >' + "." +
                                            '</span><\/div>';

                                }


                            } else { //si no (si en la posición del array EVENTOS DEL DÍA encuentra "undefined") CREA UN EVENTO NO-NAME NO VISIBLE, esto evita que el calendario se descuadre cuando hay eventos de larga duración
                                var event_fake = "no-name"; //crea una variable

                                calendarString += '<div class=\"calendar-event-name no-name\">' + event_fake + '</div>';  // PINTA UN DIV (invisible) con el valor de vble.
                            }
                        }


                    } else {
                        calendarString += daycounter_s;
                    }
                    calendarString += '<\/td>';
                }
            }
            calendarString += '<\/tr>';
        }
    }
    calendarString += '</tbody>';
    calendarString += '</table>';


    jQuery('.consultia-calendar-full').html(calendarString);

    thisDate = 1; // reinicia la variable fecha actual a 1, para la futura creación de tablas (otros meses)
}//fin create calendar