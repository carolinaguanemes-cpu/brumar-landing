import React, { useState } from "react";

export default function BrumarStore() {
  const [cart, setCart] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    deliveryDate: "",
    paymentMethod: "Nequi",
  });

  // Importar imágenes (reemplazar rutas con URLs públicas o base64)
  const products = [
    // Yogurt Griego
    { id: 1, name: "Yogurt Griego Natural 920g", price: 27000, category: "Yogurt Griego", image: "Griego_920.jpeg" },
    { id: 2, name: "Yogurt Griego Frutal 920g", price: 34000, category: "Yogurt Griego", image: "Griego_920.jpeg" },
    { id: 3, name: "Yogurt Griego Natural 420g", price: 15000, category: "Yogurt Griego", image: "Griego_420.jpeg" },
    { id: 4, name: "Yogurt Griego Frutal 420g", price: 19000, category: "Yogurt Griego", image: "Griego_420.jpeg" },
    { id: 5, name: "Yogurt Griego 100g", price: 4800, category: "Yogurt Griego", image: "griego_personal.png" },
    // Kéfir
    { id: 6, name: "Kéfir 1L", price: 24000, category: "Kéfir", image: "Kefir.png" },
    { id: 7, name: "Kéfir 2L", price: 44000, category: "Kéfir", image: "Kefir.png" },
    // Yogurt Bebible
    { id: 8, name: "Yogurt Bebible 1L", price: 14000, category: "Yogurt Bebible", image: "yogurt_bebible_1_litro.jpeg" },
    { id: 9, name: "Yogurt Bebible 2L", price: 26000, category: "Yogurt Bebible", image: "yogurt_bebible_2_litros.jpeg" },
    { id: 10, name: "Yogurt Personal (botella)", price: 4500, category: "Yogurt Bebible", image: "yogurt_bebible_personal.jpeg" },
    // Kumis
    { id: 11, name: "Kumis 1L", price: 13000, category: "Kumis", image: "kumis.png" },
    { id: 12, name: "Kumis 2L", price: 24000, category: "Kumis", image: "kumis.png" },
    // Quesos
    { id: 13, name: "Mozzarella 250g", price: 13000, category: "Quesos", image: "Queso_mozzarella.jpeg" },
    { id: 14, name: "Mozzarella 500g", price: 22000, category: "Quesos", image: "Queso_mozzarella.jpeg" },
    { id: 15, name: "Queso Criollo 250g", price: 8500, category: "Quesos", image: "Queso_criollo.jpeg" },
    { id: 16, name: "Queso Criollo 500g", price: 15000, category: "Quesos", image: "Queso_criollo.jpeg" },
    { id: 17, name: "Queso Criollo 1kg", price: 28000, category: "Quesos", image: "Queso_criollo.jpeg" },
    { id: 18, name: "Queso Pera 250g", price: 13000, category: "Quesos", image: "Queso_pera.jpeg" },
    { id: 19, name: "Queso Pera 500g", price: 22000, category: "Quesos", image: "Queso_pera.jpeg" },
    { id: 20, name: "Snack x6 con Bocadillo", price: 17000, category: "Quesos", image: "snacks.jpeg" },
    { id: 21, name: "Snack x6 solo Queso", price: 19000, category: "Quesos", image: "snacks.jpeg" },
  ];

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const orderText = `Hola BRUMAR, quiero hacer un pedido:\n\n${cart
      .map(item => `• ${item.quantity}x ${item.name} = $${(item.price * item.quantity).toLocaleString()}`)
      .join('\n')}\n\nTOTAL: $${total.toLocaleString()}\n\nNombre: ${formData.name}\nDirección: ${formData.address}\nFecha entrega: ${formData.deliveryDate}\nForma pago: ${formData.paymentMethod}`;
    
    const whatsappUrl = `https://wa.me/+573002510163?text=${encodeURIComponent(orderText)}`;
    window.open(whatsappUrl, '_blank');
  };

  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div style={{ fontFamily: "'Anthropic Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: "#f9f7f4", paddingBottom: "100px" }}>
      {/* Header */}
      <header style={{
        background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
        color: "white",
        padding: "2rem 1rem",
        textAlign: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        <h1 style={{ margin: "0 0 0.5rem 0", fontSize: "2rem", fontWeight: "600" }}>BRUMAR</h1>
        <p style={{ margin: 0, fontSize: "1rem", opacity: 0.9 }}>Lácteos Artesanales Premium</p>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
        {/* Intro */}
        <div style={{
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          marginBottom: "2rem",
          textAlign: "center",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
        }}>
          <h2 style={{ marginTop: 0, color: "#2c3e50" }}>Nuestros Productos</h2>
          <p style={{ color: "#7f8c8d", marginBottom: 0 }}>Selecciona tus productos favoritos y realiza tu pedido en segundos</p>
        </div>

        {/* Products Grid */}
        {Object.entries(groupedProducts).map(([category, items]) => (
          <div key={category} style={{ marginBottom: "3rem" }}>
            <h3 style={{
              color: "#2c3e50",
              borderBottom: "3px solid #e74c3c",
              paddingBottom: "0.5rem",
              marginBottom: "1.5rem",
              fontSize: "1.3rem"
            }}>
              {category}
            </h3>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "1.5rem"
            }}>
              {items.map(product => (
                <div key={product.id} style={{
                  background: "white",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  cursor: "pointer",
                  transform: "translateY(0)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
                }}>
                  <div style={{
                    background: "#f5f3f0",
                    padding: "1rem",
                    textAlign: "center",
                    height: "250px",
                    overflow: "hidden",
                    borderBottom: "1px solid #ecf0f1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <img 
                      src={`/images/${product.image}`}
                      alt={product.name}
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain"
                      }}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                  
                  <div style={{ padding: "1.5rem" }}>
                    <h4 style={{ margin: "0 0 0.5rem 0", color: "#2c3e50", fontSize: "0.95rem" }}>
                      {product.name}
                    </h4>
                    <p style={{
                      margin: "1rem 0",
                      fontSize: "1.5rem",
                      fontWeight: "600",
                      color: "#e74c3c"
                    }}>
                      ${product.price.toLocaleString()}
                    </p>
                    <button
                      onClick={() => addToCart(product)}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        background: "#3498db",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "background 0.2s"
                      }}
                      onMouseEnter={(e) => e.target.style.background = "#2980b9"}
                      onMouseLeave={(e) => e.target.style.background = "#3498db"}
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      <div style={{
        position: "fixed",
        bottom: "0",
        left: "0",
        right: "0",
        background: "white",
        borderTop: "2px solid #ecf0f1",
        padding: "1rem",
        boxShadow: "0 -2px 8px rgba(0,0,0,0.1)"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {cart.length === 0 ? (
            <p style={{ color: "#95a5a6", textAlign: "center", margin: 0 }}>
              Tu carrito está vacío
            </p>
          ) : (
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem"
            }}>
              <div>
                <strong style={{ color: "#2c3e50" }}>
                  {cart.length} producto(s) • Total: ${total.toLocaleString()}
                </strong>
              </div>
              <button
                onClick={() => setShowForm(true)}
                style={{
                  padding: "0.75rem 2rem",
                  background: "#27ae60",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => e.target.style.background = "#229954"}
                onMouseLeave={(e) => e.target.style.background = "#27ae60"}
              >
                Hacer Pedido
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal Carrito */}
      {showForm && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "1rem"
        }}>
          <div style={{
            background: "white",
            borderRadius: "12px",
            padding: "2rem",
            maxWidth: "500px",
            width: "100%",
            maxHeight: "90vh",
            overflowY: "auto"
          }}>
            <h2 style={{ margin: "0 0 1.5rem 0", color: "#2c3e50" }}>Tu Pedido</h2>

            {/* Resumen del carrito */}
            <div style={{
              background: "#f9f7f4",
              padding: "1rem",
              borderRadius: "8px",
              marginBottom: "1.5rem"
            }}>
              {cart.map(item => (
                <div key={item.id} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.5rem 0",
                  borderBottom: "1px solid #ecf0f1"
                }}>
                  <div>
                    <p style={{ margin: 0, color: "#2c3e50", fontSize: "0.9rem" }}>
                      {item.name}
                    </p>
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{ width: "24px", height: "24px", background: "#ecf0f1", border: "none", cursor: "pointer", borderRadius: "4px" }}>−</button>
                      <span style={{ minWidth: "20px", textAlign: "center" }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{ width: "24px", height: "24px", background: "#ecf0f1", border: "none", cursor: "pointer", borderRadius: "4px" }}>+</button>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ margin: 0, fontWeight: "600", color: "#e74c3c" }}>
                      ${(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
              <div style={{
                paddingTop: "1rem",
                borderTop: "2px solid #ecf0f1",
                marginTop: "1rem",
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "600",
                color: "#e74c3c",
                fontSize: "1.1rem"
              }}>
                <span>Total:</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", color: "#2c3e50", fontWeight: "500" }}>
                  Nombre completo
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #bdc3c7",
                    borderRadius: "6px",
                    fontSize: "1rem",
                    boxSizing: "border-box"
                  }}
                />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", color: "#2c3e50", fontWeight: "500" }}>
                  Teléfono
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #bdc3c7",
                    borderRadius: "6px",
                    fontSize: "1rem",
                    boxSizing: "border-box"
                  }}
                />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", color: "#2c3e50", fontWeight: "500" }}>
                  Dirección de entrega
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #bdc3c7",
                    borderRadius: "6px",
                    fontSize: "1rem",
                    boxSizing: "border-box"
                  }}
                />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", color: "#2c3e50", fontWeight: "500" }}>
                  Fecha de entrega
                </label>
                <input
                  type="date"
                  required
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #bdc3c7",
                    borderRadius: "6px",
                    fontSize: "1rem",
                    boxSizing: "border-box"
                  }}
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", color: "#2c3e50", fontWeight: "500" }}>
                  Forma de pago
                </label>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #bdc3c7",
                    borderRadius: "6px",
                    fontSize: "1rem",
                    boxSizing: "border-box"
                  }}
                >
                  <option>Nequi</option>
                  <option>Daviplata</option>
                  <option>Llave</option>
                  <option>Efectivo</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: "1rem" }}>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    background: "#bdc3c7",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    fontWeight: "600",
                    cursor: "pointer"
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    background: "#27ae60",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    fontWeight: "600",
                    cursor: "pointer"
                  }}
                >
                  Enviar por WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{
        background: "#2c3e50",
        color: "white",
        textAlign: "center",
        padding: "2rem 1rem",
        marginTop: "3rem"
      }}>
        <p>📍 Suesca, Cundinamarca | 📧 info@brumar.co | 📱 +57 300 2510163</p>
        <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>Entrega en Bogotá, Sabana de Bogotá y municipios aledaños a Suesca</p>
      </footer>
    </div>
  );
}
