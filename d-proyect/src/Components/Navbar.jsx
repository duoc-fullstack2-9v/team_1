import { NavLink } from "react-router-dom"

const navLinks = [
  { href: "/", label: "Helados Dooc" },
  { href: "/productos", label: "Productos" },
  { href: "/franquicias", label: "Franquicias" },
  { href: "#", label: "Novedades" },
  { href: "/donde-estamos", label: "Dónde Estamos" },
  { href: "/contacto", label: "Contacto" },
]

export default function Navbar() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div className="container-fluid">
          {/* Logo */}
          <NavLink className="navbar-brand" to="/">
            <img src="/logo.jpg" alt="Logo" width="60" />
          </NavLink>

          {/* Botón hamburguesa */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasMenu"
            aria-controls="offcanvasMenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menú lateral */}
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
                      <NavLink className="nav-link" to={link.href}>{link.label}</NavLink>
                    ) : (
                      <a className="nav-link" href={link.href}>{link.label}</a>
                    )}
                  </li>
                ))}
              </ul>

              <hr />

              {/* Iconos de login y redes */}
              <div className="d-flex gap-3">
                <NavLink to="/login" className="social-link">
                  <i className="bi bi-box-arrow-in-right"></i>
                </NavLink>
                <a href="#" className="social-link">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="bi bi-tiktok"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}