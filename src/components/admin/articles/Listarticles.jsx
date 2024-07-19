import React, { useEffect, useState } from 'react'
import { deletearticle, fetcharticlesPagination } from '../../../services/articleservice'
import Affichearticle from './Affichearticle'
import Pagination from './Pagination'
import './article.css'
import Headerarticle from './Headerarticle'
//
import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import Insertarticle from './Insertarticle'
//

const Listarticles = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [articles, setArticles] = useState([])
  const [limit, setLimit] = useState(5)
  const [searchText, setSearchText] = useState('')
  //modal state show
  const [show, setShow] = useState(false);

  //
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

  const handleDeleteArticle = async (id, ref) => {
    confirmAlert({
      title: 'Confirm delete ...',
      message: " supprimer l'article : " + ref,
      buttons: [
        {
          label: 'Oui',
          onClick: () =>
            deletearticle(id)
              .then(res => fetchProducts(currentPage, limit))
              .catch(error => console.log(error.message))
        },
        {
          label: 'Non'
        }
      ]
    })
  }
  // methods of model
  const handleClose = () => {
    setShow(false);
  }

  return (
    <div>
      <button className='new' onClick={() => setShow(true)}>
        <i className="fa-solid fa-plus-square"></i>
        Nouveau
      </button>
      {
        show && <Insertarticle handleClose={handleClose} show={show} fetchProducts={fetchProducts} limit={limit} />
      }
      <Headerarticle
        searchText={searchText}
        handleSearchtext={handleSearchtext}
      />
      <Affichearticle
        articles={articles}
        handleLimitChange={handleLimitChange}
        limit={limit}
        handleDeleteArticle={handleDeleteArticle}
      />
      <Pagination
        handleNext={handleNexPage}
        handlePrev={handlePrevPage}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  )
}

export default Listarticles
