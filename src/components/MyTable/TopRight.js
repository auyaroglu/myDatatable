import { TableContext, useContext } from "./Context"
import { FaEye, FaCheck } from "react-icons/fa"

const TshowSelect = () => {

    const { setPaginate, setCurrentPage, paginate, columnFilter, headState, setHeadState } = useContext(TableContext)

    const mySelectChange = (value) => {
        setCurrentPage(1)
        setPaginate(value)
    }

    const changeHeadState = (item, key) => {
        item.classList.toggle('passive')        
        setHeadState(headState.map((headItem, headKey) => {
            if(headKey === key) {
                return {...headItem, show: (headState[key].show === true) ? false : true}
            } else {
                return headItem
            }
        }))
    }

    return (
        <>
            <span>Show</span>
            <select className='my-select' onChange={(e) => mySelectChange(e.target.value)} value={paginate}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
            </select>
            {columnFilter && (
                <button className='column-filter'>
                    <FaEye />
                    <span>COLUMNS</span>
                    <ul>
                        {headState.map((item, key) =>
                            <li className={item.show === false ? 'passive' : undefined} key={key} onClick={(e) => changeHeadState(e.target, key)}>
                                <FaCheck />
                                {item.title}
                            </li>
                        )}
                    </ul>
                </button>
            )}
        </>
    )
}

export default TshowSelect