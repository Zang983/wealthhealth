
interface State {
    isOpen: boolean,
    preSelected: number,
    selected: number,
    isFocus: boolean,
}
interface Action {
    type: string;
    payload?: {
        selected?: number;
        preSelectedOption?: number;
        length?: number;
        preSelected?: number;
    };
}

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case ("open"):
            return {
                ...state,
                isOpen: true,
                preSelected: state.selected,
                isFocus: true
            }
        case ("close"):
            return {
                ...state,
                isOpen: false,
                preSelected: -1
            }
        case ("selectOption"):
            if (action.payload && action.payload.selected != undefined) {
                return {
                    ...state,
                    selected: action.payload.selected
                }
            }
            return { ...state }

        case ("preSelectOption"):
            if (action.payload && action.payload.preSelectedOption != undefined)
                return {
                    ...state,
                    preSelected: action.payload.preSelectedOption
                }
            return { ...state }
        case ("decrement"):
            if (!state.isOpen)
                return {
                    ...state,
                    selected: state.selected > 0 ? state.selected - 1 : 0
                }
            if (state.preSelected)
                return {
                    ...state,
                    preSelected: state.preSelected > 0 ? state.preSelected - 1 : 0
                }
            return { ...state }
        case ("increment"):
            if (action.payload && action.payload.length) {
                if (!state.isOpen)
                    return {
                        ...state,
                        selected: state.selected < action.payload.length ? state.selected + 1 : action.payload.length
                    }
                return {
                    ...state,
                    preSelected: state.preSelected < action.payload.length ? state.preSelected + 1 : action.payload.length

                }
                return { ...state }
            }
            return { ...state }
        case ("preselect"):
            if (action.payload && action.payload.preSelected != undefined)
                return {
                    ...state,
                    preSelected: action.payload.preSelected
                }
            return { ...state }
        case ("validPreSelected"):
            return {
                ...state,
                selected: state.preSelected,
                preSelected: -1,
                isOpen: false
            }
        case("search"):
        return{
            ...state
        }
        case ("isFocus"):
            return {
                ...state,
                isFocus: true
            }
        case ("stopFocus"):
            return {
                ...state,
                isFocus: false
            }
        default:
            return { ...state }
    }
}
export default reducer