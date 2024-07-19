import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Listarticles from './components/admin/articles/Listarticles'
import Editarticle from './components/admin/articles/Editarticle'
import Insertarticle from './components/admin/articles/Insertarticle'
import Listarticlescard from './components/client/Listarticlescard'
import Menu from './components/Menu'
import Listcategories from './components/admin/categories/Listcategories'
import Editcategorie from './components/admin/categories/Editcategorie'
import Insertcategorie from './components/admin/categories/Insertcategorie'

function App () {
  return (
    <>
      <Router>
      <Menu />
        <Routes>
          <Route path='/articles' element={<Listarticles />} />
          <Route path='/articles/edit/:id' element={<Editarticle />} />
          <Route path='/articles/add/:id' element={<Insertarticle />} />
          <Route path='/categories' element={<Listcategories />} />
          <Route path='/categories/edit/:id' element={<Editcategorie />} />
          <Route path='/categories/add/:id' element={<Insertcategorie />} />
          <Route path='/articles/card' element={<Listarticlescard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
