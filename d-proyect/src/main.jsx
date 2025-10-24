import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import "bootstrap-icons/font/bootstrap-icons.css"
import Home from './Pages/Home.jsx'
import Productos from './Pages/Productos.jsx'
import Login from './Pages/Login.jsx'
import Contacto from './Pages/Contacto.jsx'
import DondeEstamos from './Pages/DondeEstamos.jsx'
import Registro from './Pages/Registro.jsx'
import Navbar from './Components/Navbar.jsx'  
import Footer from './Components/Footer.jsx'   
import { HashRouter, Route, Routes } from 'react-router-dom'
import './styles/Styles.css'
import './styles/Login.css'
import './styles/Registro.css'
import Franquicias from './Pages/Franquicias.jsx'

localStorage.setItem('usuario', 'francis.oses@duocuc.cl');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/donde-estamos" element={<DondeEstamos />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/franquicias" element={<Franquicias />} />
        <Route path="/contacto" element={<Contacto/>} />
      </Routes>
      <Footer />
    </HashRouter>
  </StrictMode>,
)