import { useState, useRef, useEffect } from 'react'
import { StateType as State, CalendarConfigType, GlobalType } from './types';

interface DayObject {
    day: number,
    month: number,
    class?: string,
}
interface Props {
    state: State,
    dispatch: React.Dispatch<{
        type: string,
        payload?: DayObject
    }>,
    calendarConfig: CalendarConfigType,
    globalConfig: GlobalType
}

function Calendar({ state, dispatch, calendarConfig, globalConfig }: Props) {
    const [daysArray, setDaysArray] = useState<DayObject[]>([])
    const tableRef = useRef<HTMLTableElement>(null)

    const isLeap = () => {
        if ((state.preSelectedYear % 4 == 0 && state.preSelectedYear % 100 != 0) || state.preSelectedYear % 400 == 0) {
            return true;
        }
        return false;
    }
    const firstDayMonthIndex = () => {
        //return index of first day in month
        const tempDate = new Date(state.preSelectedDate)
        tempDate.setDate(1)
        return tempDate.getDay()
    }
    const addInArray = (array: DayObject[], classValue: string | undefined, dayValue: number, monthValue: number) => {
        const newObject: DayObject = {
            day: dayValue,
            month: monthValue,
            class: classValue,
        }

        if (newObject.month === state.selectedMonth && dayValue === state.selectedDay && state.selectedYear === state.preSelectedYear)
            newObject.class += " currentDay"
        array.push(newObject)
    }
    const calcDaysMissingBefore = () => {
        const firstDay = firstDayMonthIndex()
        switch (globalConfig.datepickerLang) {
            case ("FR"):
                return firstDay === 0 ? 6 : firstDay - 1
            default:
                return firstDay
        }
    }
    const calcDaysArray = () => {
        const month = state.preSelectedMonth
        const daysMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        const calendarArray: DayObject[] = []
        isLeap() ? daysMonth[1] = 29 : null
        const previousMonth = month === 0 ? daysMonth[11] : daysMonth[month - 1]
        const dayMissingBefore = calcDaysMissingBefore()

        //days before first day of selected mounth
        if (dayMissingBefore) {
            for (let i = previousMonth - dayMissingBefore + 1; i < previousMonth + 1; i++) {
                addInArray(calendarArray, calendarConfig.calendarPreviousMonthDayClassName, i, month === 0 ? 11 : month - 1)
            }
        }
        //days of selected month
        for (let i = 1; i < daysMonth[month] + 1; i++) {
            addInArray(calendarArray, calendarConfig.calendarCurrentMonthDayClassName, i, month)
        }
        //days after selected month
        for (let i = 1; i < (43 - dayMissingBefore - daysMonth[month]); +i++) {
            addInArray(calendarArray, calendarConfig.calendarNextMonthDayClassName, i, month + 1)
        }
        setDaysArray(calendarArray)
    }
    const changeDay = (value: DayObject) => {
        dispatch({ type: "selectDay", payload: value })
        dispatch({ type: "isValid" })
    }
    const displayWeek = (index: number) => {
        if (daysArray) {
            const tempArray = daysArray.slice(index, index + 7)
            return (
                <tr key={index / 7}>
                    {tempArray.map((value: DayObject, key: number) => <td key={key} className={value.class} onClick={() => changeDay(value)}>{value.day}</td>)}
                </tr>
            )
        }
        return <div>Error</div>
    }
    const theadContent = (): string[] => {
        const englishDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        const frenchDay = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
        const result: string[] = []
        let sliceNumber: number | undefined = 1 //default : 1 letter
        switch (calendarConfig.theadContent) {
            case "TL"://3 first words
                sliceNumber = 3
                break
            case "FW"://full word
                sliceNumber = undefined
        }
        if (sliceNumber) {
            if (globalConfig.datepickerLang === "FR")
                frenchDay.forEach((value) => result.push(value.slice(0, sliceNumber)))
            else
                englishDay.forEach((value) => result.push(value.slice(0, sliceNumber)))
            return result
        }
        if (globalConfig.datepickerLang === "FR")
            return frenchDay
        return englishDay
    }
    useEffect(() => {
        calcDaysArray()
    }, [state])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case ("Tab"):
                    dispatch({ type: "reset" })
                    dispatch({ type: "closeCalendar" })
                    break
                case ("Escape"):
                    dispatch({ type: "reset" })
                    dispatch({ type: "closeCalendar" })
                    break
            }
        }
        document.addEventListener("keydown",
            handleKeyDown
        )
        return () => document.removeEventListener("keydown", handleKeyDown)
    })

    return (
        <table ref={tableRef} className={calendarConfig.calendarTableClassName}>
            <thead>
                <tr>
                    {theadContent().map((value, index) => <th key={index}>{value}</th>)}
                </tr>
            </thead>
            <tbody>
                {daysArray &&
                    daysArray.map((_, index: number) =>
                        index % 7 === 0 ? displayWeek(index) : null
                    )
                }
            </tbody>
        </table>
    )
}

export default Calendar