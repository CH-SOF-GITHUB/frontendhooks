import React from 'react'
import "./article.css"

const Headerarticle = ({searchText, handleSearchtext}) => {
  return (
    <div className='search-container mt-2'>
            <i className='fa-solid fa-search'></i>
            <input
            type='text'
            placeholder='chercher les articles ...'
            className='search-input'
            value={searchText}
            onChange={handleSearchtext}
            />
    </div>
  )
}

export default Headerarticle
