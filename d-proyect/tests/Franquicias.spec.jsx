import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Franquicias from "../src/Pages/Franquicias.jsx";

// Mock de los subcomponentes
vi.mock("../src/Components/Franquicias/Hero.jsx", () => ({
  default: () => <div data-testid="hero">Hero Component</div>,
}));
vi.mock("../src/Components/Franquicias/StepsGrid.jsx", () => ({
  default: () => <div data-testid="steps">StepsGrid Component</div>,
}));
vi.mock("../src/Components/Franquicias/Investments.jsx", () => ({
  default: () => <div data-testid="investments">Investments Component</div>,
}));

describe("Componente Franquicias", () => {
  it("renderiza correctamente los subcomponentes", () => {
    render(<Franquicias />);

    expect(screen.getByTestId("hero")).toBeInTheDocument();
    expect(screen.getByTestId("steps")).toBeInTheDocument();
    expect(screen.getByTestId("investments")).toBeInTheDocument();
  });

  it("contiene el contenedor principal con la clase correspondiente", () => {
    const { container } = render(<Franquicias />);
    const div = container.querySelector(".franquicia-container");
    expect(div).toBeInTheDocument();
  });
});
