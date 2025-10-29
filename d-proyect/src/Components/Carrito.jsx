import { useState } from "react";
import { useCart } from "../Context/CartContext";
import "../styles/Carrito.css";

export default function Carrito({ onClose }) {
  const { cartItems, removeFromCart, updateCartItem, clearCart } = useCart();
  const [productoEditando, setProductoEditando] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [instrucciones, setInstrucciones] = useState("");

  const handleEditar = (producto) => {
    setProductoEditando(producto);
    setCantidad(producto.cantidad);
    setInstrucciones(producto.instrucciones || "");
  };

  const handleGuardar = () => {
    updateCartItem(productoEditando.id, {
      cantidad,
      instrucciones,
    });
    setProductoEditando(null);
  };

  const handleEliminar = (id) => {
    removeFromCart(id);
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.cantidad,
    0
  );

  return (
    <div className="carrito-overlay">
      <div className="carrito">
        <button className="cerrar-carrito" onClick={onClose}>
          ✕
        </button>
        <h2>Tu Carrito</h2>

        {cartItems.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="carrito-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="carrito-img"
                />
                <div className="carrito-info">
                  <h4>{item.name}</h4>
                  <p>${item.price.toLocaleString()}</p>
                  <p>Cantidad: {item.cantidad}</p>
                  {item.instrucciones && (
                    <p className="instrucciones">
                      📝 {item.instrucciones}
                    </p>
                  )}
                  <div className="carrito-buttons">
                    <button onClick={() => handleEditar(item)}>Editar</button>
                    <button
                      onClick={() => handleEliminar(item.id)}
                      className="eliminar"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <h3>Total: ${total.toLocaleString()}</h3>
            <div className="acciones">
              <button onClick={clearCart}>Vaciar carrito</button>
              <button
                onClick={() => {
                  alert("Compra finalizada 🎉");
                  clearCart();
                  onClose();
                }}
              >
                Finalizar compra
              </button>
            </div>
          </>
        )}
      </div>

      {productoEditando && (
        <div className="modal-overlay">
          <div className="modal">
            <button
              className="cerrar-modal"
              onClick={() => setProductoEditando(null)}
            >
              ✕
            </button>
            <div className="modal-content">
              <img
                src={productoEditando.image}
                alt={productoEditando.name}
                className="modal-img"
              />
              <div>
                <h3>{productoEditando.name}</h3>
                <p>{productoEditando.description}</p>

                <label>Instrucciones especiales</label>
                <input
                  type="text"
                  value={instrucciones}
                  onChange={(e) => setInstrucciones(e.target.value)}
                  placeholder="Ej: sin maní, extra dulce..."
                />

                <div className="cantidad-control">
                  <button
                    onClick={() =>
                      setCantidad((prev) => Math.max(1, prev - 1))
                    }
                  >
                    -
                  </button>
                  <span>{cantidad}</span>
                  <button onClick={() => setCantidad((prev) => prev + 1)}>
                    +
                  </button>
                </div>

                <div className="modal-buttons">
                  <button onClick={handleGuardar} className="guardar">
                    Guardar
                  </button>
                  <button
                    onClick={() => handleEliminar(productoEditando.id)}
                    className="eliminar"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
              <p className="modal-price">
                ${productoEditando.price.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}