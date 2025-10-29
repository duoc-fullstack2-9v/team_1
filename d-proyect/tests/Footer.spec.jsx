import { render, screen } from "@testing-library/react";
import Footer from "../src/Components/Footer.jsx";
import { describe, it, expect } from "vitest";

describe("Footer Component", () => {
  it("renderiza correctamente el título principal", () => {
    render(<Footer />);
    expect(screen.getByText(/Helados Dooc/i)).toBeInTheDocument();
  });

  it("muestra el texto de descripción", () => {
    render(<Footer />);
    expect(
      screen.getByText(/Dulces momentos en Iquique desde 2015/i)
    ).toBeInTheDocument();
  });

  it("contiene enlaces a redes sociales (Facebook, Instagram, TikTok)", () => {
    render(<Footer />);
    const links = screen.getAllByRole("link");
    const hrefs = links.map((link) => link.getAttribute("href") || "");

    expect(links.length).toBeGreaterThanOrEqual(3);
    expect(hrefs.some((h) => h.includes("facebook.com"))).toBe(true);
    expect(hrefs.some((h) => h.includes("instagram.com"))).toBe(true);
    expect(hrefs.some((h) => h.includes("tiktok.com"))).toBe(true);
  });

  it("muestra el campo de Newsletter", () => {
    render(<Footer />);
    expect(screen.getByPlaceholderText(/tu email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /enviar/i })).toBeInTheDocument();
  });

  it("muestra el texto de derechos reservados", () => {
    render(<Footer />);
    expect(
      screen.getByText(/todos los derechos reservados/i)
    ).toBeInTheDocument();
  });
});
