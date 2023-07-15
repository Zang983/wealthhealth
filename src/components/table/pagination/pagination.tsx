import { useEffect, useState } from "react"

type Props = {
    page:number,
    itemPerPage:number,
    itemNumber:number,
    changePage:(page:number)=>void
}

//Petite phrase en bas à gauche à afficher
// Pour le nombre de page, si supérieur à X page, afficher X[page] ... [dernière page]
export default function Pagination({ page, itemPerPage, itemNumber, changePage }:Props) {
    const [numberPage, setNumberPage] = useState(1)
      useEffect(() => {
        let numberPage = 1
        if (itemNumber > itemPerPage)
            numberPage = Math.ceil(itemNumber / itemPerPage)
        setNumberPage(numberPage)
    }, [itemNumber, itemPerPage])

    function countFirstItemDisplayed(){
        if(page === 1 || itemNumber < itemPerPage)
            return 1
        return itemPerPage * (page -1)+1
    }
    
    const numberPageArray = ()=>{
        const result:number[] = []
        for(let i = 0 ; i<numberPage;i++)
            result.push(i)
        return result
    }

    return (
        <div className="pagination">
            <p>
                {numberPage > 1 ? 
                `Showing ${countFirstItemDisplayed()} to ${itemPerPage * page < itemNumber ? itemPerPage * page : itemNumber} of ${itemNumber} entries` :
                `Showing all ${itemNumber} results`}
            </p>
            <div className="paginationLinkPages">
                {itemNumber && numberPage>1 && numberPageArray().map((value, index) => {
                    return <p 
                    className={`paginationNumber ${page - 1 === value ? 'active unSelectable' : ''}`}
                     key={index} onClick={()=>changePage(value+1)}>{value+1}</p>
                })}
            </div>
        </div>

    )
}
