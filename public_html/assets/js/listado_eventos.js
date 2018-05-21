
/**
 * @description carga una lista con todos los eventos en el rango de fechas indicado, y los organiza en dos listas: finalizados y pendientes
 * @returns {list} devuelve un listado con todos los eventos 
 */
// Show event detail -- mostrar lista de eventos por venir (upcoming) ordenados
function showEventList() {
//ordena los eventos por fecha
 // Sort event via upcoming
    var upcoming_events = getEventsByTime('upcoming');
    upcoming_events.sort(sortEventsByUpcoming);
    var past_events = getEventsByTime('past');
    past_events.sort(sortEventsByUpcoming);
    var consultia_list_events = upcoming_events.concat(past_events);
    consultia_list_events = consultia_list_events.slice(0, 1000);




    jQuery('.consultia-event-list-full').html(''); //limpia la lista de eventos
    jQuery('.consultia-event-list-full').append('<div class="cambiarEventos" ><button id="cambiarEventos" class="btn btn-primary btn-lg ">Ver eventos pasados</button></div>');
    jQuery('.consultia-event-list-full').append('<div class="listado-eventos-pendientes"><span class="titulo-lista">Eventos Pendientes</span></div>');
    jQuery('.consultia-event-list-full').append('<div class="listado-eventos-terminados"><span class="titulo-lista">Eventos Finalizados</span></div>');

    $("#cambiarEventos").on("click", function () { //cambia el listado de eventos mostrados

        if ($(".listado-eventos-pendientes").css("display") === "none") { //cambia de eventos finalizados a pendientes

            $(".listado-eventos-pendientes").css("display", "block");
            $(".listado-eventos-terminados").css("display", "none");
            $(this).text("Ver eventos pasados"); //cambiar el texto del boton a "ver eventos pasados"
        } else {    //cambia de eventos pendientes a finalizados

            $(".listado-eventos-pendientes").css("display", "none");
            $(".listado-eventos-terminados").css("display", "block");
            $(this).text("Ver eventos pendientes"); //cambia el texto del bton a "ver eventos pendientes"
        }
    });


    for (var i = 0; i < consultia_list_events.length; i++) {
        // Start date

        var day = new Date(consultia_list_events[i].year, Number(consultia_list_events[i].month) - 1, consultia_list_events[i].day); //crea una nueva fecha a partir de los datos del evento
        if (date_start === 'sunday') {
            var event_day = wordDay[day.getDay()];
        } else { //para que el dia inicial de la semana sea lunes
            if (day.getDay() > 0) { //carga el dia de la semana en formato ( lunes, martes, miercoles, etc)
                var event_day = wordDay[day.getDay() - 1];
            } else {
                var event_day = wordDay[6]; 
            }
        }
        var event_date = wordMonth[Number(consultia_list_events[i].month) - 1] + ' ' + consultia_list_events[i].day + ', ' + consultia_list_events[i].year;

        /////////////////    End date   ///////////////////////
        var event_end_time = ''; //carga la fecha de fin del evento en caso que la duración de este sea de más de un dia
        if (consultia_list_events[i].duration > 1) { 
            var end_date = new Date(consultia_list_events[i].year, Number(consultia_list_events[i].month) - 1, Number(consultia_list_events[i].day) + Number(consultia_list_events[i].duration) - 1);

            if (date_start === 'sunday') {
                var event_end_day = wordDay[end_date.getDay()]; // carga el dia de la semana si el calendario empieza las semanas por domingo
            } else {
                if (end_date.getDay() > 0) {
                    var event_end_day = wordDay[end_date.getDay() - 1]; //carga el dia de la semana si el calendario empieza las semanas por cualquier otro dia (lunes)
                } else {
                    var event_end_day = wordDay[6];
                }
            }
            var event_end_date = wordMonth[Number(end_date.getMonth())] + ' ' + end_date.getDate() + ', ' + end_date.getFullYear();
            event_end_time = ' - ' + event_end_day + ', ' + event_end_date;
        }

        // Event time
        if (consultia_list_events[i].time) {
            var event_time = '<i class="far fa-clock"></i>&nbsp;&nbsp;' + consultia_list_events[i].time;
        } else {
            var event_time = '';
        }
   
        
        //crea cada evento de la lista dentro de una etiqueta "div" 
        var eventoListado = '<div class="list__event" >' +
                '<div class="event__cabecera color-' + consultia_list_events[i].color + '" onclick="showEventDetail(' + consultia_list_events[i].id + ')">' + //abre la ventana modal al hacer click en la cabecera
                formatCabecera(consultia_list_events[i].name, consultia_list_events[i]._tipo, "lista", null) +
                '</div>' +
                '<div class="textoEvento event__fecha"><i class="far fa-calendar-alt"></i>&nbsp;&nbsp; ' + event_day + ', ' + event_date + event_end_time + '</div>' + //muesra el dia de la semana y fecha
                '<div class="textoEvento event__hora">' + event_time + '</div>' + //muestra la hora de inicio del evento
                '<div class="textoEvento event__ubicacion"><div event--text_ubicacion>' + consultia_list_events[i]._ubicacion + '</div>' + //muestra la localización del evento
                '<button class="boton_detalles" onclick="showEventDetail(' + consultia_list_events[i].id + ')">Detalles</button></div>' + 
                '</div>';
         today = new Date;

        var ultimoDia = Date.parse(consultia_list_events[i]._fechaFin); //convierte el String _fechaFin con formato 2017-05-05 a un milisegundos

        var resta = (ultimoDia - today.getTime()); //calcula la diferencia entre el ultimo dia del evento y la fecha actual

        if (resta >= 0) { // organiza los eventos de la lista en dos categorias, segun si han finalizado ya o no
            $(".listado-eventos-pendientes").append(eventoListado);  //div de eventos por realizar
        } else {
            $(".listado-eventos-terminados").append(eventoListado); //div de eventos realizados
        }
        ;

    }
    mostrarSegunFiltrado(filtrado, consultia_list_events.length); //muestra el comentario escrito a continuación en el caso de que una de las listas no disponga de eventos que mostrar
    if ($(".listado-eventos-pendientes").children().length === 1) {
        $(".listado-eventos-pendientes").append('<div>No hay eventos disponibles</div>');
    }
    if ($(".listado-eventos-terminados").children().length === 1) {
        $(".listado-eventos-terminados").append('<div>No hay eventos disponibles</div>');
    }

}
