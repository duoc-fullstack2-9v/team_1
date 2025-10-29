import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Agregar producto al carrito
  const addToCart = (product) => {
    const existingProduct = cartItems.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, cantidad: 1 }]);
    }
  };

  // Eliminar producto del carrito
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Actualizar cantidad o instrucciones
  const updateCartItem = (id, updatedData) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, ...updatedData } : item
      )
    );
  };

  // Vaciar carrito
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);