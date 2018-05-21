/**
 * @description modifica como se visualizaran las lista de eventos, dependiendo de si solo hay eventos terminidos, eventos pendientes,
 * eventos de ambas clases, y la cantidad de eventos disponibles.
 * @param {integer} numeroFiltro Integer asignado según el rango de fechas asignado, 
 * @param {integer} cantidadEventos cantidad de eventos listados entre los rangos seleccionados
 * @returns {undefined}
 * @see  $("#filtro-fechas").on("click", function ())
 */
function mostrarSegunFiltrado(numeroFiltro, cantidadEventos) {
    switch (numeroFiltro) {
        case 1 :

            $(".listado-eventos-pendientes").css("display", "block"); //visualiza la lista de pendientes
            $(".listado-eventos-terminados").css("display", "none"); //oculta la lista de terminados
            $("#cambiarEventos").addClass("displayNone"); // oculta el boton de cambio de lista

            break;
        case 2 :
            $(".listado-eventos-pendientes").css("display", "none");  //oculta la lista de pendientes
            $(".listado-eventos-terminados").css("display", "block"); //visualiza la lista de terminados
            $("#cambiarEventos").addClass("displayNone");  // oculta el boton de cambio de lista
            break;
        case 3:
            if (cantidadEventos > eventosMaximoParaUnaSolaLista) {
                $(".listado-eventos-pendientes").css("display", "block"); //visualiza la lista de pendientes
                $(".listado-eventos-terminados").css("display", "none");  //oculta la lista de terminados
                $("#cambiarEventos").removeClass("displayNone"); //habilita el botón para cambiar de listas
                break;
            } else {
                $(".listado-eventos-pendientes").css("display", "block"); //visualiza la lista de pendientes
                $(".listado-eventos-terminados").css("display", "block"); //visualiza la lista de terminados
                $("#cambiarEventos").addClass("displayNone");  // oculta el boton de cambio de lista
                break;
            }
    }
}

 // Cuando el usuario hace scroll down 20px desde la parte superior del documento, muestra un botón para subir de nuevo
            window.onscroll = function() {scrollFunction(); };
          
            function scrollFunction() {
                if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                    document.getElementById("myBtn").style.display = "block";
                } else {
                    document.getElementById("myBtn").style.display = "none";
                }
            }
            
            
            // Cuando el usuario clicka el botón, se hace un scroll automático hasta la parte superior del documento
            function topFunction() {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }
            
