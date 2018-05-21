

/**
 * Método que muestra en el navegador una ventana modal con información detallada 
 * sobre un evento del calendario. Asociado al click sobre un evento concreto tanto en la vista de calendario
 * como en la vista de listado.
 * @param {integer} id, número entero que identifica a un evento dentro del array de eventos totales consultia_events[] o el array diario events[]
 * @returns {undefined}
 * @see previsionMeteo(id,latDestino,lonDestino,diasDif), mostrarAdjuntosEvento(id), 
 * mostrarInfoInteresDestino(latDestino, lonDestino), mostrarMapa(id,lat,lon,latDestino,lonDestino,tipoReserva), 
 * descargaICS(id), seguimientoVueloGoogle(codigoV)
 */

function showEventDetail(id) {
   //inicialización de variables que serán usadas en algunos de los métodos llamados dentro de esta función
  
    //variable global ICS 
    icsDescription = ""; 
    //TODO: Obtener nombre y email del viajero principal
     //ELIMINAR LAS DOS VARIABLES FIJAS A CONTINUACIÓN CUANDO SE MODIFIQUE LA INFO QUE VIENE DE API
     var nombreViajeroPrincipal = 'Nombre Viajero Principal';
     var emailViajeroPrincipal = 'jm.rubio@consultia.es';
    //DETERMINAR EL VIAJERO PRINCIPAL PARA LA DESCRIPCIÓN EN EL BLOQUE ICS
    
    //for (i = 0; i < viajeros.length; i++) {
    //CUANDO EL CAMPO QUE INDICA SI ES VIAJERO PRINCIPAL SEA TRUE
//            if(viajeros[i].campoboolean){  //campoboolean debe corresponder con el nombre del campo que vendrá de la respuesta API
//                var nombreViajeroPrincipal = viajeros[i].Nombre;
//                var emailViajeroPrincipal = viajeros[i].Email;
                            
//            }
            
//        }
    
    //estructura de la ventana modal
    var ventana_modal = '<div class="modal fade" id="fichaDetalle" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
                        '            <div class="modal-dialog modal-lg" role="document">' +
                                        
            '                <!--Content-->' +
            '                <div class="modal-content">' +
            '                       <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
            '                            <span aria-hidden="true">&times;</span>'  +
            '                        </button>' +
            '                    <!--Header-->' +
            '                    <div id="asunto" class="modal-header">' +
            '                        <h4 class="modal-title w-100 modaltext"></h4>' +
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
            '                                <a  href="#iconos" id="info-clima" class=" btn btn-success textoboton"><i class="fas fa-cloud"></i> Meteorología</a><br/>' +
            '                                <div  class="iconos"></div>' +
            '                                <br/>' +
            '                                <button id="info-lugar" class=" btn btn-success textoboton "><i class="fas fa-info-circle"></i> Información adicional</button>' +
            '                            </div>' +
            '                            <div id="adjuntos" class="adjuntos">' +
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
            '           <button id="myBtnM" title="Go to top"><i class="fas fa-angle-up"></i></button>'+
            '        </div>';
    //limpiar el html y anyadir la ventana al index.html
    $("#espacioModal").html("");
    $("#espacioModal").append(ventana_modal);
    
    //RELLENAR Y MOSTRAR VENTANA MODAL 
    
    //BOTÓN 'SCROLL TO TOP' DE LA VENTANA DETALLE
    document.getElementById('fichaDetalle').addEventListener('scroll', function(){
        if($('#fichaDetalle').scrollTop()>500){
            document.getElementById('myBtnM').style.display = 'block';
        }
    });
    document.getElementById('myBtnM').onclick = function(){
        $("#fichaDetalle").scrollTop(0);
        document.getElementById('myBtnM').style.display = 'none';
    };
    
    //BLOQUE COMÚN PARA CUALQUIER TIPO RESERVA
    //obtener el tipo de reserva 
    var tipoReserva = consultia_events[id]._tipo;
    //obtener el color de fondo
    var colorfondo = consultia_events[id].color;
    //Colorear cabecera ventana según tipo reserva
    document.getElementById("asunto").classList.add("color-" + colorfondo);
    document.getElementById("linea").classList.add("color-" + colorfondo);

    //fechas para calcular rangos de días
    fechaInicioViaje = consultia_events[id]._fechaInicio;
    hoy = new Date();
    //diferencia entre hoy y la fecha inicio viaje (para clima y para seguimiento vuelo)
    diasDif = diferenciaDiasClima(hoy, fechaInicioViaje); 
    console.log(consultia_events[id]);
    //Coordenadas origen
    var lat = consultia_events[id]._latitudOrigen;
    var lon = consultia_events[id]._longitudOrigen;

    // Coordenadas destino
    var latDestino = consultia_events[id]._latitudDestino;
    var lonDestino = consultia_events[id]._longitudDestino;
   
    //Ubicación en sección Mapa o mostrar ruta en mapa si hay origen y destino
    mostrarMapa(id,lat,lon,latDestino,lonDestino,tipoReserva);
    
    //Mostrar web ministerio asuntos exteriores con recomendaciones para el país de destino
    mostrarInfoInteresDestino(latDestino, lonDestino);
         
    //Fechas salida-llegada / origen-destino
    var fechaInicioEvento = consultia_events[id].day + "/" + consultia_events[id].month + "/" + consultia_events[id].year; //formato dd/mm/aaaa
    var fechaFinEvento = consultia_events[id]._diaFin + "/" + consultia_events[id]._mesFin + "/" + consultia_events[id]._anyoFin;
    document.getElementById("fecha-o").innerHTML = fechaInicioEvento;
    document.getElementById("fecha-d").innerHTML = fechaFinEvento;

    //Variables para las horas
    var horaOrigen = consultia_events[id].time; //.time es siempre hora inicio
    var horaDestino = consultia_events[id]._horaFin;
    

    //Localizador de la reserva
    var localizadorReserva = consultia_events[id]._localizador;
    document.getElementById("localizador").innerHTML = "<h5 class='destacado modaltext'>LOCALIZADOR RESERVA: " + localizadorReserva + "</h5>";

    //A continuación se llamará a una función para tratar el String del asunto correctamente según el tipo de reserva 
    document.getElementById("asunto").innerHTML = formatCabecera(consultia_events[id].name, tipoReserva, "modal", null);
    
    
//BLOQUES PARTICULARIDADES POR TIPO DE RESERVA.    
    //AEREO
    if (tipoReserva === "Aereo") {
        //obtener el identificador del vuelo
        var codigoV = consultia_events[id]._NVuelo;
        var companyiaAerea = codigoV.split("-"); //vector con codigo companyia en la posición [0]  y numero vuelo en la posición [1] , por si hay que usarlo para los logos
        //para buscador google el código debe salir sin dash:
        codigoV = codigoV.replace("-", ""); 
        //si se ha devuelto la información necesaria del servidor
        if (diccionarioLogos.length > 0) {
            for (var i = 0; i < diccionarioLogos.length; i++) {
                if (companyiaAerea[0] == diccionarioLogos[i].IATA) {
                    logoAerolinea = diccionarioLogos[i].Logo;
                    $('.logo').append("<img src='" + logoAerolinea + "' alt='Logo-Aerolinea'>");
                }
            }
        //si no, aparecerá el logo de Consultia por defecto o cualquiera que se elija
        } else {
            $('.logo').append("<img src='assets/images/Consultia.png' alt='Logo-Aerolinea'>");
        }

        //Búsqueda vuelo google según código vuelo 
        seguimientoVueloGoogle(codigoV);
      

        //nombre aerolinea, ESTE CAMPO ES INDEPENDIENTE DEL ID PROVEEDOR (NO SE DISPONE DICCIONARIO DE AEROLINEAS)
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
        //Damos estructura al apartado de descripción de la ventana modal
        document.getElementById("descripcion").innerHTML = "<h5 class='destacado modaltext'>NÚMERO VUELO: " + codigoV + "</h5><h5 class='destacado modaltext'>AEROLÍNEA: " + aerolinea + "</h5>"
                + "<h5 class='modaltext'>Aeropuerto Salida: " + salidaIata + " - " + aeropuertoSalida + "</h5>" +
                "<h5 class='modaltext'>Aeropuerto Llegada: " + llegadaIata + " - " + aeropuertoLlegada + "</h5>" +
                "<h5 class='modaltext'>Duración vuelo: " + horas + " horas y " + minutos + " minutos. </h5><h6 class='modaltext'><span class='highlight-color'>" + avisoHorario + "</span></h6>";
        //Bloque descripción ICS con la información obtenida previamente
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
                'ATTENDEE;CN=" Nombre del viajero principal "' + nombreViajeroPrincipal + ';RSVP=TRUE:mailto:' + emailViajeroPrincipal + '\n';

    //HOTEL
    } else if (tipoReserva === "Hotel") { 
        //Ocultar el botón para los vuelos
        document.getElementById("googlesearchvuelo").style.display = "none";
        //El hotel no tiene logo, para evitar que su div ocupe un espacio que queda blanco en la parte superior
        document.getElementsByClassName("logo")[0].style.display = "none";
        //Información fija  para hoteles
        document.getElementById("ciudad-o").innerHTML = "ENTRADA";
        document.getElementById("ciudad-d").innerHTML = "SALIDA";
        document.getElementById("hora-o").innerHTML = "14:00 aprox.";   
        document.getElementById("hora-d").innerHTML = "12:00 aprox."; 
        //
        //Bloque descripción
        var nombreHotel = consultia_events[id]._nombreHotel;
        var direccionHotel = consultia_events[id]._direccion;
        var regimen = consultia_events[id]._regimen;
        var tipoHabitacion = consultia_events[id]._tipohabita;
        var viajeros = consultia_events[id]._acompanyantes;
        
        //TODO: Obtención de la ciudad a partir de la dirección postal que viene de base datos PROVISIONAL
        var laCiudad = direccionHotel.split(',');
        laCiudad = laCiudad[laCiudad.length - 2];
        //Obtener los acompañantes (AQUELLOS VIAJEROS CUYO CAMPO BOOLEAN que indica si es viajero principal SEA FALSE)
        var html = "";
        for (i = 0; i < viajeros.length; i++) {
//            if(!viajeros[i].campoboolean){  //campoboolean debe corresponder con el nombre del campo que vendrá de la respuesta API
                html += "<h5 class='modaltext'>Acompañante " + (i + 1) + ": " + viajeros[i].Nombre + "</h5>"; 
            //var emailAcompanyante = viajeros[i].Email;
//            } 
            
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
                'ATTENDEE;CN=" Nombre del viajero principal "' + nombreViajeroPrincipal + ';RSVP=TRUE:mailto:' + emailViajeroPrincipal + '\n'; //TODO: obtención del nombre y email del viajero principal

    //COCHE
    } else if (tipoReserva === "Coche") {
        //logo coches
        var codigoRent = consultia_events[id]._idProveedor; //string con el código
        var proveedor = "";
        //recorrer el diccionario de logos para proveedores de coches en archivo info_cars.js
        info_cars.forEach(function (agencia) {
            //localizar la información en el diccionario
            if (agencia.id == codigoRent) { //compara un int con un string, no anyadir otro '='
                rentacar = agencia.img;
                proveedor = agencia.proveedor;
                //anyadir el logo
                $('.logo').append("<img src='assets/images/img_proveedores/" + rentacar + "' alt='" + proveedor + "'>");
            }

        });
        //Ocultar el botón para vuelos
        document.getElementById("googlesearchvuelo").style.display = "none";
        //horas
        document.getElementById("hora-o").innerHTML = horaOrigen; //recogida
        document.getElementById("hora-d").innerHTML = horaDestino; //entrega
        //para la cabecera, cadenas fijas            
        document.getElementById("ciudad-o").innerHTML = "RECOGIDA";
        document.getElementById("ciudad-d").innerHTML = "ENTREGA";
        //Obtener los acompañantes (AQUELLOS VIAJEROS CUYO CAMPO BOOLEAN SEA FALSE)
        var viajeros = consultia_events[id]._acompanyantes; //Array de viajeros
//       viajeros = '{"viajeros": [{"Nombre" : "Luis", "Email" : "hola@punto.com", "esPrincipal": "true"} , {"Nombre" : "Perico", "Email" : "holas@punto.com", "esPprincipal": "false"}] }';
//       viajeros = JSON.parse(viajeros); console.log(viajeros);  //ejemplo acceso a campos para pruebas con un json sin pasar por base datos: viajeros.viajeros[i].Nombre
        var html = "";
        for (i = 0; i < viajeros.length; i++) {
//            if(!viajeros[i].esPrincipal){  //campoboolean debe corresponder con el nombre del campo que vendrá de la respuesta API
                html += "<h5 class='modaltext'>Acompañante " + (i + 1) + ": " + viajeros[i].Nombre + "</h5>";
//            } 
            
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
        
        //Bloque descripción ICS
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
                'ATTENDEE;CN=" Nombre del viajero principal "' + nombreViajeroPrincipal + ';RSVP=TRUE:mailto:' + emailViajeroPrincipal + '\n';
    
    //TREN
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
                'ATTENDEE;CN=" Nombre del viajero principal "' + nombreViajeroPrincipal + ';RSVP=TRUE:mailto:' + emailViajeroPrincipal + '\n';
    //BARCO
    } else if (tipoReserva === "Barco") {

        //logo FIJO
        $('.logo').append("<img src='assets/images/img_proveedores/logo_crucero_generico.png' alt='Logo-barco'>");
        //Ocultar botón para vuelos
        document.getElementById("googlesearchvuelo").style.display = "none";
        //horas
        document.getElementById("hora-o").innerHTML = horaOrigen;
        document.getElementById("hora-d").innerHTML = horaDestino;
        //Bloque descripción        
        var proveedor = consultia_events[id]._proveedor;
        var origen = consultia_events[id]._origen;
        var destino = consultia_events[id]._destino;
        document.getElementById("ciudad-o").innerHTML = origen;
        document.getElementById("ciudad-d").innerHTML = destino;
        var acomodacion = consultia_events[id]._acomodacion;
        //Vehículos abordo
        var vehiculos = consultia_events[id]._vehiculos;
        var matriculas = " ";
        for (i = 0; i < vehiculos.length; i++) {
            matriculas += "<span class=\"matricula\">" + vehiculos[i].Matricula + "</span>";
        }
        //Mostrar información 
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
                'ATTENDEE;CN=" Nombre del viajero principal "' + nombreViajeroPrincipal + ';RSVP=TRUE:mailto:' + emailViajeroPrincipal + '\n';

    //OTROS (SEGUROS, PARKING...)
    } else if (tipoReserva === "Otros") {
        document.getElementById("googlesearchvuelo").style.display = "none";
        //TODO: por determinar la estructura y lógica
    }


    //GESTIÓN DE LOS ADJUNTOS
    mostrarAdjuntosEvento(id);


    //GESTIÓN DE LOS DATOS DEL CLIMA EN DESTINO/UBICACIÓN
    previsionMeteo(id,latDestino,lonDestino,diasDif);
    
    //BLOQUE ICS
    descargaICS(id); 

//Finalmente se muestra la ventana modal con toda la información obtenida
    $("#fichaDetalle").modal("show");


}

