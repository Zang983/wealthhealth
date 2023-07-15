import { PayloadAction, createSlice  } from '@reduxjs/toolkit'
interface Employee {
    // firstname: string,
    // lastname: string,
    // birthdate: string,
    // startDate: string,
    // street: string,
    // city: string,
    // state: string,
    // zipCode: string,
    // department: string,
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