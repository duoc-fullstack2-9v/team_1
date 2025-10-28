import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ContactForm from "@/Components/Franquicias/ContactForm.jsx";


describe("ContactForm Component", () => {
  it("renderiza el formulario de contacto", () => {
    render(<ContactForm />);
    // Si tienes un <form> en tu ContactForm
    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("muestra el botón de enviar", () => {
    render(<ContactForm />);
    expect(screen.getByRole("button", { name: /Enviar/i })).toBeInTheDocument();
  });
});
