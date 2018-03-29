// Variable
var thisDate = 1;
var today = new Date();  //Tue Mar 13 2018 12:19:54 GMT+0100 (Hora estándar romance)

var todaysDay = today.getDay() + 1; //día de la semana (de 0 a 6) aumentado en 1 para coincicir con el orden natural
var todaysDate = today.getDate(); //día del mes actual
var todaysMonth = today.getMonth() + 1; //mes actual
var todaysYear = today.getFullYear(); //año actual 4 dígitos

var firstDate;
var firstDay;
var lastDate;
var numbDays;
var numevents = 0;
var daycounter = 0;
var calendarString = "";

var monthNum_full = todaysMonth;
var yearNum_full = todaysYear;
var monthNum_compact = todaysMonth;
var yearNum_compact = todaysYear;

var tiva_events = []; //para los eventos recogidos en events.json
var order_num = 0;

// Config variable
var wordDay;  //para nombre días largo o corto
var date_start;
var returnView = "calendario"; // asigna la vista a la que volver despues de mostrar los detalles de un evento
function getShortText(text, num) {
    if (text) {

        var ancho = $(window).width();
        var caracteres = 1;
        switch (true) {
//            case (ancho > 0 && ancho <= 320):
//                caracteres = Math.floor(num * 0);
//                break;
//            case (ancho >= 321 && ancho <= 425):
//                caracteres = Math.floor(num * 0);
//                break;
//            case (ancho >= 425 && ancho <= 500):
//                caracteres = Math.floor(num * 2);
//                break;
//            case (ancho >= 501 && ancho <= 550):
//                caracteres = Math.floor(num * 3);
//                break;
//            case (ancho >= 551 && ancho <= 600):
//                caracteres = Math.floor(num * 4);
//                break;
            case (ancho >= 601 && ancho <= 650):
                caracteres = Math.floor(num * 8.5);
                break;
            case (ancho >= 651 && ancho <= 700):
                caracteres = Math.floor(num * 9.5);
                break;
            case (ancho >= 701 && ancho <= 750):
                caracteres = Math.floor(num * 10.5);
                break;
            case (ancho >= 751 && ancho <= 800):
                caracteres = Math.floor(num * 10.5);
                break;
            case (ancho >= 801 && ancho <= 850):
                caracteres = Math.floor(num * 10.5);
                break;
            case (ancho >= 851 && ancho <= 900):
                caracteres = Math.floor(num * 11.5);
                break;
            case (ancho >= 901 && ancho <= 950):
                caracteres = Math.floor(num * 12.5);
                break;
            case (ancho >= 951 && ancho <= 1000):
                caracteres = Math.floor(num * 12.5);
                break;
            case (ancho >= 1001 && ancho <= 1050):
                caracteres = Math.floor(num * 13.5);
                break;
            case (ancho >= 1051 && ancho <= 1100):
                caracteres = Math.floor(num * 14.5);
                break;
            case (ancho >= 1101 && ancho <= 1150):
                caracteres = Math.floor(num * 15.5);
                break;
            case (ancho >= 1151 && ancho <= 1200):
                caracteres = Math.floor(num * 16.5);
                break;
            case (ancho >= 1201 && ancho <= 1250):
                caracteres = Math.floor(num * 17.5);
                break;
            case (ancho >= 1251 && ancho <= 1300):
                caracteres = Math.floor(num * 18.5);
                break;
            case (ancho >= 1301 && ancho <= 1350):
                caracteres = Math.floor(num * 19.5);
                break;
            case (ancho >= 1351 && ancho <= 1400):
                caracteres = Math.floor(num * 20.5);
                break;
            case (ancho >= 1401 && ancho <= 1450):
                caracteres = Math.floor(num * 21.5);
                break;
            case (ancho >= 1451 && ancho <= 1500):
                caracteres = Math.floor(num * 22.5);
                break;
            case (ancho >= 1501 && ancho <= 1550):
                caracteres = Math.floor(num * 23.5);
                break;
            case (ancho >= 1551 && ancho <= 1600):
                caracteres = Math.floor(num * 24.5);
                break;
            case (ancho >= 1601 && ancho <= 1650):
                caracteres = Math.floor(num * 25.5);
                break;
            case (ancho >= 1651 && ancho <= 1700):
                caracteres = Math.floor(num * 26.5);
                break;
            case (ancho >= 1701 && ancho <= 1750):
                caracteres = Math.floor(num * 26.5);
                break;
            case (ancho >= 1751 && ancho <= 1800):
                caracteres = Math.floor(num * 27.5);
                break;
            case (ancho >= 1801 && ancho <= 1850):
                caracteres = Math.floor(num * 28.5);
                break;
            case (ancho >= 1851 && ancho <= 1900):
                caracteres = Math.floor(num * 29.5);
                break;
            case (ancho >= 1901 && ancho <= 1950):
                caracteres = Math.floor(num * 30.5);
                break;
            case (ancho >= 1951 && ancho <= 2000):
                caracteres = Math.floor(num * 31.5);
                break;
            case (ancho >= 2001 && ancho <= 2050):
                caracteres = Math.floor(num * 32.5);
                break;
            case (ancho >= 2051 && ancho <= 2100):
                caracteres = Math.floor(num * 33.5);
                break;
            case (ancho >= 2101 && ancho <= 2150):
                caracteres = Math.floor(num * 34.5);
                break;
            case (ancho >= 2151 && ancho <= 2200):
                caracteres = Math.floor(num * 35.5);
                break;
            case (ancho >= 2201):
                caracteres = Math.floor(num * 36.5);
                break;

        }
        // Get num of caracters

        var textArray = text.substring(0, caracteres);

        if(text.length > textArray.length){
            textArray = textArray + "...";
        }
        return textArray;

        return text;
    }
    return "";
}

function sortEventsByDate(a, b) {   //TODO: FUNCIÓN QUE ORDENA EVENTOS POR FECHA
    if (a.date < b.date) {
        return -1;
    } else if (a.date > b.date) {
        return 1;
    } else {
        return 0;
    }
}

/*
 * 
 * Date.UTC(año,mes[, dia[, hora[, minutos[, segundos, milisegundos]]]])  CON DATE() FUNCIONA =
 * 
 * IPOfecha.setTime(Date.parse("Aug 9, 1995")) ;
 * 
 * 
 * 
 */

function sortEventsByUpcoming(a, b) {
    var today_date = new Date(todaysYear, todaysMonth - 1, todaysDate);
    if (Math.abs(a.date - today_date.getTime()) < Math.abs(b.date - today_date.getTime())) {
        return -1;
    } else if (Math.abs(a.date - today_date.getTime()) > Math.abs(b.date - today_date.getTime())) {
        return 1;
    } else {
        return 0;
    }
}

function getEventsByTime(type) {
    var events = [];
    var today_date = new Date(todaysYear, todaysMonth - 1, todaysDate);
    for (var i = 0; i < tiva_events.length; i++) {
        if (type == 'upcoming') {
            if (tiva_events[i].date >= today_date.getTime()) {
                events.push(tiva_events[i]);
            }
        } else {
            if (tiva_events[i].date < today_date.getTime()) {
                events.push(tiva_events[i]);
            }
        }
    }
    return events;
}

// Change month or year on calendar  TODO: Cambiar mes o anyo en el calendario
function changedate(btn, layout) {
    if (btn == "prevyr") {
        eval("yearNum_" + layout + "--;");
    } else if (btn == "nextyr") {
        eval("yearNum_" + layout + "++;");
    } else if (btn == "prevmo") {
        eval("monthNum_" + layout + "--;");
    } else if (btn == "nextmo") {
        eval("monthNum_" + layout + "++;");
    } else if (btn == "current") {
        eval("monthNum_" + layout + " = todaysMonth;");
        eval("yearNum_" + layout + " = todaysYear;");
    }

    if (monthNum_full == 0) { //si al retroceder un mes (getDay++)-1, resulta 0, el mes a mostrar es DICIEMBRE (12) Y EL AÑO ANTERIOR(--)
        monthNum_full = 12;
        yearNum_full--;
    } else if (monthNum_full == 13) { //si al avanzar un mes (getDay++)+1, resulta 13, el mes a mostrar es ENERO (1) Y EL AÑO EL SIGUIENTE (++)
        monthNum_full = 1;
        yearNum_full++
    }

    if (monthNum_compact == 0) {
        monthNum_compact = 12;
        yearNum_compact--;
    } else if (monthNum_compact == 13) {
        monthNum_compact = 1;
        yearNum_compact++
    }

    // Get first day and number days of month
    eval("firstDate = new Date(yearNum_" + layout + ", monthNum_" + layout + " - 1, 1);"); //asigna a vble. la fecha del día 1 del mes actual
    if (date_start == 'sunday') {
        firstDay = firstDate.getDay() + 1;  //first_day será el día de la semana del día 1
    } else {
        firstDay = (firstDate.getDay() == 0) ? 7 : firstDate.getDay(); //si la semana empieza a contar en lunes, y el día 1 primer día de semana, la vble. firstDay es 7
    }
    eval("lastDate = new Date(yearNum_" + layout + ", monthNum_" + layout + ", 0);"); //asigna a la vble la fecha del último día del mes actual 
    numbDays = lastDate.getDate(); //números de días del mes

    // Create calendar
    eval("createCalendar(layout, firstDay, numbDays, monthNum_" + layout + ", yearNum_" + layout + ");");

    return;
}

// Create calendar  TODO: CREAR CALENDARIO
function createCalendar(layout, firstDay, numbDays, monthNum, yearNum) {
    calendarString = '';
    daycounter = 0;

    calendarString += '<table class=\"calendar-table table table-bordered\">';
    calendarString += '<tbody>';
    calendarString += '<tr>';
    if (layout == 'full') {
        calendarString += '<td class=\"calendar-btn\"><span onClick=\"changedate(\'prevyr\', \'full\')\">« <span class="btn-change-date">' + prev_year + '<\/span><\/span><\/td>';
        calendarString += '<td class=\"calendar-btn\"><span onClick=\"changedate(\'prevmo\', \'full\')\">« <span class="btn-change-date">' + prev_month + '<\/span><\/span><\/td>';
        calendarString += '<td class=\"calendar-title\" colspan=\"3\"><span><i class=\"far fa-calendar-alt\"><\/i>' + wordMonth[monthNum - 1] + '&nbsp;&nbsp;' + yearNum + '<\/span><\/td>';
        calendarString += '<td class=\"calendar-btn\"><span onClick=\"changedate(\'nextmo\', \'full\')\"><span class="btn-change-date">' + next_month + '<\/span> »<\/span><\/td>';
        calendarString += '<td class=\"calendar-btn\"><span onClick=\"changedate(\'nextyr\', \'full\')\"><span class="btn-change-date">' + next_year + '<\/span> »<\/span><\/td>';
    } else {
        /*
         calendarString += '<td class=\"calendar-btn\"><span onClick=\"changedate(\'prevyr\', \'compact\')\">«<\/span><\/td>';
         calendarString += '<td class=\"calendar-btn\"><span onClick=\"changedate(\'prevmo\', \'compact\')\">«<\/span><\/td>';
         calendarString += '<td class=\"calendar-title\" colspan=\"3\"><span>' + wordMonth[monthNum - 1] + '&nbsp;&nbsp;' + yearNum + '<\/span><\/td>';
         calendarString += '<td class=\"calendar-btn\"><span onClick=\"changedate(\'nextmo\', \'compact\')\">»<\/span><\/td>';
         calendarString += '<td class=\"calendar-btn\"><span onClick=\"changedate(\'nextyr\', \'compact\')\">»<\/span><\/td>';
         */
    }
    calendarString += '<\/tr>'; //fin de cabecera botones

    calendarString += '<tr class="active">';
    for (var m = 0; m < wordDay.length; m++) {
        calendarString += '<th>' + wordDay[m].substring(0, 3) + '<\/th>';  //TODO: ACORTADOR STRING DÍAS DE LA SEMANA para cabecera días semana
    }
    calendarString += '<\/tr>';

    thisDate == 1;

    for (var i = 1; i <= 6; i++) {
        var k = (i - 1) * 7 + 1;
        if (k < (firstDay + numbDays)) {  //( día semana del día 1 del mes + num días del mes )
            calendarString += '<tr>';
            for (var x = 1; x <= 7; x++) {
                daycounter = (thisDate - firstDay) + 1;
                thisDate++;
                if ((daycounter > numbDays) || (daycounter < 1)) {
                    calendarString += '<td class=\"calendar-day-blank\">&nbsp;<\/td>';
                } else {
                    // Saturday or Sunday
                    if (date_start == 'sunday') {
                        if ((x == 1) || (x == 7)) {
                            daycounter_s = '<span class=\"calendar-day-weekend\">' + daycounter + '</span>';
                        } else {
                            daycounter_s = daycounter;
                        }
                    } else {
                        if ((x == 6) || (x == 7)) {
                            daycounter_s = '<span class=\"calendar-day-weekend\">' + daycounter + '</span>';
                        } else {
                            daycounter_s = daycounter;
                        }
                    }

                    if ((todaysDate == daycounter) && (todaysMonth == monthNum)) {
                        calendarString += '<td class=\"calendar-day-normal calendar-day-today\">';
                    } else {
                        calendarString += '<td class=\"calendar-day-normal\">';
                    }
                    if (checkEvents(daycounter, monthNum, yearNum)) {
                        if (layout == 'full') {
                            calendarString += '<div class=\"calendar-day-event\">';
                        } else {
                            calendarString += '<div class=\"calendar-day-event\" onmouseover=\"showTooltip(0, \'compact\', ' + daycounter + ', ' + monthNum + ', ' + yearNum + ', this)\" onmouseout=\"clearTooltip(\'compact\', this)\" onclick=\"showEventDetail(0, \'compact\', ' + daycounter + ', ' + monthNum + ', ' + yearNum + ')\">';
                        }
                        calendarString += daycounter_s;

                        // Get events of day
                        if (layout == 'full') {
                            var events = getEvents(daycounter, monthNum, yearNum);


                            //   events.sort(sortEventsByDate); //TODO: PRUEBA ORDENAR EVENTOS - FALTA HACER FECHAS date() CON LA HORA
                            for (var t = 0; t < events.length; t++) {

                                if (typeof events[t] != "undefined") { //si existe evento en esa posición del array de eventos DE UN DÍA CONCRETO (no undefined)
                                    //TODO: PRUEBAS ICONOS EVENTOS


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
console.log(duracion);
console.log(tiva_events[t].name);
console.log(tiva_events[t]._fechaInicio);
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
                                                ' \" onclick=\"showEventDetail(' + events[t].id + ', \'full\', ' +
                                                daycounter + ', ' + monthNum + ', ' + yearNum + ')\"> <span class="event-name"  >' +
                                                formatCabecera(events[t].name, events[t].tipo, "calendario", palabrasEvento) +
                                                //    getShortText(events[t].name, palabrasEvento).replace("-", '<i class="fas fa-arrow-right"></i>') + //limita el número de caractres y cambia el "-" por una ->
                                                '</span><\/div>';

                                    } else {
                                        calendarString += '<div class=\"calendar-event-name ' + event_class + maxDiv + divSize + ' color-' + color + '\" id=\"' + events[t].id +
                                                '\" onclick=\"showEventDetail(' + events[t].id + ', \'full\', ' +
                                                daycounter + ', ' + monthNum + ', ' + yearNum + ')\"> <span class="event-name"  >' + "." +
                                                '</span><\/div>';

                                    }


                                } else { //si no (si en la posición del array EVENTOS DEL DÍA encuentra "undefined") CREA UN EVENTO NO-NAME NO VISIBLE 
                                    var event_fake; //crea una variable
                                    if (typeof events[t + 1] != "undefined") {  //establece otra condición: si el siguiente elemento del array no es indefinido -> Si el día sgte hay evento
                                        if (typeof tiva_events[events[t + 1].id - 1] != "undefined") { //entonces si el evento de la lista global ordenada inmediatamente anterior al actual
                                            //está definido, la vble. toma el nombre de ese evento inmediatamente anterior acortado

//                                            event_fake = getShortText(tiva_events[events[t + 1].id - 1].name, 2);
                                            event_fake = "no-name";
                                        } else {
                                            event_fake = "no-name";  //si es undefined, la vble. será no-name
                                        }
                                    } else {
                                        event_fake = "no-name"; //si no hay siguiente evento del día, la vble. también será no-name
                                    }
                                    calendarString += '<div class=\"calendar-event-name no-name\">' + event_fake + '</div>';  //TODO: PINTA UN DIV (invisible) con el valor de vble.
                                }
                            }
                        } else {
                            calendarString += '<span class="calendar-event-mark"></span>';
                        }

                        // Tooltip
                        calendarString += '<div class=\"tiva-event-tooltip\"><\/div>';
                        calendarString += '<\/div>';
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

    if (layout == 'full') {
        jQuery('.tiva-calendar-full').html(calendarString);
    } else {
        /*
         jQuery('.tiva-calendar-compact').html(calendarString);
         */
    }
    thisDate = 1;
}

// Check day has events or not  TODO: comprobar SI el día HAY EVENTOS
function checkEvents(day, month, year) {
    numevents = 0;
    var date_check = new Date(year, Number(month) - 1, day);
    for (var i = 0; i < tiva_events.length; i++) {
        var start_date = new Date(tiva_events[i].year, Number(tiva_events[i].month) - 1, tiva_events[i].day);
        var end_date = new Date(tiva_events[i].year, Number(tiva_events[i].month) - 1, Number(tiva_events[i].day) + Number(tiva_events[i].duration) - 1);
        if ((start_date.getTime() <= date_check.getTime()) && (date_check.getTime() <= end_date.getTime())) {
            numevents++;
        }
    }

    if (numevents == 0) {
        return false;
    } else {
        return true;
    }
}

function getOrderNumber(id, day, month, year) {  //TODO OBTIENE EL NÚMERO 
    var date_check = new Date(year, Number(month) - 1, day); //fecha actual
    var events = [];  //array para trabajar con los eventos recibidos en el json y ordenarlos después en cliente
    for (var i = 0; i < tiva_events.length; i++) {
        var start_date = new Date(tiva_events[i].year, Number(tiva_events[i].month) - 1, tiva_events[i].day); //FECHA INICIO EVENTO
        var end_date = new Date(tiva_events[i].year, Number(tiva_events[i].month) - 1, Number(tiva_events[i].day) + Number(tiva_events[i].duration) - 1); //FECHA FIN EVENTO = fecha inicio + duración - 1
        if ((start_date.getTime() <= date_check.getTime()) && (date_check.getTime() <= end_date.getTime())) { //si la FECHA ACTUAL está entre la INICIO y la FIN del evento
            var first_day = (start_date.getTime() == date_check.getTime()) ? true : false; //si la fecha inicio coincide con la fecha actual, first_day es TRUE
            var event = {id: tiva_events[i].id, name: tiva_events[i].name, day: tiva_events[i].day, month: tiva_events[i].month,
                year: tiva_events[i].year, first_day: first_day}; //se crea el evento  y se insertará en la lista
            events.push(event);
        }
    }

    if (events.length) {
        if (events[0].id == id) {
            var num = order_num;  //inicializada a 0 en la declaración
            order_num = 0;
            return num;
        } else {
            order_num++;
            for (var j = 0; j < events.length; j++) {
                if (events[j].id == id) {
                    return getOrderNumber(events[j - 1].id, events[j - 1].day, events[j - 1].month, events[j - 1].year);
                }
            }

        }
    }

    return 0;
}

// Get events of day  TODO: OBTENER EVENTOS DEL DÍA INDICADO EN PARÁMETROS
function getEvents(day, month, year) {
    var n = 0;
    var date_check = new Date(year, Number(month) - 1, day);
    var events = [];

    for (var i = 0; i < tiva_events.length; i++) {
        var start_date = new Date(tiva_events[i].year, Number(tiva_events[i].month) - 1, tiva_events[i].day);
        var end_date = new Date(tiva_events[i].year, Number(tiva_events[i].month) - 1, Number(tiva_events[i].day) + Number(tiva_events[i].duration) - 1);
        if ((start_date.getTime() <= date_check.getTime()) && (date_check.getTime() <= end_date.getTime())) {
            var first_day = (start_date.getTime() == date_check.getTime()) ? true : false;
            var last_day = (end_date.getTime() == date_check.getTime()) ? true : false;
            var event = {id: tiva_events[i].id, name: tiva_events[i].name, first_day: first_day, last_day: last_day, color: tiva_events[i].color, tipo: tiva_events[i]._tipo, duracion:tiva_events[i].duration}; //TODO: ANYADIDA PROPIEDAD DURATION AL ARRAY event

            if (!first_day) {
                n = getOrderNumber(tiva_events[i].id, tiva_events[i].day, tiva_events[i].month, tiva_events[i].year);
            }

            events[n] = event;
            n++;
        }
    }

    return events;
}

// Show tooltip when mouse over  TODO: mostrar TOOLTIP onmouseover
function showTooltip(id, layout, day, month, year, el) {
    if (layout == 'full') {
        if (tiva_events[id].image) {
            var event_image = '<img src="' + tiva_events[id].image + '" alt="' + tiva_events[id].name + '" />';
        } else {
            var event_image = '';
        }
        if (tiva_events[id].time) {
            var event_time = '<div class="event-time">' + tiva_events[id].time + '</div>';
        } else {
            var event_time = '';
        }

        // Change position of tooltip
        var index = jQuery(el).parent().find('.calendar-event-name').index(el);
        var count = jQuery(el).parent().find('.calendar-event-name').length;
        var bottom = 32 + ((count - index - 1) * 25);
        jQuery(el).parent().find('.tiva-event-tooltip').css('bottom', bottom + 'px');

        jQuery(el).parent().find('.tiva-event-tooltip').html('<div class="event-tooltip-item">'
                + event_time
                + '<div class="event-name">' + tiva_events[id].name + '</div>'  //TODO: DIV NOMBRE EVENTO
                + '<div class="event-image">' + event_image + '</div>'
                + '<div class="event-intro">' + getShortText(tiva_events[id].description, 10) + '</div>'
                + '</div>'
                );
        jQuery(el).parent().find('.tiva-event-tooltip').css('opacity', '1');
        jQuery(el).parent().find('.tiva-event-tooltip').css('-webkit-transform', 'translate3d(0,0,0) rotate3d(0,0,0,0)');
        jQuery(el).parent().find('.tiva-event-tooltip').css('transform', 'translate3d(0,0,0) rotate3d(0,0,0,0)');
    } else {
        jQuery(el).find('.tiva-event-tooltip').html('');
        var events = getEvents(day, month, year);
        for (var i = 0; i < events.length; i++) {
            if (typeof events[i] != "undefined") {
                if (tiva_events[events[i].id].image) {
                    var event_image = '<img src="' + tiva_events[events[i].id].image + '" alt="' + tiva_events[events[i].id].name + '" />';
                } else {
                    var event_image = '';
                }
                if (tiva_events[events[i].id].time) {
                    var event_time = '<div class="event-time">' + tiva_events[events[i].id].time + '</div>';
                } else {
                    var event_time = '';
                }

                jQuery(el).find('.tiva-event-tooltip').append('<div class="event-tooltip-item">'
                        + event_time
                        + '<div class="event-name">' + tiva_events[events[i].id].name + '</div>'
                        + '<div class="event-image">' + event_image + '</div>'
                        + '<div class="event-intro">' + getShortText(tiva_events[events[i].id].description, 10) + '</div>'
                        + '</div>'
                        );
            }
        }
        jQuery(el).find('.tiva-event-tooltip').css('opacity', '1');
        jQuery(el).find('.tiva-event-tooltip').css('-webkit-transform', 'translate3d(0,0,0) rotate3d(0,0,0,0)');
        jQuery(el).find('.tiva-event-tooltip').css('transform', 'translate3d(0,0,0) rotate3d(0,0,0,0)');
    }
}

// Clear tooltip when mouse out TODO: ocultar TOOLTIP onmouseover
function clearTooltip(layout, el) {
    if (layout == 'full') {
        jQuery(el).parent().find('.tiva-event-tooltip').css('opacity', '0');
        jQuery(el).parent().find('.tiva-event-tooltip').css('-webkit-transform', 'translate3d(0,-10px,0)');
        jQuery(el).parent().find('.tiva-event-tooltip').css('transform', 'translate3d(0,-10px,0)');
    } else {
        /*
         jQuery(el).find('.tiva-event-tooltip').css('opacity', '0');
         jQuery(el).find('.tiva-event-tooltip').css('-webkit-transform', 'translate3d(0,-10px,0)');
         jQuery(el).find('.tiva-event-tooltip').css('transform', 'translate3d(0,-10px,0)');
         */
    }
}

// Show event detail  TODO: mostrar lista de eventos por venir (upcoming) ordenados
function showEventList(layout, max_events) {
    // Sort event via upcoming
    var upcoming_events = getEventsByTime('upcoming');
    upcoming_events.sort(sortEventsByUpcoming);
    var past_events = getEventsByTime('past');
    past_events.sort(sortEventsByUpcoming);
    var tiva_list_events = upcoming_events.concat(past_events);
    tiva_list_events = tiva_list_events.slice(0, max_events);

    if (layout == 'full') {
        jQuery('.tiva-event-list-full').html('');
        jQuery('.tiva-event-list-full').append('<div class="listado-eventos-pendientes">');
        jQuery('.tiva-event-list-full').append('<div class="listado-eventos-terminados">');
        jQuery('.tiva-event-list-full').append('<button id="cambiarEventos" class="btn btn-primary">Eventos pasados/pendientes</button>');
        $("#cambiarEventos").on("click", function () {

            if ($(".listado-eventos-pendientes").css("display") === "none") {

                $(".listado-eventos-pendientes").css("display", "block");
                $(".listado-eventos-terminados").css("display", "none");
            } else {

                $(".listado-eventos-pendientes").css("display", "none");
                $(".listado-eventos-terminados").css("display", "block");
            }
        });


        for (var i = 0; i < tiva_list_events.length; i++) {
            // Start date
            var day = new Date(tiva_list_events[i].year, Number(tiva_list_events[i].month) - 1, tiva_list_events[i].day);
            if (date_start == 'sunday') {
                var event_day = wordDay[day.getDay()];
            } else {
                if (day.getDay() > 0) {
                    var event_day = wordDay[day.getDay() - 1];
                } else {
                    var event_day = wordDay[6];
                }
            }
            var event_date = wordMonth[Number(tiva_list_events[i].month) - 1] + ' ' + tiva_list_events[i].day + ', ' + tiva_list_events[i].year;

            // End date
            var event_end_time = '';
            if (tiva_list_events[i].duration > 1) {
                var end_date = new Date(tiva_list_events[i].year, Number(tiva_list_events[i].month) - 1, Number(tiva_list_events[i].day) + Number(tiva_list_events[i].duration) - 1);

                if (date_start == 'sunday') {
                    var event_end_day = wordDay[end_date.getDay()];
                } else {
                    if (end_date.getDay() > 0) {
                        var event_end_day = wordDay[end_date.getDay() - 1];
                    } else {
                        var event_end_day = wordDay[6];
                    }
                }
                var event_end_date = wordMonth[Number(end_date.getMonth())] + ' ' + end_date.getDate() + ', ' + end_date.getFullYear();
                event_end_time = ' - ' + event_end_day + ', ' + event_end_date;
            }

            // Event time
            if (tiva_list_events[i].time) {
                var event_time = '<i class="far fa-clock"></i>&nbsp;&nbsp;' + tiva_list_events[i].time;
            } else {
                var event_time = '';
            }

            // Event image
            if (tiva_list_events[i].image) {
                var event_image = '<img src="' + tiva_list_events[i].image + '" alt="' + tiva_list_events[i].name + '" />';
            } else {
                var event_image = '';
            }



            var eventoListado = '<div class="list__event" onclick="showEventDetail(' + tiva_list_events[i].id + ', \'full\', 0, 0, 0)">' +
                    '<div class="event__cabecera color-' + tiva_list_events[i].color + ' " >' +
                    formatCabecera(tiva_list_events[i].name, tiva_list_events[i]._tipo, "lista", null) +
                    '</div>' +
                    '<div class=event__fecha><i class="far fa-calendar-alt"></i>&nbsp;&nbsp; ' + event_day + ', ' + event_date + event_end_time + '</div>' +
                    '<div class=event__hora>' + event_time + '</div>' +
                    '<div class=event__ubicacion>' + tiva_list_events[i]._ubicacion + '</div>' +
                    '</div>';
            var today = new Date;

            var ultimoDia = Date.parse(tiva_list_events[i]._fechaFin);

            var resta = (ultimoDia - today.getTime());

            if (resta >= 0) {
            $(".listado-eventos-pendientes").append(eventoListado);
            } else {
                $(".listado-eventos-terminados").append(eventoListado);
            }


            ////'<div class="event-item">' +
//                    '  <div class="card" onclick="showEventDetail(' + tiva_list_events[i].id + ', \'full\', 0, 0, 0)">' +
//                    ' <div class="card-header  color-' + tiva_list_events[i].color + ' lighten-1 white-text">' + tiva_list_events[i]._icono +
//                    tiva_list_events[i].name.replace("-", '<i class="fas fa-arrow-right"></i>').substring(5) + '</div>' +
//                    ' <div class="card-body"><i class="far fa-calendar-alt"></i>&nbsp;&nbsp; ' + event_day + ', ' + event_date + event_end_time +
//                    '    <h4 class="card-title">' + event_time + '</h4>' +
//                    '  <p class="card-text"> Ubicación: cambiar por ubicacion real (tiva_list_events[i].ubicacion</p>' +
//                    ' </div>' +
//                    '</div>');
//                    + '<div class="event-item-right pull-left">'
//                    + '<div class="event-name link" onclick="showEventDetail(' + tiva_list_events[i].id + ', \'full\', 0, 0, 0)">' + tiva_list_events[i].name + '</div>'
//                    + '<div class="event-date"><i class="far fa-calendar-alt"></i>' + event_day + ', ' + event_date + event_end_time + '</div>'
//                    + '<div class="event-time">' + event_time + '</div>'
//                    + '<div class="event-intro">' + getShortText(tiva_list_events[i].description, 25) + '</div>'
//                    + '</div>'
//                    + '</div>'
//                    + '<div class="cleardiv"></div>'
//                    );
//                    ' <div class="lista__item"> ' +
//                    '         <div class=" modal-fluid" role="document">' +
//                    '            <!--Content-->' +
//                    '           <div class="modal-content">' +
//                    '             <!--Header-->' +
//                    '             <div class="modal-header  color-' + tiva_list_events[i].color + '">' +
//                    '                <h4 class="modal-title w-100">' + tiva_list_events[i]._icono +
//                    tiva_list_events[i].name.replace("-", '<i class="fas fa-arrow-right"></i>').substring(5) + ' </h4>' +
//                    '           </div>' +
//                    '  <!--Body-->' +
//                    '         <div class="modal-body modal-cuerpo">' +
//                    '             <div class="modal-content">' +
//                    '                <div class="horario">  ' +
//                    '               </div>' +
//                    '              <div class="descripcion">' +
//                    '                 <h4>Descripción:</h4>' +
//                    '   <!-- <div class="listaviajeros">COMPARTE CON: </div> -->' +
//                    '            </div>' +
//                    '       </div>' +
//                    '  </div>' +
//                    '   <!--Footer-->' +
//                    ' </div>' +
//                    '  <!--/.Content-->' +
//                    '      </div>' +
//                    '   </div>');
        }
    } else {
        /*
         jQuery('.tiva-event-list-compact').html('');
         for (var i = 0; i < tiva_list_events.length; i++) {
         // Start date
         var day = new Date(tiva_list_events[i].year, Number(tiva_list_events[i].month) - 1, tiva_list_events[i].day);
         if (date_start == 'sunday') {
         var event_day = wordDay[day.getDay()];
         } else {
         if (day.getDay() > 0) {
         var event_day = wordDay[day.getDay() - 1];
         } else {
         var event_day = wordDay[6];
         }
         }
         var event_date = wordMonth[Number(tiva_list_events[i].month) - 1] + ' ' + tiva_list_events[i].day + ', ' + tiva_list_events[i].year;
         
         // End date
         var event_end_time = '';
         if (tiva_list_events[i].duration > 1) {
         var end_date = new Date(tiva_list_events[i].year, Number(tiva_list_events[i].month) - 1, Number(tiva_list_events[i].day) + Number(tiva_list_events[i].duration) - 1);
         
         if (date_start == 'sunday') {
         var event_end_day = wordDay[end_date.getDay()];
         } else {
         if (end_date.getDay() > 0) {
         var event_end_day = wordDay[end_date.getDay() - 1];
         } else {
         var event_end_day = wordDay[6];
         }
         }
         var event_end_date = wordMonth[Number(end_date.getMonth())] + ' ' + end_date.getDate() + ', ' + end_date.getFullYear();
         event_end_time = ' - ' + event_end_day + ', ' + event_end_date;
         }
         
         // Event time
         if (tiva_list_events[i].time) {
         var event_time = '<i class="fa fa-clock-o"></i>' + tiva_list_events[i].time;
         } else {
         var event_time = '';
         }
         
         // Event image
         if (tiva_list_events[i].image) {
         var event_image = '<img src="' + tiva_list_events[i].image + '" alt="' + tiva_list_events[i].name + '" />';
         } else {
         var event_image = '';
         }
         
         jQuery('.tiva-event-list-compact').append(	'<div class="event-item">'
         + '<div class="event-image link" onclick="showEventDetail(' + tiva_list_events[i].id + ', \'compact\', 0, 0, 0)">' + event_image + '</div>'
         + '<div class="event-name link" onclick="showEventDetail(' + tiva_list_events[i].id + ', \'compact\', 0, 0, 0)">' + tiva_list_events[i].name + '</div>'
         + '<div class="event-date"><i class="far fa-calendar-alt"></i>' + event_day + ', ' + event_date + event_end_time + '</div>'
         + '<div class="event-time">' + event_time + '</div>'
         + '<div class="event-intro">' + getShortText(tiva_list_events[i].description, 15) + '</div>'	
         + '</div>'
         + '<div class="cleardiv"></div>'
         );
         
         }
         */
    }
}
function formatCabecera(asunto, tipo, formato, maxCaracter) {
    var texto = "";
    switch (formato) {
        case "calendario":
            switch (tipo) {
                case "Aereo":      
                    var cabecera = asunto.replace("-- >","$");
                    texto = '<i class="fas fa-plane"></i>&nbsp;' + getShortText(cabecera, maxCaracter).replace("$", '<i class="fas fa-arrow-right"></i>');
                    break;
                case "Hotel":
                    texto = '<i class="fas fa-h-square"></i>&nbsp;' + getShortText(asunto, maxCaracter);
                    break;
                case "Tren":
                    var cabecera = asunto.replace("-->","$");
                    texto = '<i class="fas fa-train"></i>&nbsp;' + getShortText(cabecera, maxCaracter).replace("$", '<i class="fas fa-arrow-right"></i>');
                    break;
                case "Barco":
                   var cabecera = asunto.replace("-->","$"); 
                    texto = '<i class="fas fa-ship"></i>&nbsp;'  + getShortText(cabecera, maxCaracter).replace("$", '<i class="fas fa-arrow-right"></i>');
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
                    texto = '<i class="fas fa-car"></i>&nbsp;' + asunto.substring(8);
                    break;
                case "Otros":
                    // '<i class="fas fa-asterisk"></i>'
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
                    texto = '<i class="fas fa-car"></i>&nbsp;' + asunto.substring(8);
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

//función deshabilitar enlace de <a>  y anyadir este atributo a la etiqueta: onclick="deshabilitar(this)"
        
        function deshabilitar( link ){
            link.style.pointerEvents = 'none';
            link.style.color = '#bbb';

            setTimeout(function(){
                link.style.pointerEvents = null;
                link.style.color = 'blue';
            }, 3000);
        }

// Show event detail TODO: mostrar detalles de los eventos
function showEventDetail(id, layout, day, month, year) {
    /*  jQuery('.tiva-events-calendar.' + layout + ' .back-calendar').show();
     jQuery('.tiva-events-calendar.' + layout + ' .tiva-calendar').hide(); */
    jQuery('.tiva-events-calendar.' + layout + ' .tiva-event-list').hide();
    jQuery('.tiva-events-calendar.' + layout + ' .tiva-event-detail').fadeIn(500);

    jQuery('.tiva-events-calendar.' + layout + ' .list-view').removeClass('active');
    jQuery('.tiva-events-calendar.' + layout + ' .calendar-view').removeClass('active');

    if (layout == 'full') {
        // Start date
        var day = new Date(tiva_events[id].year, Number(tiva_events[id].month) - 1, tiva_events[id].day);
        if (date_start == 'sunday') {
            var event_day = wordDay[day.getDay()];
        } else {
            if (day.getDay() > 0) {
                var event_day = wordDay[day.getDay() - 1];
            } else {
                var event_day = wordDay[6];
            }
        }
        var event_date = wordMonth[Number(tiva_events[id].month) - 1] + ' ' + tiva_events[id].day + ', ' + tiva_events[id].year;

        // End date
        var event_end_time = '';
        if (tiva_events[id].duration > 1) {
            var end_date = new Date(tiva_events[id].year, Number(tiva_events[id].month) - 1, Number(tiva_events[id].day) + Number(tiva_events[id].duration) - 1);

            if (date_start == 'sunday') {
                var event_end_day = wordDay[end_date.getDay()];
            } else {
                if (end_date.getDay() > 0) {
                    var event_end_day = wordDay[end_date.getDay() - 1];
                } else {
                    var event_end_day = wordDay[6];
                }
            }
            var event_end_date = wordMonth[Number(end_date.getMonth())] + ' ' + end_date.getDate() + ', ' + end_date.getFullYear();
            event_end_time = ' - ' + event_end_day + ', ' + event_end_date;
        }

        // Event time
        if (tiva_events[id].time) {
            var event_time = '<i class="fa fa-clock-o"></i>' + tiva_events[id].time;
        } else {
            var event_time = '';
        }

        // Event image
        if (tiva_events[id].image) {
            var event_image = '<img src="' + tiva_events[id].image + '" alt="' + tiva_events[id].name + '" />';
        } else {
            var event_image = '';
        }

        // Event location
        if (tiva_events[id].location) {
            var event_location = '<i class="fa fa-map-marker"></i>' + tiva_events[id].location;
        } else {
            var event_location = '';
        }

        // Event description
        if (tiva_events[id].description) {
            var event_desc = '<div class="event-desc">' + tiva_events[id].description + '</div>';
        } else {
            var event_desc = '';
        }
        /*
         jQuery('.tiva-event-detail-full').html('<div class="event-item">'
         + '<div class="event-image">' + event_image + '</div>'
         + '<div class="event-name">' + tiva_events[id].name + '</div>'
         + '<div class="event-date"><i class="far fa-calendar-alt"></i>' + event_day + ', ' + event_date + event_end_time + '</div>'
         + '<div class="event-time">' + event_time + '</div>'
         + '<div class="event-location">' + event_location + '</div>'
         + event_desc
         + '</div>'
         );
         */

//RELLENAR Y MOSTRAR VENTANA MODAL //TODO: MODAL
       
       //Limpiar html antes de coger los datos:
       
       document.getElementById("descripcion").innerHTML= "";
       document.getElementById("compartecon").innerHTML= "";
       
        
        
        
//BLOQUE COMÚN PARA CUALQUIER TIPO RESERVA
        var tipoReserva = tiva_events[id]._tipo; 
        var colorfondo = tiva_events[id].color;
        
        //Colorear cabecera ventana según tipo reserva
        var item = document.getElementById("asunto").classList.item(1); //si la selección está fuera de rango devuelve 'null'
        document.getElementById("asunto").classList.remove(item); //eliminar 'null' no da errores en consola
        document.getElementById("asunto").classList.add("color-" + colorfondo);
        //Fechas salida-llegada / origen-destino
        document.getElementById("fecha-o").innerHTML = tiva_events[id].day + " / " + tiva_events[id].month + " / " + tiva_events[id].year;
        document.getElementById("fecha-d").innerHTML = tiva_events[id]._diaFin + " / " + tiva_events[id]._mesFin + " / " + tiva_events[id]._anyoFin;
       // document.getElementById("numpedido").innerHTML = "Referencia: " + tiva_events[id]._refPedido + "<br/>";
        document.getElementById("localizador").innerHTML = "Localizador reserva: " + tiva_events[id]._localizador;
        
        //A continuación se llamará a una función para tratar el asunto correctamente según el tipo de reserva 
        document.getElementById("asunto").innerHTML = formatCabecera(tiva_events[id].name, tipoReserva, "modal",null); 
//BLOQUES PARTICULARIDADES POR TIPO DE RESERVA          
        if (tipoReserva == "Aereo"){
            document.getElementById("googlesearchvuelo").style.display = "block";
            var codigoV = tiva_events[id]._NVuelo;
            var companyiaAerea = codigoV.split("/"); //vector con [0] codigo companyia y con [1] numero vuelo, por si hay que usarlo
            //TODO:buscar logo companyia aerea
            codigoV = codigoV.replace("/",""); //para buscador google el código debe salir sin slash
            
            //document.getElementById("numvuelo").innerHTML = codigoV;
            //nombre aerolinea para el logo
            var aerolinea = tiva_events[id]._Aerolinea;
            
            //funcionalidad botón seguimiento vuelo online google
            var q = codigoV + " " +( tiva_events[id].year + "/" +  tiva_events[id].month + "/" + tiva_events[id].day );

            document.getElementById("googlesearchvuelo").onclick = function(){
              window.open('http://www.google.com/search?q='+ q);  
            };  
            //Bloque horarios
            var salidaIata = tiva_events[id]._SalidaIATA;
            var llegadaIata = tiva_events[id]._LlegadaIATA;
            
            document.getElementById("ciudad-o").innerHTML = tiva_events[id]._ciudadOrigen + " (" + salidaIata + ")";
            document.getElementById("hora-o").innerHTML = tiva_events[id].time;
            document.getElementById("ciudad-d").innerHTML = tiva_events[id]._ciudadDestino + " (" + llegadaIata + ")";
            document.getElementById("hora-d").innerHTML = tiva_events[id]._horaFin;
            
            //Bloque descripción
            var aeropuertoSalida = tiva_events[id]._AeropuertoSalida;
            var aeropuertoLlegada = tiva_events[id]._AeropuertoLlegada;
            var duracionHoras = tiva_events[id]._DuracionHoras;
            duracionHoras = duracionHoras.split(":");
            var horas = duracionHoras[0];
            var minutos = duracionHoras[1];
            
            document.getElementById("descripcion").innerHTML = "<h5>NÚMERO VUELO: " + codigoV + "</h5><h5>Aerolínea: "+ aerolinea + "</h5>" 
                    + "<h5>Aeropuerto Salida: " + salidaIata +" - "+ aeropuertoSalida + "</h5>" + 
                    "<h5>Aeropuerto Llegada: " + llegadaIata + " - "+ aeropuertoLlegada + "</h5>" +
                    "<h5>Duración vuelo: " + horas + " horas y "+ minutos + " minutos. </h5><h5> NOTA: Las horas mostradas corresponden a la hora local.</h5>";
            
        } else if(tipoReserva === "Hotel"){ //POSIBLE IF o SWITCH CON TODAS LAS OPCIONES QUE DIFIERAN
            document.getElementById("googlesearchvuelo").style.display = "none";
            document.getElementById("ciudad-o").innerHTML = "ENTRADA";
            document.getElementById("ciudad-d").innerHTML = "SALIDA";
            document.getElementById("hora-o").innerHTML = "14:00 aprox." ;   //tiva_events[id].time
            document.getElementById("hora-d").innerHTML = "12:00 aprox." ; //tiva_events[id]._horaFin
            //
            //Bloque descripción
            var nombreHotel = tiva_events[id]._nombreHotel;
            var direccionHotel = tiva_events[id]._direccion;
            var regimen = tiva_events[id]._regimen;
            var tipoHabitacion = tiva_events[id]._tipohabita;
            var acompanyantes = tiva_events[id]._acompanyantes;
            console.log(acompanyantes);
            var html = "";
            for (i=0; i<acompanyantes.length; i++){
                html += "<h5>Acompañante: " + acompanyantes[i].Nombre + "</h5>";
            }
            document.getElementById("descripcion").innerHTML = "<h5>Hotel: " + nombreHotel + 
                    "</h5><h5>Dirección: " + direccionHotel +
                    "</h5><h5>Régimen: " + regimen + "</h5><h5>Tipo Habitación: " + 
                    tipoHabitacion + "</h5>"; //reservado para incluir la descripción o apartados de la reserva que se quieran mostrar
            document.getElementById("compartecon").innerHTML = html;
           
        } else if(tipoReserva === "Coche"){
            document.getElementById("googlesearchvuelo").style.display = "none";
            
            var acompanyantes = tiva_events[id]._acompanyantes;
            console.log(acompanyantes);
            var html = "";
            for (i=0; i<acompanyantes.length; i++){
                html += "<h5>Acompañante "+(i+1)+": "  + acompanyantes[i].Nombre + "</h5>";
            }
            document.getElementById("descripcion").innerHTML = "<h5>Hotel: " + nombreHotel + 
                    "</h5><h5>Dirección: " + direccionHotel +
                    "</h5><h5>Régimen: " + regimen + "</h5><h5>Tipo Habitación: " + 
                    tipoHabitacion + "</h5>"; //reservado para incluir la descripción o apartados de la reserva que se quieran mostrar
            document.getElementById("compartecon").innerHTML = html;
            
        } else if(tipoReserva === "Tren"){
            document.getElementById("googlesearchvuelo").style.display = "none";
            document.getElementById("ciudad-o").innerHTML = tiva_events[id]._ciudadOrigen;
            document.getElementById("hora-o").innerHTML = tiva_events[id].time;
            document.getElementById("ciudad-d").innerHTML = tiva_events[id]._ciudadDestino;
            document.getElementById("hora-d").innerHTML = tiva_events[id]._horaFin;
            
            
        } else if(tipoReserva === "Barco"){
            document.getElementById("googlesearchvuelo").style.display = "none";
            
        } else if(tipoReserva === "Otros"){
            document.getElementById("googlesearchvuelo").style.display = "none";
            
        }
        
        
        
            
        //GESTIÓN DE LOS ADJUNTOS
        if(tiva_events[id]._adjuntos !== null){ //TODO: el campo Adjuntos o es null o es un array con una posición mínimo
            
            var adjuntos = "";
            var numdocs = tiva_events[id]._adjuntos.length;
                        
            for(n=0; n<numdocs; n++){
                var tipodoc = tiva_events[id]._adjuntos[n].Tipo.toLowerCase(); //cada imagen de tipo de documento tendrá el nombre del tipo y la misma extensión (png en este caso)
                var idadjunto = tiva_events[id]._adjuntos[n].idAdjunto;
                //adjuntos += '<a id="' + idadjunto + '" class="linkadjunto" href="#"><img class="mimeType" src="assets/images/'+tipodoc+'.png" alt="" ></a>'; 
                adjuntos += '<img id="' + idadjunto + '" class="mimeType" src="assets/images/'+tipodoc+'.png" alt="" >'; 
                console.log(tiva_events[id]._adjuntos[n].idAdjunto);
            }
                      
            document.getElementById("docs").innerHTML = adjuntos;
            
            var arrayAdjuntos = $('img.mimeType');
     
            
            $.each(arrayAdjuntos, function(idx,val){  //para cada elemento de la clase linkadjunto
                
                var numadjunto = $(this).attr("id");
               
                
                $(this).click( function(){ 
                               
                        $.ajax({

                            url: "http://192.168.0.250:5556/api/Calendario?idUsuario=2&idadjunto=" + numadjunto ,
                            type: 'GET',
                            dataType: 'json',
                            success: function(churro){
                                 var tamanyo = churro.length;
                                 console.log(tamanyo);
                              /* La longitud máxima de la dirección URL es variable, 
                               *  Internet Explorer es de 2083 caracteres. 
                               *   Firefox: 65, 536 carácteres. Safari: 80.000 carácteres. 
                               *   Opera: 190.000 carácteres. 
                               *   y por servidor web: Apache: 4,000 carácteres Microsoft Internet ..*/
                                
                           //    function abrirUrlAdjunto(churro){
                                   window.open(churro);
                            //   };

                               // $(this).attr("href", "javascript:"+ abrirUrlAdjunto(churro) );
                            },
                            error: function(){
                                console.log("Se ha producido un error API adjuntos u otra causa.");
                            }


                        }); 
                
                });  
            });   
                                
        }else if(tiva_events[id]._adjuntos == null || tiva_events[id]._adjuntos == 'undefined'){
            
            document.getElementById("docs").innerHTML = "No hay adjuntos que mostrar.";  
        }
            
        
      // document.getElementById("fichaDetalle").style.display='block';  //NO FUNCIONA...la alternativa, jQuery
       $("#fichaDetalle").modal("show");

    } else { //compacto
        /*       jQuery('.tiva-event-detail-compact').html('');
         if (day && month && year) {
         var events = getEvents(day, month, year);
         } else {
         var events = [{id: id}];
         }
         for (var i = 0; i < events.length; i++) {
         if (typeof events[i] != "undefined") {
         // Start date
         var day = new Date(tiva_events[events[i].id].year, Number(tiva_events[events[i].id].month) - 1, tiva_events[events[i].id].day);
         if (date_start == 'sunday') {
         var event_day = wordDay[day.getDay()];
         } else {
         if (day.getDay() > 0) {
         var event_day = wordDay[day.getDay() - 1];
         } else {
         var event_day = wordDay[6];
         }
         }
         var event_date = wordMonth[Number(tiva_events[events[i].id].month) - 1] + ' ' + tiva_events[events[i].id].day + ', ' + tiva_events[events[i].id].year;
         
         // End date
         var event_end_time = '';
         if (tiva_events[events[i].id].duration > 1) {
         var end_date = new Date(tiva_events[events[i].id].year, Number(tiva_events[events[i].id].month) - 1, Number(tiva_events[events[i].id].day) + Number(tiva_events[events[i].id].duration) - 1);
         
         if (date_start == 'sunday') {
         var event_end_day = wordDay[end_date.getDay()];
         } else {
         if (end_date.getDay() > 0) {
         var event_end_day = wordDay[end_date.getDay() - 1];
         } else {
         var event_end_day = wordDay[6];
         }
         }
         var event_end_date = wordMonth[Number(end_date.getMonth())] + ' ' + end_date.getDate() + ', ' + end_date.getFullYear();
         event_end_time = ' - ' + event_end_day + ', ' + event_end_date;
         }
         
         // Event time
         if (tiva_events[events[i].id].time) {
         var event_time = '<i class="fa fa-clock-o"></i>' + tiva_events[events[i].id].time;
         } else {
         var event_time = '';
         }
         
         // Event image
         if (tiva_events[events[i].id].image) {
         var event_image = '<img src="' + tiva_events[events[i].id].image + '" alt="' + tiva_events[events[i].id].name + '" />';
         } else {
         var event_image = '';
         }
         
         // Event location
         if (tiva_events[events[i].id].location) {
         var event_location = '<i class="fa fa-map-marker"></i>' + tiva_events[events[i].id].location;
         } else {
         var event_location = '';
         }
         
         // Event description
         if (tiva_events[events[i].id].description) {
         var event_desc = '<div class="event-desc">' + tiva_events[events[i].id].description + '</div>';
         } else {
         var event_desc = '';
         }
         
         jQuery('.tiva-event-detail-compact').append('<div class="event-item">'
         + '<div class="event-image">' + event_image + '</div>'
         + '<div class="event-name">' + tiva_events[events[i].id].name + '</div>'
         + '<div class="event-date"><i class="far fa-calendar-alt"></i>' + event_day + ', ' + event_date + event_end_time + '</div>'
         + '<div class="event-time">' + event_time + '</div>'
         + '<div class="event-location">' + event_location + '</div>'
         + event_desc
         + '</div>'
         );
         
         }
         }  */
    }
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
function dayDifference(entrada, salida) {
    var inicio = entrada.substring(0, 10);
    var fin = salida.substring(0, 10);
    // First we split the values to arrays date1[0] is the year, [1] the month and [2] the day
    date1 = inicio.split('-');
    date2 = fin.split('-');

// Now we convert the array to a Date object, which has several helpful methods
    date1 = new Date(date1[0], date1[1]-1, date1[2]);
    date2 = new Date(date2[0], date2[1]-1, date2[2]);
  

// We use the getTime() method and get the unixtime (in milliseconds, but we want seconds, therefore we divide it through 1000)
//    date1_unixtime = date1.getTime() / 1000;
//    date2_unixtime = date2.getTime() / 1000;

// This is the calculated difference in seconds
//    var timeDifference = date2_unixtime - date1_unixtime;
    var timeDifference = date2 - date1;

// in Hours
    var timeDifferenceInHours = timeDifference / 3600000;

// and finaly, in days :)
    var timeDifferenceInDays = timeDifferenceInHours / 24;

    return Math.round(timeDifferenceInDays);


}

jQuery(document).ready(function () {  //TODO: código en $(document).ready()
    // Init calendar full
    if (jQuery('.tiva-events-calendar.full').length) {
        jQuery('.tiva-events-calendar.full').html('<div class="events-calendar-bar">'
                + '<span class="bar-btn calendar-view calendar-btn boton-oculto active"><i class="far fa-calendar-alt"></i>' + calendar_view + '</span>'
                + '<span class="bar-btn list-view calendar-btn  boton-oculto"><i class="fa fa-list"></i>' + list_view + '</span>'
                + ' <!--Grid row-->'
                + ' <div class="row">'

                + ' <!--Grid column-->'
                + ' <div class="col-md-6 mb-4">'

                + '   <div class="md-form">'
                + '  <!--The "from" Date Picker -->'
                + '   <input placeholder="Selected starting date" type="text" id="startingDate" class="form-control datepicker">'
                + '   <label for="startingDate">start</label>'
                + '   </div>'

                + ' </div>'
                + ' <!--Grid column-->'

                + ' <!--Grid column-->'
                + ' <div class="col-md-6 mb-4">'

                + '  <div class="md-form">'
                + '   <!--The "to" Date Picker -->'
                + ' <input placeholder="Selected ending date" type="text" id="endingDate" class="form-control datepicker">'
                + '  <label for="endingDate">end</label>'
                + '  </div>'

                + ' </div>'
                + ' <!--Grid column-->'

                + ' </div>'
                + ' <!--Grid row-->'
                + '<span class="bar-btn back-calendar pull-right active"><i class="fa fa-caret-left"></i>' + back + '</span>'
                + '</div>'
                + '<div class="cleardiv"></div>'
                + '<div class="tiva-events-calendar-wrap">'
                + '<div class="tiva-calendar-full tiva-calendar"></div>'
                + '<div class="tiva-event-list-full tiva-event-list"></div>'
                + '<div class="tiva-event-detail-full tiva-event-detail"></div>'
                + '</div>'
                );
    }

    // Init calendar compact
    if (jQuery('.tiva-events-calendar.compact').length) {
        jQuery('.tiva-events-calendar.compact').html('<div class="events-calendar-bar">'
                + '<span class="bar-btn calendar-view calendar-btn active"><i class="far fa-calendar-alt"></i>' + calendar_view + '</span>'
                + '<span class="bar-btn list-view calendar-btn"><i class="fa fa-list"></i>' + list_view + '</span>'
                + '<span class="bar-btn back-calendar pull-right active"><i class="fa fa-caret-left"></i>' + back + '</span>'
                + '</div>'
                + '<div class="cleardiv"></div>'
                + '<div class="tiva-events-calendar-wrap">'
                + '<div class="tiva-calendar-compact tiva-calendar"></div>'
                + '<div class="tiva-event-list-compact tiva-event-list"></div>'
                + '<div class="tiva-event-detail-compact tiva-event-detail"></div>'
                + '</div>'
                );
    }

    // Show - Hide view
    jQuery('.tiva-events-calendar .back-calendar').hide();
    jQuery('.tiva-event-list').hide();
    jQuery('.tiva-event-detail').hide();

    jQuery('.tiva-events-calendar').each(function (index) {
        // Hide switch button
        var switch_button = (typeof jQuery(this).attr('data-switch') != "undefined") ? jQuery(this).attr('data-switch') : 'show';
        if (switch_button == 'hide') {
            jQuery(this).find('.calendar-view').hide();
            jQuery(this).find('.list-view').hide();

            // Change css of button back
            jQuery(this).find('.events-calendar-bar').css('position', 'relative');
            jQuery(this).find('.back-calendar').css({"position": "absolute", "margin-top": "15px", "right": "15px"});
            jQuery(this).find('.tiva-event-detail').css('padding-top', '60px');
        }
    });

    // Set wordDay 
    date_start = (typeof jQuery('.tiva-events-calendar').attr('data-start') != "undefined") ? jQuery('.tiva-events-calendar').attr('data-start') : 'monday'; //TODO: SELECTOR DE FORMATO PRIMER DÍA SEMANA
    if (date_start == 'sunday') {
        wordDay = new Array(wordDay_sun, wordDay_mon, wordDay_tue, wordDay_wed, wordDay_thu, wordDay_fri, wordDay_sat);
    } else { // Start with Monday
        wordDay = new Array(wordDay_mon, wordDay_tue, wordDay_wed, wordDay_thu, wordDay_fri, wordDay_sat, wordDay_sun);
    }

    jQuery.ajax({
     // url: "./events/ejemplo_agenda.json",
        url: "http://192.168.0.250:5556/api/Calendario?idUsuario=2",
        dataType: 'json',
        type: "GET",
        beforeSend: function () {
            jQuery('.tiva-calendar').html('<div class="loading"><img src="assets/images/loading.gif" /></div>');
        },
        success: function (entradas) {

            j = -1; //contador para asignar las IP a los eventos
            entradas.forEach(entrada => {
                j++;
                var color = "1";
                tipo = entrada.Tipo;

                // Asigna un color  cada evento, dependiendo del tipo de evento 
                switch (tipo) {
                    case "Aereo":
                        color = "1";
                        break;
                    case "Hotel":
                        color = "2";
                        break;
                    case "Tren":
                        color = "3";
                        break;
                    case "Barco":
                        color = "4";
                        break;
                    case "Coche":
                        color = "5";
                        break;
                    case "Otros":
                        color = "6";
                        break;
                    case "Parking":
                        color = "7";
                        break;
                    case "Seguro":
                        color = "8";
                        break;
                    default:
                        color = "9";
                        break;

                }



                // asignación de los atributos al evento, usando substrings para fracionar la fecha formateada
                evento = {

                    "color": color,
                    "day": entrada.FechaInicio.substring(8, 10),
                    "description": "",
                    "duration": dayDifference(entrada.FechaInicio, entrada.FechaFin),
                    "image": "",
                    "location": entrada.Detalles.Direccion,
                    "month": entrada.FechaInicio.substring(5, 7),
                    "name": entrada.Asunto,
                    "time": entrada.FechaInicio.substring(11, 16),
                    "year": entrada.FechaInicio.substring(0, 4),
                    "_tipo": entrada.Tipo,
                    "_refPedido": entrada.idPedido, //numero de referencia - hay otro campo que es idServicio 
                    "_ciudadOrigen": entrada.Detalles.SalidaCiudad,
                    "_ciudadDestino": entrada.Detalles.LlegadaCiudad,
                    "_diaFin": entrada.FechaFin.substring(8, 10),
                    "_mesFin": entrada.FechaFin.substring(5, 7),
                    "_anyoFin": entrada.FechaFin.substring(0, 4),
                    "_horaFin": entrada.FechaFin.substring(11, 16),
                    "_adjuntos": entrada.Detalles.Adjuntos,  //array
                    "_fechaInicio": entrada.FechaInicio,
                    
                   //para Vuelo
                   "_NVuelo": entrada.Detalles.NVuelo,
                   "_Aerolinea": entrada.Detalles.Aerolinea,
                   "_AeropuertoSalida": entrada.Detalles.SalidaNombreAeropuerto,
                   "_AeropuertoLlegada": entrada.Detalles.LlegadaNombreAeropuerto,
                   "_SalidaIATA": entrada.Detalles.SalidaIATA,
                   "_LlegadaIATA": entrada.Detalles.LlegadaIATA,
                   "_DuracionHoras": entrada.Detalles.DuracionHoras,
                                       
                    //para hotel
                    "_direccion": entrada.Detalles.Direccion,
                    "_nombreHotel": entrada.Detalles.NombreHotel,
                    "_latitud": entrada.Detalles.Latitud,
                    "_longitud": entrada.Detalles.Longitud,
                    "_regimen": entrada.Detalles.Regimen,
                    "_tipohabita": entrada.Detalles.TipoHabitacion,
                    "_localizador": entrada.Detalles.Localizador,
                    "_acompanyantes": entrada.Viajeros, //array

                };
            // Adapta la duracion a cada evento, fijando el valor a 1 en caso de que sea un evento que implique un billete
            // y contemplando el dia de salida/devolucion en los eventos de alquiler de habitaciones en hoteles o coches
            
            
               if ( evento._tipo === "Aereo" || evento._tipo === "Barco" || evento._tipo === "Tren"){
                   evento.duration = 1;
               }else{
                   evento.duration = evento.duration + 1 ;
                   console.log(evento.name);
                   console.log(evento._fechaInicio);
                   console.log(evento._fechaFin);
               }
          
            

                var event_date = new Date(evento.year, Number(evento.month) - 1, evento.day, entrada.FechaInicio.substring(11, 13), entrada.FechaInicio.substring(14, 16));

                

                evento.date = event_date.getTime();

                tiva_events.push(evento);
                
               
             
            });

            tiva_events.sort(sortEventsByDate);
            for (var i = 0; i < tiva_events.length; i++) {
                tiva_events[i].id = i;
            }


            // Create calendar
            changedate('current', 'full');
            //  changedate('current', 'compact'); crea el calendario en forma compacta
            if ($(window).width() <= 600) {  // da prioridad a la lista, y no muestra el calendario a partir de la resolucion absoluta X, en este caso 600px 
                $(".list-view").click();
                returnView = "lista";

            } else {
                $(".calendar-btn").removeClass("boton-oculto"); /* remueve la clase boton oculto en resoluciones superiores a X, para que tenga la opcion de cambiar 
                el tipo de vista entre calendario o vista */
            }


            jQuery('.tiva-events-calendar').each(function (index) {
                // Initial view
                var initial_view = (typeof jQuery(this).attr('data-view') != "undefined") ? jQuery(this).attr('data-view') : 'calendar';
                if (initial_view == 'list') {
                    jQuery(this).find('.list-view').click();
                }
            });
        }
    });
//    }

    // Click - Calendar view btn
    jQuery('.tiva-events-calendar .calendar-view').click(function () {
        jQuery(this).parents('.tiva-events-calendar').find('.back-calendar').hide();
        jQuery(this).parents('.tiva-events-calendar').find('.tiva-event-list').hide();
        jQuery(this).parents('.tiva-events-calendar').find('.tiva-event-detail').hide();
        jQuery(this).parents('.tiva-events-calendar').find('.tiva-calendar').fadeIn(500);

        jQuery(this).parents('.tiva-events-calendar').find('.list-view').removeClass('active');
        jQuery(this).parents('.tiva-events-calendar').find('.calendar-view').addClass('active');
        returnView = "calendario";
    });

    // Click - List view btn
    jQuery('.tiva-events-calendar .list-view').click(function () {
        jQuery(this).parents('.tiva-events-calendar').find('.back-calendar').hide();
        jQuery(this).parents('.tiva-events-calendar').find('.tiva-calendar').hide();
        jQuery(this).parents('.tiva-events-calendar').find('.tiva-event-detail').hide();
        jQuery(this).parents('.tiva-events-calendar').find('.tiva-event-list').fadeIn(500);

        jQuery(this).parents('.tiva-events-calendar').find('.calendar-view').removeClass('active');
        jQuery(this).parents('.tiva-events-calendar').find('.list-view').addClass('active');
        returnView = "lista";

        var layout = jQuery(this).parents('.tiva-events-calendar').attr('class') ? jQuery(this).parents('.tiva-events-calendar').attr('class') : 'full';
        var max_events = jQuery(this).parents('.tiva-events-calendar').attr('data-events') ? jQuery(this).parents('.tiva-events-calendar').attr('data-events') : 1000;
        if (layout.indexOf('full') != -1) {
            showEventList('full', max_events);
        } else {
            showEventList('compact', max_events);
        }
    });

    // Click - Back calendar btn
    jQuery('.tiva-events-calendar .back-calendar').click(function () {
        jQuery(this).parents('.tiva-events-calendar').find('.back-calendar').hide();
        jQuery(this).parents('.tiva-events-calendar').find('.tiva-event-detail').hide();

        //var initial_view = (typeof jQuery(this).parents('.tiva-events-calendar').attr('data-view') != "undefined") ? jQuery(this).parents('.tiva-events-calendar').attr('data-view') : 'calendar';
//        if (initial_view == 'calendar') {
        if (returnView === "calendario") {
            jQuery(this).parents('.tiva-events-calendar').find('.tiva-calendar').fadeIn(500);

            jQuery(this).parents('.tiva-events-calendar').find('.list-view').removeClass('active');
            jQuery(this).parents('.tiva-events-calendar').find('.calendar-view').addClass('active');
        } else {
            jQuery(this).parents('.tiva-events-calendar').find('.tiva-event-list').fadeIn(500);

            jQuery(this).parents('.tiva-events-calendar').find('.calendar-view').removeClass('active');
            jQuery(this).parents('.tiva-events-calendar').find('.list-view').addClass('active');
        }
    });



});
