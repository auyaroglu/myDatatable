import { FaAngleRight, FaAngleLeft } from "react-icons/fa"
import { useEffect, useState } from "react"
import { TableContext, useContext } from "./Context"

const Tpaginate = ({recordCount, firstPost, lastPost}) => {
    const { paginate, currentPage, setCurrentPage } = useContext(TableContext)

    const [buttons, setButtons] = useState([])
    const [info, setInfo] = useState(`Showing ${firstPost + 1} to ${(lastPost >= recordCount) ? recordCount : lastPost} of ${recordCount} entries`)
    const buttonCount = Math.ceil(recordCount / paginate)

    function prepareButtons() {
        let buttonArray = []
        if (buttonCount < 6) {
            for (let i = 1; i <= buttonCount; i++) {
                buttonArray.push(<button key={`paginate${i}`} className={currentPage === i ? 'active' : ''} onClick={() => setCurrentPage(i)}>{i}</button>)
            }
        } else {
            buttonArray.push(<button key={`paginate1`} className={currentPage === 1 ? 'active' : ''} onClick={() => setCurrentPage(1)}>1</button>)
            if (currentPage > 3) {
                buttonArray.push(<button key={`paginateDot1`} className="dot">...</button>)
            }
            if (currentPage === buttonCount) {
                buttonArray.push(<button key={`paginate${currentPage - 2}`} onClick={() => setCurrentPage(currentPage - 2)}>{currentPage - 2}</button>)
            }
            if (currentPage > 2) {
                buttonArray.push(<button key={`paginate${currentPage - 1}`} onClick={() => setCurrentPage(currentPage - 1)}>{currentPage - 1}</button>);
            }
            if (currentPage !== 1 && currentPage !== buttonCount) {
                buttonArray.push(<button key={`paginate${currentPage}`} className="active" onClick={() => setCurrentPage(currentPage)}>{currentPage}</button>)
            }
            if (currentPage < buttonCount - 1) {
                buttonArray.push(<button key={`paginate${currentPage + 1}`} onClick={() => setCurrentPage(currentPage + 1)}>{currentPage + 1}</button>);
            }
            if (currentPage === 1) {
                buttonArray.push(<button key={`paginate${currentPage + 2}`} onClick={() => setCurrentPage(currentPage + 2)}>{currentPage + 2}</button>);
            }
            if (currentPage < buttonCount - 2) {
                buttonArray.push(<button key={`paginateDot2`} className="dot">...</button>)
            }
            buttonArray.push(<button key={`paginate${buttonCount}`} className={currentPage === buttonCount ? 'active' : ''} onClick={() => setCurrentPage(buttonCount)}>{buttonCount}</button>)
        }
        return buttonArray
    }

    useEffect(() => {
        setButtons(prepareButtons)
        setInfo(`Showing ${firstPost + 1} to ${(lastPost >= recordCount) ? recordCount : lastPost} of ${recordCount} entries`)
    }, [paginate, recordCount, currentPage])
    return (
        <>
            <span className="info-text">{info}</span>
            <div className="paginate">
                <button className={currentPage === 1 ? "prev passive" : "prev"} onClick={() => setCurrentPage(currentPage - 1)}><FaAngleLeft /></button>
                {buttons.map(item => item)}
                <button className={currentPage === buttonCount ? "next passive" : "next"} onClick={() => setCurrentPage(currentPage + 1)}><FaAngleRight /></button>
            </div>
        </>
    )
}

export default Tpaginate