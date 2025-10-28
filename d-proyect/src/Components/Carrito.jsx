import { useState } from "react";
import { useCart } from "../Context/CartContext";
import "../styles/Carrito.css";

export default function Carrito({ onClose }) {
  const { cartItems, removeFromCart, updateCartItem, clearCart } = useCart();
  const [productoEditando, setProductoEditando] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [instrucciones, setInstrucciones] = useState("");
  const [mensajeExito, setMensajeExito] = useState(false);

  const handleEditar = (producto) => {
    setProductoEditando(producto);
    setCantidad(producto.cantidad);
    setInstrucciones(producto.instrucciones || "");
  };

  const handleGuardarCambios = () => {
    if (!productoEditando) return;
    updateCartItem(productoEditando.id, productoEditando.sabor, {
      cantidad,
      instrucciones,
    });
    setProductoEditando(null);
    setMensajeExito(true);
    setTimeout(() => setMensajeExito(false), 2000);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  return (
    <div
      className="carrito-overlay"
      onClick={(e) => {
        if (e.target.classList.contains("carrito-overlay")) onClose?.();
      }}
    >
      <div className="carrito">
        <button className="btn-cerrar" onClick={onClose}>
          ×
        </button>
        <h4>Tu Carrito</h4>

        {cartItems.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "2rem" }}>
            Tu carrito está vacío 🍦
          </p>
        ) : (
          <>
            <ul className="carrito-lista">
              {cartItems.map((item) => (
                <li key={`${item.id}-${item.sabor}`} className="carrito-item">
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    className="carrito-img"
                  />
                  <div className="item-info">
                    <h6>
                      {item.nombre}{" "}
                      {item.sabor && (
                        <span className="item-sabor">({item.sabor})</span>
                      )}
                    </h6>
                    <p>${item.precio} c/u</p>
                    <div className="item-acciones">
                      <div className="item-cantidad">
                        <button
                          onClick={() =>
                            updateCartItem(item.id, item.sabor, {
                              cantidad: Math.max(1, item.cantidad - 1),
                            })
                          }
                        >
                          -
                        </button>
                        <span>{item.cantidad}</span>
                        <button
                          onClick={() =>
                            updateCartItem(item.id, item.sabor, {
                              cantidad: item.cantidad + 1,
                            })
                          }
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="btn-editar"
                        onClick={() => handleEditar(item)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn-eliminar"
                        onClick={() =>
                          removeFromCart(item.id, item.sabor)
                        }
                      >
                        🗑
                      </button>
                    </div>
                    {item.instrucciones && (
                      <div className="item-nota">{item.instrucciones}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="carrito-footer">
              <h5>Total: ${total.toFixed(2)}</h5>
              <button className="btn-vaciar" onClick={clearCart}>
                Vaciar carrito
              </button>
              <button
                className="btn-finalizar"
                onClick={() => alert("Compra realizada 🎉")}
              >
                Finalizar compra
              </button>
            </div>
          </>
        )}
      </div>

      {/* === MODAL EDITAR === */}
      {productoEditando && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target.classList.contains("modal-overlay")) {
              setProductoEditando(null);
            }
          }}
        >
          <div className="modal">
            <button
              className="modal-cerrar"
              onClick={() => setProductoEditando(null)}
            >
              ×
            </button>

            <div className="modal-content">
              <img
                src={productoEditando.imagen}
                alt={productoEditando.nombre}
                className="modal-img"
              />

              <div className="modal-info">
                <h3>
                  {productoEditando.nombre}{" "}
                  {productoEditando.sabor && (
                    <span className="modal-sabor">
                      ({productoEditando.sabor})
                    </span>
                  )}
                </h3>

                <label>Instrucciones especiales:</label>
                <textarea
                  value={instrucciones}
                  onChange={(e) => setInstrucciones(e.target.value)}
                  placeholder="Ej: sin chocolate, extra crema..."
                />

                <div className="modal-cantidad">
                  <button
                    onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                  >
                    -
                  </button>
                  <span>{cantidad}</span>
                  <button onClick={() => setCantidad(cantidad + 1)}>+</button>
                </div>

                <div className="modal-precio">
                  Total: ${(productoEditando.precio * cantidad).toFixed(2)}
                </div>

                <div className="modal-acciones">
                  <button className="btn-guardar" onClick={handleGuardarCambios}>
                    Guardar
                  </button>
                  <button
                    className="btn-eliminar"
                    onClick={() => {
                      removeFromCart(
                        productoEditando.id,
                        productoEditando.sabor
                      );
                      setProductoEditando(null);
                    }}
                  >
                    Eliminar producto
                  </button>
                </div>

                {mensajeExito && (
                  <div className="mensaje-exito">Cambios guardados </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
