


// Variable
var thisDate = 1;
var today = new Date();  //Tue Mar 13 2018 12:19:54 GMT+0100 (Hora estándar romance)

var todaysDay = today.getDay() + 1; //día de la semana (de 0 a 6) aumentado en 1 para coincicir con el orden natural
var todaysDate = today.getDate(); //día del mes actual
var todaysMonth = today.getMonth() + 1; //mes actual
var todaysYear = today.getFullYear(); //año actual 4 dígitos

var firstDate;
var firstDay;
var lastDate;
var numbDays;
var numevents = 0;
var daycounter = 0;
var calendarString = "";

var monthNum_full = todaysMonth;
var yearNum_full = todaysYear;
var monthNum_compact = todaysMonth;
var yearNum_compact = todaysYear;

var consultia_events = []; //para los eventos recogidos en events.json
var order_num = 0;

// Config variable
var wordDay;  //para nombre días largo o corto
var date_start;
var returnView = "calendario"; // asigna la vista a la que volver despues de mostrar los detalles de un evento
// comprobacion de si es calendario con filtro de fechas o sin filtro
var filtrar = false;
var filtrado = 0;

var fechaIniDefault = sumarDias(-1000); //valor por defecto de dias que mostraran eventos anteriores de la fecha actual
var fechaFinDefault = sumarDias(1000); //valor por defecto de dias que mostraran eventos a partir de la fecha actual

var rangoFechaIni = ""; //variables que se cargan al seleccionar fechas en el datapicker
var rangoFechaFin = "";

var resolucionMinimaCalendario = 600; //ancho de la pantalla mínimo para que el calendario se muestre, de ser menor, se mostrará la lista
var diasMaximoEntreFechas = 365; //rango máximo permitido entre dos fechas
var eventosMaximoParaUnaSolaLista = 15; //cantidad de eventos máxima, para que tanto los eventos pendientes como finalizados se muestren en una sola lista