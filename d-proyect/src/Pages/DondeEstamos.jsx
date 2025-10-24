import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import "../Styles/DondeEstamos.css"

export default function DondeEstamos() {
  const location = useLocation()

  useEffect(() => {
    console.log("Página Dónde Estamos cargada")
    console.log("Ruta actual:", location.pathname)
  }, [location])

  return (
    <section className="donde-estamos-page py-5">
      <div className="container">
        <h1 className="page-title mb-4">
          Cobertura del <span className="text-dooc">Despacho</span>
        </h1>

        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3743.6450411990845!2d-70.14284812606162!3d-20.23206604778331!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9152140bf04a944b%3A0x34f65c231f0c730e!2sLos%20Jazmines%201815%2C%201100000%20Iquique%2C%20Tarapac%C3%A1!5e0!3m2!1ses!2scl!4v1761326844205!5m2!1ses!2scl"
            title="Mapa Helados Dooc"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  )
}



