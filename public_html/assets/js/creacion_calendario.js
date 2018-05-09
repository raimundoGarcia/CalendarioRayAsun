// Create calendar  TODO: CREAR CALENDARIO
function createCalendar(layout, firstDay, numbDays, monthNum, yearNum) {
    calendarString = '';
    daycounter = 0;
    console.log(firstDay + "y el tipo es: "+ typeof(firstDay));
    console.log(numbDays + "y el tipo es: "+ typeof(numbDays));
    console.log(monthNum + "y el tipo es: "+ typeof(monthNum));
    console.log(yearNum + "y el tipo es: "+ typeof(yearNum));

    calendarString += '<table class=\"calendar-table table table-bordered\">';
    calendarString += '<tbody>';
    calendarString += '<tr>';
    if (layout === 'full') {
        calendarString += '<td class=\"calendar-btn\"><span onClick=\"changedate(\'prevyr\', \'full\')\">« <span class="btn-change-date">' + prev_year + '<\/span><\/span><\/td>';
        calendarString += '<td class=\"calendar-btn\"><span onClick=\"changedate(\'prevmo\', \'full\')\">« <span class="btn-change-date">' + prev_month + '<\/span><\/span><\/td>';
        calendarString += '<td class=\"calendar-title\" colspan=\"3\"><span><i class=\"far fa-calendar-alt\"><\/i>&nbsp;&nbsp;' + wordMonth[monthNum - 1] + '&nbsp;&nbsp;' + yearNum + '<\/span><\/td>';
        calendarString += '<td class=\"calendar-btn\"><span onClick=\"changedate(\'nextmo\', \'full\')\"><span class="btn-change-date">' + next_month + '<\/span> »<\/span><\/td>';
        calendarString += '<td class=\"calendar-btn\"><span onClick=\"changedate(\'nextyr\', \'full\')\"><span class="btn-change-date">' + next_year + '<\/span> »<\/span><\/td>';
    } else {
        //antiguo calendario compact
    }
    calendarString += '<\/tr>'; //fin de cabecera botones

    calendarString += '<tr class="active">';
    for (var m = 0; m < wordDay.length; m++) {
        if ($(window).width() < 600) {
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
                if ((daycounter > numbDays) || (daycounter < 1)) {
                    calendarString += '<td class=\"calendar-day-blank\">&nbsp;<\/td>';
                } else {
                    // Saturday or Sunday
                    if (date_start === 'sunday') {
                        if ((x === 1) || (x === 7)) {
                            daycounter_s = '<span class=\"calendar-day-weekend\">' + daycounter + '</span>';
                        } else {
                            daycounter_s = daycounter;
                        }
                    } else {
                        if ((x === 6) || (x === 7)) {
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
                    if (checkEvents(daycounter, monthNum, yearNum)) {
                      
                            calendarString += '<div class=\"calendar-day-event\">';
                        
                        calendarString += daycounter_s;

                        // Get events of day
                        if (layout === 'full') {
                            var events = getEvents(daycounter, monthNum, yearNum);

                            for (var t = 0; t < events.length; t++) {

                                if (typeof events[t] !== "undefined") { //si existe evento en esa posición del array de eventos DE UN DÍA CONCRETO (no undefined)

                                    color = events[t].color ? events[t].color : 1;
                                    var event_class = "one-day";

                                    if (events[t].first_day && !events[t].last_day) {
                                        event_class = "first-day";

                                    } else if (events[t].last_day && !events[t].first_day) {
                                        event_class = "last-day";

                                    } else if (!events[t].first_day && !events[t].last_day) {
                                        event_class = "middle-day";
                                    }

                                    //asignación de clases a los eventos 
                                    var palabrasSegunDuracion = 2;
                                    var divSize = " length-1 ";
                                    var divMaxSegunDiaSemana = 2;
                                    var maxDiv = " maxlength-1 ";
                                    switch (event_class) {
                                        case "one-day":
                                            divSize = "";
                                            maxDiv = "";
                                            palabrasSegunDuracion = 1;
                                            divMaxSegunDiaSemana = 1;
                                            break;
                                        case "middle-day":
                                            divSize = "";
                                            maxDiv = "";
                                            palabrasSegunDuracion = 0;
                                            divMaxSegunDiaSemana = 0;
                                            break;
                                        case "last-day":
                                            divSize = "";
                                            maxDiv = "";
                                            palabrasSegunDuracion = 0;
                                            divMaxSegunDiaSemana = 0;
                                            break;
                                        case "first-day":
                                            // Delimita el máximo de palabras que puede mostrar un evento y el tamaño del div, según la duración del evento
                                            var duracion = events[t].duracion;

                                            palabrasSegunDuracion = duracion;
                                            divSize = " length-" + duracion;
                                            if (duracion > 7) {
                                                divSize = " length-7 ";
                                            }
                                            // Delimita el máximo de palabras que puede mostrar un evento y el tamaño del div, según en que  día de la semana comience  

                                            switch (wordDay[x - 1]) {
                                                case "Lunes":
                                                    divMaxSegunDiaSemana = 7;
                                                    maxDiv = 7;
                                                    break;
                                                case "Martes":
                                                    divMaxSegunDiaSemana = 6;
                                                    maxDiv = 6;
                                                    break;
                                                case "Miercoles":
                                                    divMaxSegunDiaSemana = 5;
                                                    maxDiv = 5;
                                                    break;
                                                case "Jueves":
                                                    divMaxSegunDiaSemana = 4;
                                                    maxDiv = 4;
                                                    break;
                                                case "Viernes":
                                                    divMaxSegunDiaSemana = 3;
                                                    maxDiv = 3;
                                                    break;
                                                case "Sabado":
                                                    divMaxSegunDiaSemana = 2;
                                                    maxDiv = 2;
                                                    break;
                                                case "Domingo":
                                                    divMaxSegunDiaSemana = 1;
                                                    maxDiv = 1;
                                                    break;
                                                default:
                                                    divMaxSegunDiaSemana = 1;
                                                    maxDiv = 1;
                                                    break;
                                            }
                                            maxDiv = " maxlength-" + Math.min(duracion, maxDiv);
                                            break;

                                    }

                                    // selecciona el numero menor de palabras teniendo en cuenta el tamaño del div, y el dia de la semana
                                    var palabrasEvento = Math.min(palabrasSegunDuracion, divMaxSegunDiaSemana);

                                    //renderiza eventos

                                    if (event_class === "first-day" || event_class === "one-day") {
                                        calendarString += '<div class=\"calendar-event-name ' + event_class + maxDiv + divSize + ' color-' + color + '\" id=\"' + events[t].id +
                                                ' \" onclick=\"showEventDetail(' + events[t].id + ')\"> <span class="event-name"  >' +
                                                formatCabecera(events[t].name, events[t].tipo, "calendario", palabrasEvento) +
                                                //    getShortText(events[t].name, palabrasEvento).replace("-", '<i class="fas fa-arrow-right"></i>') + //limita el número de caractres y cambia el "-" por una ->
                                                '</span><\/div>';

                                    } else {
                                        calendarString += '<div class=\"calendar-event-name ' + event_class + maxDiv + divSize + ' color-' + color + '\" id=\"' + events[t].id +
                                                '\" onclick=\"showEventDetail( '+ events[t].id +' )"> <span class="event-name"  >' + "." +
                                                '</span><\/div>';

                                    }


                                } else { //si no (si en la posición del array EVENTOS DEL DÍA encuentra "undefined") CREA UN EVENTO NO-NAME NO VISIBLE 
                                    var event_fake = "no-name"; //crea una variable

                                    calendarString += '<div class=\"calendar-event-name no-name\">' + event_fake + '</div>';  //TODO: PINTA UN DIV (invisible) con el valor de vble.
                                }
                            }
                        } else {
                            calendarString += '<span class="calendar-event-mark"></span>';
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

    if (layout === 'full') {
        jQuery('.consultia-calendar-full').html(calendarString);
    }
    thisDate = 1;
}//fin create calendar