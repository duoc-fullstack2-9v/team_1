import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ContactForm from "../src/Components/Franquicias/ContactForm.jsx";

describe("ContactForm Component", () => {
  it("renderiza correctamente todos los campos del formulario", () => {
    render(<ContactForm />);

    expect(screen.getByPlaceholderText("Nombre completo")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Correo electrónico")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Teléfono")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Cuéntanos tu interés")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Enviar solicitud/i })).toBeInTheDocument();
  });

  it("permite escribir en los campos", () => {
    render(<ContactForm />);

    const nombreInput = screen.getByPlaceholderText("Nombre completo");
    const emailInput = screen.getByPlaceholderText("Correo electrónico");
    const telefonoInput = screen.getByPlaceholderText("Teléfono");
    const mensajeTextarea = screen.getByPlaceholderText("Cuéntanos tu interés");

    fireEvent.change(nombreInput, { target: { value: "Juan Pérez" } });
    fireEvent.change(emailInput, { target: { value: "juan@example.com" } });
    fireEvent.change(telefonoInput, { target: { value: "123456789" } });
    fireEvent.change(mensajeTextarea, { target: { value: "Estoy interesado" } });

    expect(nombreInput.value).toBe("Juan Pérez");
    expect(emailInput.value).toBe("juan@example.com");
    expect(telefonoInput.value).toBe("123456789");
    expect(mensajeTextarea.value).toBe("Estoy interesado");
  });

  it("muestra mensaje de éxito al enviar el formulario", () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByPlaceholderText("Nombre completo"), {
      target: { value: "Ana" },
    });
    fireEvent.change(screen.getByPlaceholderText("Correo electrónico"), {
      target: { value: "ana@example.com" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /Enviar solicitud/i }));

    expect(screen.getByText("¡Mensaje enviado! Te contactaremos pronto.")).toBeInTheDocument();
  });
});
