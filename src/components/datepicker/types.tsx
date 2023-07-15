/* Reducer types */
export interface StateType {
    selectedDate: Date,
    selectedDay: number,
    selectedDayIndex: number,
    selectedMonth: number,
    selectedYear: number,
  
    preSelectedDate: Date,
    preSelectedDay: number,
    preSelectedDayIndex: number,
    preSelectedMonth: number,
    preSelectedYear: number,
  
    calendarStatus: boolean,
    isValid: boolean,
  }

  export interface ActionType {
    type: string,
    payload?: {
      direction?: number,
      year?: number,
      month?: number,
      day?: number
    }
  }

export interface GlobalType {
    globalContainerClassName?: string,
    datepickerLang?: "FR" | "EN",
    iconCalendar?: React.ReactNode,
    iconCalendarHidden?:boolean,
    iconCalendarClassName?: string,
    inputAndIconContainerClassName?:string,
}
export interface HeaderConfigType {
    headerClassName?: string,
    headerPreviousButtonClassName?: string,
    headerPreviousButtonText?: string,
    headerNextButtonText?: string,
    headerNextButtonClassName?: string,
    headerResetButtonClassName?: string,
    headerResetButtonText?: string,
    selectYearClassName?: string,
    selectYearGapBefore?: number,
    selectYearGapAfter?: number,
    selectYearHidden?: boolean,
    resetButtonClassName?:string,
    resetButtonText?:string,
    resetButtonHidden?:boolean,
}
export interface CalendarConfigType {
    calendarTableClassName?: string,
    theadContent?: "FL" | "TL" | "FW",/* FL : FirstLetter | TL : ThreeLetters | FW : FullWord*/
    calendarPreviousMonthDayClassName?: string,
    calendarNextMonthDayClassName?: string,
    calendarCurrentMonthDayClassName?: string,
}
export interface InputConfigType {
    inputClassName?: string,
    errorFormatMessage?: string,
    errorFormatContainerClass?:string,
    regexDateFR?: RegExp,
    regexDateUS?: RegExp,
    customRegex?:RegExp,
    characterSplitDate?: string,
    openCalendar ?: boolean,
    labelText?:string,

}

