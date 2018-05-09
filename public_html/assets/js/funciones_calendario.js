/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function getShortText(text, num) {
    if (text) {

        var ancho = $(window).width();//delimita el número de caracteres que se puede mostrar de un asunto, en función del ancho de la pantalla del dispositivo
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

        if (text.length > textArray.length) { //muestra 3 puntos suspensivos si el texto del asunto no se muestra completo
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
    for (var i = 0; i < consultia_events.length; i++) {
        if (type === 'upcoming') {
            if (consultia_events[i].date >= today_date.getTime()) {
                events.push(consultia_events[i]);
            }
        } else {
            if (consultia_events[i].date < today_date.getTime()) {
                events.push(consultia_events[i]);
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

// Check day has events or not  TODO: comprobar SI el día HAY EVENTOS
function checkEvents(day, month, year) {
    numevents = 0;
    var date_check = new Date(year, Number(month) - 1, day);
    for (var i = 0; i < consultia_events.length; i++) {
        var start_date = new Date(consultia_events[i].year, Number(consultia_events[i].month) - 1, consultia_events[i].day);
        var end_date = new Date(consultia_events[i].year, Number(consultia_events[i].month) - 1, Number(consultia_events[i].day) + Number(consultia_events[i].duration) - 1);
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
    var date_check = new Date(year, Number(month) - 1, day); //fecha 
    var events = [];  //array para trabajar con los eventos recibidos en el json y ordenarlos después en cliente
    for (var i = 0; i < consultia_events.length; i++) {
        var start_date = new Date(consultia_events[i].year, Number(consultia_events[i].month) - 1, consultia_events[i].day); //FECHA INICIO EVENTO
        var end_date = new Date(consultia_events[i].year, Number(consultia_events[i].month) - 1, Number(consultia_events[i].day) + Number(consultia_events[i].duration) - 1); //FECHA FIN EVENTO = fecha inicio + duración - 1
        if ((start_date.getTime() <= date_check.getTime()) && (date_check.getTime() <= end_date.getTime())) { //si la FECHA ACTUAL está entre la INICIO y la FIN del evento
            var first_day = (start_date.getTime() === date_check.getTime()) ? true : false; //si la fecha inicio coincide con la fecha pasada por parámetro, first_day es TRUE
            var event = {id: consultia_events[i].id, name: consultia_events[i].name, day: consultia_events[i].day, month: consultia_events[i].month,
                year: consultia_events[i].year, first_day: first_day}; //se crea el evento  y se insertará en la lista
            events.push(event); //array de eventos 
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

    for (var i = 0; i < consultia_events.length; i++) {
        var start_date = new Date(consultia_events[i].year, Number(consultia_events[i].month) - 1, consultia_events[i].day);
        var end_date = new Date(consultia_events[i].year, Number(consultia_events[i].month) - 1, Number(consultia_events[i].day) + Number(consultia_events[i].duration) - 1);
        if ((start_date.getTime() <= date_check.getTime()) && (date_check.getTime() <= end_date.getTime())) {
            var first_day = (start_date.getTime() === date_check.getTime()) ? true : false;
            var last_day = (end_date.getTime() === date_check.getTime()) ? true : false;
            var event = {id: consultia_events[i].id, name: consultia_events[i].name, first_day: first_day, last_day: last_day, color: consultia_events[i].color, tipo: consultia_events[i]._tipo, duracion: consultia_events[i].duration}; //TODO: ANYADIDA PROPIEDAD DURATION AL ARRAY event

            if (!first_day) {
                n = getOrderNumber(consultia_events[i].id, consultia_events[i].day, consultia_events[i].month, consultia_events[i].year);
            }

            events[n] = event;
            n++;
        }
    }

    return events;
}


function parametrosCabeceraAjax(url) {

    // Return the $.ajax promise

    return $.ajax({

        url: url,

        dataType: 'json',

        type: "GET",

        beforeSend: function () {
            jQuery('.consultia-calendar').html('<div class="loading"><img src="assets/images/loading.gif" /></div>');
        },
        error: function (status, message)
        {
            console.log(status);
            console.log(message);
        }

    });

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