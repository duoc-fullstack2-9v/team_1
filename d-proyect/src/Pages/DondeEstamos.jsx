import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export default function DondeEstamos() {
  const location = useLocation()

  useEffect(() => {
    console.log("Página Dónde Estamos cargada")
    console.log("Ruta actual:", location.pathname)
  }, [location])

  return (
    <section className="donde-estamos-page">
      <div className="container py-5">
        <h1 className="page-title mb-4">
          Dónde <span className="text-dooc">Estamos</span>
        </h1>
        <div className="map-container" style={{ width: "100%", height: "450px" }}>
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
    </section>
  )
}