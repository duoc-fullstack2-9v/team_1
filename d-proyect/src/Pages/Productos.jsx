import { useState } from "react";
import { useCart } from "../Context/CartContext";
import Carrito from "../Components/Carrito.jsx";
import "../styles/FlavorCard.css";
import "../styles/Carrito.css";

const allProducts = [
  {
    id: 1,
    name: "Chocolate Dooc",
    description: "Nuestro chocolate belga premium con trozos de chocolate semi-amargo.",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    badge: "Sale",
    oldPrice: 8000,
    price: 6000,
    category: "chocolate",
  },
  {
    id: 2,
    name: "Fresa Silvestre",
    description: "Fresas orgánicas seleccionadas con un toque de crema dulce.",
    image: "frutos.jpg",
    badge: "Nuevo",
    price: 5500,
    category: "frutas",
  },
  {
    id: 3,
    name: "Dulce de Leche",
    description: "El auténtico sabor argentino con rizos de dulce de leche casero.",
    image: "manjar.jpg",
    badge: "Clásico",
    price: 5900,
    category: "dulce",
  },
  {
    id: 4,
    name: "Mango Tropical",
    description: "Mangos frescos con un toque tropical refrescante.",
    image: "mango.jpg",
    badge: "Verano",
    price: 6300,
    category: "frutas",
  },
  {
    id: 5,
    name: "Vainilla Premium",
    description: "Vainilla de Madagascar con semillas naturales.",
    image: "vain.webp",
    price: 5500,
    category: "vainilla",
  },
  {
    id: 6,
    name: "Menta Chocolate",
    description: "Refrescante menta con chips de chocolate oscuro.",
    image: "mentachoc.webp",
    price: 4800,
    category: "chocolate",
  },
  {
    id: 7,
    name: "Pistacho",
    description: "Cremoso, suave y con el sabor único del pistacho natural.",
    image: "pistacho1.jpg",
    badge: "Popular",
    price: 6500,
    category: "pistacho",
  },
  {
    id: 8,
    name: "Sandía",
    description: "Dulce, refrescante y lleno de color.",
    image: "sandia.jpg",
    badge: "Sale",
    oldPrice: 7500,
    price: 5800,
    category: "frutas",
  },
  {
    id: 9,
    name: "Cookies & Cream",
    description: "Suave, dulce y lleno de galletas.",
    image: "galleta.jpg",
    price: 5800,
    category: "galleta",
  },
  {
    id: 10,
    name: "Frambuesa Dream",
    description: "Cada cucharada, una sensación única.",
    image: "dream.jpg",
    price: 4500,
    category: "frutas",
  },
  {
    id: 11,
    name: "Pasas al Ron",
    description: "Tradición y sabor en cada bocado con aroma a ron.",
    image: "pasas.webp",
    badge: "Clásico",
    price: 6000,
    category: "ron",
  },
  {
    id: 12,
    name: "Cookies Monster",
    description: "El clásico sabor de galleta en su versión más monstruosa.",
    image: "moster.jpeg",
    badge: "Nuevo",
    price: 6500,
    category: "galletas",
  },
];

export default function Productos() {
  const [products] = useState(allProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const { cartItems, addToCart } = useCart(); // ✅ usamos el contexto correcto
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (producto) => {
    addToCart(producto); // usa la función del contexto
    setIsCartOpen(true);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {isCartOpen && (
        <Carrito
          cart={cartItems}
          onClose={() => setIsCartOpen(false)}
        />
      )}

      <div className="productos-page">
        <h2 className="productos-title">Nuestros Productos</h2>

        <div className="productos-header">
          <input
            type="text"
            placeholder="Buscar producto..."
            className="buscador"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="productos-grid">
          {filteredProducts.map((p) => (
            <div key={p.id} className="producto-card flavor-card">
              <div className="flavor-img-container">
                <img src={p.image} alt={p.name} className="flavor-image" />
                {p.badge && <span className="flavor-badge">{p.badge}</span>}
              </div>

              <div className="flavor-content">
                <h5 className="flavor-name">{p.name}</h5>
                <p className="flavor-description">{p.description}</p>
                <div className="flavor-prices">
                  {p.oldPrice && (
                    <span className="old-price">
                      ${p.oldPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="new-price">
                    ${p.price.toLocaleString()}
                  </span>
                </div>
                <button
                  className="add-to-cart-bottom"
                  onClick={() => handleAddToCart(p)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
