import { useState } from "react";
import FlavorCard from "../Components/FlavorCard";
import "../styles/FlavorCard.css";

const allProducts = [
  {
    id: 1,
    name: "Chocolate Dooc",
    description: "Nuestro chocolate belga premium con trozos de chocolate semi-amargo.",
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
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
    badge: "Clásico",
    price: 5500,
    category: "vainilla",
  },
  {
    id: 6,
    name: "Menta Chocolate",
    description: "Refrescante menta con chips de chocolate oscuro.",
    image: "chocmenta.jpg",
    badge: "Popular",
    price: 4800,
    category: "chocolate",
  },
  {
    id: 7,
    name: "Pistacho",
    description: "Cremoso, suave y con el sabor único del pistacho natural.",
    image: "pistacho.jpg",
    badge: "Popular",
    price: 6500,
    category: "pistacho",
  },
  {
    id: 8,
    name: "Sandia",
    description: "Dulce, refrescante y lleno de color.",
    image: "sandia.jpg",
    badge: "Sale",
    oldPrice: 7500,
    price: 5800,
    category: "frutas",
  },
];

export default function Productos() {
  const [products] = useState(allProducts);
  const [searchTerm, setSearchTerm] = useState(""); 

  // 🔍 Filtra productos según el nombre
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="productos-page">
      <h2 className="productos-title">Nuestros Productos</h2>

<input
  type="text"
  placeholder="Buscar producto..."
  className="buscador"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>

      <div className="productos-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <FlavorCard
              key={product.id}
              name={product.name}
              description={product.description}
              image={product.image}
              badge={product.badge}
              oldPrice={product.oldPrice}
              price={product.price}
            />
          ))
        ) : (
          <p className="sin-resultados">No se encontraron productos </p>
        )}
      </div>
    </section>
  );
}
