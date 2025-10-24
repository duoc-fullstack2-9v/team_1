import React, { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", mensaje: "" });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", form);
    setEnviado(true);
    setForm({ nombre: "", email: "", telefono: "", mensaje: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-6 space-y-4">
      <input name="nombre" placeholder="Nombre completo" value={form.nombre} onChange={handleChange}
        className="input" required />
      <input name="email" type="email" placeholder="Correo electrónico" value={form.email} onChange={handleChange}
        className="input" required />
      <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange}
        className="input" />
      <textarea name="mensaje" rows="4" placeholder="Cuéntanos tu interés"
        value={form.mensaje} onChange={handleChange} className="input" />
      <button type="submit" className="bg-rose-600 text-white font-semibold px-4 py-2 rounded hover:bg-rose-700">
        Enviar solicitud
      </button>
      {enviado && <p className="text-green-600">¡Mensaje enviado! Te contactaremos pronto.</p>}
    </form>
  );
}
