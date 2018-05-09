
// Init calendar full
function cargaCalendario() {
    $('.consultia-events-calendar.full').html("");
    if (jQuery('.consultia-events-calendar.full').length) {
        jQuery('.consultia-events-calendar.full').html('<div class="events-calendar-bar">'
                + '<div class="btn-cambio-interfaz"><button class=" btn btn-primary calendar-view calendar-btn boton-oculto calendar-bar__item active"><i class="far fa-calendar-alt"></i>&nbsp;' + calendar_view + '</button>'
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
                + ' <input placeholder="Fecha fin" type="text" id="endingDate" class="form-control datepicker">'
                + '  <label for="endingDate"></label>'
                + '  </div>'

                + ' </div>'
                + ' <!--Grid column-->'

                + ' </div>'
                + ' <!--Grid row-->'
                //         + '<span class="bar-btn back-calendar pull-right active"><i class="fa fa-caret-left"></i>' + back + '</span>'
                + '<div class="btn-cambio-filtro"><button id="filtro-fechas" class="btn btn-primary  calendar-bar__item"><i class="fas fa-search"></i>&nbsp;Buscar</button>'
                + '<button id="limpiar-filtro" class="btn btn-primary  calendar-bar__item"><i class="fas fa-undo-alt"></i></i>&nbsp;Deshacer</button></div>'
                + '</div>'
                + '<div class="cleardiv"></div>'
                + '<div class="consultia-events-calendar-wrap">'
                + '<div class="consultia-calendar-full consultia-calendar"></div>'
                + '<div class="consultia-event-list-full consultia-event-list"></div>'
                + '</div>'
                );
    }

// Init calendar compact
    if (jQuery('.consultia-events-calendar.compact').length) {
        jQuery('.consultia-events-calendar.compact').html('<div class="events-calendar-bar">'
                + '<span class="bar-btn calendar-view calendar-btn active"><i class="far fa-calendar-alt"></i>' + calendar_view + '</span>'
                + '<span class="bar-btn list-view calendar-btn"><i class="fa fa-list"></i>' + list_view + '</span>'
                //          + '<span class="bar-btn back-calendar pull-right active"><i class="fa fa-caret-left"></i>' + back + '</span>'
                + '</div>'
                + '<div class="cleardiv"></div>'
                + '<div class="consultia-events-calendar-wrap">'
                + '<div class="consultia-calendar-compact consultia-calendar"></div>'
                + '<div class="consultia-event-list-compact consultia-event-list"></div>'
                + '</div>'
                );
    }

// Show - Hide view

    jQuery('.consultia-event-list').hide();


    jQuery('.consultia-events-calendar').each(function (index) {
        // Hide switch button
        var switch_button = (typeof jQuery(this).attr('data-switch') !== "undefined") ? jQuery(this).attr('data-switch') : 'show';
        if (switch_button === 'hide') {
            jQuery(this).find('.calendar-view').hide();
            jQuery(this).find('.list-view').hide();

            // Change css of button back
            jQuery(this).find('.events-calendar-bar').css('position', 'relative');
            //    jQuery(this).find('.back-calendar').css({"position": "absolute", "margin-top": "15px", "right": "15px"});
        }
    });

    // Set wordDay 
    date_start = (typeof jQuery('.consultia-events-calendar').attr('data-start')
            !== "undefined") ? jQuery('.consultia-events-calendar').attr('data-start') : 'monday'; //TODO: SELECTOR DE FORMATO PRIMER DÍA SEMANA
    if (date_start === 'sunday') {
        wordDay = new Array(wordDay_sun, wordDay_mon, wordDay_tue, wordDay_wed, wordDay_thu, wordDay_fri, wordDay_sat);
    } else { // Start with Monday
        wordDay = new Array(wordDay_mon, wordDay_tue, wordDay_wed, wordDay_thu, wordDay_fri, wordDay_sat, wordDay_sun);
    }
    consultia_events = []; //resetea los eventos, para que no se acumulen al realizar filtrados
    if (filtrar) {

        var url = "http://192.168.0.250:5556/api/Calendario?idUsuario=2&FechaInicio=" + rangoFechaIni + "&FechaFin=" + rangoFechaFin;
    } else {
        var url = "http://192.168.0.250:5556/api/Calendario?idUsuario=2&FechaInicio=" + fechaIniDefault + "&FechaFin=" + fechaFinDefault;
    }
    filtrar = false;



    promesaDatos = parametrosCabeceraAjax(url);
    $.when(promesaDatos).done(function (entradas) {
//            jQuery.ajax({
//
//                url: url,
//                dataType: 'JSON',
//                type: "GET",
//                beforeSend: function () {
//                    jQuery('.consultia-calendar').html('<div class="loading"><img src="assets/images/loading.gif" /></div>');
//                },
//                error: function (status, message)
//                {
//                    alert('A jQuery error has occurred. Status: ' + status + ' - Message: ' + message);
//                },
//                success: function (entradas) {

        diccionarioLogos = entradas.DiccionarioLogos; //array 

        j = -1; //contador para asignar las IP a los eventos
        entradas.Pedidos.forEach(function (entrada) {
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

            consultia_events.push(evento);


        }); //forEach entrada

        consultia_events.sort(sortEventsByDate);
        for (var i = 0; i < consultia_events.length; i++) {
            consultia_events[i].id = i;
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


        jQuery('.consultia-events-calendar').each(function (index) {
            // Initial view
            var initial_view = (typeof jQuery(this).attr('data-view') !== "undefined") ? jQuery(this).attr('data-view') : 'calendar';
            if (initial_view === 'list') {
                jQuery(this).find('.list-view').click();
            }
        });

    });
//    }

// Click - Calendar view btn
    jQuery('.consultia-events-calendar .calendar-view').click(function () {
        //   jQuery(this).parents('.consultia-events-calendar').find('.back-calendar').hide();
        jQuery(this).parents('.consultia-events-calendar').find('.consultia-event-list').hide();
        jQuery(this).parents('.consultia-events-calendar').find('.consultia-calendar').fadeIn(500);

        jQuery(this).parents('.consultia-events-calendar').find('.list-view').removeClass('active');
        jQuery(this).parents('.consultia-events-calendar').find('.calendar-view').addClass('active');
        returnView = "calendario";
    });

// Click - List view btn
    jQuery('.consultia-events-calendar .list-view').click(function () {
        //  jQuery(this).parents('.consultia-events-calendar').find('.back-calendar').hide();
        jQuery(this).parents('.consultia-events-calendar').find('.consultia-calendar').hide();
        jQuery(this).parents('.consultia-events-calendar').find('.consultia-event-list').fadeIn(500);

        jQuery(this).parents('.consultia-events-calendar').find('.calendar-view').removeClass('active');
        jQuery(this).parents('.consultia-events-calendar').find('.list-view').addClass('active');
        returnView = "lista";
        showEventList();

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
