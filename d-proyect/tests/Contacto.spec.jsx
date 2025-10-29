import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Contacto from "../src/Pages/Contacto.jsx";

describe("Componente Contacto", () => {
  it("renderiza el título principal correctamente", () => {
    render(<Contacto />);
    const titulo = screen.getByRole("heading", { level: 2 });
    expect(titulo).toHaveTextContent("Contáctanos");
  });

  it("muestra el iframe del mapa con el título correcto", () => {
    render(<Contacto />);
    const iframe = screen.getByTitle("Ubicación Helados Dooc");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute("src");
  });

  it("renderiza los campos del formulario de contacto", () => {
    render(<Contacto />);
    expect(screen.getByPlaceholderText("Tu nombre")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("tucorreo@ejemplo.com")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Escríbenos aquí...")
    ).toBeInTheDocument();
  });

  it("contiene los datos de contacto (dirección, teléfono y correo)", () => {
    render(<Contacto />);
    expect(screen.getByText(/Los Jazmines 1815/i)).toBeInTheDocument();
    expect(screen.getByText(/\+56 9 7654 3210/i)).toBeInTheDocument(); // ← el + escapado
    expect(screen.getByText(/info@heladosdooc.cl/i)).toBeInTheDocument();
  });

  it("contiene la clase principal del contenedor", () => {
    const { container } = render(<Contacto />);
    const section = container.querySelector(".contacto-section");
    expect(section).toBeInTheDocument();
  });
});
