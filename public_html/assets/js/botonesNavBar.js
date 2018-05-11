function botonesNavVar(){
    // Click - Calendar view btn
    jQuery('.consultia-events-calendar .calendar-view').click(function () { //oculta la lista al apretar el boton de calendario, y muestra el calendario

        jQuery(this).parents('.consultia-events-calendar').find('.consultia-event-list').hide();
        jQuery(this).parents('.consultia-events-calendar').find('.consultia-calendar').fadeIn(500);

        jQuery(this).parents('.consultia-events-calendar').find('.list-view').removeClass('active'); //quita la clase active al boton de mostrar lista
        jQuery(this).parents('.consultia-events-calendar').find('.calendar-view').addClass('active'); //añade la clase active al boton mostrar calendario
        returnView = "calendario"; //asinga la vista de calendario como default, para que al volver de la modal se mantenga
    });

// Click - List view btn
    jQuery('.consultia-events-calendar .list-view').click(function () { //oculta el calendario al apretar el boton de lista, y muestra la lista de eventos

        jQuery(this).parents('.consultia-events-calendar').find('.consultia-calendar').hide();
        jQuery(this).parents('.consultia-events-calendar').find('.consultia-event-list').fadeIn(500);

        jQuery(this).parents('.consultia-events-calendar').find('.calendar-view').removeClass('active'); //quita la clase active al boton de mostrar calendario
        jQuery(this).parents('.consultia-events-calendar').find('.list-view').addClass('active');   //añade la clase active al boton mostrar lista de eventos
        returnView = "lista";//asinga la vista de calendario como default, para que al volver de la modal se mantenga
        showEventList(); //carga la lista de eventos

    });
     $("#filtro-fechas").on("click", function () { //boton filtrar por rango de fechas

        FechaIni = $("#startingDate").val(); //recoge el valor de la fecha inicial
        FechaFin = $("#endingDate").val();  //recoge el valor de la fecha final
        if ((FechaIni !== "") && FechaFin !== "") { //comprueba que ningunade las dos fechas este vacia


            rangoFechaIni = FechaIni.split("-").reverse().join("-"); //recupera la fecha de inicio en formato 04-07-2017, la trocea y la cambia a formato 2017-07-04
            rangoFechaFin = FechaFin.split("-").reverse().join("-");//recupera la fecha de fin en formato 04-07-2017, la trocea y la cambia a formato 2017-07-04
            var cantidadDiasFiltrado = dayDifference(rangoFechaIni, rangoFechaFin);
            if (cantidadDiasFiltrado > diasMaximoEntreFechas) {
                alert("No puede haber más de " + diasMaximoEntreFechas+ " dias de diferencia entre la fecha inicial y la final"); 
            } else {

                if (diferenciaDiasClima(new Date, rangoFechaIni) > 0) {
                    filtrar = true; //cambia el valor a la opcion de filtrado, haciendo que use las fechas seleccionadas en vez de las de por defecto
                    filtrado = 1; //asigna un valor al tipo de filtrado, por el cual mostrará solo los eventos pendientes
                    cargaCalendario(); //reinicia el calendario
                } else if (diferenciaDiasClima(new Date, rangoFechaFin) < 0) {
                    filtrar = true; //cambia el valor a la opcion de filtrado, haciendo que use las fechas seleccionadas en vez de las de por defecto
                    filtrado = 2; //asigna un valor al tipo de filtrado, por el cual mostrará solo los eventos finalizados
                    cargaCalendario();//reinicia el calendario
                } else {
                    filtrar = true; //cambia el valor a la opcion de filtrado, haciendo que use las fechas seleccionadas en vez de las de por defecto
                    filtrado = 3; //asigna un valor al tipo de filtrado, por el cual mostrará tanto los eventos pendientes y finalizados
                    cargaCalendario();//reinicia el calendario
                }
            }
        } else { //si alguna de las fechas no ha sido seleccionada, muestra una alerta
            alert("Selecciona fecha de inicio y fin para realizar una busqueda");

        }

    });
    $("#limpiar-filtro").on("click", function () {//deshace los filtros de fechas aplicados, y vuelve a los valores por defecto, 
        filtrar = false; 
        filtrado = 0;
        cargaCalendario();//reinicia el calendario
    });
}


