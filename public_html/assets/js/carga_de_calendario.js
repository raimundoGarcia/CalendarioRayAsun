/**
 * @description Crea el inteface de el calendario, y carga todos los datos (es el CORE de el servicio web)
 * @returns {undefined}
 */
// Init calendar full
function cargaCalendario() {
    $('.consultia-events-calendar.full').html(""); //borra el calendario para no apilar varios
    if (jQuery('.consultia-events-calendar.full').length) { //crea la barra de navegación y los div contenedores de la lista y el calendario
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

// Show - Hide view

    jQuery('.consultia-event-list').hide(); //oculta el listado de eventos al iniciar


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
        wordDay = new Array(wordDay_sun, wordDay_mon, wordDay_tue, wordDay_wed, wordDay_thu, wordDay_fri, wordDay_sat); //array con listado de dias
    } else { // Start with Monday
        wordDay = new Array(wordDay_mon, wordDay_tue, wordDay_wed, wordDay_thu, wordDay_fri, wordDay_sat, wordDay_sun); //array con listado de dias
    }
    consultia_events = []; //resetea los eventos, para que no se acumulen al realizar filtrados
    if (filtrar) {
        //url para solicitar los eventos
        var url = "http://192.168.0.250:5556/api/Calendario?idUsuario=2&FechaInicio=" + rangoFechaIni + "&FechaFin=" + rangoFechaFin; //ruta utilizada al introducir un rango de fechas
    } else {
        var url = "http://192.168.0.250:5556/api/Calendario?idUsuario=2&FechaInicio=" + fechaIniDefault + "&FechaFin=" + fechaFinDefault;  //ruta utilizada por defecto
    }
    filtrar = false; //reinicia el tipo de filtrado a por defecto despues de cada busqueda



    promesaDatos = parametrosCabeceraAjax(url); //petidición a la Api guardando los datos en "promesaDatos"
    $.when(promesaDatos).done(function (entradas) { //promesa con petición a la API de eventos

        diccionarioLogos = entradas.DiccionarioLogos; //array con el listado de logos de empresas
      

        entradas.Pedidos.forEach(function (entrada) {

            tipo = entrada.Tipo;

            // Asigna un color a cada evento, dependiendo del tipo de evento 
            color = colorAsignado(tipo);

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

            // substring a las fechas de entrada para obtener la hora y minutos en formato "2018-04-04T20:25+02:00"
            var event_date = new Date(evento.year, Number(evento.month) - 1, evento.day, entrada.FechaInicio.substring(11, 13), entrada.FechaInicio.substring(14, 16));

            evento.date = event_date.getTime(); //confierte la fecha en un número entero

            consultia_events.push(evento); // añade el evento a el listado principal de eventos


        }); //forEach entrada

        consultia_events.sort(sortEventsByDate); //ordena los eventos por fecha 
        for (var i = 0; i < consultia_events.length; i++) {
            consultia_events[i].id = i; //asigna un id a cada evento despues de ordenarlo
        }


// Create calendar en el mes actual
        changedate('current');

        if ($(window).width() <= resolucionMinimaCalendario) {  // da prioridad a la lista, y no muestra el calendario a partir de la resolucion absoluta X, en este caso 600px 
            $(".list-view").click();
            returnView = "lista";

        } else {
            $(".calendar-btn").removeClass("boton-oculto"); /* remueve la clase boton oculto en resoluciones superiores a X, para que tenga la opcion de cambiar 
             el tipo de vista entre calendario o vista */
            if (returnView === "lista") {
                $(".list-view").click(); //emula un click en el boton mostrar lista
            } else {
                $(".calendar-view").click(); //emula un click en el boton mostrar calendario
            }
        }


        jQuery('.consultia-events-calendar').each(function (index) {
            // Initial view
            var initial_view = (typeof jQuery(this).attr('data-view') !== "undefined") ? jQuery(this).attr('data-view') : 'calendar'; //define la vista inicial del calendario, 
            if (initial_view === 'list') {                                                                                            // para cambiarlo a lista poner "list" en vez de calendar
                jQuery(this).find('.list-view').click(); //emula un click en el boton mostrar lista
            }
        });

    });
//    }



// Carga controles del DataPicker (al final de la carga completa del calendario)
    controlesDataPicker();
    //carga los controles de los botones de la barra de navegación
    botonesNavVar();



}
