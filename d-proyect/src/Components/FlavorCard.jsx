import { useCart } from "../Context/CartContext";

export default function FlavorCard({ id, nombre, descripcion, imagen, precio }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id,
      nombre,
      descripcion,
      imagen,
      precio,
    });
  };

  return (
    <div className="flavor-card">
      <div className="flavor-img-container">
        <img
          src={imagen}
          alt={nombre}
          className="flavor-image"
        />
      </div>

      <div className="flavor-content">
        <h5 className="flavor-name">{nombre}</h5>
        <p className="flavor-description">{descripcion}</p>
        <span className="new-price">${precio}</span>
        <button className="add-to-cart-bottom" onClick={handleAddToCart}>
          +
        </button>
      </div>
    </div>
  );
}