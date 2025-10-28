import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { CartProvider, useCart } from "../src/Context/CartContext.jsx";

describe("CartContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("inicia con un carrito vacío si no hay datos guardados", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });
    expect(result.current.cart).toEqual([]);
  });

  it("carga correctamente el carrito desde localStorage", () => {
    const fakeCart = [{ id: 1, name: "Helado Vainilla" }];
    localStorage.setItem("cart", JSON.stringify(fakeCart));

    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    expect(result.current.cart).toEqual(fakeCart);
  });

  it("actualiza el carrito y lo guarda en localStorage", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.setCart([{ id: 2, name: "Helado Chocolate" }]);
    });

    const stored = JSON.parse(localStorage.getItem("cart"));
    expect(stored).toEqual([{ id: 2, name: "Helado Chocolate" }]);
    expect(result.current.cart).toEqual([{ id: 2, name: "Helado Chocolate" }]);
  });
});
