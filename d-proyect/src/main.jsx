import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import "bootstrap-icons/font/bootstrap-icons.css"
import Home from './Pages/Home.jsx'
import Productos from './Pages/Productos.jsx'
import Login from './Pages/Login.jsx'
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
        <Route path="/Login" element={<Login />} />
        <Route path="/DondeEstamos" element={<DondeEstamos/>} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/Navbar" element={<Navbar />} />
        <Route path="/Footer" element={<Footer />} />
        <Route path="/franquicias" element={<Franquicias />} />
      </Routes>
      <Footer />
    </HashRouter>
  </StrictMode>,
  )