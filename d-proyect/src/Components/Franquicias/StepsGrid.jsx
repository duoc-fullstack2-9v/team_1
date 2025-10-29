import React from "react";

export default function StepsGrid() {
  const pasosFranquicia = [
    {
      title: "Evaluación del negocio",
      desc: "En esta primera etapa se evalúa la oportunidad de negocio, se entrega el formulario de franquiciados así como toda la información necesaria en relación a condiciones, fee de incorporación, margen del negocio y otros de interés.",
      icon: "bi-shop"
    },
    {
      title: "Búsqueda de local",
      desc: "Se inicia la búsqueda u asesoramiento en la ubicación estratégica del local.",
      icon: "bi-geo-alt"
    },
    {
      title: "Firma de contratos",
      desc: "Se realiza el pago de la cuota de incorporación inicial para el uso de la marca. Junto con esto se hace entrega del manual de operaciones y se inicia la capacitación en gestión del local. Acceso a importantes alianzas estratégicas con proveedores y a catálogo de productos Helados Dooc",
      icon: "bi-file-earmark-text"
    },
    {
      title: "Habilitación del local",
      desc: "Se inicia el diseño, construcción y habilitación del local. En esta etapa, podrán contar con el asesoramiento activo de nuestros ejecutivos en cuanto licitación de arquitecto y constructora, definición del mobiliario, equipamiento del local, y en selección de personal.",
      icon: "bi-flag"
    },
    {
      title: "Capacitación del personal",
      desc: "Nuestros ejecutivos inician un acompañamiento activo con cursos de capacitación constantes en: Ventas, Atención al cliente, Higiene y Seguridad, Calidad, Productos, y otros necesarios en la operación y del local e imagen de marca",
      icon: "bi-person-lines-fill"
    },
    {
      title: "Inicio de operaciones",
      desc: "En esta etapa final, el franquiciado se compromete a velar por el cumplimiento del contrato firmado y del manual de operaciones, por el estricto cuidado de la marca, comprometiéndose con altos estándares de calidad y servicio. Recibirán soporte permanente de nuestros ejecutivos, en áreas de Marketing, Servicios, Productos, Operaciones, Calidad e Informática.",
      icon: "bi-lightning-charge"
    },
  ];

  return (
    <section className="container py-5">
      <h2 className="text-center fw-bold mb-5">Pasos para adquirir una franquicia</h2>
      <div className="row g-4">
        {pasosFranquicia.map((step, index) => (
          <div className="col-md-4" key={index}>
            <div className="p-4 border rounded shadow-sm h-100 bg-white text-center">
              {/* Icono con color Helados Dooc */}
              <i className={`bi ${step.icon} franquicia-icon mb-3`} style={{fontSize: "2.5rem"}}></i>
              <h5 className="fw-bold" style={{color: "#ff6b6b"}}>{step.title}</h5>
              <p className="text-secondary mt-2">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
