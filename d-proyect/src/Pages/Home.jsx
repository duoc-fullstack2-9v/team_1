import { useState } from "react"
import FlavorCard from "../Components/FlavorCard.jsx"
import TestimonialCard from "../Components/TestimonialCard.jsx"


const flavors = [
  {
    id: 1,
    name: "Chocolate Dooc",
    description: "Nuestro chocolate belga premium con trozos de chocolate semi-amargo.",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    badge: "Más vendido",
  },
  {
    id: 2,
    name: "Fresa Silvestre",
    description: "Fresas orgánicas seleccionadas con un toque de crema dulce.",
    image:
      "frutos.jpg",
    badge: "Nuevo",
  },
  {
    id: 3,
    name: "Dulce de Leche",
    description: "El auténtico sabor argentino con rizos de dulce de leche casero.",
    image: "manjar.jpg",
    badge: "Clásico",
  },
]

const testimonials = [
  {
    id: 1,
    name: "María González",
    role: "Cliente frecuente",
    rating: 5,
    comment: " Los mejores helados de Iquique. El sabor a chocolate es increíble, y el servicio siempre es amable.",
  },
  {
    id: 2,
    name: "Carlos Mendoza",
    role: "Cliente desde 2018",
    rating: 5,
    comment: "Me encanta llevar a mis hijos los fines de semana. Los helados de fruta natural son nuestros favoritos.",
  },
  {
    id: 3,
    name: "Ana Silva",
    role: "Turista",
    rating: 4.5,
    comment: "El lugar perfecto para refrescarse en los calurosos días de Iquique. Recomiendo el helado de mango.",
  },
]

export default function Home() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  })

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    alert("¡Mensaje enviado con éxito!")
    setFormData({ nombre: "", email: "", asunto: "", mensaje: "" })
  }

  return (
    <div className="home-page">

      <section className="banner-section">
        <div className="banner-content">
          <h1 className="banner-title">
            ¡Conoce nuestra <br />
            <strong>Tienda!</strong>
          </h1>
          <p className="banner-subtitle">en Iquique</p>
          <div className="banner-info">
            <p className="info-item">📍 Direccion, Iquique</p>
            <p className="info-item">📅 Lunes a Domingo de 10:00 a 20:30 hrs.</p>
          </div>
        </div>
        <div className="banner-image">
          <img src="tiendahdooc.jpeg" alt="Tienda Helados Dooc" />
        </div>
      </section>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1 className="hero-title">
            Helados <span className="text-dooc">Dooc</span>
          </h1>
          <p className="hero-subtitle">Los sabores más cremosos de Iquique</p>
          <button className="btn-dooc btn-lg">
            <i className="bi bi-arrow-down-circle"></i> Descubrir sabores
          </button>
        </div>
      </section>

      {/* sabores */}
      <section id="sabores" className="flavors-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Nuestros <span className="text-dooc">Sabores</span> Estrella
            </h2>
            <p className="section-subtitle">Hechos con ingredientes 100% naturales y amor</p>
          </div>
          <div className="flavors-grid">
            {flavors.map((flavor) => (
              <FlavorCard key={flavor.id} {...flavor} />
            ))}
          </div>
          <div className="section-footer">
            <button className="btn-dooc btn-lg">
              <i className="bi bi-menu-up"></i> Ver todos los sabores
            </button>
          </div>
        </div>
      </section>

      {/*  */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-image">
              <img
                src="heladeria.jpeg"
                alt="Heladería Dooc"
              />
            </div>
            <div className="about-text">
              <h2 className="section-title">
                Nuestra <span className="text-dooc">Historia</span>
              </h2>
              <p>
                Desde 2015, Helados Dooc Iquique ha estado creando experiencias dulces y momentos felices para las
                familias iquiqueñas. Nuestra receta secreta se ha convertido en la favorita de la ciudad.
              </p>
              <p>
                Utilizamos solo ingredientes frescos y naturales, sin conservantes ni colorantes artificiales. Cada
                helado es elaborado artesanalmente con dedicación y amor.
              </p>
              <ul className="about-list">
                <li>
                  <i className="bi bi-check-lg text-dooc"></i>
                ✔ Ingredientes 100% naturales
                </li>
                <li>
                  <i className="bi bi-check-lg text-dooc"></i>
                ✔ Proceso artesanal
                </li>
                <li>
                  <i className="bi bi-check-lg text-dooc"></i>
                ✔ Sabores únicos
                </li>
                <li>
                  <i className="bi bi-check-lg text-dooc"></i>
                ✔ Compromiso con la comunidad
                </li>
              </ul>
            </div>
          </div>

          {/* Testismonios */}
          <div className="testimonials-section">
            <h3 className="section-title">
              Lo que dicen nuestros <span className="text-dooc">clientes</span>
            </h3>
            <div className="testimonials-grid">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} {...testimonial} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ubicacion */}
      <section id="ubicacion" className="location-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Nuestra <span className="text-dooc">Ubicación</span>
            </h2>
            <p className="section-subtitle">Ven a visitarnos y disfruta la experiencia Dooc en Iquique</p>
          </div>
          <div className="location-content">
            <div className="location-info">
              <h4 className="location-title">Helados Dooc Iquique</h4>
              <p className="location-item">
                <i className="bi bi-geo-alt-fill text-dooc"></i>
                <strong>  Dirección:</strong> Los Jazmines 1815, Casa 1, Iquique
              </p>
              <p className="location-item">
                <i className="bi bi-telephone-fill text-dooc"></i>
                <strong>  Teléfono:</strong> +56 9 7654 3210
              </p>
              <p className="location-item">
                <i className="bi bi-envelope-fill text-dooc"></i>
                <strong> Email:</strong> info@heladosdooc.cl
              </p>
              <div className="location-hours">
                <h5 className="hours-title">Horario de atención</h5>
                <ul>
                  <li>Lunes a Viernes: 11:00 - 20:00 hrs</li>
                  <li>Sábados: 11:00 - 21:00 hrs</li>
                  <li>Domingos: 12:00 - 19:00 hrs</li>
                </ul>
              </div>
            </div>
            <div className="location-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3743.6469275370873!2d-70.14005599877903!3d-20.23198771645688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9152140bf04a944b%3A0x34f65c231f0c730e!2sLos%20Jazmines%201815%2C%201100000%20Iquique%2C%20Tarapac%C3%A1!5e0!3m2!1ses!2scl!4v1757298939090!5m2!1ses!2scl"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* contacto */}
      <section id="contacto" className="contact-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Contácta<span className="text-dooc">nos</span>
            </h2>
            <p className="section-subtitle">¿Tienes algo que decirnos? Nos encantaría escucharte</p>
          </div>
          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre</label>
                  <input type="text" id="nombre" value={formData.nombre} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" value={formData.email} onChange={handleInputChange} required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="asunto">Asunto</label>
                <input type="text" id="asunto" value={formData.asunto} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="mensaje">Mensaje</label>
                <textarea
                  id="mensaje"
                  rows="4"
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="form-submit">
                <button type="submit" className="btn-dooc btn-lg">
                  <i className="bi bi-send"></i> Enviar mensaje
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
