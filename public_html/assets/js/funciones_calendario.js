
/**
 * @description Función para determinar el número máximo de caracteres que puede mostrar un evento. Depende del ancho del dispositivo
 * @param {sortEventsByDate} text Parametro que recoge el "asunto" del evento
 * @param {integer} num  multiplicador calculado con otra función, que tiene en cuenta el dia de la semana y la duración entre otras cosas
 * @returns {getShortText.textArray|String} texto con el "asunto" recortado para ajustarse al ancho de la celda
 * @see function filtroEventoDuraciónDiaSemana(evento, duracion, diaSemana) 
 */
//delimita el número de caracteres que se puede mostrar de un asunto, en función del ancho de la pantalla del dispositivo
function getShortText(text, num) { // el texto es el "asunto" que viene en la API, y el numero viene dado por una función que es llamada en el momento de ejecutar 
    //  ese  número es calculado por una función independiente, y se determinado en base al dia de la semana, y la duración del evento

    var ancho = $(window).width();//calcula el ancho de la pantalla del dispositivo que esta usando el calendario

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
    // 

    var textArray = text.substring(0, caracteres); // delimita el asunto al máximo de caracteres establecido en base a la resolución 

    if (text.length > textArray.length) { //muestra 3 puntos suspensivos si el texto del asunto no se muestra completo
        textArray = textArray + "...";
    }
    return textArray;

}
/**
 * @description funcion para ordenar fechas de anterior a posterior, usa un metodo de ordenación "sort" básico
 * @param {type} a valor comparado 
 * @param {type} b valor a comparar
 * @returns {Number} número entre -1 y 1, que determina si el comparado B ha de ir antes, en la misma posición, o despues de A
 */
function sortEventsByDate(a, b) {   //FUNCIÓN QUE ORDENA EVENTOS POR FECHA de anterior a posterior. Se usa para ordenar for fecha todos los eventos antes de asignarles un ID
    if (a.date < b.date) {
        return -1;
    } else if (a.date > b.date) {
        return 1;
    } else {
        return 0;
    }
}
/**
 * @description funcion para ordenar eventos de anterior a posterior, usa un metodo de ordenación "sort" básico
 * @param {type} a valor comparado 
 * @param {type} b valor a comparar
 * @returns {Number} número entre -1 y 1, que determina si el comparado B ha de ir antes, en la misma posición, o despues de A
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
/**
 * @description separa los eventos en dos arrays, dependiendo de si han pasado o estan por venir
 * @param {string} type los tipos puedes ser upcoming (por venir) o past ( eventos ya finalizados) 
 * @returns {Array|getEventsByTime.events} Devuelve un array con los eventos del tipo seleccionado
 */
function getEventsByTime(type) { //si añade más eventos probar sin esto
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
/**
 * @description se encarga de cargar un nuevo mes al presionar los botones de siguiente/anterior mes o año.
 * @param {string} btn recupera el tipo de botón pulsado.
 * @returns {undefined}
 */
// Change month or year on calendar - Cambiar mes o anyo en el calendario
function changedate(btn) { //esta es la función a la que se llama al apretar a alguno de los botones de pasar/retroceder a un mes/año. 

    if (btn === "prevyr") {
        eval("yearNum_full" + "--;");
    } else if (btn === "nextyr") {
        eval("yearNum_full" + "++;");
    } else if (btn === "prevmo") {
        eval("monthNum_full" + "--;");
    } else if (btn === "nextmo") {
        eval("monthNum_full" + "++;");
    } else if (btn === "current") {
        eval("monthNum_full" + " = todaysMonth;");
        eval("yearNum_full" + " = todaysYear;");
    }
   
    if (monthNum_full === 0) { //si al retroceder un mes (getDay++)-1, resulta 0, el mes a mostrar es DICIEMBRE (12) Y EL AÑO ANTERIOR(--)
        monthNum_full = 12;
        yearNum_full--;
    } else if (monthNum_full === 13) { //si al avanzar un mes (getDay++)+1, resulta 13, el mes a mostrar es ENERO (1) Y EL AÑO EL SIGUIENTE (++)
        monthNum_full = 1;
        yearNum_full++;
    }


    // Get first day and number days of month
    eval("firstDate = new Date(yearNum_full" + ", monthNum_full" + " - 1, 1);"); //asigna a vble. la fecha del día 1 del mes actual
    if (date_start === 'sunday') {
        firstDay = firstDate.getDay() + 1;  //first_day será el día de la semana del día 1
    } else {
        firstDay = (firstDate.getDay() === 0) ? 7 : firstDate.getDay(); //si la semana empieza a contar en lunes, y el día 1 primer día de semana, la vble. firstDay es 7
       
    }
    eval("lastDate = new Date(yearNum_full" + ", monthNum_full" + ", 0);"); //asigna a la vble la fecha del último día del mes actual 
    numbDays = lastDate.getDate(); //números de días del mes

    // Create calendar
    eval("createCalendar(firstDay, numbDays, monthNum_full, yearNum_full);");

    return;
}
/**
 * @description comprueba si en un dia en concreto hay eventos o no
 * @param {string} day  dia del mes a comprobar
 * @param {string} month mes del año a comprobar
 * @param {string} year año a comprobar
 * @returns {Boolean}  devuelve true en caso de encontrar algún evento, y false en caso de no hacerlo 
 */
// Check day has events or not  // comprobar SI el día HAY EVENTOS
// comprueba si en un dia en concreto ocurre algún tipo de evento, ya sean de corta duración (ocurren en un solo dia) o de larga duracíón ( pueden tener fecha de inicio y fin en diferentes dias)
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
    // devuelve true si ha encontrado eventos, y false si no hay ninguno en ese dia.
}
/**
 * @description devuelve la posicion que ocupara cada evento dutante el dia, dando prioridad absoluta a los eventos de larga duración sobre los eventos de un solo dia
 * @param {string} id del evento a examinar
 * @param {string} day dia en que ocurren los eventos
 * @param {string} month mes en que ocurren los eventos
 * @param {string} year año en el que ocurren los eventos
 * @returns {Number|order_num} numero entero que deternima la posicion en la celda de la tabla ( 0 , 1  , 2 etc )
 * @see function getEvents(day, month, year) 
 */
//
function getOrderNumber(id, day, month, year) {
    var date_check = new Date(year, Number(month) - 1, day); //fecha 
    var events = [];  //array para trabajar con los eventos recibidos en el json y ordenarlos después en cliente
    for (var i = 0; i < consultia_events.length; i++) {
        var start_date = new Date(consultia_events[i].year, Number(consultia_events[i].month) - 1, consultia_events[i].day); //FECHA INICIO EVENTO
        var end_date = new Date(consultia_events[i].year, Number(consultia_events[i].month) - 1, Number(consultia_events[i].day) + Number(consultia_events[i].duration) - 1); //FECHA FIN EVENTO = fecha inicio + duración - 1
        if ((start_date.getTime() <= date_check.getTime()) && (date_check.getTime() <= end_date.getTime())) { //si la FECHA INTRODUCIDA está entre la INICIO y la FIN del evento
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
/**
 * @description metodo para listar en un array todos los eventos ocurridos en una fecha concreta
 * @param {string} day dia del mes en que buscar eventos
 * @param {string} month mes del año en que buscar eventos
 * @param {string} year año en el que ocurren los eventos
 * @returns {Array} devuelve un array con todos los eventos de ese dia
 */
// Get events of day  -- OBTENER EVENTOS DEL DÍA INDICADO EN PARÁMETROS
function getEvents(day, month, year) { //obtiene todos los eventos de un dia en concreto despues de haber realizado un checkevents para ver si hay eventos.

    var n = 0;
    var date_check = new Date(year, Number(month) - 1, day);
    var events = [];

    for (var i = 0; i < consultia_events.length; i++) {
        var start_date = new Date(consultia_events[i].year, Number(consultia_events[i].month) - 1, consultia_events[i].day);
        var end_date = new Date(consultia_events[i].year, Number(consultia_events[i].month) - 1, Number(consultia_events[i].day) + Number(consultia_events[i].duration) - 1);
        
        finalizaDiferenteMes = false; //calcula si el evento, empieza y termina en diferentes meses
        if (Number(consultia_events[i].month) - Number(consultia_events[i]._mesFin)< 0){
            var finalizaDiferenteMes = true;
        }
        finalizaDiferenteAnyo = false; //calcula si el evento, empieza y termina en diferentes años
         if (Number(consultia_events[i].year) - Number(consultia_events[i]._anyoFin)< 0){
            var finalizaDiferenteAnyo = true;
        }
        if ((start_date.getTime() <= date_check.getTime()) && (date_check.getTime() <= end_date.getTime())) {
            var first_day = (start_date.getTime() === date_check.getTime()) ? true : false;
            var last_day = (end_date.getTime() === date_check.getTime()) ? true : false;   
            var event = {id: consultia_events[i].id, name: consultia_events[i].name, first_day: first_day, last_day: last_day,
                color: consultia_events[i].color, tipo: consultia_events[i]._tipo, duracion: consultia_events[i].duration,diferenteMes:finalizaDiferenteMes,diferenteAnyo:finalizaDiferenteAnyo}; //TODO: ANYADIDA PROPIEDAD DURATION AL ARRAY event

            if (!first_day) {
                n = getOrderNumber(consultia_events[i].id, consultia_events[i].day, consultia_events[i].month, consultia_events[i].year);
            }

            events[n] = event;
            n++;
        }
    }
    return events;
}

/**
 * @descripcion realiza una petición AJAX a una url, esperando un JSON como respuesta 
 * @param {string} url ruta amigable a la que realizar la petición 
 * @returns {jqXHR} devuelve un JSON en caso de que la petición tenga exito, y un mensaje de error en caso contrario
 */
function parametrosCabeceraAjax(url) {
//cabecera de la petición ajax que recoge los datos para crear eventos en el calendario
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


/**
 * @description calcula la diferencia en dias enteros entre dos fechas
 * @param {string} entrada fecha de inicio en formato string 2017-02-31
 * @param {string} salida fecha de fin en formato string 2017-02-31
 * @returns {Number} devuelve la cantidad de dias enteros que hay entre dos fechas
 */
function dayDifference(entrada, salida) { //calcular los dias de diferencia que hay entre dos fechas
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

/**
 * @description devuelve la fecha resultante de sumar o restar un número de dias a la fecha actual
 * @param {integer} dias int de dias que quieres sumar o restar (admite tanto enteros positivos como negativos)
 * @returns {String} fecha resultante en formato string 2017-02-02
 */
function sumarDias(dias) { //obtiene una fecha al sumar o restar X número de dias a la fecha actual
    fecha = new Date();
    fecha.setDate(fecha.getDate() + dias);
    var day = fecha.getDate();
    var month = fecha.getMonth() + 1;
    var year = fecha.getFullYear();
    var result = year + "-" + month + "-" + day;
    return result;
}
/**
 * @description funcion para calcular como de largo ha de ser un div y cuantos caracteres puede contener 
 * @param {string} evento tipo de evento (primer dia, dia intermedio, dia final, dia único)
 * @param {int} duracion , días en los que ocurre el evento 
 * @param {string} diaSemana dia de la semana en la que comienza en evento
 * @returns {Array}  devuelve un array con los datos, tamaño de div, tamaño máximo del div, multiplicador/modificador de caracteres y tamaño máximo del div según dia de la semana
 */
function filtroEventoDuraciónDiaSemana(evento, duracion, diaSemana) {
    //asignación de clases a los eventos 
    var multiploDeCaracteresSegunDuracion = 2;
    var divSize = " length-1 ";
    var divMaxSegunDiaSemana = 2;
    var maxDiv = " maxlength-1 ";
    switch (evento) {
        case "one-day":
            divSize = "";
            maxDiv = "";
            multiploDeCaracteresSegunDuracion = 1;
            divMaxSegunDiaSemana = 1;
            break;
        case "middle-day":
            divSize = "";
            maxDiv = "";
            multiploDeCaracteresSegunDuracion = 0;
            divMaxSegunDiaSemana = 0;
            break;
        case "last-day":
            divSize = "";
            maxDiv = "";
            multiploDeCaracteresSegunDuracion = 0;
            divMaxSegunDiaSemana = 0;
            break; 
        case "first-day":
            // Delimita el máximo de caracteres que puede mostrar un evento y el tamaño del div, según la duración del evento

            multiploDeCaracteresSegunDuracion = duracion;
            divSize = " length-" + duracion;
            if (duracion > 7) {
                divSize = " length-7 ";
            }
            switch (diaSemana) {
                case "Lunes":
                    divMaxSegunDiaSemana = 7; //asiga un número en base a la cantidad disponible de dias en el row para poder introducir texto
                    maxDiv = 7;
                    break;
                case "Martes":
                    divMaxSegunDiaSemana = 6; //asiga un número en base a la cantidad disponible de dias en el row para poder introducir texto
                    maxDiv = 6;
                    break;
                case "Miercoles":
                    divMaxSegunDiaSemana = 5; //asiga un número en base a la cantidad disponible de dias en el row para poder introducir texto
                    maxDiv = 5;
                    break;
                case "Jueves":
                    divMaxSegunDiaSemana = 4; //asiga un número en base a la cantidad disponible de dias en el row para poder introducir texto
                    maxDiv = 4;
                    break;
                case "Viernes":
                    divMaxSegunDiaSemana = 3; //asiga un número en base a la cantidad disponible de dias en el row para poder introducir texto
                    maxDiv = 3;
                    break;
                case "Sabado":
                    divMaxSegunDiaSemana = 2; //asiga un número en base a la cantidad disponible de dias en el row para poder introducir texto
                    maxDiv = 2;
                    break;
                case "Domingo":
                    divMaxSegunDiaSemana = 1; //asiga un número en base a la cantidad disponible de dias en el row para poder introducir texto
                    maxDiv = 1;
                    break;
                default:
                    divMaxSegunDiaSemana = 1; //asiga un número en base a la cantidad disponible de dias en el row para poder introducir texto
                    maxDiv = 1;
                    break;
            }
            maxDiv = " maxlength-" + Math.min(duracion, maxDiv);
            break;

    }
    return [divSize, maxDiv, multiploDeCaracteresSegunDuracion, divMaxSegunDiaSemana];
    //devuelve un array con los datos, tamaño de div, tamaño máximo del div, multiplicador/modificador de caracteres y tamaño máximo del div según dia de la semana
}
/**
 * @descripcion asigna un código de color dependiendo del tipo de evento
 * @param {string} tipo de evento que tiene lugar ( aereo, hotel, tren etc...)
 * @returns {String}
 */
function colorAsignado(tipo) {
    var color;
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
    return color;
}