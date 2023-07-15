import { GlobalType, HeaderConfigType, CalendarConfigType, InputConfigType } from './types'
export const globalConfig: GlobalType = {
    globalContainerClassName: "datepicker",
    datepickerLang: "FR",
    iconCalendarClassName: "iconCalendar",
    iconCalendar: <button aria-label="Open datepicker">Toggle Datepicker</button>,
    iconCalendarHidden: false,
    inputAndIconContainerClassName: "inputContainer"
}

export const headerConfig: HeaderConfigType = {
    headerClassName: "datepickerHeader",
    headerPreviousButtonClassName: "previousBtn",
    headerPreviousButtonText: "Précédent",/* Laisser la possibilité de mettre un react node*/
    headerNextButtonText: "Suivant",
    headerNextButtonClassName: "NextBtn",
    headerResetButtonClassName: "resetDatepicker",
    headerResetButtonText: "Reset !",/* Laisser la possibilité de mettre un react node*/
    selectYearClassName: "selectYear",
    selectYearGapBefore: 5,
    selectYearGapAfter: 5,
    selectYearHidden: true,
    resetButtonClassName: "resetBtn",
    resetButtonText: "Reset",/* Laisser la possibilité de mettre un react node*/
    resetButtonHidden: true,
}
export const calendarConfig: CalendarConfigType = {
    calendarTableClassName: "calendar",
    theadContent: "FL",/* FL : FirstLetter | TL : ThreeLetters | FW : FullWord*/
    calendarPreviousMonthDayClassName: "previousMonth",
    calendarNextMonthDayClassName: "nextMonth",
    calendarCurrentMonthDayClassName: "currentMonth",
}
export const inputDateConfig: InputConfigType = {
    inputClassName: "inputDatepicker",
    errorFormatMessage: "Date format incorrect.",
    errorFormatContainerClass: "errorDatePickerDateFormat",
    regexDateFR: /^(0[1-9]|[1-2]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
    regexDateUS: /^(0[1-9]|1[0-2])\/(0[1-9]|[1-2]\d|3[01])\/\d{4}$/,
    customRegex: undefined,
    characterSplitDate: "/",
    openCalendar: true,
    labelText: "My custom input"
}