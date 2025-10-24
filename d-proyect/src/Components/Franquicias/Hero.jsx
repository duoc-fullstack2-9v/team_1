import React from "react";

export default function Franquicia() {
  return (
    <section className="franquicia-section">
      {/* Sección Hero */}
      <div className="franquicia-hero">
        <h1 className="titulo-franquicia">¡Únete a Helados Dooc!</h1>
        <p className="subtexto-franquicia">
          Descubre cómo abrir tu propia franquicia y ser parte de nuestra familia.
        </p>

        {/* Contenedor blanco para imagen + texto */}
        <div className="franquicia-blanco">
          <div className="franquicia-content">
            <div className="franquicia-imagen">
              <img
                src="conitos.jpeg"
                alt="Franquicia Helados Dooc"
                className="imagen-franquicia"
              />
            </div>

            <div className="franquicia-texto">
              <h2 className="titulo-text-franquicia">
                Bienvenidos a <span className="text-dooc">Nuestra Franquicia</span>
              </h2>
              <p>
                Tú también puedes ser parte de la familia Helados Dooc. Comienza tu propio negocio con el apoyo de una gran marca.
              </p>
              <p>Beneficios de tu inversión:</p>
              <ul className="franquicia-list">
                <li><i className="bi bi-check-lg text-dooc"></i> Asesoría y soporte continuo</li>
                <li><i className="bi bi-check-lg text-dooc"></i> Marketing centralizado</li>
                <li><i className="bi bi-check-lg text-dooc"></i> Proveedores exclusivos</li>
                <li><i className="bi bi-check-lg text-dooc"></i> Capacitación inicial y constante</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bloque inferior */}
      <div className="franquicia-bienvenida">
        <h2 className="titulo-bienvenida">¿Qué es una franquicia?</h2>
        <p className="texto-bienvenida">
          Si estás buscando un negocio donde puedas emprender y crecer con una marca reconocida y posicionada en el mercado, ven a conocer nuestro modelo de franquicia, donde podrás revisar cuáles son los pasos y los requisitos para formar parte de este entretenido mundo. <br />
          ¡Contáctanos! ¡Te estamos esperando!
        </p>
      </div>
    </section>
  );
}