import { Data } from "../types"
/**
 * @param {[Object]} originalArray original data's from user, an array of objects
 * @returns {[String]} list of all properties in all objects
 * In first time we check if property must be shown or not.
 * If we want to see it, we check if we have already add it in list of property
 * In last we add it if we don't have it in our list.
 */
export function createPropertiesArray(originalArray: Data[], hideColumn?: string[]) {
    const propertiesList = []
    for (const entryOfOriginalArray of originalArray) {
        for (const property of Object.entries(entryOfOriginalArray)) {
            let addItem = true
            if (hideColumn)
                for (const column of hideColumn) {
                    if (property[0].toLowerCase() === column.toLowerCase())
                        addItem = false
                    break;
                }
            for (const item of propertiesList) {
                if (item.toLowerCase() === property[0].toLowerCase())
                    addItem = false
            }
            addItem && propertiesList.push(property[0])
        }
    }
    return propertiesList
}
/**
 * This function sort data
 */
export function sortData(isSorted: boolean, data: Data[], sortBy: string): Data[] {
    if (isSorted) {
        const TemporarydataSorted = [...data]
        TemporarydataSorted.sort((a, b) => {
            let valeurA = null
            let valeurB = null
            a[sortBy] ? valeurA = new String(a[sortBy]) : valeurA = ""
            b[sortBy] ? valeurB = new String(b[sortBy]) : valeurB = ""
            console.log(sortBy)
            const regexDate = /(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})/gm
            if (valeurA.match(regexDate)) {
                return sortByDate(a, b, sortBy)
            }
            else {
                valeurB = new String(b[sortBy]).toUpperCase()
                valeurA = new String(a[sortBy]).toUpperCase()
            }
            if (valeurA < valeurB || !b[sortBy]) {
                return -1
            }
            if (valeurB < valeurA || !a[sortBy]) {
                return 1
            }
            return 0
        })
        return TemporarydataSorted
    }
    return data
}
/**
 * In sortData function, in .map
 * if datas are date so we use this function
 * @param {*} a 
 * @param {*} b 
 * @param {*} sortBy 
 * @returns 
 */
function sortByDate(a: Data, b: Data, sortBy: keyof Data) {

    let decomposedDateA: string[] = []
    let decomposedDateB: string[] = []

    /**
     * Demander au mentor si le as string est recommandé. Je n'arrive pas à faire comprendre a typescript que le type de data est obligatoirement de type string.
     * Même en rajoutant des conditions basés sur le typage de a[sortBy]
     */
    const valueA: string = a[sortBy] as string
    const valueB: string = b[sortBy] as string

    decomposedDateA = valueA.split('/')
    decomposedDateB = valueB.split('/')

    const yearA = decomposedDateA[2]
    const yearB = decomposedDateB[2]
    const monthA = decomposedDateA[1]
    const monthB = decomposedDateB[1]
    const dayA = decomposedDateA[0]
    const dayB = decomposedDateB[0]
    if (yearA < yearB)
        return -1
    else if (yearB < yearA)
        return 1
    else {
        if (monthA < monthB)
            return -1
        else if (monthB < monthA)
            return 1
        else {
            if (dayA < dayB)
                return -1
            else if (dayB < dayA)
                return 1
            else
                return 0
        }
    }
}
export function calcSlice(length: number, actualPage: number, pagination: number): number[] {
    if (actualPage === 1 || length / pagination <= 1)
        return [0, pagination]
    else {
        return [(actualPage - 1) * pagination, actualPage * pagination]
    }
}