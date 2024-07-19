import React, { useState } from 'react'
import './article.css'
import Editarticle from './Editarticle';

const Affichearticle = ({ articles , handleLimitChange, limit, handleDeleteArticle, modifarticle  }) => {
    //
    const [art, setArt] = useState({})
    const [showe, setShowe] = useState(false);

    const handleShow = () => {
        setShowe(true)
    }

    const handleClose = () => {
        setShowe(false);
    }

    const handleEdit = (art) => {
        handleShow()
        setArt(art)
    }

  return (
    <div>
      <table className='table table-container'>
        <thead>
          <tr>
            <th>Image</th>
            <th>Référence</th>
            <th>Désignation</th>
            <th>Marque</th>
            <th>Quantité</th>
            <th>Prix</th>
            <th>Modifier</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((art, index) => (
            <tr key={index}>
              <td> 
                <img src={art.imageart} width={80} height={80} />
              </td>
              <td>{art.reference}</td>
              <td>{art.designation}</td>
              <td>{art.marque}</td>
              <td>{art.qtestock}</td>
              <td>{art.prix}</td>
              <td>
                <center><button className='edit' onClick={() => handleEdit(art)}>
                  {' '}
                  <i className='fa-solid fa-pen-to-square'></i>edit
                </button>
                </center>
              </td>
              <td>
                <center>
                <button className='delete' onClick={() => handleDeleteArticle(art._id, art.reference)}>
                  <i class='fa-solid fa-trash'></i>delete
                </button>
                </center>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
            <tr>
                <td colSpan={8}>
                    <div className='limit-selector-container'>
                        <label>
                            Afficher&nbsp;
                            <select value={limit} onChange={handleLimitChange} >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={100}>100</option>
                            </select>
                        </label>
                    </div>
                </td>
            </tr>
        </tfoot>
      </table>
      {showe && <Editarticle 
        showe={showe} 
        art={art} 
        handleClose={handleClose}
        modifarticle={modifarticle}
        />
      }
    </div>
  )
}

export default Affichearticle