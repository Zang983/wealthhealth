import Calendar from './calendar'
import Header from './header'
import InputDate from './InputDate'
import { useState, useEffect, useReducer, useRef } from 'react'
import reducer from './reducer'
import { GlobalType, HeaderConfigType, CalendarConfigType, InputConfigType } from './types'
import { globalConfig, headerConfig, inputDateConfig, calendarConfig } from "./config"

interface Props {
    date: Date,
    setChoice: (formatedDate: string) => void,
    userGlobalConfig?: GlobalType,
    userHeaderConfig?: HeaderConfigType,
    userCalendarConfig?: CalendarConfigType,
    userInputConfig?: InputConfigType
}
export function Datepicker({ date, setChoice, userGlobalConfig, userHeaderConfig, userCalendarConfig, userInputConfig }: Props) {
    const tableRef = useRef<HTMLTableElement>(null)
    const [clickOut, setClickOut] = useState(false)
    const [state, dispatch] = useReducer(reducer, {
        selectedDate: date,
        selectedYear: date.getFullYear(),
        selectedMonth: date.getMonth(),
        selectedDayIndex: date.getDay(),
        selectedDay: date.getDate(),
        /*---------*/
        preSelectedDate: date,
        preSelectedYear: date.getFullYear(),
        preSelectedMonth: date.getMonth(),
        preSelectedDayIndex: date.getDay(),
        preSelectedDay: date.getDate(),
        /*------*/
        calendarStatus: false,
        isValid : true
    })
    Object.assign(globalConfig, userGlobalConfig)

    const toggleOpen = (e?: React.MouseEvent<HTMLDivElement>) => {
        if (e)
            e.preventDefault()
        dispatch({ type: "toggleCalendar" })
    }
    useEffect(() => {
        setChoice(state.selectedDate.toLocaleDateString())
    }, [state.selectedDate])
    useEffect(() => {
        const handleClickOut = (e: MouseEvent) => {
            if (tableRef.current && clickOut && e.target instanceof Node && !tableRef.current.contains(e.target)) {
                const tableDim = tableRef.current.getBoundingClientRect()
                if (
                    e.clientX < tableDim.left ||
                    e.clientX > tableDim.right ||
                    e.clientY < tableDim.top ||
                    e.clientY > tableDim.bottom
                ) {
                    dispatch({ type: "closeCalendar" })
                    dispatch({ type: "reset" })
                }
            }
        }
        document.addEventListener("click", handleClickOut)
        setClickOut(true)
        return () => { document.removeEventListener("click", handleClickOut) }
    })

    return (
        <div ref={tableRef} className={globalConfig.globalContainerClassName}>
            <div className={globalConfig.inputAndIconContainerClassName}>
                <InputDate state={state} dispatch={dispatch} globalConfig={Object.assign(globalConfig, userGlobalConfig)} inputDateConfig={Object.assign(inputDateConfig, userInputConfig)}>
                    {!globalConfig.iconCalendarHidden && <div className={globalConfig.iconCalendarClassName} onClick={(e) => { toggleOpen(e) }}>{globalConfig.iconCalendar}</div>}
                </InputDate>

            </div>
            {state.calendarStatus &&
                <div className={globalConfig.globalContainerClassName ? `${globalConfig.globalContainerClassName}Container` : 'Container'}>
                    <Header state={state} dispatch={dispatch} headerConfig={Object.assign(headerConfig, userHeaderConfig)} globalConfig={Object.assign(globalConfig, userGlobalConfig)} />
                    <Calendar state={state} dispatch={dispatch} calendarConfig={Object.assign(calendarConfig, userCalendarConfig)} globalConfig={Object.assign(globalConfig, userGlobalConfig)} />
                </div>
            }
        </div>
    )
}
