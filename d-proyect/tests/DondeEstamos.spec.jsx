import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import DondeEstamos from "../src/Pages/DondeEstamos.jsx"

// Mock de useLocation para simular la ruta actual
vi.mock("react-router-dom", () => ({
useLocation: vi.fn(() => ({ pathname: "/donde-estamos" })),
}))

describe("Componente DondeEstamos", () => {
it("renderiza el título correctamente", () => {
render(<DondeEstamos />)
const titulo = screen.getByRole("heading", { level: 1 })
expect(titulo).toHaveTextContent("Cobertura del Despacho")
})

it("contiene el iframe del mapa con el título correcto", () => {
render(<DondeEstamos />)
const iframe = screen.getByTitle("Mapa Helados Dooc")
expect(iframe).toBeInTheDocument()
expect(iframe).toHaveAttribute("src")
})

it("contiene la clase principal del contenedor", () => {
const { container } = render(<DondeEstamos />)
const section = container.querySelector(".donde-estamos-page")
expect(section).toBeInTheDocument()
})
})
