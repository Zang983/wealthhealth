import { PayloadAction, createSlice  } from '@reduxjs/toolkit'
interface Employee {
    [key:string]:string
}
interface State{
    list:Employee[]
}
const initialState:State = {list:[]}
export const employeeSlice = createSlice({
    name:'employee',
    initialState: initialState,
    reducers:{
        addEmployee(state,action:PayloadAction<Employee>){
            state.list.push(action.payload)
        }
    },
})
export const { addEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;