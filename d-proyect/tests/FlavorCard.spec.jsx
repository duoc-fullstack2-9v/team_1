// FlavorCard.spec.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FlavorCard from "../src/Components/FlavorCard.jsx";

describe("FlavorCard Component", () => {
  const defaultProps = {
    name: "Helado de Chocolate",
    description: "Delicioso helado artesanal con cacao belga",
    image: "/chocolate.jpg",
    badge: "Nuevo",
    oldPrice: 2500,
    price: 2000,
    onAdd: vi.fn(),
  };

  it("renderiza el nombre y la descripción", () => {
    render(<FlavorCard {...defaultProps} />);
    expect(screen.getByText("Helado de Chocolate")).toBeInTheDocument();
    expect(
      screen.getByText(/Delicioso helado artesanal con cacao belga/i)
    ).toBeInTheDocument();
  });

  it("muestra la imagen con el alt correcto", () => {
    render(<FlavorCard {...defaultProps} />);
    const img = screen.getByAltText("Helado de Chocolate");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/chocolate.jpg");
  });

  it("muestra la etiqueta (badge) si existe", () => {
    render(<FlavorCard {...defaultProps} />);
    expect(screen.getByText("Nuevo")).toBeInTheDocument();
  });

  it("muestra correctamente los precios formateados", () => {
    render(<FlavorCard {...defaultProps} />);
    expect(screen.getByText("$2.500")).toBeInTheDocument();
    expect(screen.getByText("$2.000")).toBeInTheDocument();
  });

  it("usa imagen por defecto si no se proporciona una", () => {
    render(<FlavorCard {...defaultProps} image={null} />);
    const img = screen.getByAltText("Helado de Chocolate");
    expect(img).toHaveAttribute("src", "/placeholder.svg");
  });

  it("llama a onAdd al hacer clic en el botón +", () => {
    render(<FlavorCard {...defaultProps} />);
    const button = screen.getByRole("button", { name: "+" });
    fireEvent.click(button);
    expect(defaultProps.onAdd).toHaveBeenCalledTimes(1);
  });
});
