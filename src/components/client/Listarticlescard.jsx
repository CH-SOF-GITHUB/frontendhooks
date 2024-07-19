import React, { useEffect, useState } from 'react'
import { fetcharticlesPagination } from '../../services/articleservice'
import Cardarticle from './Cardarticle'
import Pagination from '../admin/articles/Pagination'

const Listarticlescard = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [articles, setArticles] = useState([])
  const [limit, setLimit] = useState(20)
  const [searchText, setSearchText] = useState('')

  const fetchProducts = async (page, limit) => {
    try {
      const res = await fetcharticlesPagination(page, limit, searchText)
      setArticles(res.data.products)
      setTotalPages(res.data.totalPages)
      console.log(res.data.products)
      console.log(res.data.totalPages)
      console.log(searchText)
    } catch (error) {
      console.log(error)
    }
  }

  /* The `useEffect` hook in the code snippet is used to perform side effects in function components.
  In this case, the `useEffect` hook is calling the `fetchProducts` function with the `currentPage`
  and `limit` values as arguments whenever the `currentPage` or `limit` values change. */

  useEffect(() => {
    fetchProducts(currentPage, limit)
  }, [currentPage, limit, searchText])

  /**
   * The function `handlePrevPage` decreases the current page number by 1 if it is greater than 1.
   */
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  /**
   * The function `handleNextPage` increments the current page number by 1 if it is less than the total
   * number of pages.
   */
  const handleNexPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  /**
   * The function `handlePageChange` updates the current page to the specified page.
   */
  const handlePageChange = page => {
    setCurrentPage(page)
  }

  /**
   * The function `handleLimitChange` updates the limit value and resets the current page to 1 based on
   * the input value.
   */
  const handleLimitChange = e => {
    setLimit(parseInt(e.target.value, 10))
    setCurrentPage(1)
  }

  /**
   * The function `handleSearchtext` updates the search text based on the input value.
   */
  const handleSearchtext = e => {
    setSearchText(e.target.value)
  }

  return (
    <>
    <div className='container mt-5' style={{display: "flex", flexWrap:"wrap", gap: 2}}>
      {
        articles.map((art, index) => 
        <Cardarticle image={art.imageart} reference={art.reference} designation={art.designation} prix={art.prix}  />
      )
      }
    </div>
    <Pagination 
        handlePageChange={handlePageChange} 
        handleNext={handleNexPage} 
        handlePrev={handlePrevPage} 
        currentPage={currentPage} 
        totalPages={totalPages} 
    />
    </>
  )
}

export default Listarticlescard