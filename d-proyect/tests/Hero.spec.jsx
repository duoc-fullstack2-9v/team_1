import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Franquicia from "../src/Components/Franquicias/Hero.jsx"; // <-- CORRECTO

describe("Franquicia Hero Component", () => {
  it("muestra el título principal del Hero", () => {
    render(<Franquicia />);
    const titulo = screen.getByText(/Bienvenidos a Nuestra Franquicia/i);
    expect(titulo).toBeInTheDocument();
  });

  it("muestra el subtítulo del Hero", () => {
    render(<Franquicia />);
    const subtitulo = screen.getByText(/Descubre cómo abrir tu propia franquicia/i);
    expect(subtitulo).toBeInTheDocument();
  });

  it("contiene la imagen principal con el alt correcto", () => {
    render(<Franquicia />);
    const imagen = screen.getByAltText(/Franquicia Helados Dooc/i);
    expect(imagen).toBeInTheDocument();
  });

  it("muestra la lista de beneficios de la inversión", () => {
    render(<Franquicia />);
    const listaItems = screen.getAllByRole("listitem");
    expect(listaItems.length).toBe(4); // verificamos que hay 4 beneficios
    expect(screen.getByText(/Asesoría y soporte continuo/i)).toBeInTheDocument();
    expect(screen.getByText(/Marketing centralizado/i)).toBeInTheDocument();
    expect(screen.getByText(/Proveedores exclusivos/i)).toBeInTheDocument();
    expect(screen.getByText(/Capacitación inicial y constante/i)).toBeInTheDocument();
  });

  it("muestra la sección inferior de bienvenida", () => {
    render(<Franquicia />);
    const seccionBienvenida = screen.getByText(/¿Qué es una franquicia\?/i);
    expect(seccionBienvenida).toBeInTheDocument();
  });
});
