export default function Footer() {
  return (
    <footer className="footer bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>
              <i className="bi bi-snow"></i> Helados <span className="text-dooc">Dooc</span>
            </h5>
            <p>Dulces momentos en Iquique desde 2015</p>
          </div>

          <div className="col-md-4">
            <h5>Síguenos</h5>
            <div className="d-flex gap-3">
              <a href="#" className="text-white"><i className="bi bi-facebook fs-4"></i></a>
              <a href="#" className="text-white"><i className="bi bi-instagram fs-4"></i></a>
              <a href="#" className="text-white"><i className="bi bi-tiktok fs-4"></i></a>
            </div>
          </div>

          <div className="col-md-4">
            <h5>Newsletter</h5>
            <div className="input-group">
              <input type="email" className="form-control" placeholder="Tu email" />
              <button className="btn btn-dooc" type="button">Enviar</button>
            </div>
          </div>
        </div>

        <hr />
        <div className="text-center">
          <p className="mb-0">&copy; 2025 Helados Dooc Iquique - Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  )
}
