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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
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
    <main style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>Seguimiento Diario - Ésteres de Cetona</h1>
      <form onSubmit={handleSubmit}>
        <input name="fecha" type="date" onChange={handleChange} placeholder="Fecha" /><br />
        <input name="hora" type="time" onChange={handleChange} placeholder="Hora de toma" /><br />
        <input name="dosis" onChange={handleChange} placeholder="Dosis (ml)" /><br />
        <input name="bhbAntes" onChange={handleChange} placeholder="BHB antes (mmol/L)" /><br />
        <input name="bhbDespues" onChange={handleChange} placeholder="BHB después (mmol/L)" /><br />
        <input name="glucosaAntes" onChange={handleChange} placeholder="Glucosa antes (mg/dL)" /><br />
        <input name="glucosaDespues" onChange={handleChange} placeholder="Glucosa después (mg/dL)" /><br />
        <textarea name="sintomasDigestivos" onChange={handleChange} placeholder="Síntomas digestivos" /><br />
        <textarea name="sintomasMusculares" onChange={handleChange} placeholder="Síntomas musculares" /><br />
        <input name="energia" onChange={handleChange} placeholder="Energía general (1-10)" /><br />
        <input name="claridadMental" onChange={handleChange} placeholder="Claridad mental (1-10)" /><br />
        <input name="ck" onChange={handleChange} placeholder="CK (opcional)" /><br />
        <button type="submit">Guardar</button>
      </form>
    </main>
  );
}
