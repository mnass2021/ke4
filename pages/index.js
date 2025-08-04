import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function SeguimientoKE4() {
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
    <div className="max-w-xl mx-auto p-4">
      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-bold">Seguimiento Diario - Ésteres de Cetona</h2>
          <Input name="fecha" type="date" onChange={handleChange} placeholder="Fecha" />
          <Input name="hora" type="time" onChange={handleChange} placeholder="Hora de toma" />
          <Input name="dosis" onChange={handleChange} placeholder="Dosis (ml)" />
          <Input name="bhbAntes" onChange={handleChange} placeholder="BHB antes (mmol/L)" />
          <Input name="bhbDespues" onChange={handleChange} placeholder="BHB después (mmol/L)" />
          <Input name="glucosaAntes" onChange={handleChange} placeholder="Glucosa antes (mg/dL)" />
          <Input name="glucosaDespues" onChange={handleChange} placeholder="Glucosa después (mg/dL)" />
          <Textarea name="sintomasDigestivos" onChange={handleChange} placeholder="Síntomas digestivos" />
          <Textarea name="sintomasMusculares" onChange={handleChange} placeholder="Síntomas musculares" />
          <Input name="energia" onChange={handleChange} placeholder="Energía general (1-10)" />
          <Input name="claridadMental" onChange={handleChange} placeholder="Claridad mental (1-10)" />
          <Input name="ck" onChange={handleChange} placeholder="CK (opcional)" />
          <Button onClick={handleSubmit}>Guardar</Button>
        </CardContent>
      </Card>
    </div>
  );
}
