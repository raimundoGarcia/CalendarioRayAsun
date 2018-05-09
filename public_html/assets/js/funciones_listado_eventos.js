
function mostrarSegunFiltrado(numeroFiltro, cantidadEventos) {
    switch (numeroFiltro) {
        case 1 :

            $(".listado-eventos-pendientes").css("display", "block");
            $(".listado-eventos-terminados").css("display", "none");
            $("#cambiarEventos").addClass("displayNone");

            break;
        case 2 :
            $(".listado-eventos-pendientes").css("display", "none");
            $(".listado-eventos-terminados").css("display", "block");
            $("#cambiarEventos").addClass("displayNone");
            break;
        case 3:
            if (cantidadEventos > 15) {
                $(".listado-eventos-pendientes").css("display", "block");
                $(".listado-eventos-terminados").css("display", "none");
                $("#cambiarEventos").removeClass("displayNone");
                break;
            } else {
                $(".listado-eventos-pendientes").css("display", "block");
                $(".listado-eventos-terminados").css("display", "block");
                $("#cambiarEventos").addClass("displayNone");
                break;
            }
    }
}


