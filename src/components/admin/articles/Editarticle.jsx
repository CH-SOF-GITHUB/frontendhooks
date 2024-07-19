import React, { useEffect, useState } from 'react'
import './insertarticle.css'
import { Modal } from 'react-bootstrap'
import { fetchscategories } from '../../../services/scategorieservice'
import { addarticle, editarticle } from '../../../services/articleservice'
// import filepond
import axios from 'axios'
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview' 
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css' 
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview) 


const Editarticle = ({showe, art, handleClose, modifarticle}) => {
  //console.log('bonjour');
  const [article, setArticle] = useState(art)
  const [scategories, setScategories] = useState([])

  // import image filepond
  const [files, setFiles] = useState ([])

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

  // method handle change by value
  const handleChange = (e) => {
    setArticle({...article, [e.target.id]: e.target.value})
  }

  // load state data
  useEffect(() => {
    loadscategories()
    setFiles([{
        source: art.imageart,
        options: {type: 'local'}
      }
    ])
  },[])
  
  
  /**
   * The function `serverOptions` processes a file upload by sending it to Cloudinary and updating the
   * state with the uploaded image URL.
   * @returns The `serverOptions` function returns an object with a `process` method that handles file
   * uploads to Cloudinary. The `process` method logs the file, creates a FormData object with the file
   * and necessary upload parameters, then makes a POST request to Cloudinary API to upload the file.
   * If successful, it logs the response data, updates the `article` state with the uploaded image URL,
   * and
   */
  const serverOptions = () => {
    return {
      load: (source, load, error, progress, abort, headers) => {
        var myRequest = new Request(source);
        fetch(myRequest).then(response => response.blob().then((myBlob) => load(myBlob)))
      },
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
  //
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      // methode pour le service et méthode pour state
      await editarticle(article).then((res => {
        modifarticle(article) 
    })) 
      handleClose()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='form-container'>
      <Modal show={showe} onHide={() => handleClose()}>
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
                  onChange={e => handleChange(e)}
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
                  onChange={e => handleChange(e)}
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
                  onChange={e => handleChange(e)}
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
                  onChange={e => handleChange(e)}
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
                  onChange={e => handleChange(e)}
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
                  onChange={e => handleChange(e)}
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
          <button type='button' className='form-reset-button'
            onClick={() => handleClose()}>
              Annuler
          </button>
        </Modal.Footer>
        </form>
      </Modal>
    </div>
  )
}

export default Editarticle
