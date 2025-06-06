
import { useState } from "react";

export default function RationForm() {
  const [bodyWeight, setBodyWeight] = useState(600);
  const [milkYield, setMilkYield] = useState(30);
  const [milkFat, setMilkFat] = useState(3.5);
  const [pregnant, setPregnant] = useState(false);
  const [feeds, setFeeds] = useState([
    { name: "Mısır Silajı", dm: 35, nel: 1.55, cp: 8.0, amount: 20 },
    { name: "Soya Küspesi", dm: 89, nel: 1.7, cp: 45.0, amount: 2 },
  ]);
  const [result, setResult] = useState(null);
  const [needs, setNeeds] = useState(null);

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:8000/analyze-ration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body_weight: bodyWeight, milk_yield: milkYield, feeds })
    });
    const data = await res.json();
    setResult(data);
  };

  const handleCalculateNeeds = async () => {
    const res = await fetch("http://localhost:8000/calculate-needs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body_weight: bodyWeight, milk_yield: milkYield, milk_fat: milkFat, pregnant })
    });
    const data = await res.json();
    setNeeds(data);
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h2>Sürü Bilgisi</h2>
      <input type="number" value={bodyWeight} onChange={e => setBodyWeight(Number(e.target.value))} placeholder="Canlı ağırlık (kg)" style={inputStyle} />
      <input type="number" value={milkYield} onChange={e => setMilkYield(Number(e.target.value))} placeholder="Süt verimi (litre/gün)" style={inputStyle} />
      <input type="number" value={milkFat} onChange={e => setMilkFat(Number(e.target.value))} placeholder="Süt yağı (%)" style={inputStyle} />
      <label>
        <input type="checkbox" checked={pregnant} onChange={e => setPregnant(e.target.checked)} />
        Gebelik var
      </label>
      <div style={{ marginTop: 10 }}>
        <button onClick={handleSubmit} style={buttonStyle}>Rasyonu Analiz Et</button>
        <button onClick={handleCalculateNeeds} style={{ ...buttonStyle, backgroundColor: '#999' }}>İhtiyacı Hesapla</button>
      </div>

      {needs && (
        <div style={cardStyle}>
          <h3>Besin İhtiyacı</h3>
          <p>DM: {needs.dm_target_kg} kg</p>
          <p>NEL: {needs.nel_need_mcal} Mcal</p>
          <p>CP: {needs.cp_need_g} g</p>
        </div>
      )}

      {result && (
        <div style={cardStyle}>
          <h3>Rasyon Sonucu</h3>
          <p>DM: {result.total_dm} kg</p>
          <p>NEL: {result.total_nel_mcal} Mcal</p>
          <p>CP: {result.total_cp} g</p>
          <p>Enerjiye Göre Süt: {result.milk_by_energy} L</p>
          <p>Proteine Göre Süt: {result.milk_by_protein} L</p>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  display: 'block',
  marginBottom: 10,
  padding: 8,
  width: '100%',
  borderRadius: 4,
  border: '1px solid #ccc'
};

const buttonStyle = {
  padding: '10px 20px',
  marginRight: 10,
  backgroundColor: '#1e40af',
  color: 'white',
  border: 'none',
  borderRadius: 4,
  cursor: 'pointer'
};

const cardStyle = {
  marginTop: 20,
  padding: 15,
  border: '1px solid #ddd',
  borderRadius: 6,
  backgroundColor: '#f9f9f9'
};
