import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StepsGrid from "../src/Components/Franquicias/StepsGrid.jsx"; // ✅ Ruta corregida

describe("StepsGrid Component", () => {
  it("renderiza el título principal", () => {
    render(<StepsGrid />);
    expect(
      screen.getByText("Pasos para adquirir una franquicia")
    ).toBeInTheDocument();
  });

  it("renderiza los 6 pasos del proceso de franquicia", () => {
    render(<StepsGrid />);
    const steps = [
      "Evaluación del negocio",
      "Búsqueda de local",
      "Firma de contratos",
      "Habilitación del local",
      "Capacitación del personal",
      "Inicio de operaciones",
    ];

    steps.forEach((step) => {
      expect(screen.getByText(step)).toBeInTheDocument();
    });
  });

  it("muestra las descripciones correspondientes para cada paso", () => {
    render(<StepsGrid />);
    expect(
      screen.getByText(/En esta primera etapa se evalúa la oportunidad de negocio/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Se inicia la búsqueda u asesoramiento en la ubicación/i)
    ).toBeInTheDocument();
  });

  it("cada paso contiene su ícono correspondiente", () => {
    render(<StepsGrid />);
    const icons = [
      "bi-shop",
      "bi-geo-alt",
      "bi-file-earmark-text",
      "bi-flag",
      "bi-person-lines-fill",
      "bi-lightning-charge",
    ];

    icons.forEach((icon) => {
      const iconElement = document.querySelector(`.${icon}`);
      expect(iconElement).not.toBeNull();
    });
  });

  it("usa clases de estilo esperadas", () => {
    render(<StepsGrid />);
    const container = screen.getByText("Pasos para adquirir una franquicia")
      .closest("section"); // ✅ forma segura de ubicar el contenedor
    expect(container).toHaveClass("container");
  });
});
