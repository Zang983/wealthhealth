import { ReactNode, useEffect, useReducer, useRef, useState } from "react"
import reducer from './reducer'
interface State {
    isOpen: boolean,
    preSelected: number,
    selected: number,
    isFocus: boolean,
}
type Props = {
    optionList: string[],
    optionDefault?: string,
    customClassContainer?: string,
    customClass?: string,
    customId?: string,
    label: boolean,
    labelTxt?: JSX.Element | string,
    btnIcon?: ReactNode,
    setDefineChoice: (choice: string) => void
}
function SelectCustom({ optionList, customClassContainer, optionDefault = optionList[0], customClass, customId, label, labelTxt = "Focus", btnIcon, setDefineChoice }: Props) {
    const ulRef = useRef<HTMLUListElement>(null)
    const container = useRef<HTMLDivElement>(null)
    const btnRef = useRef<HTMLButtonElement>(null)
    const [state, dispatch] = useReducer(reducer, { isOpen: false, isFocus: false, selected: 0, preSelected: -1 })
    const [search, setSearch] = useState("")
    //This function allows to manage the open/close state of the select by modifying the values of the state.
    const toggleOpen = () => {
        if (!state.isOpen)
            dispatch({ type: 'open' })
        else
            dispatch({ type: 'close' })
    }
    //This function manages the focus via the label.
    const focusBtn = () => {
        if (container.current?.contains(btnRef.current) && btnRef.current) {
            btnRef.current.focus()
            dispatch({ type: "isFocus" })
        }
    }
    //This function allows to modify the state of the selected item on click.
    const handleSelected = (index: number): void => {
        dispatch({ type: "selectOption", payload: { selected: index } })
        toggleOpen()
    }
    //This function allows to handle the click outside the component.  
    const handleClickOut = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        if (container.current && !container.current.contains(target)) {
            dispatch({ type: 'close' });
            dispatch({ type: "stopFocus" })
        }
    }
    //This function allows to preselect the hovered items in the state.
    const handleMouseOver = (index: number): void => {
        dispatch({ type: "preselect", payload: { preSelected: index } })
    }
    //Reset all selected/preselected style before apply newer
    const resetStyle = (liList: NodeListOf<HTMLLIElement>) => {
        liList.forEach((element) => {
            element.classList.remove("selected")
            element.classList.remove("preSelected")
        })
    }
    //This function allows to define the style to be applied to each bullet list item.
    const calcStyle = () => {
        if (ulRef.current) {
            const liList: NodeListOf<HTMLLIElement> = ulRef.current.querySelectorAll("li")
            resetStyle(liList)
            liList.forEach((element, index) => {
                if (index === state.selected && state.preSelected === undefined)
                    element.classList.add("selected")
                if (index === state.preSelected)
                    element.classList.add("preSelected")
            })
        }
    }
    //Handles the different keyboard events.
    const handleKeyboardEvent = (e: KeyboardEvent) => {
        if (state.isFocus || state.isOpen) {
            switch (e.key) {
                case ("ArrowUp"):
                    dispatch({ type: "decrement" })
                    break;
                case ("ArrowDown"):
                    dispatch({ type: "increment", payload: { length: optionList.length - 1 } })
                    break;
                case ("Enter"):
                    e.preventDefault()
                    if (state.isOpen)
                        dispatch({ type: "validPreSelected" })
                    if (!state.isOpen)
                        toggleOpen()
                    break;
                case ("Escape"):
                    dispatch({ type: "close" })
                    break;
                default:
                    setSearch(previous => { return previous + e.key })
            }
        }
    }
    const scrollToSelected = (typeScroll: string, stateToCheck: string) => {
        if (ulRef.current && state.preSelected >= 0) {
            const selectedLi = ulRef.current.querySelectorAll("li")[state[stateToCheck as keyof State] as number]
            selectedLi.scrollIntoView({ behavior: typeScroll as ScrollBehavior })
        }
    }
    //add keyboard event listener
    useEffect(() => {
        document.addEventListener("keydown", handleKeyboardEvent)
        return () => document.removeEventListener("keydown", handleKeyboardEvent)
    }, [state.isOpen, state.isFocus])
    //add click event listener
    useEffect(() => {
        document.addEventListener("click", handleClickOut)
        return () => {
            document.removeEventListener("click", handleClickOut)
        }
    }, [])
    //change style on each state modification
    useEffect(() => {
        calcStyle()
        setDefineChoice(optionList[state.selected])
    }, [state.selected, state.preSelected, state.isOpen, state.isFocus])
    useEffect(() => {
        scrollToSelected("instant", "selected");
    }, [state.isOpen])
    //Search by user's input
    useEffect(() => {
        if (search != "") {
            const newPreSelectedIndex = optionList.findIndex(element => element.toLowerCase().slice(0, search.length).includes(search.toLowerCase()))
            if (newPreSelectedIndex >= 0) {
                dispatch({ type: "preselect", payload: { preSelected: newPreSelectedIndex } })
                if (!state.isOpen)
                    dispatch({ type: "validPreSelected" })
                else {
                    scrollToSelected("smooth", "preSelected")
                }
            }
            setTimeout(() => {
                setSearch("")
            }, 1000)
        }
    }, [search])
    return (
        <div ref={container} className={customClassContainer} id={customId}>
            {label && <label onClick={() => { focusBtn() }}>{labelTxt}</label>}
            <button
                onFocus={() => dispatch({ type: "isFocus" })}
                onBlur={() => dispatch({ type: "stopFocus" })}
                ref={btnRef}
                aria-label="Open list"
                className={
                    `${state.isFocus ? 'selectedOptionFocused' : ''}
                 selectedOption ${customClass != undefined ? customClass : ""}
                  ${state.isOpen ? "selectedOptionOpen" : "selectedOptionClose"}`}

                onClick={(e) => { e.preventDefault(); toggleOpen() }}>
                {state.selected >= 0 ? optionList[state.selected] : optionDefault}
                {btnIcon ? btnIcon : null}
            </button>
            <ul ref={ulRef}
                className={!state.isOpen ? "hidden containerOptions" : "containerOptions"} >
                {optionList.map(((option, index) =>
                    <li
                        key={index}
                        className="selectOption"
                        onClick={() => handleSelected(index)}
                        onMouseOver={() => handleMouseOver(index)}
                    >
                        {option}
                    </li>))}
            </ul>
        </div>
    )
}
export default SelectCustom