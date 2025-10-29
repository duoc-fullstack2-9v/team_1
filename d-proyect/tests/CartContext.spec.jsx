import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CartProvider, useCart } from "../src/Context/CartContext.jsx";

describe("CartContext", () => {
  it("inicializa el carrito vacío", () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });
    expect(result.current.cartItems).toEqual([]);
  });

  it("agrega un producto al carrito", () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    act(() => result.current.addToCart({ id: 1, nombre: "Chocolate" }));

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].nombre).toBe("Chocolate");
    expect(result.current.cartItems[0].cantidad).toBe(1);
  });

  it("incrementa la cantidad si el producto ya existe", () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    act(() => result.current.addToCart({ id: 1, nombre: "Chocolate" }));
    act(() => result.current.addToCart({ id: 1, nombre: "Chocolate" }));

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].cantidad).toBe(2);
  });

  it("elimina un producto del carrito", () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    act(() => result.current.addToCart({ id: 2, nombre: "Vainilla" }));
    act(() => result.current.removeFromCart(2));

    expect(result.current.cartItems).toHaveLength(0);
  });

  it("actualiza un producto existente", () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    act(() => result.current.addToCart({ id: 3, nombre: "Fresa", cantidad: 1 }));
    act(() => result.current.updateCartItem(3, { cantidad: 5 }));

    expect(result.current.cartItems[0].cantidad).toBe(5);
  });

  it("vacía completamente el carrito", () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    act(() => result.current.addToCart({ id: 4, nombre: "Pistacho" }));
    act(() => result.current.clearCart());

    expect(result.current.cartItems).toEqual([]);
  });
});
