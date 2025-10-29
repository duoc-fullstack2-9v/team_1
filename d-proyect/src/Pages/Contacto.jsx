import React from "react";
import "../styles/Contacto.css";

export default function Contacto() {
  return (
    <section className="contacto-section py-5">
      <div className="container">
        {/* Título */}
        <div className="text-center mb-5">
          <h2 className="fw-bold text-dooc">Contáctanos</h2>
          <p className="text-muted">
            Tu opinión es muy importante para nosotros. <br></br> 
            Si tienes alguna sugerencia o reclamo completa este formulario para poder contactarnos contigo.
          </p>
        </div>

        {/* Mapa + Formulario */}
        <div className="row g-4 align-items-stretch">
          {/* Mapa */}
          <div className="col-md-6 d-flex">
            <div className="map-container flex-fill rounded-4 shadow-sm">
              <iframe
                title="Ubicación Helados Dooc"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3743.6450411990845!2d-70.143!3d-20.232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915220f90cde5cf3%3A0xb4b61a5edb0b39ea!2sLos%20Jazmines%201815%2C%20Iquique%2C%20Tarapac%C3%A1!5e0!3m2!1ses!2scl!4v1698790092378!5m2!1ses!2scl"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Formulario */}
          <div className="col-md-6 d-flex">
            <form className="formulario-contacto flex-fill rounded-4 shadow-sm p-4">
              <h4 className="text-dooc mb-4 text-center">Envíanos un mensaje</h4>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input type="text" className="form-control" placeholder="Tu nombre" />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" placeholder="tucorreo@ejemplo.com" />
              </div>
              <div className="mb-3">
                <label className="form-label">Mensaje</label>
                <textarea className="form-control" rows="3" placeholder="Escríbenos aquí..."></textarea>
              </div>
              <button type="submit" className="btn-enviar w-100">Enviar mensaje</button>
            </form>
          </div>
        </div>

        {/* Info de contacto con íconos */}
        <div className="row mt-5 text-center contacto-info">
          <div className="col-md-4">
            <i className="bi bi-geo-alt-fill icono-contacto"></i>
            <h5 className="fw-bold mt-2">Dirección</h5>
            <p>Los Jazmines 1815, Iquique, Tarapacá</p>
          </div>
          <div className="col-md-4">
            <i className="bi bi-telephone-fill icono-contacto"></i>
            <h5 className="fw-bold mt-2">Teléfono</h5>
            <p>+56 9 7654 3210</p>
          </div>
          <div className="col-md-4">
            <i className="bi bi-envelope-fill icono-contacto"></i>
            <h5 className="fw-bold mt-2">Correo</h5>
            <p>info@heladosdooc.cl</p>
          </div>
        </div>
      </div>
    </section>
  );
}