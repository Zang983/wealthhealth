import { StateType as State } from "./types"
import { GlobalType as Global, HeaderConfigType as HeaderConfig } from "./types"
interface Props {
    state: State,
    dispatch: React.Dispatch<{
        type: string,
        payload?: {
            direction?: number,
            year?: number
        }
    }>,
    headerConfig: HeaderConfig,
    globalConfig: Global,
}
function Header({ state, dispatch, headerConfig, globalConfig }: Props) {
    const convertMonth = () => {
        switch (globalConfig.datepickerLang) {
            case ("FR"):
                return new Array<string>("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre")[state.preSelectedMonth]
            case ("EN"):
                return new Array<string>("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December")[state.preSelectedMonth]
            default:
                return new Array<string>("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre")[state.preSelectedMonth]
        }
    }
    const calcYearsSelect = () => {
        const year = state.selectedYear
        const years = []
        const gapBefore = headerConfig.selectYearGapBefore != undefined ? headerConfig.selectYearGapBefore : 5
        const gapAfter = headerConfig.selectYearGapAfter != undefined ? headerConfig.selectYearGapAfter : 5
        for (let i = gapBefore; i > 0; i--) {
            years.push(year - i)
        }
        years.push(year)
        for (let i = 0; i < gapAfter; i++) {
            years.push(year + i + 1)
        }
        return years
    }
    const changeMonth = (direction: number, e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch({ type: "changeMonth", payload: { direction: direction } })
    }
    return (
        <div className={headerConfig.headerClassName}>
            <div className={headerConfig.headerClassName ?`${headerConfig.headerClassName}MonthNavigation` : undefined }>
                <button aria-label="Previous month" className={headerConfig.headerPreviousButtonClassName} onClick={(e) => changeMonth(-1, e)}>{headerConfig.headerPreviousButtonText}</button>
                <p>{convertMonth()}</p>
                <button aria-label="Next month" className={headerConfig.headerNextButtonClassName} onClick={(e) => changeMonth(1, e)} >{headerConfig.headerNextButtonText}</button>
            </div>
            {!headerConfig.resetButtonHidden && <button className={headerConfig.resetButtonClassName} onClick={() => dispatch({ type: "reset" })}>{headerConfig.resetButtonText}</button>}
            {
                !headerConfig.selectYearHidden &&
                <select className={headerConfig.selectYearClassName} value={state.preSelectedYear} onChange={(e) => dispatch({ type: "changeYear", payload: { year: parseInt(e.target.value, 10) } })}>
                    {calcYearsSelect().map((value, index) =>
                        <option key={index}>
                            {value}
                        </option>)}
                </select>
            }
        </div>
    )
}

export default Header