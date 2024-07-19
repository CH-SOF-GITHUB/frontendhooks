import React, { useEffect, useState } from 'react'
import './insertarticle.css'
import { Modal } from 'react-bootstrap'
import { fetchscategories } from '../../../services/scategorieservice'
import { addarticle } from '../../../services/articleservice'
// import filepond
import axios from 'axios'
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview' 
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css' 
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview) 



const Insertarticle = ({ handleClose, show, fetchProducts, limit }) => {
  const [article, setArticle] = useState({})
  const [scategories, setScategories] = useState([])
  // import image filepond
  const [files, setFiles] = ([])
  // Fetch sous-catégories
  const loadscategories = async() => {
    try {
      await fetchscategories().then(res => {
        setScategories(res.data)
        console.log(res.data)
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    loadscategories()
  },[])

  //method handleSubmit
  const handleSubmit = async(event) => {
    event.preventDefault();
    //logique pour soumettre le formulaire
    await addarticle(article);
    fetchProducts(1, limit, '');
    //
    handleClose();
    // réinitialiser les champs de la formulaire
    setArticle({});
  }

  //filepond method
  const serverOptions = () => {
    return {
      process: (fieldName, file, metadata, load, progress, abort) => {
        console.log(file);
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'cloudesps');
        data.append('cloud_name', 'dneirf6b8');
        data.append('public_id', file.name);

        axios.post('https://api.cloudinary.com/v1_1/dneirf6b8/image/upload', data)
        .then(res => res.data)
        .then((data) => {
          console.log(data);
          setArticle({...article, imageart: data.url})
          load(data)
        }).catch((error) => { 
          console.error('Error uploading file:', error); 
          error('Upload failed'); abort(); 
        }); 
      }
    }
  }

  return (
    <div className='form-container'>
      <Modal show={show} onHide={() => handleClose()}>
        <form className='article-form' onSubmit={(e) => handleSubmit(e)}>
          <Modal.Header closeButton>
            <h2>Ajouter Article</h2>
          </Modal.Header>
          <Modal.Body>
            <div className='form-grid'>
              <div className='form-group'>
                <label htmlFor='title'>Référence</label>
                <input
                  type='text'
                  id='reference'
                  value={article.reference}
                  onChange={e =>
                    setArticle({ ...article, reference: e.target.value })
                  }
                  className='form-input'
                  placeholder='Entrez référence article'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='description'>Désignation</label>
                <input
                  type='text'
                  id='designation'
                  value={article.designation}
                  onChange={e =>
                    setArticle({ ...article, designation: e.target.value })
                  }
                  className='form-input'
                  placeholder='Entrez la désignation article'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='marque'>Marque</label>
                <input
                  type='text'
                  id='marque'
                  value={article.marque}
                  onChange={e =>
                    setArticle({ ...article, marque: e.target.value })
                  }
                  className='form-input'
                  placeholder='Entrez marque'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='quantite'>Quantité</label>
                <input
                  type='number'
                  id='qtestock'
                  value={article.qtestock}
                  onChange={e =>
                    setArticle({ ...article, qtestock: e.target.value })
                  }
                  className='form-input'
                  placeholder='Entrez quantité stock'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='prix'>Prix</label>
                <input
                  type='number'
                  required
                  id='prix'
                  value={article.prix}
                  onChange={e =>
                    setArticle({ ...article, prix: e.target.value })
                  }
                  className='form-input'
                  placeholder='Entrez Quantité stock'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='prix'>Catégorie</label>
                <select
                  id='category'
                  className='form-control'
                  value={article.scategorieID}
                  onChange={e =>
                    setArticle({ ...article, scategorieID: e.target.value })
                  }
                >
                  {scategories.map((scat, index) => (
                    <option key={index} value={scat._id}>
                      {scat.nomscategorie}
                    </option>
                  ))}
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='prix'>Image</label>
                <div style={{ width: "80%", margin: "auto", padding: "1%"}}>
                  <FilePond
                  files={files}
                  acceptedFileTypes="image/*"
                  onupdatefiles={setFiles}
                  allowMultiple={true}
                  server={serverOptions()}
                  name="file"
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
          <button type='submit' className='form-submit-button'>Enregistrer</button>
          <button type='button' className='form-reset-button'>Annuler</button>
        </Modal.Footer>
        </form>
      </Modal>
    </div>
  )
}

export default Insertarticle
