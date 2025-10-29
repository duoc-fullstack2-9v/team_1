import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "../src/Pages/Home.jsx";
import { CartProvider } from "../src/Context/CartContext.jsx";

const renderWithProviders = (ui) => {
  return render(<CartProvider>{ui}</CartProvider>);
};

describe("Home Page", () => {
  beforeEach(() => {
    renderWithProviders(<Home />);
  });

  it("renderiza el título principal de la tienda", () => {
    const mainTitle = screen.getByText(/¡Conoce nuestra/i);
    expect(mainTitle).toBeInTheDocument();
  });

  it("muestra la sección de sabores con al menos una tarjeta", () => {
    const flavorsTitle = screen.getByText((content, element) => {
      const text = Array.from(element.childNodes)
        .map(node => node.textContent)
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();
      return text === "Nuestros Sabores Estrella";
    });
    expect(flavorsTitle).toBeInTheDocument();

    const flavorsSection = flavorsTitle.closest("section");
    const flavorCards = within(flavorsSection).getAllByRole("button", { name: "+" });
    expect(flavorCards.length).toBeGreaterThan(0);
  });

  it("muestra la sección de testimonios con al menos un cliente", () => {
    const testimonialTitle = screen.getByText((content, element) => {
      const text = Array.from(element.childNodes)
        .map(node => node.textContent)
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();
      return text === "Lo que dicen nuestros clientes";
    });
    expect(testimonialTitle).toBeInTheDocument();

    const testimonialSection = testimonialTitle.closest("div");
    const testimonials = within(testimonialSection).getAllByText(/María González|Carlos Mendoza|Ana Silva/);
    expect(testimonials.length).toBeGreaterThan(0);
  });

  it("muestra la sección de ubicación con el título correspondiente", () => {
    const locationTitle = screen.getByText((content, element) => {
      const text = Array.from(element.childNodes)
        .map(node => node.textContent)
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();
      return text === "Nuestra Ubicación";
    });
    expect(locationTitle).toBeInTheDocument();

    const locationSection = locationTitle.closest("section");
    expect(within(locationSection).getByText(/Los Jazmines 1815/i)).toBeInTheDocument();
  });

  it("envía el formulario de contacto correctamente", () => {
    const nombreInput = screen.getByLabelText(/Nombre/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const asuntoInput = screen.getByLabelText(/Asunto/i);
    const mensajeInput = screen.getByLabelText(/Mensaje/i);
    const submitBtn = screen.getByRole("button", { name: /Enviar mensaje/i });

    fireEvent.change(nombreInput, { target: { value: "Juan Pérez" } });
    fireEvent.change(emailInput, { target: { value: "juan@example.com" } });
    fireEvent.change(asuntoInput, { target: { value: "Consulta" } });
    fireEvent.change(mensajeInput, { target: { value: "Hola, quisiera más información." } });

    fireEvent.click(submitBtn);

    expect(nombreInput.value).toBe("");
    expect(emailInput.value).toBe("");
    expect(asuntoInput.value).toBe("");
    expect(mensajeInput.value).toBe("");
  });
});
