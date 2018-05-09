

function showEventDetail(id) {
    var pais = "";
    var ciudad = "";

    var ventana_modal = '<div class="modal fade" id="fichaDetalle" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
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
    $("#espacioModal").append(ventana_modal);

//RELLENAR Y MOSTRAR VENTANA MODAL 

    //Limpiar html antes de coger los datos:

    document.getElementById("descripcion").innerHTML = "";
    document.getElementById("compartecon").innerHTML = "";
    document.getElementsByClassName("iconos")[0].innerHTML = "";
    $("div.logo img").remove(); //elimina cualquier imagen anyadida como child para el logo
    icsDescription = ""; //limpiar variable global ICS
 
//BLOQUE COMÚN PARA CUALQUIER TIPO RESERVA
    var tipoReserva = consultia_events[id]._tipo;
    var colorfondo = consultia_events[id].color;

    //fechas para calcular rangos de días
    fechaInicioViaje = consultia_events[id]._fechaInicio;
    hoy = new Date();
    diasDif = diferenciaDiasClima(hoy, fechaInicioViaje); //diferencia entre hoy y la fecha inicio viaje (para clima y para seguimiento vuelo)

    //Coordenadas origen
    var lat = consultia_events[id]._latitudOrigen;
    var lon = consultia_events[id]._longitudOrigen;

    // Coordenadas destino (clima)
    var latDestino = consultia_events[id]._latitudDestino;
    var lonDestino = consultia_events[id]._longitudDestino;

    var coordenadas = lat + "%20" + lon;

    //Ubicación en sección Mapa
    var ubicacion = consultia_events[id]._ubicacion;
    document.getElementById("ubicacion").innerHTML = "<h5 class='p5 modaltext'>" + ubicacion + "</h5>";
    document.getElementById("verMapa").addEventListener("click", function () {

        if (tipoReserva === "Aereo") {
            window.open(' https://www.google.com/maps/dir/?api=1&origin=' + lat + ',' + lon + '&destination=' + latDestino + ',' + lonDestino + '&travelmode=fly');
        } else if (tipoReserva === "Tren") {
            window.open(' https://www.google.com/maps/dir/?api=1&origin=' + lat + ',' + lon + '&destination=' + latDestino + ',' + lonDestino + '&travelmode=transit&mode[]=train');
        } else if (tipoReserva === "Barco") {
        } else {
            window.open('http://maps.google.es/?q=' + coordenadas);
        }
        ;
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

    //BLOQUE ICS
        //creación de la cadena de texto para el contenido del archivo ICS
        var icsFormat =
                'BEGIN:VCALENDAR\n' +
                'PRODID:-//Schedule a Meeting\n' +
                'VERSION:2.0\n' +
                'METHOD:REQUEST\n' +
                'BEGIN:VEVENT\n' +
                'DTSTART:' + consultia_events[id]._fechaInicio.replace("-", "") + '\n' +
                'DTSTAMP:' + consultia_events[id]._fechaInicio.replace("-", "") + '\n' +
                'DTEND:' + consultia_events[id]._fechaFin.replace("-", "") + '\n' +
                'LOCATION:' + consultia_events[id]._ubicacion + '\n' +
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
        if (detectIE()) {
            //eliminamos el atributo 'download' al vínculo (el atributo aparece en cada evento click de una reserva de viaje)
            document.getElementsByClassName('descargaics')[0].removeAttribute('download');

            if (window.navigator.msSaveBlob) {
                //generamos el objeto blob (equivalente a un archivo)
                var blob = new Blob([icsFormat]);
                //asignamos evento al vínculo para descarga
                document.getElementsByClassName('descargaics')[0].onclick = function () {

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
            if(pais ==="España"){
                alert("No hay recomendaciones para viajes en España");
            }else{
            buscarPais = "recomendaciones+viaje+" + pais + "&btnI"; // usamos google "im feeling lucky" para acceder a una buscada y abrir el primer resultado
            window.open('http://www.google.com/search?q=' + buscarPais);
        }
        });

    });
    //Colorear cabecera ventana según tipo reserva
    var item = document.getElementById("asunto").classList.item(1); //si la selección está fuera de rango devuelve 'null'
    document.getElementById("asunto").classList.remove(item); //eliminar 'null' no da errores en consola
    document.getElementById("asunto").classList.add("color-" + colorfondo);
    document.getElementById("linea").classList.add("color-" + colorfondo);

    //Fechas salida-llegada / origen-destino
    var fechaInicioEvento = consultia_events[id].day + "/" + consultia_events[id].month + "/" + consultia_events[id].year; //formato dd/mm/aaaa
    var fechaFinEvento = consultia_events[id]._diaFin + "/" + consultia_events[id]._mesFin + "/" + consultia_events[id]._anyoFin;
    document.getElementById("fecha-o").innerHTML = fechaInicioEvento;
    document.getElementById("fecha-d").innerHTML = fechaFinEvento;

    //Variables para las horas
    var horaOrigen = consultia_events[id].time; //siempre hora inicio
    var horaDestino = consultia_events[id]._horaFin;
    var avisoHorario = "NOTA: La hora mostrada corresponde a la hora local en cada país.";

    //Localizador de la reserva
    var localizadorReserva = consultia_events[id]._localizador;
    document.getElementById("localizador").innerHTML = "<h5 class='destacado modaltext'>LOCALIZADOR RESERVA: " + localizadorReserva + "</h5>";

    //A continuación se llamará a una función para tratar el asunto correctamente según el tipo de reserva 
    document.getElementById("asunto").innerHTML = formatCabecera(consultia_events[id].name, tipoReserva, "modal", null);

//BLOQUES PARTICULARIDADES POR TIPO DE RESERVA          
    if (tipoReserva === "Aereo") {

        var codigoV = consultia_events[id]._NVuelo;
        var companyiaAerea = codigoV.split("-"); //vector con [0] codigo companyia y con [1] numero vuelo, por si hay que usarlo para los logos

        codigoV = codigoV.replace("-", ""); //para buscador google el código debe salir sin slash

        if (diccionarioLogos.length > 0) {
            for (var i = 0; i < diccionarioLogos.length; i++) {
                if (companyiaAerea[0] == diccionarioLogos[i].IATA) {
                    logoAerolinea = diccionarioLogos[i].Logo;
                    $('.logo').append("<img src='" + logoAerolinea + "' alt='Logo-Aerolinea'>");
                }
            }
        } else {
            $('.logo').append("<img src='assets/images/Consultia.png' alt='Logo-Aerolinea'>");
        }


        //Búsqueda vuelo google
        document.getElementById("googlesearchvuelo").style.display = "block";

        //funcionalidad botón seguimiento vuelo online google
        var fechaInicioVuelo = new Date(fechaInicioViaje); //obtener la fecha en formato válido para utilizar .toLocaleDateString()
        var options = {month: 'short', day: 'numeric'}; //mes corto y día númerico
        var fechaConsultaVuelo = fechaInicioVuelo.toLocaleDateString('es', options); //en español
        fechaConsultaVuelo = fechaConsultaVuelo.replace(".", " "); //ejemplo formato de salida:  12 abr 

        var q = codigoV + " " + fechaConsultaVuelo;

        document.getElementById("googlesearchvuelo").onclick = function () {

            if ((diasDif >= 0) && (diasDif <= 2)) {
                window.open('http://www.google.com/search?q=' + q);

            } else if (diasDif < -1) {
                variableAviso = '<div class="toast-text">La fecha del vuelo es anterior. Información no disponible.</div>';
                showInfoFlightWarning(variableAviso);

            } else {
                variableAviso = '<div class="toast-text">La fecha del vuelo es demasiado lejana. Información no disponible.</div>';
                showInfoFlightWarning(variableAviso);
            }


        };

        //nombre aerolinea ESTE CAMPO ES INDEPENDIENTE DEL IDPROVEEDOR (NO SE DISPONE DICCIONARIO DE AEROLINEAS)
        var aerolinea = consultia_events[id]._Aerolinea;

        //Bloque horarios
        var salidaIata = consultia_events[id]._SalidaIATA;
        var llegadaIata = consultia_events[id]._LlegadaIATA;

        document.getElementById("ciudad-o").innerHTML = consultia_events[id]._ciudadOrigen + " (" + salidaIata + ")";
        document.getElementById("hora-o").innerHTML = horaOrigen;
        document.getElementById("ciudad-d").innerHTML = consultia_events[id]._ciudadDestino + " (" + llegadaIata + ")";
        document.getElementById("hora-d").innerHTML = horaDestino;

        //Bloque descripción
        var aeropuertoSalida = consultia_events[id]._AeropuertoSalida;
        var aeropuertoLlegada = consultia_events[id]._AeropuertoLlegada;
        var duracionHoras = consultia_events[id]._DuracionHoras;
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
                ' Número Vuelo: ' + codigoV + '\\n' +
                ' Duración: ' + horas + ' horas y ' + minutos + ' minutos.\\n\\n' +
                ' SALIDA_________________________________________\\n\\n' +
                ' Fecha y Hora de Salida: ' + fechaInicioEvento + " " + horaOrigen + '\\n' +
                ' Aeropuerto: ' + salidaIata + " - " + aeropuertoSalida + '\\n\\n' +
                ' LLEGADA________________________________________\\n\\n' +
                ' Fecha y Hora de Llegada: ' + fechaFinEvento + " " + horaDestino + '\\n' +
                ' Aeropuerto: ' + llegadaIata + " - " + aeropuertoLlegada + '\\n\\n' +
                avisoHorario + '\n' +
                'SUMMARY: VUELO: ' + fechaInicioEvento + " " + horaOrigen + " " + aeropuertoSalida + " --> " + fechaFinEvento + " " + horaDestino + " " + aeropuertoLlegada + '\n' +
                'ORGANIZER:MAILTO:avisos@consultiatravel.es\n' +
                'ATTENDEE;CN=" Nombre del viajero principal ";RSVP=TRUE:mailto:jm.rubio@consultiatravel.es\n';

    } else if (tipoReserva === "Hotel") { //POSIBLE IF o SWITCH CON TODAS LAS OPCIONES QUE DIFIERAN

        document.getElementById("googlesearchvuelo").style.display = "none";
        document.getElementById("ciudad-o").innerHTML = "ENTRADA";
        document.getElementById("ciudad-d").innerHTML = "SALIDA";
        document.getElementById("hora-o").innerHTML = "14:00 aprox.";   //consultia_events[id].time
        document.getElementById("hora-d").innerHTML = "12:00 aprox."; //consultia_events[id]._horaFin
        //
        //Bloque descripción
        var nombreHotel = consultia_events[id]._nombreHotel;
        var direccionHotel = consultia_events[id]._direccion;
        var regimen = consultia_events[id]._regimen;
        var tipoHabitacion = consultia_events[id]._tipohabita;
        var acompanyantes = consultia_events[id]._acompanyantes;
        //TODO: Obtención de la ciudad a partir de la dirección postal que viene de base datos PROVISIONAL
        var laCiudad = direccionHotel.split(',');
        laCiudad = laCiudad[laCiudad.length - 2];

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
                ' Dirección: ' + direccionHotel + '\\n' +
                ' Régimen: ' + regimen + '\\n' +
                ' Tipo habitación: ' + tipoHabitacion + '\\n\\n' +
                ' ENTRADA_________________________________________\\n\\n' +
                ' Fecha: ' + fechaInicioEvento + '\\n\\n' +
                ' SALIDA________________________________________\\n\\n' +
                ' Fecha: ' + fechaFinEvento + '\\n\\n' +
                avisoHorario + '\n' +
                'SUMMARY: HOTEL EN: ' + laCiudad + " " + fechaInicioEvento + " " + horaOrigen + " --> " + fechaFinEvento + " " + horaDestino + '\n' +
                'ORGANIZER:MAILTO:avisos@consultiatravel.es\n' +
                'ATTENDEE;CN=" Nombre del viajero principal ";RSVP=TRUE:mailto:jm.rubio@consultiatravel.es\n';

    } else if (tipoReserva === "Coche") {
        //logo coches
        var codigoRent = consultia_events[id]._idProveedor; //string con el código
        var proveedor = "";

        info_cars.forEach(function (agencia) {


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

        var acompanyantes = consultia_events[id]._acompanyantes;
        var html = "";
        for (i = 0; i < acompanyantes.length; i++) {
            html += "<h5 class='modaltext'>Acompañante " + (i + 1) + ": " + acompanyantes[i].Nombre + "</h5>";
        }
        //Bloque Descripción
        var categoria = consultia_events[id]._categoria;
        var transmision = consultia_events[id]._transmision;
        var combustible = consultia_events[id]._combustible;
        var direccionRecogida = consultia_events[id]._direccionRecogida;
        var direccionEntrega = consultia_events[id]._direccionEntrega;

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
                ' Categoría: ' + categoria + '\\n' +
                ' Transmisión: ' + transmision + '\\n' +
                ' Combustible: ' + combustible + '\\n\\n' +
                ' RECOGIDA_________________________________________\\n\\n' +
                ' Fecha: ' + fechaInicioEvento + '\\n' +
                ' Hora recogida: ' + horaOrigen + '\\n' +
                ' Dirección: ' + direccionRecogida + '\\n\\n' +
                ' ENTREGA________________________________________\\n\\n' +
                ' Fecha: ' + fechaFinEvento + '\\n' +
                ' Hora entregas: ' + horaDestino + '\\n' +
                ' Dirección: ' + direccionEntrega + '\\n\\n' +
                avisoHorario + '\n' +
                'SUMMARY: COCHE: ' + fechaInicioEvento + " " + horaOrigen + " --> " + fechaFinEvento + " " + horaDestino + '\n' +
                'ORGANIZER:MAILTO:avisos@consultiatravel.es\n' +
                'ATTENDEE;CN=" Nombre del viajero principal ";RSVP=TRUE:mailto:jm.rubio@consultiatravel.es\n';

    } else if (tipoReserva === "Tren") {
        //logo renfe

        var estacionOrigen = consultia_events[id]._EstacionOrigen;
        var estacionDestino = consultia_events[id]._EstacionDestino;
        document.getElementById("googlesearchvuelo").style.display = "none";
        document.getElementById("ciudad-o").innerHTML = estacionOrigen;
        document.getElementById("hora-o").innerHTML = horaOrigen;
        document.getElementById("ciudad-d").innerHTML = estacionDestino;
        document.getElementById("hora-d").innerHTML = horaDestino;

        //bloque descripción
        var proveedor = consultia_events[id]._idProveedor; //ahora viene un entero para el código proveedor
        if (proveedor == 3) {
            proveedor = "Renfe";
            $('.logo').append("<img src='assets/images/img_proveedores/Renfe.svg' alt='Logo-renfe'>"); //de momento sólo hay Logo de Renfe
        } else {
            $('.logo').append("<img src='assets/images/img_proveedores/logo_tren_generico.png' alt='Logo-renfe'>");
        }
        var tipotren = consultia_events[id]._TipoTren;
        var clase = consultia_events[id]._Clase;
        var DireccionOrigen = consultia_events[id]._DireccionOrigen;
        var DireccionDestino = consultia_events[id]._DireccionDestino;

        document.getElementById("descripcion").innerHTML = "<h5 class='destacado modaltext'>Proveedor: " + proveedor +
                "</h5><h5 class='destacado modaltext'>Tipo de Tren: " + tipotren +
                "</h5><h5 class='modaltext'>Clase: " + clase + "</h5>" +
                "<h5 class='destacado modaltext'>Estación de SALIDA: " + estacionOrigen + "</h5>" +
                "<h5 class='modaltext'>Dirección: " + DireccionOrigen + "</h5>" +
                "<h5 class='destacado modaltext'>Estación de LLEGADA: " + estacionDestino + "</h5>" +
                "<h5 class='modaltext'>Dirección: " + DireccionDestino + "</h5>" +
                "<h6 class='modaltext'> <span class='highlight-color'>" + avisoHorario + "</span></h6>";

        //Bloque descripción ICS
        icsDescription =
                'DESCRIPTION: Tiene una reserva de TREN para el ' + fechaInicioEvento + ' con los siguientes detalles: \\n\\n' +
                ' Localizador: ' + localizadorReserva + '\\n' +
                ' Compañía: ' + proveedor + '\\n' +
                ' Tipo Tren: ' + tipotren + '\\n' +
                ' Clase: ' + clase + '\\n\\n' +
                ' SALIDA_________________________________________\\n\\n' +
                ' Fecha: ' + fechaInicioEvento + '\\n' +
                ' Hora Salida: ' + horaOrigen + '\\n' +
                ' Estación origen: ' + estacionOrigen + '\\n' +
                ' Dirección: ' + DireccionOrigen + '\\n\\n' +
                ' LLEGADA________________________________________\\n\\n' +
                ' Fecha: ' + fechaFinEvento + '\\n' +
                ' Hora Llegada: ' + horaDestino + '\\n' +
                ' Estación destino: ' + estacionDestino + '\\n' +
                ' Dirección: ' + DireccionDestino + '\\n\\n' +
                avisoHorario + '\n' +
                'SUMMARY: TREN: ' + fechaInicioEvento + " " + horaOrigen + " " + estacionOrigen + " --> " + fechaFinEvento + " " + horaDestino + " " + estacionDestino + '\n' +
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
        var proveedor = consultia_events[id]._proveedor;
        var origen = consultia_events[id]._origen;
        var destino = consultia_events[id]._destino;
        document.getElementById("ciudad-o").innerHTML = origen;
        document.getElementById("ciudad-d").innerHTML = destino;
        var acomodacion = consultia_events[id]._acomodacion;
        var vehiculos = consultia_events[id]._vehiculos;
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
                ' Acomodación: ' + acomodacion + '\\n' +
                ' Vehículos a bordo: ' + vehiculos.length + '\\n\\n' +
                ' SALIDA_________________________________________\\n\\n' +
                ' Fecha: ' + fechaInicioEvento + '\\n' +
                ' Origen: ' + origen + '\\n\\n' +
                ' LLEGADA________________________________________\\n\\n' +
                ' Fecha: ' + fechaFinEvento + '\\n' +
                ' Destino: ' + destino + '\\n\\n' +
                avisoHorario + '\n' +
                'SUMMARY: BARCO: ' + fechaInicioEvento + " " + horaOrigen + " " + origen + " --> " + fechaFinEvento + " " + horaDestino + " " + destino + '\n' +
                'ORGANIZER:MAILTO:avisos@consultiatravel.es\n' +
                'ATTENDEE;CN=" Nombre del viajero principal ";RSVP=TRUE:mailto:jm.rubio@consultiatravel.es\n';

    } else if (tipoReserva === "Otros") {
        document.getElementById("googlesearchvuelo").style.display = "none";
        //TODO: por determinar la estructura y optimización en general
    }


    //GESTIÓN DE LOS ADJUNTOS

    if (consultia_events[id]._adjuntos !== null) { //el campo Adjuntos o es null o es un array con una posición mínimo

        var adjuntos = "";
        var numdocs = consultia_events[id]._adjuntos.length;

        for (n = 0; n < numdocs; n++) {
            var tipodoc = consultia_events[id]._adjuntos[n].Tipo.toLowerCase(); //cada imagen de tipo de documento tendrá el nombre del tipo y la misma extensión (png en este caso)
            var idadjunto = consultia_events[id]._adjuntos[n].idAdjunto;
            var nombreAdjunto = consultia_events[id]._adjuntos[n].Nombre;


            if (detectIE()) {
                //el vínculo se generará sin el atributo 'download'
                adjuntos += '<a id="' + idadjunto + '" class="linkadjunto mimeType" title="' + nombreAdjunto + '"><img class="" src="assets/images/' + tipodoc + '.png" alt="" ></a>';

            } else {

                adjuntos += '<a id="' + idadjunto + '" class="linkadjunto mimeType" title="' + nombreAdjunto + '" download="' + nombreAdjunto + '.' + tipodoc + '"><img class="" src="assets/images/' + tipodoc + '.png" alt="" ></a>';
            }

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

                        var cuatroDigitosCadena = churro.substring(0, 4);

                        //Si el String que devuelve la API de adjuntos no es del tipo data:[mime-type];base64;[...]
                        if (cuatroDigitosCadena !== 'data') {

                            //mensaje error personalizable
                            var mensajeErrorAdjunto = 'Ha habido un problema con el archivo.';
                            //anyadir clase para que modifique el tipo de cursor a 'prohibido'
                            $('#' + numadjunto).addClass('cursor-not-allowed');
                            //modificar el mensaje al acercar el ratón por encima de la imagen del adjunto
                            document.getElementById(numadjunto).setAttribute('title', mensajeErrorAdjunto);


                        } else {
                            //Sacar el content-type y asignarlo a variable para parámetro de la función b64toBlob
                            var arrayString = churro.split(":"); //genera un array de 2 elementos, 'data' y el resto del churro 
                            var contentType = arrayString[1].split(";");  //genera un array de 2 elementos, el primero es el content-type y el segundo es  'base64,stringchurro'
                            var content_type = contentType[0];

                            //Sacar el string en base64 para pasarlo por parámetro a la función b64b64toBlob()
                            var arrayBase64 = contentType[1].split(',');
                            var stringBase64 = arrayBase64[1];  //string en base64 


                            //Detectado IE 
                            if (detectIE()) {


                                if (window.navigator.msSaveBlob) {

                                    //generamos el objeto blob a partir del String en base64 (churro) con la función b64toBlob
                                    // var blob = b64toBlob(churro, 'application/pdf'); //TODO: AVERIGUAR POR QUÉ HA FUNCIONADO CON EL EXCEL SI LOS PARÁMETROS NO SON LOS QUE ESPERA LA FUNCIÓN
                                    var blob = b64toBlob(stringBase64, content_type);

                                    //asignamos evento al vínculo para que se descargue al click
                                    $('#' + numadjunto).on('click', function () {

                                        window.navigator.msSaveBlob(blob, 'Adjunto_' + numadjunto + '.' + tipodoc);

                                    });

                                }

                            } else {
                                //Navegadores distintos de IE se anyade el atributo href con el valor del String base64

                                var blob = b64toBlob(stringBase64, content_type);

                                var descargarAdjunto = URL.createObjectURL(blob);

                                $('#' + numadjunto).attr("href", descargarAdjunto);

                            }
                        }

                    },
                    error: function () {
                        console.log("Se ha producido un error API adjuntos u otra causa.");
                    }


                });

            });

        });


    } else if (consultia_events[id]._adjuntos === null) {

        document.getElementById("docs").innerHTML = "No hay adjuntos que mostrar.";
    }

    //GESTIÓN DE LOS DATOS DEL CLIMA EN DESTINO/UBICACIÓN

    if (latDestino !== null && lonDestino !== null) {
        var urlclima = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + latDestino + '&lon=' + lonDestino + '&lang=es&units=metric&APPID=eb49663a0809388193782a1fa7698518&cnt=40';  //cnt es la cantidad de líneas (máximo 40 para el plan gratuito suscrito)


        //Asignar evento al botón del clima
        $("#info-clima").on('click', function () {
            $('.iconos').html("");
            //caso1: si la diferencia es menor de 5 días anteriores a hoy, pero el evento dura como mínimo hasta hoy //caso2: eventos con fecha inicio desde hoy hasta 5 días después  //caso3: eventos con fechas inicio anteriores 5 días desde hoy cuya duración llega hasta hoy (hoy es primer día previsión meteo)
            if (((diasDif >= -5) && (consultia_events[id].duration >= Math.abs(diasDif))) || ((diasDif <= 5) && (diasDif >= 0)) || ((diasDif < -5) && (consultia_events[id].duration >= Math.abs(diasDif)))) {

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

                        datosClima.list.forEach(function (medicion) {
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
                                var cod = codClima.charAt(0);
                                if (cod === '8') {
                                    codClima = codClima.replace('8', '1');
                                }

                                var intId = parseInt(codClima);
                                array_id_meteo.push(intId); //construye un array (para cada día) con los id asociados a los iconos/descripción para ese día
                            }

                            maximo = Math.max.apply(null, array_id_meteo); //obtencion máximo en el array de ids (para cada día)

                            var descripcion = "";
                            icono_meteo = "";

                            info_meteoro.forEach(function (medicion) {
                                if (medicion.id == maximo) {
                                    descripcion = medicion.descripcion;
                                    icono_meteo = medicion.icono;

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
                        }

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

