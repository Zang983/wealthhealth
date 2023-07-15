import { Data } from "../types"
import { useEffect, useState } from "react"

type objectSort = {
  sortAsc: number,
  sortBy: string
}
type Props = {
  objectList: Data[],
  propertiesList: string[],
  propertiesListReplaced?: string[],
  sortAsc: (order:string) => void,
  isSorted: (isSorted:boolean)=>void,
  actualSort: objectSort,
}

export default function CreateTable({ objectList, propertiesList, propertiesListReplaced, sortAsc, isSorted, actualSort }: Props) {
  const [data, setData] = useState<string[][]>()
  /**
 * This function define class for arrow in property cell according to order sort
 * @param {Object} actualSort actualSort.sortBy => String => actual property order sorting && actualSort.sortAsc => asc or desc order of sorting
 * @param {*} property 
 * @returns 
 */
  function defineSort(actualSort: objectSort, property: string):string {
    if (actualSort.sortBy && actualSort.sortAsc) {
      if (property.toLowerCase() === actualSort.sortBy.toLowerCase()) {
        if (actualSort.sortAsc === 1)
          return "columnAsc"
        return "columnDesc"
      }
    }
    return ''
  }
  /**
   * We don't know final user's inputs, so we need to parse them in a known format.
   * After listing properties, we transform objects array in an arrays array.
   * @param {[Object]} objectList 
   * @param {[String]} propertiesList 
   * @returns 
   */
  function parseData(objectList: Data[], propertiesList: string[]): string[][] {
    const parsedItems: string[][] = []
    if (propertiesList.length > 0) {
      for (const item of objectList) {
        const newEntry: string[] = []
        for (const entry of propertiesList) {
          newEntry.push(item[entry].toString())
        }
        parsedItems.push(newEntry)
      }
    }
    return parsedItems
  }

  //Parsing datas
  useEffect(() => {
    setData(parseData(objectList, propertiesList))
  },[objectList, propertiesList])
  return (
    <table>
      {propertiesList &&
        <thead>
          <tr>
            {propertiesListReplaced && propertiesListReplaced.map((property, key) =>
              <th key={key} scope="col">
                <div className="columnName">
                  {property}
                  <button className={`sortButton ${defineSort(actualSort, property)}`} onClick={() => {//we define the class of button for arrow direction
                    sortAsc(property); isSorted(true)//change parent's state
                  }}>
                  </button>
                </div>
              </th>)
            }
          </tr>
        </thead>}
      {data &&
        <tbody>
          {data &&
            data.map((row, key) => {
              return <tr key={key}>{row.map((value, key) => {//just display datas
                return <td key={key}>{value}</td>
              })}</tr>
            })
          }
        </tbody>
      }
    </table>
  )
}

