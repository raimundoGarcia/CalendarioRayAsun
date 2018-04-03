$(document).ready(function () {

    $('.datepicker').pickadate({
        monthsFull: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
        monthsShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        weekdaysFull: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        weekdaysShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        showMonthsShort: undefined,
        showWeekdaysFull: undefined,
// Buttons
        today: 'Hoy',
        clear: 'Borrar',
        close: 'Cerrar',
// Accessibility labels
        labelMonthNext: 'Siguiente mes',
        labelMonthPrev: 'Mes anteror',
        labelMonthSelect: 'Selecciona un mes',
        labelYearSelect: 'Selecciona un año',
// Formats
        format: 'd mmmm, yyyy',
        formatSubmit: undefined,
        hiddenPrefix: undefined,
        hiddenSuffix: '_submit',
        hiddenName: undefined,
// Editable input
        editable: undefined,
// Dropdown selectors
        selectYears: undefined,
        selectMonths: undefined,
// First day of the week
        firstDay: 1,
// Date limits
        min: undefined,
        max: undefined,
// Disable dates
        disable: undefined,
// Root picker container
        container: undefined,
// Hidden input container
        containerHidden: undefined,
// Close on a user action
        closeOnSelect: true,
        closeOnClear: true,
// Events
        onStart: undefined,
        onRender: undefined,
        onOpen: undefined,
        onClose: undefined,
        onSet: undefined,
        onStop: undefined,
// Classes
        klass: {

            // The element states
            input: 'picker__input',
            active: 'picker__input--active',
            // The root picker and states *
            picker: 'picker',
            opened: 'picker--opened',
            focused: 'picker--focused',
            // The picker holder
            holder: 'picker__holder',
            // The picker frame, wrapper, and box
            frame: 'picker__frame',
            wrap: 'picker__wrap',
            box: 'picker__box',
            // The picker header
            header: 'picker__header',
            // Month navigation
            navPrev: 'picker__nav--prev',
            navNext: 'picker__nav--next',
            navDisabled: 'picker__nav--disabled',
            // Month & year labels
            month: 'picker__month',
            year: 'picker__year',
            // Month & year dropdowns
            selectMonth: 'picker__select--month',
            selectYear: 'picker__select--year',
            // Table of dates
            table: 'picker__table',
            // Weekday labels
            weekdays: 'picker__weekday',
            // Day states
            day: 'picker__day',
            disabled: 'picker__day--disabled',
            selected: 'picker__day--selected',
            highlighted: 'picker__day--highlighted',
            now: 'picker__day--today',
            infocus: 'picker__day--infocus',
            outfocus: 'picker__day--outfocus',
            // The picker footer
            footer: 'picker__footer',
            // Today, clear, & close buttons
            buttonClear: 'picker__button--clear',
            buttonClose: 'picker__button--close',
            buttonToday: 'picker__button--today'
        }
    });
    $("#startingDate").on("change", function () {
        currentDate = $("#startingDate").val();
        var $input = $("#endingDate").pickadate();
        var ban = $input.pickadate('picker');
        ban.set('min', currentDate);


    });

});