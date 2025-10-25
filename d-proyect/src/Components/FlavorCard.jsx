export default function FlavorCard({ name, description, image, badge, oldPrice, price }) {
  const formatPrice = (price) => `$${price?.toLocaleString("es-CL")}`;

  return (
    <div className="flavor-card">
      <div className="flavor-img-container">
        <img src={image || "/placeholder.svg"} alt={name} className="flavor-image" />
        {badge && <span className="flavor-badge">{badge}</span>}
      </div>

      <div className="flavor-content">
        <h5 className="flavor-name">{name}</h5>
        <p className="flavor-description">{description}</p>

        <div className="flavor-prices">
          {oldPrice && <span className="old-price">{formatPrice(oldPrice)}</span>}
          {price && <span className="new-price">{formatPrice(price)}</span>}
        </div>

        <button className="add-to-cart">Agregar al carrito</button>
      </div>
    </div>
  );
}
