// src/components/WidgetSelector.jsx
import React, { useState } from "react";

export default function WidgetSelector({ onAdd, onClose }) {
  const [type, setType] = useState("temperature");
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");

  const handleAdd = () => {
    if (!title) return alert("Isi judul widget");
    if (!topic) return alert("Isi MQTT topic (contoh: device/ABC123/data)");
    onAdd({
      id: Date.now().toString(36),
      type,
      title,
      topic,
      options: {}
    });
    onClose();
  };

  return (
    <div style={{
      position: "fixed", inset: 0, display: "flex", alignItems: "center",
      justifyContent: "center", background: "rgba(0,0,0,0.45)", zIndex: 60
    }}>
      <div style={{ width: 420, background: "#fff", borderRadius: 8, padding: 18 }}>
        <h3 style={{ marginBottom: 8 }}>Tambah Widget</h3>

        <div style={{ display: "grid", gap: 8 }}>
          <label>Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className="border rounded px-2 py-1">
            <option value="temperature">Temperature</option>
            <option value="humidity">Humidity</option>
            <option value="indicator">Indicator</option>
            <option value="switch">Switch</option>
          </select>

          <label>Judul</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="border rounded px-2 py-1" placeholder="e.g., Suhu Ruang"/>

          <label>MQTT Topic</label>
          <input value={topic} onChange={(e) => setTopic(e.target.value)} className="border rounded px-2 py-1" placeholder="device/ABC123/data"/>

          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <button onClick={handleAdd} className="bg-teal-500 text-white px-3 py-1 rounded">Tambah</button>
            <button onClick={onClose} className="border px-3 py-1 rounded">Batal</button>
          </div>
        </div>
      </div>
    </div>
  );
}
