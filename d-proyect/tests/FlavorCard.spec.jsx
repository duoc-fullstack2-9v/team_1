import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import FlavorCard from "../src/Components/FlavorCard.jsx";
import { useCart } from "../src/Context/CartContext.jsx";

// 🔹 Mock del contexto de carrito
vi.mock("../src/Context/CartContext.jsx", () => ({
  useCart: vi.fn(),
}));

describe("FlavorCard Component", () => {
  const productoMock = {
    id: 1,
    nombre: "Chocolate Dooc",
    descripcion: "Chocolate belga premium",
    imagen: "https://images.unsplash.com/photo-1",
    precio: 5000,
  };

  const addToCartMock = vi.fn();

  beforeEach(() => {
    addToCartMock.mockClear();
    useCart.mockReturnValue({ addToCart: addToCartMock });
  });

  it("renderiza correctamente los datos del producto", () => {
    render(<FlavorCard {...productoMock} />);

    // Verifica nombre, descripción y precio
    expect(screen.getByText(productoMock.nombre)).toBeInTheDocument();
    expect(screen.getByText(productoMock.descripcion)).toBeInTheDocument();
    expect(screen.getByText(`$${productoMock.precio}`)).toBeInTheDocument();

    // Verifica imagen
    const img = screen.getByAltText(productoMock.nombre);
    expect(img).toHaveAttribute("src", productoMock.imagen);
  });

  it("llama a addToCart al presionar el botón +", async () => {
    const user = userEvent.setup();
    render(<FlavorCard {...productoMock} />);

    // Busca el botón "+" (más robusto que getByText)
    const button = screen.getByRole("button", { name: "+" });

    await user.click(button);

    expect(addToCartMock).toHaveBeenCalledTimes(1);
    expect(addToCartMock).toHaveBeenCalledWith(productoMock);
  });
});

