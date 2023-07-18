type Props = {
    pagination: number,
    setPagination: (choice: number) => void,
    uniqueID?: string,
    resultNumber?: number,
    resultNumberGap?: number,
}
export default function SelectResultPage({ pagination, setPagination, uniqueID, resultNumber, resultNumberGap }: Props) {
    return (
        <label>
            Show
            <select
                id={`${uniqueID ?? ''}-pagination`}
                className="selectPagination"
                value={pagination}
                onChange={(e) => setPagination(parseInt(e.target.value,10))}>
                {resultNumber ? new Array(5).fill(0).map((_, index) => {//Customize select for result number per pages
                    return <option key={index}>{
                        resultNumber + (resultNumberGap ? resultNumberGap * (index) : index * 5)
                    }</option>
                })
                    :
                    <>
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                        <option>100</option>
                    </>}
            </select>
            entries
        </label>)
}