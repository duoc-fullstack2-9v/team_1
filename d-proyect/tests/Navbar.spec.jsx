import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

// MOCK del contexto
vi.mock("../src/Context/CartContext", () => ({
  useCart: vi.fn(),
}));

// MOCK del componente Carrito
vi.mock("../src/Components/Carrito", () => ({
  default: ({ onClose }) => (
    <div data-testid="carrito">
      <button onClick={onClose}>Cerrar</button>
    </div>
  ),
}));

// IMPORTAR DESPUÉS DE MOCKEAR
import Navbar from "../src/Components/Navbar.jsx";
import { useCart } from "../src/Context/CartContext";

describe("Componente Navbar", () => {
  it("se renderiza correctamente con el logo", () => {
    useCart.mockReturnValue({ cartItems: [] });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const logo = screen.getByAltText(/logo/i);
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/logo.jpg");
  });

  it("muestra los enlaces principales del menú", () => {
    useCart.mockReturnValue({ cartItems: [] });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText("Helados Dooc")).toBeInTheDocument();
    expect(screen.getByText("Productos")).toBeInTheDocument();
    expect(screen.getByText("Franquicias")).toBeInTheDocument();
    expect(screen.getByText("Novedades")).toBeInTheDocument();
    expect(screen.getByText("Dónde Estamos")).toBeInTheDocument();
    expect(screen.getByText("Contacto")).toBeInTheDocument();
  });

  it("renderiza los íconos de redes sociales y login", () => {
    useCart.mockReturnValue({ cartItems: [] });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThanOrEqual(4); // login + 3 redes
  });

  it("muestra la cantidad de productos en el carrito", () => {
    useCart.mockReturnValue({
      cartItems: [
        { id: 1, cantidad: 2 },
        { id: 2, cantidad: 1 },
      ],
    });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Buscamos el span dentro del botón del carrito
    const btnCarrito = screen.getByTestId("btn-carrito");
    const badge = btnCarrito.querySelector("span.badge");

    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("3");
  });

  it("abre y cierra el carrito al hacer clic en el botón", () => {
    useCart.mockReturnValue({ cartItems: [] });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Abrir carrito
    const btnCarrito = screen.getByTestId("btn-carrito");
    fireEvent.click(btnCarrito);
    expect(screen.getByTestId("carrito")).toBeInTheDocument();

    // Cerrar carrito
    const btnCerrar = screen.getByText("Cerrar");
    fireEvent.click(btnCerrar);
    expect(screen.queryByTestId("carrito")).not.toBeInTheDocument();
  });
});
