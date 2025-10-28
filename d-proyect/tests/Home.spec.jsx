import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi, beforeAll } from "vitest"
import { MemoryRouter } from "react-router-dom"
import Home from "../src/Pages/Home.jsx"

// === MOCKS ===
vi.mock("../src/Components/FlavorCard.jsx", () => ({
  default: ({ name }) => <div data-testid="flavor-card">{name}</div>,
}))

vi.mock("../src/Components/TestimonialCard.jsx", () => ({
  default: ({ name }) => <div data-testid="testimonial-card">{name}</div>,
}))

// Mock de useNavigate
const mockNavigate = vi.fn()
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

// Mock de alert global
beforeAll(() => {
  global.alert = vi.fn()
})

describe("Home Page", () => {
  it("renderiza el título principal de la tienda", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    const heading = screen.getByTestId("main-title")
    expect(heading).toBeInTheDocument()
  })

  it("muestra la sección de sabores con tres tarjetas", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    const flavorCards = screen.getAllByTestId("flavor-card")
    expect(flavorCards.length).toBe(3)
  })

  it("muestra los testimonios de clientes", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    const testimonialCards = screen.getAllByTestId("testimonial-card")
    expect(testimonialCards.length).toBe(3)
  })

  it("navega a productos al hacer clic en el botón principal", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    const button = screen.getByRole("button", { name: /descubrir sabores/i })
    fireEvent.click(button)
    expect(mockNavigate).toHaveBeenCalledWith("/productos")
  })

  it("envía el formulario de contacto correctamente", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    fireEvent.change(screen.getByLabelText(/nombre/i), {
      target: { value: "Juan Pérez" },
    })
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "juan@example.com" },
    })
    fireEvent.change(screen.getByLabelText(/asunto/i), {
      target: { value: "Consulta" },
    })
    fireEvent.change(screen.getByLabelText(/mensaje/i), {
      target: { value: "Hola, quisiera más información." },
    })

    const submitButton = screen.getByRole("button", { name: /enviar mensaje/i })
    fireEvent.click(submitButton)

    expect(global.alert).toHaveBeenCalledWith("¡Mensaje enviado con éxito!")
  })
})
