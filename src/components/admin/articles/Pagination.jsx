import React from 'react'
import "./article.css"


const Pagination = ({handleNext, currentPage, handlePageChange, handlePrev, totalPages}) => {
  return (
    <div className='pagination'>
      <button onClick={() => handlePrev()} disabled={currentPage === 1}>previous</button>
      {Array.from({ length: totalPages }, (_, index) => (           
        <button key={index}             
                onClick={() => handlePageChange(index + 1)}             
                disabled={currentPage === index + 1}             
                className={currentPage === index + 1 ? 'page-link active' : ''}           
        >            
        {index + 1}           
        </button>))
      }
      <button onClick={() => handleNext()} disabled={currentPage === totalPages}>Next</button>
    </div>
  )
}

export default Pagination