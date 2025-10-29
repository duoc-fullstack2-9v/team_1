import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import Productos from "../src/Pages/Productos"
import { useCart } from "../src/Context/CartContext"

// Mock del carrito
vi.mock("../src/Components/Carrito.jsx", () => ({
  default: ({ cart }) => <div data-testid="mock-carrito">Carrito ({cart.length})</div>,
}))

// Mock del contexto
vi.mock("../src/Context/CartContext", () => ({
  useCart: vi.fn(),
}))

describe("Productos Component", () => {
  let mockCartItems
  let mockAddToCart

  beforeEach(() => {
    mockCartItems = []
    mockAddToCart = vi.fn()

    useCart.mockReturnValue({
      cartItems: mockCartItems,
      addToCart: mockAddToCart,
    })
  })

  it("renderiza el título y todos los productos", () => {
    render(<Productos />)
    expect(screen.getByText(/nuestros productos/i)).toBeInTheDocument()
    expect(screen.getByText(/chocolate dooc/i)).toBeInTheDocument()
    expect(screen.getByText(/fresa silvestre/i)).toBeInTheDocument()
  })

  it("filtra los productos según el término de búsqueda", () => {
    render(<Productos />)
    const input = screen.getByPlaceholderText(/buscar producto/i)
    fireEvent.change(input, { target: { value: "chocolate" } })
    expect(screen.getByText(/chocolate dooc/i)).toBeInTheDocument()
    expect(screen.queryByText(/fresa silvestre/i)).not.toBeInTheDocument()
  })

  it("agrega un producto nuevo al carrito", () => {
    render(<Productos />)
    const addButtons = screen.getAllByText("+")
    fireEvent.click(addButtons[0])
    expect(mockAddToCart).toHaveBeenCalled()
  })

  it("aumenta la cantidad si el producto ya está en el carrito", () => {
    mockCartItems = [{ id: 1, name: "Chocolate Dooc", cantidad: 1 }]
    useCart.mockReturnValue({
      cartItems: mockCartItems,
      addToCart: mockAddToCart,
    })

    render(<Productos />)
    const addButtons = screen.getAllByText("+")
    fireEvent.click(addButtons[0])
    expect(mockAddToCart).toHaveBeenCalled()
  })

  it("muestra el carrito al agregar un producto", () => {
    render(<Productos />)
    const addButtons = screen.getAllByText("+")
    fireEvent.click(addButtons[0])
    expect(screen.getByTestId("mock-carrito")).toHaveTextContent("Carrito (0)")
  })
})


