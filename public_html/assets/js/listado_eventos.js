

// Show event detail -- mostrar lista de eventos por venir (upcoming) ordenados
function showEventList() {
    // Sort event via upcoming
    var upcoming_events = getEventsByTime('upcoming');
    upcoming_events.sort(sortEventsByUpcoming);
    var past_events = getEventsByTime('past');
    past_events.sort(sortEventsByUpcoming);
    var consultia_list_events = upcoming_events.concat(past_events);
    consultia_list_events = consultia_list_events.slice(0, 1000);


    jQuery('.consultia-event-list-full').html('');
    jQuery('.consultia-event-list-full').append('<div class="cambiarEventos" ><button id="cambiarEventos" class="btn btn-primary btn-lg ">Ver eventos pasados</button></div>');
    jQuery('.consultia-event-list-full').append('<div class="listado-eventos-pendientes"><span class="titulo-lista">Eventos Pendientes</span></div>');
    jQuery('.consultia-event-list-full').append('<div class="listado-eventos-terminados"><span class="titulo-lista">Eventos Finalizados</span></div>');

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


    for (var i = 0; i < consultia_list_events.length; i++) {
        // Start date

        var day = new Date(consultia_list_events[i].year, Number(consultia_list_events[i].month) - 1, consultia_list_events[i].day);
        if (date_start === 'sunday') {
            var event_day = wordDay[day.getDay()];
        } else {
            if (day.getDay() > 0) {
                var event_day = wordDay[day.getDay() - 1];
            } else {
                var event_day = wordDay[6];
            }
        }
        var event_date = wordMonth[Number(consultia_list_events[i].month) - 1] + ' ' + consultia_list_events[i].day + ', ' + consultia_list_events[i].year;

        // End date
        var event_end_time = '';
        if (consultia_list_events[i].duration > 1) {
            var end_date = new Date(consultia_list_events[i].year, Number(consultia_list_events[i].month) - 1, Number(consultia_list_events[i].day) + Number(consultia_list_events[i].duration) - 1);

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
        if (consultia_list_events[i].time) {
            var event_time = '<i class="far fa-clock"></i>&nbsp;&nbsp;' + consultia_list_events[i].time;
        } else {
            var event_time = '';
        }



        var eventoListado = '<div class="list__event" onclick="showEventDetail(' + consultia_list_events[i].id + ')">' +
                '<div class="event__cabecera color-' + consultia_list_events[i].color + ' " >' +
                formatCabecera(consultia_list_events[i].name, consultia_list_events[i]._tipo, "lista", null) +
                '</div>' +
                '<div class="textoEvento event__fecha"><i class="far fa-calendar-alt"></i>&nbsp;&nbsp; ' + event_day + ', ' + event_date + event_end_time + '</div>' +
                '<div class="textoEvento event__hora">' + event_time + '</div>' +
                '<div class="textoEvento event__ubicacion">' + consultia_list_events[i]._ubicacion + '</div>' +
                '</div>';
        var today = new Date;

        var ultimoDia = Date.parse(consultia_list_events[i]._fechaFin);

        var resta = (ultimoDia - today.getTime());

        if (resta >= 0) { // organiza los eventos de la lista en dos categorias, segun si han finalizado ya o no
            $(".listado-eventos-pendientes").append(eventoListado);
        } else {
            $(".listado-eventos-terminados").append(eventoListado);
        }
        ;

    }
    mostrarSegunFiltrado(filtrado, consultia_list_events.length);
    if ($(".listado-eventos-pendientes").children().length === 1) {
        $(".listado-eventos-pendientes").append('<div>No hay eventos disponibles</div>');
    }
    if ($(".listado-eventos-terminados").children().length === 1) {
        $(".listado-eventos-terminados").append('<div>No hay eventos disponibles</div>');
    }

}
