import { StateType as State,ActionType as Action } from "./types";

const updateSelectedDate = (state: State, newDate: Date, year: number, month: number, day: number) => ({
  ...state,
  selectedDate: newDate,
  selectedDay: day,
  selectedDayIndex: newDate.getDay(),
  selectedMonth: month,
  selectedYear: year,
  calendarStatus:false,
});

const updatePreSelectedDate = (state: State, newDate: Date, year: number, month: number, day: number) => ({
  ...state,
  preSelectedDate: newDate,
  preSelectedDay: day,
  preSelectedDayIndex: newDate.getDay(),
  preSelectedMonth: month,
  preSelectedYear: year,
});

function reducer(state: State, action: Action) {
  const { preSelectedYear, preSelectedMonth, preSelectedDay } = state;

  switch (action.type) {
    case "changeMonth": {
      let newYear = preSelectedYear;
      let newMonth = 0
      if (action.payload && action.payload.direction && (action.payload.direction === 1 || action.payload.direction === -1))
        newMonth = preSelectedMonth + action.payload.direction
      let newDate = new Date(newYear, newMonth, preSelectedDay);
      if (action.payload && preSelectedMonth === 0 && action.payload.direction === -1) {
        newYear = preSelectedYear - 1;
        newMonth = 11;
        newDate = new Date(newYear, newMonth, preSelectedDay);
      } else if (action.payload && preSelectedMonth === 11 && action.payload.direction === 1) {
        newYear = preSelectedYear + 1;
        newMonth = 0;
        newDate = new Date(newYear, newMonth, preSelectedDay);
      }
      return {
        ...state,
        preSelectedDate: newDate,
        preSelectedMonth: newMonth,
        preSelectedDayIndex: newDate.getDay(),
        preSelectedYear: newYear,
        preSelectedDay: newDate.getDate(),
      };
    }
    case "changeYear": {
      if (action.payload && action.payload.year) {
        const newYear = action.payload.year;
        const newDate = new Date(state.preSelectedDate.setFullYear(newYear));
        return {
          ...state,
          preSelectedDate: newDate,
          preSelectedDayIndex: newDate.getDay(),
          preSelectedYear: newDate.getFullYear(),
        }
      }
      return {
        ...state
      }
    }
    case "selectDay": {
      const { month, day } = action.payload ?? { month: undefined, day: undefined };
      if (month && day) {
        const newDate = new Date(preSelectedYear, month, day);
        return updateSelectedDate(state, newDate, preSelectedYear, month, day);
      }
      return {
        ...state
      }
    }
    case "inputDate": {
      const { year, month, day } = action.payload ?? { year: undefined, month: undefined, day: undefined };
      if (year && month && day) {
        const newDate = new Date(year, month - 1, day);
        return {
          ...state,
          ...updatePreSelectedDate(state, newDate, year, month - 1, day),
          ...updateSelectedDate(state, newDate, year, month - 1, day),
        };
      }
      return {
        ...state
      }
    }
    case "reset": {
      return {
        ...state,
        preSelectedDate: state.selectedDate,
        preSelectedMonth: state.selectedMonth,
        preSelectedDayIndex: state.selectedDayIndex,
        preSelectedYear: state.selectedYear,
        preSelectedDay: state.selectedDay,
      }
    }
    case "toggleCalendar": {
      return {
        ...state,
        calendarStatus: !state.calendarStatus
      }
    }
    case "openCalendar": {
      return {
        ...state,
        calendarStatus: true,
        preSelectedDate: state.selectedDate,
        preSelectedMonth: state.selectedMonth,
        preSelectedDayIndex: state.selectedDayIndex,
        preSelectedYear: state.selectedYear,
        preSelectedDay: state.selectedDay,
      }
    }
    case "closeCalendar": {
      return {
        ...state,
        calendarStatus: false,
      }
    }
    case "isValid":{
      return{
        ...state,
        isValid : true
      }
    }
    case "isUnvalid":{
      return{
        ...state,
        isValid : false
      }
    }
    default:
      return {...state};
  }
  
}
export default reducer;