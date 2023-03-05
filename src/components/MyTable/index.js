import React, { useEffect, useState } from 'react'

import { TableContext } from './Context'

import "./css/MyTable.scss"
import Thead from './Thead'
import Tbody from './Tbody'
import Tpaginate from './Tpaginate'
import TopRight from './TopRight'
import Tsearch from './Tsearch'

const MyTable = ({ head, body, searchable = true, pagination = 5, page = 1, columnFilter = false }) => {

    const [search, setSearch] = useState('')
    const [sorting, setSorting] = useState(false)
    const [paginate, setPaginate] = useState(pagination)
    const [currentPage, setCurrentPage] = useState(page)
    const [headState, setHeadState] = useState(head)

    // Post per page
    const indexOfLastPost = currentPage * paginate
    const indexOfFirstPost = indexOfLastPost - paginate
    const items = body.slice(indexOfFirstPost, indexOfLastPost)
    const [filteredData, setFilteredData] = useState(
        items.filter(
            filterItems => filterItems.some((item, key) => {
                switch (headState[key].type) {
                    case 'number':
                        item = Number(item)
                        break;
                    case 'text':
                    case 'currency':
                        item = item.toString().replace(/[/,.-]/g, '') + item.toString()
                        break;
                    case 'date':
                    case 'content':
                        item = item?.props?.searchabletext
                        if (headState[key].contentType === "number")
                            item = Number(item)
                        else
                            item = item.toString().replace(/[/,.-]/g, '') + item.toString()
                        break;
                    default:

                        break;
                }
                return item.toString().toLocaleLowerCase('TR').includes(search.toLocaleLowerCase('TR'))
            }))
            .sort((a, b) => {
                switch (headState[sorting.key]?.type) {
                    case 'number':
                    case 'currency':
                        if (sorting?.orderBy === 'asc') {
                            return a[sorting.key].toString().localeCompare(b[sorting.key], undefined, { numeric: true })
                        }
                        if (sorting?.orderBy === 'desc') {
                            return b[sorting.key].toString().localeCompare(a[sorting.key], undefined, { numeric: true })
                        }
                        break;
                    case 'content':
                        if (headState[sorting.key]?.contentType === "number") {
                            if (sorting?.orderBy === 'asc') {
                                return a[sorting.key]?.props.searchabletext.toString().localeCompare(b[sorting.key]?.props.searchabletext, undefined, { numeric: true })
                            }
                            if (sorting?.orderBy === 'desc') {
                                return b[sorting.key]?.props.searchabletext.toString().localeCompare(a[sorting.key]?.props.searchabletext, undefined, { numeric: true })
                            }
                        } else {
                            if (sorting?.orderBy === 'asc') {
                                return a[sorting.key]?.props.searchabletext.toString().localeCompare(b[sorting.key]?.props.searchabletext)
                            }
                            if (sorting?.orderBy === 'desc') {
                                return b[sorting.key]?.props.searchabletext.toString().localeCompare(a[sorting.key]?.props.searchabletext)
                            }
                        }
                        break;
                    case 'date':
                        if (sorting?.orderBy === 'asc') {
                            return new Date(a[sorting.key]?.props.searchabletext.toString()) - new Date(b[sorting.key]?.props.searchabletext.toString())
                        }
                        if (sorting?.orderBy === 'desc') {
                            return new Date(b[sorting.key]?.props.searchabletext.toString()) - new Date(a[sorting.key]?.props.searchabletext.toString())
                        }
                        break;
                    case 'text':
                    default:
                        if (sorting?.orderBy === 'asc') {
                            return a[sorting.key].toString().localeCompare(b[sorting.key])
                        }
                        if (sorting?.orderBy === 'desc') {
                            return b[sorting.key].toString().localeCompare(a[sorting.key])
                        }
                        break;
                }
            })
    )

    useEffect(() => {
        setFilteredData(
            items.filter(
                filterItems => filterItems.some((item, key) => {
                    switch (headState[key].type) {
                        case 'number':
                            item = Number(item)
                            break;
                        case 'text':
                        case 'currency':
                            item = item.toString().replace(/[/,.-]/g, '') + item.toString()
                            break;
                        case 'date':
                        case 'content':
                            item = item?.props?.searchabletext
                            if (headState[key].contentType === "number")
                                item = Number(item)
                            else
                                item = item.toString().replace(/[/,.-]/g, '') + item.toString()
                            break;
                        default:

                            break;
                    }
                    return item.toString().toLocaleLowerCase('TR').includes(search.toLocaleLowerCase('TR'))
                }))
                .sort((a, b) => {
                    switch (headState[sorting.key]?.type) {
                        case 'number':
                        case 'currency':
                            if (sorting?.orderBy === 'asc') {
                                return a[sorting.key].toString().localeCompare(b[sorting.key], undefined, { numeric: true })
                            }
                            if (sorting?.orderBy === 'desc') {
                                return b[sorting.key].toString().localeCompare(a[sorting.key], undefined, { numeric: true })
                            }
                            break;
                        case 'content':
                            if (headState[sorting.key]?.contentType === "number") {
                                if (sorting?.orderBy === 'asc') {
                                    return a[sorting.key]?.props.searchabletext.toString().localeCompare(b[sorting.key]?.props.searchabletext, undefined, { numeric: true })
                                }
                                if (sorting?.orderBy === 'desc') {
                                    return b[sorting.key]?.props.searchabletext.toString().localeCompare(a[sorting.key]?.props.searchabletext, undefined, { numeric: true })
                                }
                            } else {
                                if (sorting?.orderBy === 'asc') {
                                    return a[sorting.key]?.props.searchabletext.toString().localeCompare(b[sorting.key]?.props.searchabletext)
                                }
                                if (sorting?.orderBy === 'desc') {
                                    return b[sorting.key]?.props.searchabletext.toString().localeCompare(a[sorting.key]?.props.searchabletext)
                                }
                            }
                            break;
                        case 'date':
                            if (sorting?.orderBy === 'asc') {
                                return new Date(a[sorting.key]?.props.searchabletext.toString()) - new Date(b[sorting.key]?.props.searchabletext.toString())
                            }
                            if (sorting?.orderBy === 'desc') {
                                return new Date(b[sorting.key]?.props.searchabletext.toString()) - new Date(a[sorting.key]?.props.searchabletext.toString())
                            }
                            break;
                        case 'text':
                        default:
                            if (sorting?.orderBy === 'asc') {
                                return a[sorting.key].toString().localeCompare(b[sorting.key])
                            }
                            if (sorting?.orderBy === 'desc') {
                                return b[sorting.key].toString().localeCompare(a[sorting.key])
                            }
                            break;
                    }
                })
        )
    }, [headState, search, paginate, sorting, currentPage])

    const resetDefault = () => {
        setCurrentPage(page)
        setPaginate(pagination)
        setSorting(false)
        setSearch('')
    }

    const data = {
        search,
        setSearch,
        sorting,
        setSorting,
        paginate,
        setPaginate,
        currentPage,
        setCurrentPage,
        headState,
        setHeadState,
        filteredData,
        setFilteredData,
        columnFilter,

    }

    return (
        <TableContext.Provider value={data}>
            <div className="my-table">
                <div className="my-table-top">
                    <div className="my-block">
                        {searchable && <Tsearch />}
                        {
                            (pagination !== parseInt(paginate) || page !== currentPage || sorting !== false || search !== '') &&
                            <span className="reset" onClick={resetDefault}>Reset to default</span>
                        }
                    </div>
                    <div className="my-block">
                        <TopRight />
                    </div>
                </div>
                <table>
                    <thead>
                        <tr><Thead /></tr>
                    </thead>
                    <tbody><Tbody /></tbody>
                </table>
                <div className="my-table-info">
                    <Tpaginate recordCount={body.length} firstPost={indexOfFirstPost} lastPost={indexOfLastPost} />
                </div>
            </div>
        </TableContext.Provider>
    )
}

export default MyTable