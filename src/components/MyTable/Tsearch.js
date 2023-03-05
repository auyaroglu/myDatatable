
import { TableContext, useContext } from "./Context"

const Tsearch = () => {
    
    const {search, setSearch} = useContext(TableContext)

    return (
        <>
            <input placeholder="Tabloda ara" type="search" className='my-search' onChange={e => setSearch(e.target.value)} value={search} />
        </>
    )
}

export default Tsearch