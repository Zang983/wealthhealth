import { useState, useEffect } from 'react'
import { GlobalType, InputConfigType, StateType as State } from './types'

interface Props {
    state: State,
    dispatch: React.Dispatch<{
        type: string,
        payload?: {
            day: number,
            month: number,
            year: number
        }
    }>,
    globalConfig: GlobalType,
    inputDateConfig: InputConfigType,
    children?: React.ReactNode | "string"
}

function InputDate({ state, dispatch, globalConfig, inputDateConfig, children }: Props) {
    const [date, setDate] = useState(state.selectedDate.toLocaleDateString())

    const checkCoherence = (value: string) => {
        let data: string[] = []
        let day = 0
        let month = 0
        let year = 0
        if (typeof value === "string" && inputDateConfig.characterSplitDate)
            data = value.split(inputDateConfig.characterSplitDate)
        if (globalConfig.datepickerLang === "FR") {
            day = parseInt(data[0], 10)
            month = parseInt(data[1], 10)
            year = parseInt(data[2], 10)
        }
        else {
            day = parseInt(data[1], 10)
            month = parseInt(data[0], 10)
            year = parseInt(data[2], 10)
        }
        const date = new Date(year, month - 1, day)
        return (
            date.getDate() === day &&
            date.getMonth() === month - 1 &&
            date.getFullYear() === year
        )
    }
    const checkInput = (input?: string) => {
        let regex = null
        const value = input ? input : state.selectedDate.toLocaleDateString("fr-FR")
        regex = inputDateConfig.customRegex !== undefined ? inputDateConfig.customRegex : globalConfig.datepickerLang === "FR" ? inputDateConfig.regexDateFR : inputDateConfig.regexDateUS

        if (regex && regex.test(value) && checkCoherence(value)) {
            dispatch({ type: "isValid" })
            return true
        }
        dispatch({ type: "isUnvalid" })
        return false

    }
    const openCalendar = () => {
        if (inputDateConfig.openCalendar === true && !state.calendarStatus) {
            dispatch({ type: "openCalendar" })
        }
    }
    const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = ""
        if (e.target && e.target.value)
            value = e.target.value
        setDate(value)
        checkInput()
        dispatch({ type: "closeCalendar" })
        if (checkInput(value) && inputDateConfig.characterSplitDate) {
            const data = value.split(inputDateConfig.characterSplitDate)
            if (data && globalConfig.datepickerLang === "FR") {
                dispatch({
                    type: "inputDate", payload: {
                        day: parseInt(data[0], 10),
                        month: parseInt(data[1], 10),
                        year: parseInt(data[2], 10)
                    }
                })
            }
            else {
                dispatch({
                    type: "inputDate", payload: {
                        day: parseInt(data[1], 10),
                        month: parseInt(data[0], 10),
                        year: parseInt(data[2], 10)
                    }
                })
            }
        }
    }
    useEffect(() => {
        if (globalConfig.datepickerLang === "FR")
            setDate(state.selectedDate.toLocaleDateString("fr-FR"))
        else
            setDate(state.selectedDate.toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' }))
    }, [state.selectedDate])

    return (
        <>
            <label>{inputDateConfig.labelText}
                <div className={inputDateConfig.inputClassName ? `${inputDateConfig.inputClassName}Input` : "Input"}>
                    <input className={inputDateConfig.inputClassName} type="text" value={date}
                        onFocus={() => { openCalendar() }}
                        onChange={e => handleChangeDate(e)} />
                    {children}
                </div>
            </label>
            {!state.isValid && <p className={inputDateConfig.errorFormatContainerClass}>{inputDateConfig.errorFormatMessage}</p>}

        </>
    )
}

export default InputDate