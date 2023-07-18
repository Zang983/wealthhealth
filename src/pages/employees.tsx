import { useAppSelector } from '../hooks'
import MyTable from "../components/table/myTable/myTable"
import Header from '../components/Header'

function Employees() {
    const selector = useAppSelector(state => state.list)
    return (
        <>
            <Header linkTo="/" textLink="Create new employee"/>
            <MyTable
                data={selector}
                uniqueID="test"
                hideColumn={[]}
                columnReplaceName={{
                    "Firstname": "First name",
                    "Lastname": "Last name",
                    "StartDate": "Start Date",
                    "ZipCode": "Zip Code",
                }}
                // resultNumber={10}
                // resultNumberGap={5}
            />

        </>
    )
}

export default Employees