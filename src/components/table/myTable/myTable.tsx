import { useEffect, useState } from "react"
import CreateTable from "../createTable/createTable"
import { createPropertiesArray, sortData, calcSlice } from "./functions"
import Pagination from "../pagination/pagination"
import SelectResultPage from '../selectResultPage/selectResultPage'
import { Data } from "../types"

type Props = {
  data:Data[],
  uniqueID?:string,
  hideColumn?:string[],
  columnReplaceName?:{
    [key:string]: string
  },
  resultNumber?:number,
  resultNumberGap ?: number,
}

export default function MyTable({ data, uniqueID, hideColumn, columnReplaceName, resultNumber, resultNumberGap }:Props) {
  const [filteredData, setFilteredData] = useState(data)
  const [filter, setFilter] = useState("")
  const [dataSorted, setDataSorted] = useState(filteredData)
  const [IsSorted, setIsSorted] = useState(false)
  const [sortBy, setSortBy] = useState("")
  const [sortAsc, setSortAsc] = useState(1) //0 original | 1 -> asc sort | -1 desc sort
  const [pagination, setPagination] = useState(resultNumber ? resultNumber : 5)
  const [actualPage, setActualPage] = useState(1)

   const changeColumnName = (array:string[]) => {
    const result = [...array]
    if (columnReplaceName) {
      for (let i = 0; i < result.length; i++) {
        for (const item of Object.entries(columnReplaceName)) {
          if (result[i].toLowerCase() === item[0].toLowerCase())
            result[i] = item[1]
        }
      }
    }
    return result
  }

  const defineAscOrDesc = (newSortBy:string)=> {
    if (newSortBy === sortBy) {
      if (sortAsc === 1)
        setSortAsc(-1)
      else if (sortAsc === -1)
        setSortAsc(0)
      else
        setSortAsc(1)
    }
    else {
      setSortAsc(1)
      setSortBy(newSortBy)
    }
  }

  //When data are filtered we can sort them and slice them if necessary
  useEffect(() => {
    const newData = sortData(IsSorted, filteredData, sortBy)
    const debutSlice = calcSlice(newData.length, actualPage, pagination)[0]
    const finSlice = calcSlice(newData.length, actualPage, pagination)[1]
    if (sortAsc === 1)
      setDataSorted(newData.slice(debutSlice, finSlice))
    else if (sortAsc === -1)
      setDataSorted(newData.reverse().slice(debutSlice, finSlice))
    else if (sortAsc === 0)
      setDataSorted(filteredData.slice(debutSlice, finSlice))
  }, [sortBy, sortAsc, filteredData, pagination, actualPage])

  //This useEffect enable to filter data with user's input
  useEffect(() => {
    const filteredArray = []
    for (const entry of data) {
      let toAdd = false
      for (const property in entry) {
        if (new String(entry[property]).toLowerCase().includes(filter.toLowerCase().trim()))
          toAdd = true
      }
      if (toAdd)
        filteredArray.push(entry)
    }
    setFilteredData(filteredArray)
  }, [filter])

  const listOfProperties = (createPropertiesArray(data, hideColumn))
  const listOfPropertiesTranslated = (changeColumnName(listOfProperties))
  return (
    <>
      <div id={uniqueID} className="MyTable">
        <div className="MyTableHeader">
          <SelectResultPage
            pagination={pagination}
            setPagination={setPagination}
            uniqueID={uniqueID}
            resultNumber={resultNumber}
            resultNumberGap={resultNumberGap}
          />

          <input type="text" value={filter} placeholder="Search" onChange={e => setFilter(e.target.value)} />
        </div>
        <CreateTable
          objectList={dataSorted}
          isSorted={setIsSorted}
          sortAsc={defineAscOrDesc}
          actualSort={{ sortBy, sortAsc }}
          propertiesList={listOfProperties}
          propertiesListReplaced={listOfPropertiesTranslated}
        />
        <Pagination
          page={actualPage}
          itemPerPage={pagination}
          itemNumber={filteredData.length}
          changePage={setActualPage} />
      </div>
    </>
  )
}
