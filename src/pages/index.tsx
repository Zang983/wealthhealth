import { useState, useRef } from "react"
import { states } from "../statesData"

import { Datepicker } from "../components/datepicker/datepicker"
import Modale from "../components/modale/modale"
import SelectCustom from "../components/customSelect/selectCustom"
import { useAppDispatch } from '../hooks'
import { addEmployee } from "./employeeSlice"
import Header from "../components/Header"
/**
 * Bug select : quand click sur un autre label avec un select de focus, ça met le deuxieme en focus sans perdre le premier.
 * Ajouter une fonction pour enregistrer l'abbréviation plutôt que le nom complet de l'état.
 */
type State = {
    firstname: string,
    lastname: string,
    birthdate: string,
    startDate: string,
    street: string,
    city: string,
    state: string,
    zipCode: string,
    department: string,
    [key: string]: string
}
export default function Index() {
    const dispatch = useAppDispatch()
    const [dataUser, setDataUser] = useState<State>({
        firstname: "",
        lastname: "",
        birthdate: "",
        startDate: "",
        street: "",
        city: "",
        state: states[0].name,
        zipCode: "",
        department: "Sales",
    })
    const refDialog = useRef<HTMLDialogElement>(null)
    const changeDataUser = (value: string, field: keyof State) => {
        setDataUser(previous => {
            const newObj = { ...previous }
            newObj[field] = value
            return newObj
        })
    }

    const handleSubmitForm = (e: React.FormEvent) => {
        e.preventDefault()
        if (Object.keys(dataUser).every((item) => dataUser[item] !== "" && dataUser[item])) {
            refDialog.current && refDialog.current.showModal()
            dispatch(addEmployee(dataUser))
        }
    }
    const handleChangeBirthdate = (value: string) => {
        changeDataUser(value, "birthdate")
    }
    const handleChangeStartDate = (value: string) => {
        changeDataUser(value, "startDate")
    }
    const handleChangeDepartment = (value: string) => {
        changeDataUser(value, "department")
    }
    const handleChangeState = (value: string) => {
        changeDataUser(value, "state")
    }
    const departmentList = ["Sales", "Marketing", "Engineering", "Human Resources", "Legal"]
    const statesList: string[] = []
    states.forEach(item => statesList.push(item.name))
    return (
        <>
            <Header textLink="View Current Employees" linkTo="employees"/>
            <main>
                <form className="newEmployeeForm">
                    <fieldset className="primaryFieldset">
                        <legend>Create employee</legend>
                        <label>First Name :
                            <input value={dataUser.firstname} onChange={e => changeDataUser(e.target.value, "firstname")} type="text" />
                        </label>
                        <label>Last Name :
                            <input value={dataUser.lastname} onChange={e => changeDataUser(e.target.value, "lastname")} type="text" />
                        </label>
                        <div className="datesEmployeeContainer">
                            <Datepicker
                                date={new Date()}
                                setChoice={handleChangeBirthdate}
                                userGlobalConfig={{
                                    globalContainerClassName: "datepicker",
                                    iconCalendar: <button aria-label="Open datepicker">&#128197;</button>
                                }}
                                userHeaderConfig={{
                                    selectYearHidden: false,
                                    selectYearGapBefore: 95,
                                    selectYearGapAfter: 3,
                                    headerNextButtonText: ">",
                                    headerPreviousButtonText: "<",
                                }}
                                userInputConfig={{
                                    labelText: "Birth Date : ",
                                }}
                            />
                            <Datepicker
                                date={new Date()}
                                setChoice={handleChangeStartDate}
                                userGlobalConfig={{
                                    globalContainerClassName: "datepicker",
                                    iconCalendar: <button aria-label="Open datepicker">&#128197;</button>
                                }}
                                userHeaderConfig={{
                                    selectYearHidden: false,
                                    selectYearGapBefore: 95,
                                    selectYearGapAfter: 3,
                                    headerNextButtonText: ">",
                                    headerPreviousButtonText: "<",
                                }}
                                userInputConfig={{
                                    labelText: "Start Date : ",
                                }}
                            />
                        </div>
                        <fieldset className="secondaryFieldset">
                            <legend>Address</legend>
                            <label> Street :
                                <input value={dataUser.street} onChange={e => changeDataUser(e.target.value, "street")} type="text" />
                            </label>
                            <label> City :
                                <input value={dataUser.city} onChange={e => changeDataUser(e.target.value, "city")} type="text" />
                            </label>
                            <div className="selectEmployee">
                                <label> Zip Code :
                                    <input value={dataUser.zipCode} onChange={e => changeDataUser(e.target.value, "zipCode")} type="text" />
                                </label>

                                <SelectCustom
                                    optionList={statesList}
                                    label={true}
                                    setDefineChoice={handleChangeState}
                                    labelTxt="State : "
                                    customClassContainer="containerSelectState containerSelect"
                                />
                            </div>
                        </fieldset>
                        <SelectCustom
                            optionList={departmentList}
                            label={true}
                            setDefineChoice={handleChangeDepartment}
                            labelTxt="Department : "
                            customClassContainer="containerSelectDepartment containerSelect"
                        />
                        <label>
                        </label>
                    </fieldset>

                    <button type="submit" onClick={e => handleSubmitForm(e)}>Save</button>
                </form>
            </main>
            <Modale refDialog={refDialog} customConfig={{
                textDialog: "Employee Created!",
                title: false,
                primaryBtn: false,
            }} />

        </>
    )
}