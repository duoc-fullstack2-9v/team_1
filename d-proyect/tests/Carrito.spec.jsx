import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi, beforeEach } from "vitest";
import Carrito from "../src/Components/Carrito.jsx";

// ✅ Creamos una sola función simulada que será compartida
const mockRemoveFromCart = vi.fn();

// Mock del hook useCart
vi.mock("../src/Context/CartContext.jsx", async () => {
  const actual = await vi.importActual("../src/Context/CartContext.jsx");
  return {
    ...actual,
    useCart: () => ({
      cartItems: [
        { id: 1, name: "Chocolate", price: 5000, cantidad: 1, instrucciones: "" },
        { id: 2, name: "Vainilla", price: 4000, cantidad: 1, instrucciones: "" },
      ],
      removeFromCart: mockRemoveFromCart, // 👈 usamos la misma función global
      updateCartItem: vi.fn(),
      clearCart: vi.fn(),
    }),
  };
});

const mockOnClose = vi.fn();

describe("Carrito Component", () => {
  beforeEach(() => {
    mockOnClose.mockClear();
    mockRemoveFromCart.mockClear(); // 👈 limpiamos antes de cada test
  });

  it("renderiza correctamente el carrito con productos", () => {
    render(<Carrito onClose={mockOnClose} />);

    expect(screen.getByText(/Chocolate/)).toBeInTheDocument();
    expect(screen.getByText(/Vainilla/)).toBeInTheDocument();
    expect(screen.getByText(/Total:/)).toBeInTheDocument();
  });

  it("llama a onClose cuando se cierra el carrito", () => {
    render(<Carrito onClose={mockOnClose} />);
    const closeButton = screen.getByText("✕");
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledOnce();
  });

  it("permite eliminar productos del carrito", () => {
    render(<Carrito onClose={mockOnClose} />);

    // Buscamos el botón que diga "Eliminar" (puede tener mayúsculas o minúsculas)
    const removeButtons = screen.getAllByRole("button", { name: /eliminar/i });
    fireEvent.click(removeButtons[0]);

    // ✅ Ahora sí: debería haberse llamado
    expect(mockRemoveFromCart).toHaveBeenCalled();
  });

  it("permite incrementar y decrementar la cantidad de productos en el modal de edición", () => {
    render(<Carrito onClose={mockOnClose} />);

    const editButton = screen.getAllByRole("button", { name: /Editar/i })[0];
    fireEvent.click(editButton);

    const incrementButton = screen.getByText("+");
    const decrementButton = screen.getByText("-");

    fireEvent.click(incrementButton);
    expect(screen.getByText("2")).toBeInTheDocument();

    fireEvent.click(decrementButton);
    expect(screen.getByText("1")).toBeInTheDocument();
  });
});
