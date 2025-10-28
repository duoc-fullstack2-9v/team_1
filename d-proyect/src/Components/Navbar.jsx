import { useState } from "react";
import { NavLink } from "react-router-dom";
import Carrito from "../Components/Carrito";
import { useCart } from "../Context/CartContext"; 
import "../styles/Navbar.css";

const navLinks = [
  { href: "/", label: "Helados Dooc" },
  { href: "/productos", label: "Productos" },
  { href: "/franquicias", label: "Franquicias" },
  { href: "#", label: "Novedades" },
  { href: "/donde-estamos", label: "Dónde Estamos" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const { cartItems } = useCart(); // corregido: antes decía "cart"

  const toggleCarrito = () => setMostrarCarrito(!mostrarCarrito);

  // protegemos con "?.reduce" para evitar error si cartItems está vacío
  const totalItems = cartItems?.reduce((acc, item) => acc + item.cantidad, 0) || 0;

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img src="/logo.jpg" alt="Logo" width="60" />
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasMenu"
            aria-controls="offcanvasMenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasMenu">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title">Menú</h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
            </div>

            <div className="offcanvas-body">
              <ul className="navbar-nav flex-grow-1 mb-3">
                {navLinks.map((link, i) => (
                  <li className="nav-item" key={i}>
                    {link.href.startsWith("/") ? (
                      <NavLink className="nav-link" to={link.href}>
                        {link.label}
                      </NavLink>
                    ) : (
                      <a className="nav-link" href={link.href}>{link.label}</a>
                    )}
                  </li>
                ))}
              </ul>

              <hr />

              <div className="d-flex gap-3 align-items-center">
                <NavLink to="/login" className="social-link text-dark">
                  <i className="bi bi-box-arrow-in-right fs-4"></i>
                </NavLink>
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="social-link text-dark">
                  <i className="bi bi-facebook fs-4"></i>
                </a>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="social-link text-dark">
                  <i className="bi bi-instagram fs-4"></i>
                </a>
                <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" className="social-link text-dark">
                  <i className="bi bi-tiktok fs-4"></i>
                </a>

                {/* Botón Carrito */}
                <button
                  data-testid="btn-carrito"
                  onClick={toggleCarrito}
                  className="social-link btn-carrito position-relative"
                >
                  <i className="bi bi-cart4 fs-4"></i>
                  {totalItems > 0 && <span className="badge rounded-pill">{totalItems}</span>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {mostrarCarrito && <Carrito onClose={() => setMostrarCarrito(false)} />}
    </header>
  );
}