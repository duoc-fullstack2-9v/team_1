import { useState, useEffect } from "react"
import FlavorCard from "../Components/FlavorCard"

const allProducts = [
  {
    id: 1,
    name: "Chocolate Dooc",
    description: "Nuestro chocolate belga premium con trozos de chocolate semi-amargo.",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    badge: "Más vendido",
    category: "chocolate",
  },
  {
    id: 2,
    name: "Fresa Silvestre",
    description: "Fresas orgánicas seleccionadas con un toque de crema dulce.",
    image:
      "https://images.unsplash.com/photo-1517099770215-453d597f5ac8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    badge: "Nuevo",
    category: "frutas",
  },
  {
    id: 3,
    name: "Dulce de Leche",
    description: "El auténtico sabor argentino con rizos de dulce de leche casero.",
    image: "https://images.unsplash.com/photo-1551746443-928f79dc5fdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    badge: "Clásico",
    category: "dulce",
  },
  {
    id: 4,
    name: "Mango Tropical",
    description: "Mangos frescos con un toque tropical refrescante.",
    image:
      "https://images.unsplash.com/photo-1570197788417-0e82375c9371?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    badge: "Verano",
    category: "frutas",
  },
  {
    id: 5,
    name: "Vainilla Premium",
    description: "Vainilla de Madagascar con semillas naturales.",
    image:
      "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    badge: "Clásico",
    category: "vainilla",
  },
  {
    id: 6,
    name: "Menta Chocolate",
    description: "Refrescante menta con chips de chocolate oscuro.",
    image:
      "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    badge: "Popular",
    category: "chocolate",
  },
]

export default function Productos() {
  const [products, setProducts] = useState(allProducts)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    if (filter === "all") {
      setProducts(allProducts)
    } else {
      setProducts(allProducts.filter((p) => p.category === filter))
    }
  }, [filter])

  return (
    <div className="productos-page">
      <div className="container">
        <div className="section-header">
          <h1 className="page-title">
            Nuestros <span className="text-dooc">Productos</span>
          </h1>
          <p className="section-subtitle">Descubre todos nuestros deliciosos sabores</p>
        </div>

        <div className="filter-buttons">
          <button onClick={() => setFilter("all")} className={`filter-btn ${filter === "all" ? "active" : ""}`}>
            Todos
          </button>
          <button
            onClick={() => setFilter("chocolate")}
            className={`filter-btn ${filter === "chocolate" ? "active" : ""}`}
          >
            Chocolate
          </button>
          <button onClick={() => setFilter("frutas")} className={`filter-btn ${filter === "frutas" ? "active" : ""}`}>
            Frutas
          </button>
          <button onClick={() => setFilter("dulce")} className={`filter-btn ${filter === "dulce" ? "active" : ""}`}>
            Dulce
          </button>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <FlavorCard
              key={product.id}
              name={product.name}
              description={product.description}
              image={product.image}
              badge={product.badge}
            />
          ))}
        </div>

        {products.length === 0 && (
          <div className="no-products">
            <p>No hay productos en esta categoría</p>
          </div>
        )}
      </div>
    </div>
  )
}
