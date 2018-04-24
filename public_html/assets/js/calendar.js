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
// comprobacion de si es calendario con filtro de fechas o sin filtro
var filtrar = false;
var filtrado = 0;

var fechaIniDefault = sumarDias(-900);
var fechaFinDefault = sumarDias(900);

var rangoFechaIni = "";
var rangoFechaFin = "";
function getShortText(text, num) {
    if (text) {

        var ancho = $(window).width();
        var caracteres = 1;
        switch (true) {
            case (ancho >= 601 && ancho <= 650):
                caracteres = Math.floor(num * 7.5);
                break;
            case (ancho >= 651 && ancho <= 700):
                caracteres = Math.floor(num * 8.5);
                break;
            case (ancho >= 701 && ancho <= 750):
                caracteres = Math.floor(num * 9.5);
                break;
            case (ancho >= 751 && ancho <= 800):
                caracteres = Math.floor(num * 10);
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

        if (text.length > textArray.length) {
            textArray = textArray + "...";
        }
        return textArray;

        return text;
    }
    return "";
}

function sortEventsByDate(a, b) {   //FUNCIÓN QUE ORDENA EVENTOS POR FECHA
    if (a.date < b.date) {
        return -1;
    } else if (a.date > b.date) {
        return 1;
    } else {
        return 0;
    }
}

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
        if (type === 'upcoming') {
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

// Change month or year on calendar - Cambiar mes o anyo en el calendario
function changedate(btn, layout) {
    if (btn === "prevyr") {
        eval("yearNum_" + layout + "--;");
    } else if (btn === "nextyr") {
        eval("yearNum_" + layout + "++;");
    } else if (btn === "prevmo") {
        eval("monthNum_" + layout + "--;");
    } else if (btn === "nextmo") {
        eval("monthNum_" + layout + "++;");
    } else if (btn === "current") {
        eval("monthNum_" + layout + " = todaysMonth;");
        eval("yearNum_" + layout + " = todaysYear;");
    }

    if (monthNum_full === 0) { //si al retroceder un mes (getDay++)-1, resulta 0, el mes a mostrar es DICIEMBRE (12) Y EL AÑO ANTERIOR(--)
        monthNum_full = 12;
        yearNum_full--;
    } else if (monthNum_full === 13) { //si al avanzar un mes (getDay++)+1, resulta 13, el mes a mostrar es ENERO (1) Y EL AÑO EL SIGUIENTE (++)
        monthNum_full = 1;
        yearNum_full++;
    }

    if (monthNum_compact === 0) {
        monthNum_compact = 12;
        yearNum_compact--;
    } else if (monthNum_compact === 13) {
        monthNum_compact = 1;
        yearNum_compact++;
    }

    // Get first day and number days of month
    eval("firstDate = new Date(yearNum_" + layout + ", monthNum_" + layout + " - 1, 1);"); //asigna a vble. la fecha del día 1 del mes actual
    if (date_start === 'sunday') {
        firstDay = firstDate.getDay() + 1;  //first_day será el día de la semana del día 1
    } else {
        firstDay = (firstDate.getDay() === 0) ? 7 : firstDate.getDay(); //si la semana empieza a contar en lunes, y el día 1 primer día de semana, la vble. firstDay es 7
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
                        if (layout === 'full') {
                            calendarString += '<div class=\"calendar-day-event\">';
                        } else {
                            calendarString += '<div class=\"calendar-day-event\" onmouseover=\"showTooltip(0, \'compact\', ' + daycounter + ', ' + monthNum + ', ' + yearNum + ', this)\" onmouseout=\"clearTooltip(\'compact\', this)\" onclick=\"showEventDetail(0, \'compact\')\">';
                        }
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
                                                ' \" onclick=\"showEventDetail(' + events[t].id + ', \'full\')\"> <span class="event-name"  >' +
                                                formatCabecera(events[t].name, events[t].tipo, "calendario", palabrasEvento) +
                                                //    getShortText(events[t].name, palabrasEvento).replace("-", '<i class="fas fa-arrow-right"></i>') + //limita el número de caractres y cambia el "-" por una ->
                                                '</span><\/div>';

                                    } else {
                                        calendarString += '<div class=\"calendar-event-name ' + event_class + maxDiv + divSize + ' color-' + color + '\" id=\"' + events[t].id +
                                                '\" onclick=\"showEventDetail(' + events[t].id + ', \'full\')\"> <span class="event-name"  >' + "." +
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

    if (layout === 'full') {
        jQuery('.tiva-calendar-full').html(calendarString);
    } 
    thisDate = 1;
}//fin create calendar

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

    if (numevents === 0) {
        return false;
    } else {
        return true;
    }
}

function getOrderNumber(id, day, month, year) {  
    var date_check = new Date(year, Number(month) - 1, day); //fecha actual
    var events = [];  //array para trabajar con los eventos recibidos en el json y ordenarlos después en cliente
    for (var i = 0; i < tiva_events.length; i++) {
        var start_date = new Date(tiva_events[i].year, Number(tiva_events[i].month) - 1, tiva_events[i].day); //FECHA INICIO EVENTO
        var end_date = new Date(tiva_events[i].year, Number(tiva_events[i].month) - 1, Number(tiva_events[i].day) + Number(tiva_events[i].duration) - 1); //FECHA FIN EVENTO = fecha inicio + duración - 1
        if ((start_date.getTime() <= date_check.getTime()) && (date_check.getTime() <= end_date.getTime())) { //si la FECHA ACTUAL está entre la INICIO y la FIN del evento
            var first_day = (start_date.getTime() === date_check.getTime()) ? true : false; //si la fecha inicio coincide con la fecha actual, first_day es TRUE
            var event = {id: tiva_events[i].id, name: tiva_events[i].name, day: tiva_events[i].day, month: tiva_events[i].month,
                year: tiva_events[i].year, first_day: first_day}; //se crea el evento  y se insertará en la lista
            events.push(event);
        }
    }

    if (events.length) {
        if (events[0].id === id) {
            var num = order_num;  //inicializada a 0 en la declaración
            order_num = 0;
            return num;
        } else {
            order_num++;
            for (var j = 0; j < events.length; j++) {
                if (events[j].id === id) {
                    return getOrderNumber(events[j - 1].id, events[j - 1].day, events[j - 1].month, events[j - 1].year);
                }
            }

        }
    }

    return 0;
}

// Get events of day  -- OBTENER EVENTOS DEL DÍA INDICADO EN PARÁMETROS
function getEvents(day, month, year) {
    var n = 0;
    var date_check = new Date(year, Number(month) - 1, day);
    var events = [];

    for (var i = 0; i < tiva_events.length; i++) {
        var start_date = new Date(tiva_events[i].year, Number(tiva_events[i].month) - 1, tiva_events[i].day);
        var end_date = new Date(tiva_events[i].year, Number(tiva_events[i].month) - 1, Number(tiva_events[i].day) + Number(tiva_events[i].duration) - 1);
        if ((start_date.getTime() <= date_check.getTime()) && (date_check.getTime() <= end_date.getTime())) {
            var first_day = (start_date.getTime() === date_check.getTime()) ? true : false;
            var last_day = (end_date.getTime() === date_check.getTime()) ? true : false;
            var event = {id: tiva_events[i].id, name: tiva_events[i].name, first_day: first_day, last_day: last_day, color: tiva_events[i].color, tipo: tiva_events[i]._tipo, duracion: tiva_events[i].duration}; //TODO: ANYADIDA PROPIEDAD DURATION AL ARRAY event

            if (!first_day) {
                n = getOrderNumber(tiva_events[i].id, tiva_events[i].day, tiva_events[i].month, tiva_events[i].year);
            }

            events[n] = event;
            n++;
        }
    }

    return events;
}

// Show tooltip when mouse over  -- mostrar TOOLTIP onmouseover
function showTooltip(id, layout, day, month, year, el) {
    if (layout === 'full') {
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
                + '<div class="event-name">' + tiva_events[id].name + '</div>'  //DIV NOMBRE EVENTO
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
            if (typeof events[i] !== "undefined") {
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
    if (layout === 'full') {
        jQuery(el).parent().find('.tiva-event-tooltip').css('opacity', '0');
        jQuery(el).parent().find('.tiva-event-tooltip').css('-webkit-transform', 'translate3d(0,-10px,0)');
        jQuery(el).parent().find('.tiva-event-tooltip').css('transform', 'translate3d(0,-10px,0)');
    } else {
        //antiguo calendario compact
    }
}

// Show event detail -- mostrar lista de eventos por venir (upcoming) ordenados
function showEventList(layout, max_events) {
    // Sort event via upcoming
    var upcoming_events = getEventsByTime('upcoming');
    upcoming_events.sort(sortEventsByUpcoming);
    var past_events = getEventsByTime('past');
    past_events.sort(sortEventsByUpcoming);
    var tiva_list_events = upcoming_events.concat(past_events);
    tiva_list_events = tiva_list_events.slice(0, max_events);

    if (layout === 'full') {
        jQuery('.tiva-event-list-full').html('');
        jQuery('.tiva-event-list-full').append('<div class="cambiarEventos" ><button id="cambiarEventos" class="btn btn-primary btn-lg ">Ver eventos pasados</button></div>');
        jQuery('.tiva-event-list-full').append('<div class="listado-eventos-pendientes"><span class="titulo-lista">Eventos Pendientes</span></div>');
        jQuery('.tiva-event-list-full').append('<div class="listado-eventos-terminados"><span class="titulo-lista">Eventos Finalizados</span></div>');

        $("#cambiarEventos").on("click", function () {

            if ($(".listado-eventos-pendientes").css("display") === "none") {

                $(".listado-eventos-pendientes").css("display", "block");
                $(".listado-eventos-terminados").css("display", "none");
                $(this).text("Ver eventos pasados");
            } else {

                $(".listado-eventos-pendientes").css("display", "none");
                $(".listado-eventos-terminados").css("display", "block");
                $(this).text("Ver eventos pendientes");
            }
        });


        for (var i = 0; i < tiva_list_events.length; i++) {
            // Start date

            var day = new Date(tiva_list_events[i].year, Number(tiva_list_events[i].month) - 1, tiva_list_events[i].day);
            if (date_start === 'sunday') {
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

                if (date_start === 'sunday') {
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

            var eventoListado = '<div class="list__event" onclick="showEventDetail(' + tiva_list_events[i].id + ', \'full\')">' +
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

            if (resta >= 0) { // organiza los eventos de la lista en dos categorias, segun si han finalizado ya o no
                $(".listado-eventos-pendientes").append(eventoListado);
            } else {
                $(".listado-eventos-terminados").append(eventoListado);
            }
            ;

        }
        mostrarSegunFiltrado(filtrado, tiva_list_events.length);
    } else {
        //antiguo calendario compact
    }
}
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

//función deshabilitar enlace de <a>  y anyadir este atributo a la etiqueta: onclick="deshabilitar(this)"

function deshabilitar(link) {
    link.style.pointerEvents = 'none';
    link.style.color = '#bbb';

    setTimeout(function () {
        link.style.pointerEvents = null;
        link.style.color = 'blue';
    }, 3000);
}
//calcula la diferencia de días entre el día de consulta de la previsión del tiempo con el día de inicio del viaje
// se llama dentro de la función para mostrar detalle evento (ventana modal)
function diferenciaDiasClima(hoy, inicioViaje) {
    //obtener fecha hoy en milisegundos    
    var ms_hoy = hoy.getTime();
    console.log("Función hoy: " + ms_hoy);

    //obtener fecha inicio viaje en ms
    var inicio = new Date(inicioViaje);
    var ms_inicio = inicio.getTime();
    console.log("Función inicioViaje: " + ms_inicio);

    //diferencia entre fechas en ms
    var timeDifference = ms_inicio - ms_hoy;
    console.log("Función diferencia: " + timeDifference);

    // en horas
    var timeDifferenceInHours = timeDifference / 3600000;

    // and finaly, in days :)
    var timeDifferenceInDays = timeDifferenceInHours / 24;
    console.log("Función dif en días: " + timeDifferenceInDays);

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

// Show event detail -- mostrar detalles de los eventos
function showEventDetail(id, layout) {
    var pais = "";
    var ciudad = "";
    
    var myvar = '<div class="modal fade" id="fichaDetalle" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
            '            <div class="modal-dialog modal-lg" role="document">' +
            '                <!--Content-->' +
            '                <div class="modal-content">' +
            '                    <!--Header-->' +
            '                    <div id="asunto" class="modal-header">' +
            '                        <h4 class="modal-title w-100 modaltext"></h4>' +
            '                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
            '                            <!--  <span aria-hidden="true">×</span> -->' +
            '                        </button>' +
            '                    </div>' +
            '                    <!--Body-->' +
            '                    <div class="modal-body modal-cuerpo">' +
            '                        <div class="modal-content">' +
            '                            <div id="topcontent" class="topcontent">' +
            '                                <div class="view logo">' +
            '' +
            '                                </div>' +
            '                                <div class="relleno"></div>' +
            '' +
            '                            </div> ' +
            '' +
            '                            <div class="horario">' +
            '                                <div class="origen"> ' +
            '                                    <div id="ciudad-o" class="ciudad-o">ORIGEN</div>' +
            '                                    <div id="fecha-o" class="fecha-o">dd/mm/aaaa</div>' +
            '                                    <div id="hora-o" class="hora-o">hh:mm</div> ' +
            '                                </div>' +
            '                                <div id="linea">' +
            '' +
            '                                </div>' +
            '                                <div class="destino"> ' +
            '                                    <div id="ciudad-d" class="ciudad-d">DESTINO</div>' +
            '                                    <div id="fecha-d" class="fecha-d">dd/mm/aaaa</div>' +
            '                                    <div id="hora-d" class="hora-d">hh:mm</div>    ' +
            '                                </div>' +
            '                            </div>' +
            '                            <div class="descripcion">' +
            '                                <h4 class="modaltext-titulo destacado">Descripción:</h4>' +
            '                                <h5 id="localizador"> </h5>' +
            '                                <div id="descripcion" >' +
            '' +
            '' +
            '                                </div>' +
            '                                <div id="compartecon" class="listaviajeros">' +
            '' +
            '                                </div>' +
            '' +
            '                                <div class="seguirvuelo">' +
            '                                    <br/> <button  id="googlesearchvuelo" class="btn btn-success textoboton">Seguimiento online</button>' +
            '                                </div> ' +
            '' +
            '' +
            '                            </div>' +
            '' +
            '                            <div class="ubicacion">' +
            '                                <h4 class="modaltext-titulo destacado">Ubicación:</h4>' +
            '                                <h5 id="ubicacion" class=""></h5>' +
            '                                <button id="verMapa" class="ubicacion-maps btn btn-success textoboton"><i class="fas fa-search"></i> Ver mapa</button>' +
            '                            </div>' +
            '                            <div class="info-interes">' +
            '                                <h4 class="modaltext-titulo destacado">Información de interés: </h4>' +
            '' +
            '                                <a  href="#iconos" id="info-clima" class=" btn btn-success btn-sm textoboton"><i class="fas fa-cloud"></i> Clima</a><br/>' +
            '                                <div  class="iconos"></div>' +
            '                                <br/>' +
            '                                <button id="info-lugar" class=" btn btn-success btn-sm textoboton "><i class="fas fa-info-circle"></i> Información adicional</button>' +
            '                            </div>' +
            '                            <div class="adjuntos">' +
            '                                <h4 class="modaltext-titulo destacado">Documentos adjuntos:</h4>' +
            '                                <!--    <div><i class="far fa-file-pdf"></i></div> -->' +
            '                                <div id="docs" class="docs">' +
            '' +
            '                                </div>' +
            '                            </div>' +
            '                            <div class="ics">' +
            '                                <h4 class="modaltext-titulo destacado">Descarga ICS:</h4>' +
            '                                <a href="#" download class="btn btn-info btn-lg descargaics textoboton">descargar ICS</a></div>' +
            '                        </div>' +
            '                    </div>' +
            '                    <!--Footer-->' +
            '                    <div class="modal-footer">' +
            '                        <button type="button" class="btn btn-primary btn-lg textoboton" data-dismiss="modal">Cerrar</button>' +
            '                        <!-- <button type="button" class="btn btn-secondary btn-lg disabled">Otra Acción</button> -->' +
            '                    </div>' +
            '                </div>' +
            '                <!--/.Content-->' +
            '            </div>' +
            '        </div>';
    $("#espacioModal").html("");
    $("#espacioModal").append(myvar);

//RELLENAR Y MOSTRAR VENTANA MODAL 

        //Limpiar html antes de coger los datos:

        document.getElementById("descripcion").innerHTML = "";
        document.getElementById("compartecon").innerHTML = "";
        document.getElementsByClassName("iconos")[0].innerHTML = "";
        $("div.logo img").remove(); //elimina cualquier imagen anyadida como child para el logo
        icsDescription = ""; //limpiar variable global ICS

        //   document.getElementsByClassName("iconos")[0].setAttribute('id', 'noMostrar');

//BLOQUE COMÚN PARA CUALQUIER TIPO RESERVA
        var tipoReserva = tiva_events[id]._tipo;
        var colorfondo = tiva_events[id].color;

        //fechas para calcular rangos de días
        fechaInicioViaje = tiva_events[id]._fechaInicio;
        hoy = new Date();
        diasDif = diferenciaDiasClima(hoy, fechaInicioViaje); //diferencia entre hoy y la fecha inicio viaje (para clima y para seguimiento vuelo)

        //Coordenadas origen
        var lat = tiva_events[id]._latitudOrigen;
        var lon = tiva_events[id]._longitudOrigen;

        // Coordenadas destino (clima)
        var latDestino = tiva_events[id]._latitudDestino;
        var lonDestino = tiva_events[id]._longitudDestino;

        console.log("Latitud: " + lat + " y Longitud: " + lon);
        var coordenadas = lat + "%20" + lon;

        //Ubicación en sección Mapa
        var ubicacion = tiva_events[id]._ubicacion;
        document.getElementById("ubicacion").innerHTML = "<h5 class='p5 modaltext'>" + ubicacion + "</h5>";
        document.getElementById("verMapa").addEventListener("click", function () {
            console.log(tipoReserva);
            if (tipoReserva === "Aereo")   {
                window.open( ' https://www.google.com/maps/dir/?api=1&origin='+lat+','+lon+'&destination='+latDestino+','+lonDestino+'&travelmode=fly');
            }else if(tipoReserva === "Tren"){
                  window.open( ' https://www.google.com/maps/dir/?api=1&origin='+lat+','+lon+'&destination='+latDestino+','+lonDestino+'&travelmode=transit&mode[]=train');
            }else if(tipoReserva === "Barco"){
            }else{
                 window.open('http://maps.google.es/?q=' + coordenadas);
            };
        });
        var geocoder = new google.maps.Geocoder;
        var localizacion = {lat: latDestino, lng: lonDestino};
        // var localizacion = {lat: 45.808123, lng: 3.085775};

        geocoder.geocode({'location': localizacion}, function (results, status) {
            if (status === 'OK') {
                pais = results[results.length - 1].formatted_address; // aqui se filtra el listado para obtener el pais
                var campoCiudad = results[results.length - 3].formatted_address;
                ciudad = campoCiudad.split(",")[0];

            }
            //creación de la cadena de texto para el contenido del archivo ICS
            var icsFormat =
                                'BEGIN:VCALENDAR\n' +
                                'PRODID:-//Schedule a Meeting\n' +
                                'VERSION:2.0\n' +
                                'METHOD:REQUEST\n' +
                                'BEGIN:VEVENT\n' +
                                'DTSTART:' + tiva_events[id]._fechaInicio.replace("-", "") + '\n' +
                                'DTSTAMP:' + tiva_events[id]._fechaInicio.replace("-", "") + '\n' +
                                'DTEND:' + tiva_events[id]._fechaFin.replace("-", "") + '\n' +
                                'LOCATION:' + tiva_events[id]._ubicacion + '\n' +
                                'UID:40ddbba4-abb2-4969-b9b6-9c75c3b9f5c2\n' +
                                icsDescription +
                                'BEGIN:VALARM\n' +
                                'TRIGGER:-PT48H\n' +
                                'ACTION:DISPLAY\n' +
                                'DESCRIPTION:Reminder\n' +
                                'END:VALARM\n' +
                                'END:VEVENT\n' +
                                'END:VCALENDAR';
            
            //Si es IE, 
            if(detectIE()){
                //eliminamos el atributo 'download' al vínculo (el atributo aparece en cada evento click de una reserva de viaje)
                document.getElementsByClassName('descargaics')[0].removeAttribute('download');
                
                if (window.navigator.msSaveBlob) {
                    //generamos el objeto blob (equivalente a un archivo)
                        var blob = new Blob([icsFormat]);
                        //asignamos evento al vínculo para descarga
                        document.getElementsByClassName('descargaics')[0].onclick = function(){

                            window.navigator.msSaveBlob(blob, 'documento.ics');

                        }; 
                                      
                   }
             //Si no es IE,
            } else {
                
                //Descarga de archivo en formato ICS
                    $(".descargaics").on("click", function () {
                        
                       //anyadiendo url descarga al vínculo
                        this.href = 'data:text/calendar;charset=utf-8,' + icsFormat;


                    });
                
            }
            
            
            // Mostrar la información recomendada según el pais de destino 

            document.getElementById("info-lugar").addEventListener("click", function () { // esta funcion obtiene un listado de resultados con la dirección, siendo el pais la ultima 

                buscarPais = "recomendaciones+viaje+" + pais + "&btnI"; // usamos google "im feeling lucky" para acceder a una buscada y abrir el primer resultado
                window.open('http://www.google.com/search?q=' + buscarPais);

            });

        });
        //Colorear cabecera ventana según tipo reserva
        var item = document.getElementById("asunto").classList.item(1); //si la selección está fuera de rango devuelve 'null'
        document.getElementById("asunto").classList.remove(item); //eliminar 'null' no da errores en consola
        document.getElementById("asunto").classList.add("color-" + colorfondo);
        document.getElementById("linea").classList.add("color-" + colorfondo);

        //Fechas salida-llegada / origen-destino
        var fechaInicioEvento = tiva_events[id].day + "/" + tiva_events[id].month + "/" + tiva_events[id].year; //formato dd/mm/aaaa
        var fechaFinEvento = tiva_events[id]._diaFin + "/" + tiva_events[id]._mesFin + "/" + tiva_events[id]._anyoFin;
        document.getElementById("fecha-o").innerHTML = fechaInicioEvento;
        document.getElementById("fecha-d").innerHTML = fechaFinEvento;

        //Variables para las horas
        var horaOrigen = tiva_events[id].time; //siempre hora inicio
        var horaDestino = tiva_events[id]._horaFin;
        var avisoHorario = "NOTA: La hora mostrada corresponde a la hora local en cada país.";

        //Localizador de la reserva
        var localizadorReserva = tiva_events[id]._localizador;
        document.getElementById("localizador").innerHTML = "<h5 class='destacado modaltext'>LOCALIZADOR RESERVA: " + localizadorReserva + "</h5>";

        //A continuación se llamará a una función para tratar el asunto correctamente según el tipo de reserva 
        document.getElementById("asunto").innerHTML = formatCabecera(tiva_events[id].name, tipoReserva, "modal", null);

//BLOQUES PARTICULARIDADES POR TIPO DE RESERVA          
        if (tipoReserva === "Aereo") {
                                  
            var codigoV = tiva_events[id]._NVuelo;
            var companyiaAerea = codigoV.split("-"); //vector con [0] codigo companyia y con [1] numero vuelo, por si hay que usarlo para los logos
          console.log(companyiaAerea[0]);
            codigoV = codigoV.replace("-", ""); //para buscador google el código debe salir sin slash

           if (diccionarioLogos.length >0){
               for (var i = 0; i < diccionarioLogos.length; i++) {
                    if(companyiaAerea[0] == diccionarioLogos[i].IATA){
                        logoAerolinea = diccionarioLogos[i].Logo;
                        $('.logo').append("<img src='" + logoAerolinea + "' alt='Logo-Aerolinea'>");
                    }
                }
           }else{
               $('.logo').append("<img src='assets/images/Consultia.png' alt='Logo-Aerolinea'>");
           }
            
            
            //Búsqueda vuelo google
            document.getElementById("googlesearchvuelo").style.display = "block";

            //funcionalidad botón seguimiento vuelo online google
            var fechaInicioVuelo = new Date(fechaInicioViaje); //obtener la fecha en formato válido para utilizar .toLocaleDateString()
            var options = {month: 'short', day: 'numeric'}; //mes corto y día númerico
            var fechaConsultaVuelo = fechaInicioVuelo.toLocaleDateString('es', options); //en español
            fechaConsultaVuelo = fechaConsultaVuelo.replace(".", " "); //ejemplo formato de salida:  12 abr 
            console.log(fechaConsultaVuelo);

            var q = codigoV + " " + fechaConsultaVuelo; 

            document.getElementById("googlesearchvuelo").onclick = function () {

                if ((diasDif >= 0) && (diasDif <= 2)) {
                    window.open('http://www.google.com/search?q=' + q);

                } else if (diasDif < -1) {
                    variableAviso = '<div class="toast-text">La fecha del vuelo es anterior. Información no disponible.</div>';
                    $('<div class="toaster toast-warning">' + variableAviso + '</div>').insertAfter($('#googlesearchvuelo'));
                    $('#googlesearchvuelo').addClass('isDisabled');
                    setTimeout(function () {
                        $('.toaster').fadeOut('slow', 'linear');
                        $('#googlesearchvuelo').removeClass('isDisabled');
                    }, 3000);

                } else {
                    variableAviso = '<div class="toast-text">La fecha del vuelo es demasiado lejana. Información no disponible.</div>';
                    $('<div class="toaster toast-warning">' + variableAviso + '</div>').insertAfter($('#googlesearchvuelo'));
                    $('#googlesearchvuelo').addClass('isDisabled');
                    setTimeout(function () {
                        $('.toaster').fadeOut('slow', 'linear');
                        $('#googlesearchvuelo').removeClass('isDisabled');
                    }, 3000);
                }


            };

            //nombre aerolinea ESTE CAMPO ES INDEPENDIENTE DEL IDPROVEEDOR (NO SE DISPONE DICCIONARIO DE AEROLINEAS)
            var aerolinea = tiva_events[id]._Aerolinea;

            //Bloque horarios
            var salidaIata = tiva_events[id]._SalidaIATA;
            var llegadaIata = tiva_events[id]._LlegadaIATA;

            document.getElementById("ciudad-o").innerHTML = tiva_events[id]._ciudadOrigen + " (" + salidaIata + ")";
            document.getElementById("hora-o").innerHTML = horaOrigen;
            document.getElementById("ciudad-d").innerHTML = tiva_events[id]._ciudadDestino + " (" + llegadaIata + ")";
            document.getElementById("hora-d").innerHTML = horaDestino;

            //Bloque descripción
            var aeropuertoSalida = tiva_events[id]._AeropuertoSalida;
            var aeropuertoLlegada = tiva_events[id]._AeropuertoLlegada;
            var duracionHoras = tiva_events[id]._DuracionHoras;
            duracionHoras = duracionHoras.split(":");
            var horas = duracionHoras[0];
            var minutos = duracionHoras[1];

            document.getElementById("descripcion").innerHTML = "<h5 class='destacado modaltext'>NÚMERO VUELO: " + codigoV + "</h5><h5 class='destacado modaltext'>AEROLÍNEA: " + aerolinea + "</h5>"
                    + "<h5 class='modaltext'>Aeropuerto Salida: " + salidaIata + " - " + aeropuertoSalida + "</h5>" +
                    "<h5 class='modaltext'>Aeropuerto Llegada: " + llegadaIata + " - " + aeropuertoLlegada + "</h5>" +
                    "<h5 class='modaltext'>Duración vuelo: " + horas + " horas y " + minutos + " minutos. </h5><h6 class='modaltext'><span class='highlight-color'>" + avisoHorario + "</span></h6>";
            //Bloque descripción ICS
            icsDescription = 
                        'DESCRIPTION: Tiene una reserva de VUELO para el ' + fechaInicioEvento + ' con los siguientes detalles: \\n\\n' +
                        ' Localizador: ' + localizadorReserva + '\\n' +
                        ' Aerolínea: ' + aerolinea + '\\n' +
                        ' Número Vuelo: ' + codigoV +'\\n' +
                        ' Duración: '+ horas + ' horas y ' + minutos + ' minutos.\\n\\n' +
                        ' SALIDA_________________________________________\\n\\n' +
                        ' Fecha y Hora de Salida: ' + fechaInicioEvento +" "+ horaOrigen +'\\n' +
                        ' Aeropuerto: ' + salidaIata +" - "+ aeropuertoSalida + '\\n\\n' +
                        ' LLEGADA________________________________________\\n\\n' +
                        ' Fecha y Hora de Llegada: ' + fechaFinEvento +" "+ horaDestino +'\\n' +
                        ' Aeropuerto: ' + llegadaIata +" - "+ aeropuertoLlegada + '\\n\\n' +  
                         avisoHorario +'\n' +
                        'SUMMARY: VUELO: ' + fechaInicioEvento +" "+ horaOrigen +" "+ aeropuertoSalida + " --> " + fechaFinEvento +" "+ horaDestino +" "+aeropuertoLlegada +'\n' +
                        'ORGANIZER:MAILTO:avisos@consultiatravel.es\n' +
                        'ATTENDEE;CN=" Nombre del viajero principal ";RSVP=TRUE:mailto:jm.rubio@consultiatravel.es\n';

        } else if (tipoReserva === "Hotel") { //POSIBLE IF o SWITCH CON TODAS LAS OPCIONES QUE DIFIERAN

            document.getElementById("googlesearchvuelo").style.display = "none";
            document.getElementById("ciudad-o").innerHTML = "ENTRADA";
            document.getElementById("ciudad-d").innerHTML = "SALIDA";
            document.getElementById("hora-o").innerHTML = "14:00 aprox.";   //tiva_events[id].time
            document.getElementById("hora-d").innerHTML = "12:00 aprox."; //tiva_events[id]._horaFin
            //
            //Bloque descripción
            var nombreHotel = tiva_events[id]._nombreHotel;
            var direccionHotel = tiva_events[id]._direccion;
            var regimen = tiva_events[id]._regimen;
            var tipoHabitacion = tiva_events[id]._tipohabita;
            var acompanyantes = tiva_events[id]._acompanyantes;
            //TODO: Obtención de la ciudad a partir de la dirección postal que viene de base datos PROVISIONAL
            var laCiudad = direccionHotel.split(',');
            laCiudad = laCiudad[laCiudad.length-2];
            console.log(acompanyantes);
            var html = "";
            for (i = 0; i < acompanyantes.length; i++) {
                html += "<h5 class='modaltext'>Acompañante: " + acompanyantes[i].Nombre + "</h5>";
            }
            document.getElementById("descripcion").innerHTML = "<h5 class='modaltext'>Hotel: " + nombreHotel +
                    "</h5><h5 class='modaltext'>Dirección: " + direccionHotel +
                    "</h5><h5 class='modaltext'>Régimen: " + regimen + "</h5><h5 class='modaltext'>Tipo Habitación: " +
                    tipoHabitacion + "</h5><h6 class='modaltext'> <span class='highlight-color'>" + avisoHorario + "</span></h6>";
            document.getElementById("compartecon").innerHTML = html;
            //Bloque descripción ICS
            icsDescription = 
                        'DESCRIPTION: Tiene una reserva de HOTEL para el ' + fechaInicioEvento + ' con los siguientes detalles: \\n\\n' +
                        ' Localizador: ' + localizadorReserva + '\\n' +
                        ' Hotel: ' + nombreHotel + '\\n' +
                        ' Ubicación: ' + laCiudad + '\\n' +
                        ' Dirección: ' + direccionHotel +'\\n' +
                        ' Régimen: ' + regimen +'\\n' +
                        ' Tipo habitación: ' + tipoHabitacion +'\\n\\n' +
                        ' ENTRADA_________________________________________\\n\\n' +
                        ' Fecha: ' + fechaInicioEvento +'\\n\\n' +
                        ' SALIDA________________________________________\\n\\n' +
                        ' Fecha: ' + fechaFinEvento +'\\n\\n' +
                        avisoHorario + '\n' +
                        'SUMMARY: HOTEL EN: '+ laCiudad + " "+ fechaInicioEvento +" "+ horaOrigen + " --> " + fechaFinEvento +" "+ horaDestino +'\n' +
                        'ORGANIZER:MAILTO:avisos@consultiatravel.es\n' +
                        'ATTENDEE;CN=" Nombre del viajero principal ";RSVP=TRUE:mailto:jm.rubio@consultiatravel.es\n';

        } else if (tipoReserva === "Coche") {
            //logo coches
            var codigoRent = tiva_events[id]._idProveedor; //string con el código
            var proveedor = "";
                       
           info_cars.forEach( function (agencia) {
               

                if (agencia.id == codigoRent) { //compara un int con un string
                    rentacar = agencia.img;
                    proveedor = agencia.proveedor;

                    $('.logo').append("<img src='assets/images/img_proveedores/" + rentacar + "' alt='" + proveedor + "'>");
                }

            });

            document.getElementById("googlesearchvuelo").style.display = "none";
            //horas
            document.getElementById("hora-o").innerHTML = horaOrigen; //recogida
            document.getElementById("hora-d").innerHTML = horaDestino; //entrega
            //para la cabecera            
            document.getElementById("ciudad-o").innerHTML = "RECOGIDA";
            document.getElementById("ciudad-d").innerHTML = "ENTREGA";

            var acompanyantes = tiva_events[id]._acompanyantes;
            console.log(acompanyantes);
            var html = "";
            for (i = 0; i < acompanyantes.length; i++) {
                html += "<h5 class='modaltext'>Acompañante " + (i + 1) + ": " + acompanyantes[i].Nombre + "</h5>";
            }
            //Bloque Descripción
            var categoria = tiva_events[id]._categoria;
            var transmision = tiva_events[id]._transmision;
            var combustible = tiva_events[id]._combustible;
            var direccionRecogida = tiva_events[id]._direccionRecogida;
            var direccionEntrega = tiva_events[id]._direccionEntrega;

            document.getElementById("descripcion").innerHTML = "<h5 class='destacado modaltext'>Proveedor: " + proveedor +
                    "</h5><h5 class='modaltext'>Categoría: " + categoria +
                    "</h5><h5 class='modaltext'>Transmisión: " + transmision + "</h5><h5 class='modaltext'>Combustible: " +
                    combustible + "</h5><h5 class='modaltext'>Dirección Recogida: " +
                    direccionRecogida + "</h5><h5 class='modaltext'>Dirección Entrega: " +
                    direccionEntrega + "</h5><h6 class='modaltext'> <span class='highlight-color'>" + avisoHorario + "</span></h6>";
            document.getElementById("compartecon").innerHTML = html;
            
            icsDescription = 
                        'DESCRIPTION: Tiene una reserva de COCHE para el ' + fechaInicioEvento + ' con los siguientes detalles: \\n\\n' +
                        ' Localizador: ' + localizadorReserva + '\\n' +
                        ' Proveedor: ' + proveedor + '\\n' +
                        ' Categoría: ' + categoria +'\\n' +
                        ' Transmisión: ' + transmision +'\\n' +
                        ' Combustible: ' + combustible +'\\n\\n' +
                        ' RECOGIDA_________________________________________\\n\\n' +
                        ' Fecha: ' + fechaInicioEvento +'\\n' +
                        ' Hora recogida: ' + horaOrigen +'\\n' +
                        ' Dirección: ' + direccionRecogida +'\\n\\n' +
                        ' ENTREGA________________________________________\\n\\n' +
                        ' Fecha: ' + fechaFinEvento +'\\n' +
                        ' Hora entregas: ' + horaDestino +'\\n' +
                        ' Dirección: ' + direccionEntrega +'\\n\\n' +
                        avisoHorario + '\n' +
                        'SUMMARY: COCHE: ' + fechaInicioEvento +" "+ horaOrigen + " --> " + fechaFinEvento +" "+ horaDestino +'\n' +
                        'ORGANIZER:MAILTO:avisos@consultiatravel.es\n' +
                        'ATTENDEE;CN=" Nombre del viajero principal ";RSVP=TRUE:mailto:jm.rubio@consultiatravel.es\n';

        } else if (tipoReserva === "Tren") {
            //logo renfe
            
            var estacionOrigen = tiva_events[id]._EstacionOrigen;
            var estacionDestino = tiva_events[id]._EstacionDestino;
            document.getElementById("googlesearchvuelo").style.display = "none";
            document.getElementById("ciudad-o").innerHTML = estacionOrigen;
            document.getElementById("hora-o").innerHTML = horaOrigen;
            document.getElementById("ciudad-d").innerHTML = estacionDestino;
            document.getElementById("hora-d").innerHTML = horaDestino;

            //bloque descripción
            var proveedor = tiva_events[id]._idProveedor; //ahora viene un entero para el código proveedor
            if(proveedor == 3){
                proveedor = "Renfe";
                $('.logo').append("<img src='assets/images/img_proveedores/Renfe.svg' alt='Logo-renfe'>"); //de momento sólo hay Logo de Renfe
            }else{
                $('.logo').append("<img src='assets/images/img_proveedores/logo_tren_generico.png' alt='Logo-renfe'>"); 
            }
            var tipotren = tiva_events[id]._TipoTren;
            var clase = tiva_events[id]._Clase;
            var DireccionOrigen = tiva_events[id]._DireccionOrigen;
            var DireccionDestino = tiva_events[id]._DireccionDestino;

            document.getElementById("descripcion").innerHTML = "<h5 class='destacado modaltext'>Proveedor: " + proveedor +
                    "</h5><h5 class='destacado modaltext'>Tipo de Tren: " + tipotren +
                    "</h5><h5 class='modaltext'>Clase: " + clase + "</h5>"+
                    "<h5 class='destacado modaltext'>Estación de SALIDA: " + estacionOrigen + "</h5>"+
                    "<h5 class='modaltext'>Dirección: " + DireccionOrigen + "</h5>"+
                    "<h5 class='destacado modaltext'>Estación de LLEGADA: " + estacionDestino +"</h5>"+
                    "<h5 class='modaltext'>Dirección: " + DireccionDestino + "</h5>"+
                    "<h6 class='modaltext'> <span class='highlight-color'>" + avisoHorario + "</span></h6>";
            
            //Bloque descripción ICS
            icsDescription = 
                        'DESCRIPTION: Tiene una reserva de TREN para el ' + fechaInicioEvento + ' con los siguientes detalles: \\n\\n' +
                        ' Localizador: ' + localizadorReserva + '\\n' +
                        ' Compañía: ' + proveedor + '\\n' +
                        ' Tipo Tren: ' + tipotren +'\\n' +
                        ' Clase: ' + clase +'\\n\\n' +
                        ' SALIDA_________________________________________\\n\\n' +
                        ' Fecha: ' + fechaInicioEvento +'\\n' +
                        ' Hora Salida: ' + horaOrigen +'\\n' +
                        ' Estación origen: ' + estacionOrigen +'\\n' +
                        ' Dirección: ' + DireccionOrigen +'\\n\\n' +
                        ' LLEGADA________________________________________\\n\\n' +
                        ' Fecha: ' + fechaFinEvento +'\\n' +
                        ' Hora Llegada: ' + horaDestino +'\\n' +
                        ' Estación destino: ' + estacionDestino +'\\n' +
                        ' Dirección: ' + DireccionDestino +'\\n\\n' +
                        avisoHorario + '\n' +
                        'SUMMARY: TREN: ' + fechaInicioEvento +" "+ horaOrigen + " " + estacionOrigen +" --> " + fechaFinEvento +" "+ horaDestino + " " + estacionDestino + '\n' +
                        'ORGANIZER:MAILTO:avisos@consultiatravel.es\n' +
                        'ATTENDEE;CN=" Nombre del viajero principal ";RSVP=TRUE:mailto:jm.rubio@consultiatravel.es\n';

        } else if (tipoReserva === "Barco") {
            
            //logo FIJO
            $('.logo').append("<img src='assets/images/img_proveedores/logo_crucero_generico.png' alt='Logo-barco'>");
            
            document.getElementById("googlesearchvuelo").style.display = "none";
            //horas
            document.getElementById("hora-o").innerHTML = horaOrigen;
            document.getElementById("hora-d").innerHTML = horaDestino;
            //Bloque descripción       //TODO: DICCIONARIO PROVEEDORES   
            var proveedor = tiva_events[id]._proveedor;
            var origen = tiva_events[id]._origen;
            var destino = tiva_events[id]._destino;
            document.getElementById("ciudad-o").innerHTML = origen;
            document.getElementById("ciudad-d").innerHTML = destino;
            var acomodacion = tiva_events[id]._acomodacion;
            var vehiculos = tiva_events[id]._vehiculos;
            var matriculas = " ";
            for (i = 0; i < vehiculos.length; i++) {
                matriculas += "<span class=\"matricula\">" + vehiculos[i].Matricula + "</span>";
            }

            document.getElementById("descripcion").innerHTML = "<h5 class='destacado modaltext'>Proveedor: " + proveedor +
                    "</h5><h5 class='modaltext'>Origen: " + origen +
                    "</h5><h5 class='modaltext'>Destino: " + destino + "<h5>Acomodación: " + acomodacion +
                    "</h5><span class='modaltext'>Vehículos (" + vehiculos.length + "): </span>" + matriculas + "<h6 class='modaltext'><span class='highlight-color'>" + avisoHorario + "</span></h6>";
            
            //Bloque descripción ICS
            icsDescription = 
                        'DESCRIPTION: Tiene una reserva de BARCO para el ' + fechaInicioEvento + ' con los siguientes detalles: \\n\\n' +
                        ' Localizador: ' + localizadorReserva + '\\n' +
                        ' Compañía: ' + proveedor + '\\n' +
                        ' Acomodación: ' + acomodacion +'\\n' +
                        ' Vehículos a bordo: ' + vehiculos.length +'\\n\\n' +
                        ' SALIDA_________________________________________\\n\\n' +
                        ' Fecha: ' + fechaInicioEvento +'\\n' +
                        ' Origen: ' + origen +'\\n\\n' +
                        ' LLEGADA________________________________________\\n\\n' +
                        ' Fecha: ' + fechaFinEvento +'\\n' +
                        ' Destino: ' + destino +'\\n\\n' +
                        avisoHorario + '\n' +
                        'SUMMARY: BARCO: ' + fechaInicioEvento +" "+ horaOrigen + " " + origen +" --> " + fechaFinEvento +" "+ horaDestino + " " + destino + '\n' +
                        'ORGANIZER:MAILTO:avisos@consultiatravel.es\n' +
                        'ATTENDEE;CN=" Nombre del viajero principal ";RSVP=TRUE:mailto:jm.rubio@consultiatravel.es\n';

        } else if (tipoReserva === "Otros") {
            document.getElementById("googlesearchvuelo").style.display = "none";
            //TODO: por determinar la estructura y optimización en general
        }


        //GESTIÓN DE LOS ADJUNTOS
        if (tiva_events[id]._adjuntos !== null) { //el campo Adjuntos o es null o es un array con una posición mínimo

            var adjuntos = "";
            var numdocs = tiva_events[id]._adjuntos.length;

            for (n = 0; n < numdocs; n++) {
                var tipodoc = tiva_events[id]._adjuntos[n].Tipo.toLowerCase(); //cada imagen de tipo de documento tendrá el nombre del tipo y la misma extensión (png en este caso)
                var idadjunto = tiva_events[id]._adjuntos[n].idAdjunto;
                
               if (detectIE()){
                   //el vínculo se generará sin el atributo 'download'
                    adjuntos += '<a id="' + idadjunto + '" class="linkadjunto" title="Adjunto_'+idadjunto+'"><img class="mimeType" src="assets/images/' + tipodoc + '.png" alt="" ></a>';
                
               } else {
                    
                    adjuntos += '<a id="' + idadjunto + '" class="linkadjunto" title="Adjunto_'+idadjunto+'" download><img class="mimeType" src="assets/images/' + tipodoc + '.png" alt="" ></a>';
                }
               
                
               
               console.log(tiva_events[id]._adjuntos[n].idAdjunto);
            }
            document.getElementById("docs").innerHTML = adjuntos;
            
            var arrayAdjuntos = $('a.linkadjunto');

            $.each(arrayAdjuntos, function (idx, val) {  //para cada elemento de la clase linkadjunto

                var numadjunto = $(this).attr("id");

                $(this).ready(function () {

                    $.ajax({
                        url: "http://192.168.0.250:5556/api/Calendario?idUsuario=2&idadjunto=" + numadjunto,
                        type: 'GET',
                        dataType: 'json',
                        success: function (churro) {
                            
                            //Detectado IE 
                            if (detectIE()) {

                                    if (window.navigator.msSaveBlob) {
                                       
                                      //generamos el objeto blob a partir del String en base64 (churro) con la función b64toBlob
                                      var blob = b64toBlob(churro, 'application/pdf');
                                      //asignamos evento al vínculo para que se descargue al click
                                      $('#'+numadjunto).on('click', function(){
                                          
                                          window.navigator.msSaveBlob(blob, 'Adjunto_' + numadjunto +'.'+ tipodoc);
                                          
                                      });
                                      
                                    }

                                  } else {
                                       //Navegadores distintos de IE se anyade el atributo href con el valor del String base64
                                        $('#' + numadjunto).attr("href", churro);
                                    
                                  }
                                                                                  
                        },
                        error: function () {
                            console.log("Se ha producido un error API adjuntos u otra causa.");
                        }


                    });

                });
            });



        } else if (tiva_events[id]._adjuntos === null || tiva_events[id]._adjuntos === 'undefined') {

            document.getElementById("docs").innerHTML = "No hay adjuntos que mostrar.";
        }

        //GESTIÓN DE LOS DATOS DEL CLIMA EN DESTINO/UBICACIÓN

        if (latDestino !== null && lonDestino !== null) {
            var urlclima = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + latDestino + '&lon=' + lonDestino + '&lang=es&units=metric&APPID=eb49663a0809388193782a1fa7698518&cnt=40';  //cnt es la cantidad de líneas (máximo 40 para el plan gratuito suscrito)

            console.log("diferencia (llamada función): " + diasDif);
            //Asignar evento al botón del clima
            $("#info-clima").on('click', function () {
                $('.iconos').html("");
                //caso1: si la diferencia es menor de 5 días anteriores a hoy, pero el evento dura como mínimo hasta hoy //caso2: eventos con fecha inicio desde hoy hasta 5 días después  //caso3: eventos con fechas inicio anteriores 5 días desde hoy cuya duración llega hasta hoy (hoy es primer día previsión meteo)
                if (((diasDif >= -5) && (tiva_events[id].duration >= Math.abs(diasDif))) || ((diasDif <= 5) && (diasDif >= 0)) || ((diasDif < -5) && (tiva_events[id].duration >= Math.abs(diasDif)))) {
                    console.log("Es menor de 5 días");
                    if ($(".iconos").attr("id") === "iconos") {
                        $(".iconos").attr("id", "noMostrar");
                    } else {
                        $(".iconos").attr("id", "iconos");
                    }
                    var listadoMediciones = [];
                    var fechasUnicas = [];
                    var paneles = "";

                    $.ajax({

                        url: urlclima,
                        type: 'get',
                        dataType: 'json',

                        success: function (datosClima) {
                            paneles += ' <h2 class="card-tittle">' + ciudad + ',&nbsp;&nbsp;' + pais + '</h2>  ';
                            console.log(pais);
                            console.log(ciudad);
                                                     
                            datosClima.list.forEach( function (medicion) {
                                    listadoMediciones.push(medicion.dt_txt.substring(0, 10));  //generar array con todas las fechas (40 fechas máximo)  
                                    fechasUnicas = Array.from(new Set(listadoMediciones)); //agrupa datos por coincidencias -> fechas de los días en los que se ofrecen las previsiones
                            }); 
                            
                            
                            for (var i = 0; i < fechasUnicas.length; i++) {
                                var dias = [];

                                var array_id_meteo = [];

                                for (var j = 0; j < datosClima.list.length; j++) {
                                    if (datosClima.list[j].dt_txt.substring(0, 10) === fechasUnicas[i]) {

                                        dias.push(datosClima.list[j]);

                                    }
                                }
                                var temp_minima = 100;
                                var temp_maxima = -200;
                                var humedad = 0;
                                for (var k = 0; k < dias.length; k++) {
                                    if (temp_minima > dias[k].main.temp_min) {
                                        temp_minima = dias[k].main.temp_min;
                                    }
                                    if (temp_maxima < dias[k].main.temp_max) {
                                        temp_maxima = dias[k].main.temp_max;
                                    }
                                    humedad += dias[k].main.humidity;

                                    var codClima = dias[k].weather[0].id;
                                    var codClima = codClima.toString();
                                    console.log("Codigo string " + codClima);
                                    var cod = codClima.charAt(0);
                                    if (cod === '8') {
                                        codClima = codClima.replace('8', '1');
                                        console.log("Código string sustituido " + codClima);
                                    }

                                    var intId = parseInt(codClima);
                                    array_id_meteo.push(intId); //construye un array (para cada día) con los id asociados a los iconos/descripción para ese día
                                }

                                console.log("Listado ids: " + array_id_meteo);
                                maximo = Math.max.apply(null, array_id_meteo); //obtencion máximo en el array de ids (para cada día)
                                console.log("El máximo diario es: " + maximo);

                                var descripcion = "";
                                icono_meteo = "";
                                                         
                                info_meteoro.forEach( function(medicion) {
                                    if (medicion.id == maximo) {
                                        descripcion = medicion.descripcion;
                                        icono_meteo = medicion.icono; console.log(icono_meteo);
                                        
                                    }
                                    if (icono_meteo === null || icono_meteo === "" || icono_meteo === 'undefined') { // Si la previsión corresponde a los grupos sin icono 90x , 9xx
                                            icono_meteo = 'Consultia';
                                        }

                                });
                                
                                
                                
                                var diaSemana = new Date(fechasUnicas[i]);
                                var mediaHumedad = humedad / dias.length;
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
                                console.log("nuevo dia");
                                console.log(dias);


                            }
                            console.log(fechasUnicas);




                            $(".iconos").html("");
                            $(".iconos").append(paneles);
                        },
                        error: function () {
                            console.log("Se ha producido un error API u otra causa.");
                        }
                    });

                    //si no, aviso al usuario 

                } else { //resto de casos, cuando la diferencia de días con la fecha de inicio es mayor a 5 en el pasado (y no dura hasta hoy mínimo) o más de 5 días en el futuro(días máximos previsión desde hoy)

                    variableTexto = '<div class="toast-text">Evento pasado o demasiado lejano, no hay previsiones disponibles.</div>';
                    $('<div class="toaster toast-warning">' + variableTexto + '</div>').insertBefore($('#info-lugar'));
                    $('#info-clima').addClass('isDisabled');
                    setTimeout(function () {
                        $('.toaster').fadeOut('slow', 'linear');
                        $('#info-clima').removeClass('isDisabled');
                    }, 3000);

                }

            }); //fin información clima

        } else {
            $('#info-clima').addClass('isDisabled');
        }

        $("#fichaDetalle").modal("show");

  
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
    date1 = new Date(date1[0], date1[1] - 1, date1[2]);

    date2 = new Date(date2[0], date2[1] - 1, date2[2]);

    var timeDifference = date2 - date1;

// en horas
    var timeDifferenceInHours = timeDifference / 3600000;

// and finaly, in days :)
    var timeDifferenceInDays = timeDifferenceInHours / 24;

    return Math.round(timeDifferenceInDays);


}
function sumarDias(dias) {
    fecha = new Date();
    fecha.setDate(fecha.getDate() + dias);
    var day = fecha.getDate();
    var month = fecha.getMonth() + 1;
    var year = fecha.getFullYear();
    var result = year + "-" + month + "-" + day;
    return result;
}
function mostrarSegunFiltrado(numeroFiltro, cantidadEventos) {
    switch (numeroFiltro) {
        case 1 :

            $(".listado-eventos-pendientes").css("display", "block");
            $(".listado-eventos-terminados").css("display", "none");
            $("#cambiarEventos").addClass("displayNone");

            break;
        case 2 :
            $(".listado-eventos-pendientes").css("display", "none");
            $(".listado-eventos-terminados").css("display", "block");
            $("#cambiarEventos").addClass("displayNone");
            break;
        case 3:
            if (cantidadEventos > 15) {
                $(".listado-eventos-pendientes").css("display", "block");
                $(".listado-eventos-terminados").css("display", "none");
                $("#cambiarEventos").removeClass("displayNone");
                break;
            } else {
                $(".listado-eventos-pendientes").css("display", "block");
                $(".listado-eventos-terminados").css("display", "block");
                $("#cambiarEventos").addClass("displayNone");
                break;
            }
    }
}
function promesaAjax(url) {

    // Return the $.ajax promise

    return $.ajax({

        url: url,

        dataType: 'json',
       
        type: "GET",

        beforeSend: function () {
            jQuery('.tiva-calendar').html('<div class="loading"><img src="assets/images/loading.gif" /></div>');
        },
        error: function (status, message)
        {
            console.log(status);
            console.log(message);
        }

    });

}

// Init calendar full
function cargaCalendario() {
    $('.tiva-events-calendar.full').html("");
    if (jQuery('.tiva-events-calendar.full').length) {
        jQuery('.tiva-events-calendar.full').html('<div class="events-calendar-bar">'
                + '<div class="btn-cambio-interfaz"><button class=" btn btn-info calendar-view calendar-btn boton-oculto calendar-bar__item active"><i class="far fa-calendar-alt"></i>&nbsp;' + calendar_view + '</button>'
                + '<button class=" btn btn-primary list-view calendar-btn boton-oculto calendar-bar__item"><i class="fa fa-list"></i>&nbsp;' + list_view + '</button></div>'
                + ' <!--Grid row-->'
                + ' <div class="barras-fechas">'

                + ' <!--Grid column-->'
                + ' <div class="col-md-6 mb-4 calendar-bar__item">'

                + '   <div class="md-form ">'
                + '  <!--The "from" Date Picker -->'
                + '   <input placeholder="Fecha de inicio" type="text" id="startingDate" class="form-control datepicker ">'
                + '   <label for="startingDate"></label>'
                + '   </div>'

                + ' </div>'
                + ' <!--Grid column-->'

                + ' <!--Grid column-->'
                + ' <div class="col-md-6 mb-4 calendar-bar__item">'

                + '  <div class="md-form">'
                + '   <!--The "to" Date Picker -->'
                + ' <input placeholder="Fecha final" type="text" id="endingDate" class="form-control datepicker">'
                + '  <label for="endingDate"></label>'
                + '  </div>'

                + ' </div>'
                + ' <!--Grid column-->'

                + ' </div>'
                + ' <!--Grid row-->'
                //         + '<span class="bar-btn back-calendar pull-right active"><i class="fa fa-caret-left"></i>' + back + '</span>'
                + '<div class="btn-cambio-filtro"><button id="filtro-fechas" class="btn btn-secondary  calendar-bar__item"><i class="fas fa-search"></i>&nbsp;Buscar</button>'
                + '<button id="limpiar-filtro" class="btn btn-secondary  calendar-bar__item"><i class="fas fa-undo-alt"></i></i>&nbsp;Deshacer</button></div>'
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
                //          + '<span class="bar-btn back-calendar pull-right active"><i class="fa fa-caret-left"></i>' + back + '</span>'
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

    jQuery('.tiva-event-list').hide();
    jQuery('.tiva-event-detail').hide();

    jQuery('.tiva-events-calendar').each(function (index) {
        // Hide switch button
        var switch_button = (typeof jQuery(this).attr('data-switch') !== "undefined") ? jQuery(this).attr('data-switch') : 'show';
        if (switch_button === 'hide') {
            jQuery(this).find('.calendar-view').hide();
            jQuery(this).find('.list-view').hide();

            // Change css of button back
            jQuery(this).find('.events-calendar-bar').css('position', 'relative');
            //    jQuery(this).find('.back-calendar').css({"position": "absolute", "margin-top": "15px", "right": "15px"});
            jQuery(this).find('.tiva-event-detail').css('padding-top', '60px');
        }
    });

    // Set wordDay 
    date_start = (typeof jQuery('.tiva-events-calendar').attr('data-start') !== "undefined") ? jQuery('.tiva-events-calendar').attr('data-start') : 'monday'; //TODO: SELECTOR DE FORMATO PRIMER DÍA SEMANA
    if (date_start === 'sunday') {
        wordDay = new Array(wordDay_sun, wordDay_mon, wordDay_tue, wordDay_wed, wordDay_thu, wordDay_fri, wordDay_sat);
    } else { // Start with Monday
        wordDay = new Array(wordDay_mon, wordDay_tue, wordDay_wed, wordDay_thu, wordDay_fri, wordDay_sat, wordDay_sun);
    }
    tiva_events = []; //resetea los eventos, para que no se acumulen al realizar filtrados
    if (filtrar) {
        /* var url = "./events/ejemplo_agenda.json";*/
        var url = "http://192.168.0.250:5556/api/Calendario?idUsuario=2&FechaInicio=" + rangoFechaIni + "&FechaFin=" + rangoFechaFin;
    } else {
        var url = "http://192.168.0.250:5556/api/Calendario?idUsuario=2&FechaInicio=" + fechaIniDefault + "&FechaFin=" + fechaFinDefault;
    }
    filtrar = false;


 filtrar = false;
    promesaDatos = promesaAjax(url);
    $.when(promesaDatos).done(function(entradas){
//            jQuery.ajax({
//
//                url: url,
//                dataType: 'JSON',
//                type: "GET",
//                beforeSend: function () {
//                    jQuery('.tiva-calendar').html('<div class="loading"><img src="assets/images/loading.gif" /></div>');
//                },
//                error: function (status, message)
//                {
//                    alert('A jQuery error has occurred. Status: ' + status + ' - Message: ' + message);
//                },
//                success: function (entradas) {
            
            diccionarioLogos = entradas.DiccionarioLogos; //array 
         
            j = -1; //contador para asignar las IP a los eventos
            entradas.Pedidos.forEach(function(entrada) {
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
                    "_adjuntos": entrada.Detalles.Adjuntos, //array
                    "_fechaInicio": entrada.FechaInicio,
                    "_fechaFin": entrada.FechaFin,
                    "_ubicacion": entrada.Ubicacion, //dirección postal
                    "_latitudDestino": entrada.Detalles.LatitudDestino,
                    "_longitudDestino": entrada.Detalles.LongitudDestino,
                    "_latitudOrigen": entrada.LatitudOrigen,
                    "_longitudOrigen": entrada.LongitudOrigen,

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
                    "_regimen": entrada.Detalles.Regimen,
                    "_tipohabita": entrada.Detalles.TipoHabitacion,
                    "_localizador": entrada.Detalles.Localizador,
                    "_acompanyantes": entrada.Viajeros, //array

                    //para Tren
                    "_proveedor": entrada.Detalles.Proveedor, //común con barco (Nombre proveedor)
                    "_TipoTren": entrada.Detalles.TipoTren,
                    "_Clase": entrada.Detalles.Clase,
                    "_EstacionOrigen": entrada.Detalles.EstacionOrigen,
                    "_EstacionDestino": entrada.Detalles.EstacionDestino,
                    "_DireccionOrigen": entrada.DireccionOrigen,
                    "_DireccionDestino": entrada.Detalles.DireccionDestino,
                    "_idProveedor": entrada.idProveedor, //común para Tren y Coche

                    //para Coche

                    "_categoria": entrada.Detalles.Categoria,
                    "_transmision": entrada.Detalles.Transmision,
                    "_combustible": entrada.Detalles.Combustible_AC,
                    "_direccionRecogida": entrada.Detalles.DireccionRecogida,
                    "_direccionEntrega": entrada.Detalles.DireccionEntrega,

                    //para Barco
                    "_vehiculos": entrada.Detalles.Vehiculos, //array
                    "_origen": entrada.Detalles.Origen,
                    "_destino": entrada.Detalles.Destino,
                    "_acomodacion": entrada.Detalles.Acomodacion,
                    "_ProveedorCoches": entrada.Detalles.Proveedor


                };
// Adapta la duracion a cada evento, fijando el valor a 1 en caso de que sea un evento que implique un billete
// y contemplando el dia de salida/devolucion en los eventos de alquiler de habitaciones en hoteles o coches


                if (evento._tipo === "Aereo" || evento._tipo === "Barco" || evento._tipo === "Tren") {
                    evento.duration = 1;
                } else {
                    evento.duration = evento.duration + 1;

                }


                var event_date = new Date(evento.year, Number(evento.month) - 1, evento.day, entrada.FechaInicio.substring(11, 13), entrada.FechaInicio.substring(14, 16));

                evento.date = event_date.getTime();

                tiva_events.push(evento);


            }); //forEach entrada

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
                if (returnView === "lista") {
                    $(".list-view").click();
                } else {
                    $(".calendar-view").click();
                }
            }


            jQuery('.tiva-events-calendar').each(function (index) {
                // Initial view
                var initial_view = (typeof jQuery(this).attr('data-view') !== "undefined") ? jQuery(this).attr('data-view') : 'calendar';
                if (initial_view === 'list') {
                    jQuery(this).find('.list-view').click();
                }
            });
        
    });
//    }

// Click - Calendar view btn
    jQuery('.tiva-events-calendar .calendar-view').click(function () {
        //   jQuery(this).parents('.tiva-events-calendar').find('.back-calendar').hide();
        jQuery(this).parents('.tiva-events-calendar').find('.tiva-event-list').hide();
        jQuery(this).parents('.tiva-events-calendar').find('.tiva-event-detail').hide();
        jQuery(this).parents('.tiva-events-calendar').find('.tiva-calendar').fadeIn(500);

        jQuery(this).parents('.tiva-events-calendar').find('.list-view').removeClass('active');
        jQuery(this).parents('.tiva-events-calendar').find('.calendar-view').addClass('active');
        returnView = "calendario";
    });

// Click - List view btn
    jQuery('.tiva-events-calendar .list-view').click(function () {
        //  jQuery(this).parents('.tiva-events-calendar').find('.back-calendar').hide();
        jQuery(this).parents('.tiva-events-calendar').find('.tiva-calendar').hide();
        jQuery(this).parents('.tiva-events-calendar').find('.tiva-event-detail').hide();
        jQuery(this).parents('.tiva-events-calendar').find('.tiva-event-list').fadeIn(500);

        jQuery(this).parents('.tiva-events-calendar').find('.calendar-view').removeClass('active');
        jQuery(this).parents('.tiva-events-calendar').find('.list-view').addClass('active');
        returnView = "lista";

        var layout = jQuery(this).parents('.tiva-events-calendar').attr('class') ? jQuery(this).parents('.tiva-events-calendar').attr('class') : 'full';
        var max_events = jQuery(this).parents('.tiva-events-calendar').attr('data-events') ? jQuery(this).parents('.tiva-events-calendar').attr('data-events') : 1000;
        if (layout.indexOf('full') !== -1) {
            showEventList('full', max_events);
        } else {
            showEventList('compact', max_events);
        }
    });

// Carga controles del DataPicker (al final de la carga completa del calendario)
    controlesDataPicker();


    $("#filtro-fechas").on("click", function () {

        FechaIni = $("#startingDate").val();
        FechaFin = $("#endingDate").val();
        if ((FechaIni !== "") && FechaFin !== "") {


            rangoFechaIni = FechaIni.split("-").reverse().join("-");
            rangoFechaFin = FechaFin.split("-").reverse().join("-");
            var cantidadDiasFiltrado = dayDifference(rangoFechaIni, rangoFechaFin);
            if (cantidadDiasFiltrado > 365) {
                alert("No puede haber más de un año de diferencia entre la fecha inicial y la final");
            } else {

                if (diferenciaDiasClima(new Date, rangoFechaIni) > 0) {
                    filtrar = true;
                    filtrado = 1;
                    cargaCalendario();
                } else if (diferenciaDiasClima(new Date, rangoFechaFin) < 0) {
                    filtrar = true;
                    filtrado = 2;
                    cargaCalendario();
                } else {
                    filtrar = true;
                    filtrado = 3;
                    cargaCalendario();
                }
            }
        } else {
            alert("Selecciona fecha de inicio y fin para realizar una busqueda");

        }

    });
    $("#limpiar-filtro").on("click", function () {
        filtrar = false;
        filtrado = 0;
        cargaCalendario();
    });
}

jQuery(document).ready(function () {
    cargaCalendario();

});

