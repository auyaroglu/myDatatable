import { TableContext, useContext } from "./Context"

const Tbody = () => {

    const { filteredData, headState } = useContext(TableContext)

    return (
        <>
            {filteredData.map((bodyItems, bodyItemsKey) =>
                <tr key={bodyItemsKey}>
                    {bodyItems.map((bodyItem, bodyItemKey) =>
                        headState[bodyItemKey].show && (
                            <td key={bodyItemKey} data-label={headState[bodyItemKey].title}>
                                {bodyItem}
                            </td>
                        )
                    )}
                </tr>
            )}
        </>
    )
}

export default Tbody