import React, { useState } from "react";
import { createPortal } from "react-dom";
import "../styles/Carrito.css";
import { useCart } from "../Context/CartContext";

export default function Carrito({ onClose }) {
  const { cart, setCart } = useCart();
  const [productoEditando, setProductoEditando] = useState(null);
  const [notaTemp, setNotaTemp] = useState("");
  const [cantidadTemp, setCantidadTemp] = useState(1);
  const [compraRealizada, setCompraRealizada] = useState(false); 

  if (!cart) return null;

  const eliminar = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const cambiarCantidad = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, cantidad: Math.max(1, item.cantidad + delta) }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const vaciarCarrito = () => {
    setCart([]);
    onClose?.();
  };

  const eliminarDesdeModal = (id) => {
    eliminar(id);
    setProductoEditando(null);
  };

  const total = cart.reduce(
    (acc, item) => acc + (item.price || 0) * (item.cantidad || 0),
    0
  );

  const onOverlayClick = (e) => {
    if (e.target.classList.contains("carrito-overlay")) onClose?.();
  };

  const abrirModal = (item) => {
    setProductoEditando(item);
    setNotaTemp(item.nota || "");
    setCantidadTemp(item.cantidad || 1);
  };

  const guardarEdicion = () => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productoEditando.id
          ? { ...item, nota: notaTemp, cantidad: cantidadTemp }
          : item
      )
    );
    setProductoEditando(null);
  };

  // función para finalizar compra
  const finalizarCompra = () => {
    setCompraRealizada(true);
    setCart([]);

    // Oculta el mensaje y cierra el carrito después de unos segundos
    setTimeout(() => {
      setCompraRealizada(false);
      onClose?.();
    }, 2500);
  };

  const contenido = (
    <div className="carrito-overlay" onClick={onOverlayClick}>
      <div className="carrito" role="dialog" aria-modal="true">
        <button
          className="btn-cerrar"
          onClick={onClose}
          aria-label="Cerrar carrito"
        >
          ×
        </button>
        <h4>Tu pedido</h4>

        {/* ensaje de compra realizada */}
        {compraRealizada && (
          <div className="mensaje-exito">
            ¡Compra realizada con éxito! 🎉
          </div>
        )}

        {cart.length === 0 && !compraRealizada ? (
          <p className="text-center mt-3">Tu carrito está vacío 🛍️</p>
        ) : (
          <>
            <ul className="carrito-lista">
              {cart.map((item) => (
                <li key={item.id} className="carrito-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="carrito-img"
                  />
                  <div className="item-info">
                    <h6>{item.name}</h6>
                    <p>${(item.price || 0).toLocaleString()}</p>
                    {item.nota && (
                      <p className="item-nota">
                        <strong>Comentario:</strong> {item.nota}
                      </p>
                    )}
                  </div>

                  <div className="item-cantidad">
                    <button
                      onClick={() =>
                        item.cantidad === 1
                          ? eliminar(item.id)
                          : cambiarCantidad(item.id, -1)
                      }
                      className={item.cantidad === 1 ? "btn-trash" : ""}
                    >
                      {item.cantidad === 1 ? "🗑️" : "🗑️"}
                    </button>
                    <span>{item.cantidad}</span>
                    <button onClick={() => cambiarCantidad(item.id, 1)}>
                      +
                    </button>
                  </div>

                  <button
                    className="btn-editar"
                    onClick={() => abrirModal(item)}
                  >
                    Editar
                  </button>
                </li>
              ))}
            </ul>

            <button className="btn-vaciar" onClick={vaciarCarrito}>
              Vaciar Carrito
            </button>

            <div className="carrito-footer">
              <h5>Total: ${total.toLocaleString()}</h5>
              <button
                className="btn-finalizar"
                disabled={cart.length === 0}
                onClick={finalizarCompra} // 
              >
                Finalizar pedido
              </button>
            </div>
          </>
        )}
      </div>

      {/* === MODAL DE EDICIÓN === */}
      {productoEditando && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target.classList.contains("modal-overlay")) {
              setProductoEditando(null);
            }
          }}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-cerrar"
              onClick={() => setProductoEditando(null)}
            >
              ×
            </button>

            <div className="modal-header">
              <h5>{productoEditando.name}</h5>
            </div>

            <div className="modal-content">
              <img
                src={productoEditando.image}
                alt={productoEditando.name}
                className="modal-img"
              />

              <div className="modal-info">
                <p>{productoEditando.description}</p>

                <label>Instrucciones especiales</label>
                <textarea
                  placeholder="Incluye una nota"
                  value={notaTemp}
                  onChange={(e) => setNotaTemp(e.target.value)}
                />

                <div className="modal-controls">
                  <button
                    onClick={() =>
                      setCantidadTemp(Math.max(1, cantidadTemp - 1))
                    }
                  >
                    -
                  </button>
                  <span>{cantidadTemp}</span>
                  <button onClick={() => setCantidadTemp(cantidadTemp + 1)}>
                    +
                  </button>
                </div>

                <div className="modal-buttons">
                  <button onClick={guardarEdicion} className="btn-guardar">
                    Guardar
                  </button>
                  <button
                    onClick={() => eliminarDesdeModal(productoEditando.id)}
                    className="btn-eliminar-modal"
                  >
                    Eliminar
                  </button>
                </div>

                <div className="modal-precio">
                  ${(productoEditando.price * cantidadTemp).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return createPortal(contenido, document.body);
}
