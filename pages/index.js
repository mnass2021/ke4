import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    fecha: "",
    hora: "",
    dosis: "",
    bhbAntes: "",
    bhbDespues: "",
    glucosaAntes: "",
    glucosaDespues: "",
    sintomasDigestivos: "",
    sintomasMusculares: "",
    energia: "",
    claridadMental: "",
    ck: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbxZlvH9EzaeLcieXxvovud8dXcMyob4zAJfSrmX3OgO9EZSNwiax9kXuhcfADEnRrvaCQ/exec", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        alert("Datos guardados correctamente en Google Sheets");
      } else {
        alert("Error al guardar los datos");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("Fallo la conexión con Google Sheets");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <h2 style={{ fontWeight: "bold", fontSize: "1.25rem" }}>Seguimiento Diario - Ésteres de Cetona</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1rem" }}>
        <input name="fecha" type="date" onChange={handleChange} placeholder="Fecha" />
        <input name="hora" type="time" onChange={handleChange} placeholder="Hora de toma" />
        <input name="dosis" onChange={handleChange} placeholder="Dosis (ml)" />
        <input name="bhbAntes" onChange={handleChange} placeholder="BHB antes (mmol/L)" />
        <input name="bhbDespues" onChange={handleChange} placeholder="BHB después (mmol/L)" />
        <input name="glucosaAntes" onChange={handleChange} placeholder="Glucosa antes (mg/dL)" />
        <input name="glucosaDespues" onChange={handleChange} placeholder="Glucosa después (mg/dL)" />
        <textarea name="sintomasDigestivos" onChange={handleChange} placeholder="Síntomas digestivos" />
        <textarea name="sintomasMusculares" onChange={handleChange} placeholder="Síntomas musculares" />
        <input name="energia" onChange={handleChange} placeholder="Energía general (1-10)" />
        <input name="claridadMental" onChange={handleChange} placeholder="Claridad mental (1-10)" />
        <input name="ck" onChange={handleChange} placeholder="CK (opcional)" />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}
