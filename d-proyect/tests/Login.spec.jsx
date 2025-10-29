import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Login from "../src/Pages/Login.jsx";

// 🧩 Mock de useNavigate SIN romper el contexto del router
const mockedNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe("Login Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza correctamente los inputs y el botón de login", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Correo Electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Entrar/i })).toBeInTheDocument();
  });

  it("permite escribir en los inputs y hacer login correctamente", async () => {
    // 🧠 Mock del alert para evitar que interrumpa la ejecución
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/Correo Electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const submitButton = screen.getByRole("button", { name: /Entrar/i });

    // 📝 Ingresar datos válidos
    fireEvent.change(emailInput, { target: { value: "valeska.pincheira091@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "Val123456" } });

    // Esperar que el botón se habilite (ya que depende de isValid)
    await waitFor(() => expect(submitButton).not.toBeDisabled());

    // Enviar formulario
    fireEvent.click(submitButton);

    // Esperar a que se dispare el setTimeout del handleSubmit (1.5s)
    await waitFor(
      () => {
        expect(alertMock).toHaveBeenCalledWith("¡Inicio de sesión exitoso! Redirigiendo...");
        expect(mockedNavigate).toHaveBeenCalledWith("/");
      },
      { timeout: 2000 } // ⏱️ da tiempo suficiente para el delay
    );

    alertMock.mockRestore();
  });

  it("permite mostrar y ocultar la contraseña", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const toggleButton = screen.getByRole("button", { name: "" }); // botón sin texto, solo ícono

    // Inicialmente debe ser "password"
    expect(passwordInput).toHaveAttribute("type", "password");

    // Click → mostrar
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    // Click → ocultar
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });
});
