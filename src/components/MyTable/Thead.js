import { TableContext, useContext } from "./Context"
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa"

const Thead = () => {

    const { headState, sorting, setSorting } = useContext(TableContext)

    return (
        <>
            {headState.map((item, key) =>
            (
                item.show && (
                    <th width={item?.width} key={key}>
                        {!item.sortable && (<span>{item.title}</span>)}
                        {item.sortable && (
                            <button onClick={() => {
                                if (sorting?.key === key) {
                                    setSorting({
                                        key,
                                        orderBy: sorting.orderBy === 'asc' ? 'desc' : 'asc'
                                    })
                                } else {
                                    setSorting({
                                        key,
                                        orderBy: 'asc'
                                    })
                                }
                            }}>
                                {item.title}
                                {sorting?.key === key && (
                                    sorting.orderBy === 'asc' ? <FaSortDown /> : <FaSortUp />
                                )}
                                {sorting?.key !== key && <FaSort color="#bbbbbb" />}
                            </button>)
                        }
                    </th>
                )
            )
            )}
        </>
    )
}

export default Thead