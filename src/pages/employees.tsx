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
                resultNumber={5}
                resultNumberGap={5}
            />

        </>
    )
}

export default Employees