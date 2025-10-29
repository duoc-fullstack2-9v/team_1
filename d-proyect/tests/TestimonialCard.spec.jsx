import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import TestimonialCard from "../src/Components/TestimonialCard.jsx"

describe("Componente TestimonialCard", () => {
  it("muestra correctamente el nombre, rol y comentario", () => {
    render(<TestimonialCard name="Valeska" role="Cliente" rating={4} comment="Excelente helado!" />)

    expect(screen.getByText(/valeska/i)).toBeInTheDocument()
    expect(screen.getByText(/cliente/i)).toBeInTheDocument()
    expect(screen.getByText(/excelente helado/i)).toBeInTheDocument()
  })

  it("renderiza correctamente la cantidad de estrellas completas", () => {
    const { container } = render(
      <TestimonialCard name="Juan" role="Tester" rating={3} comment="Muy bueno" />
    )

    // Busca íconos con clase bi-star-fill (Bootstrap Icons)
    const fullStars = container.querySelectorAll(".bi-star-fill")
    expect(fullStars.length).toBe(3)
  })

  it("renderiza media estrella cuando corresponde", () => {
    const { container } = render(
      <TestimonialCard name="Ana" role="Compradora" rating={4.5} comment="Muy rico!" />
    )

    const fullStars = container.querySelectorAll(".bi-star-fill")
    const halfStars = container.querySelectorAll(".bi-star-half")

    expect(fullStars.length).toBe(4)
    expect(halfStars.length).toBe(1)
  })
})
