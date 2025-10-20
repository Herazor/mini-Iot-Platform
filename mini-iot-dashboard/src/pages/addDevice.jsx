import React, { useState } from "react";

const AddDevice = ({ onBack }) => {
  const [form, setForm] = useState({ name: "", eui: "", type: "LoRa" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/api/devices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("✅ Device berhasil ditambahkan!");
        setTimeout(() => onBack(), 1000);
      } else {
        setMessage("⚠️ Gagal menambahkan device: " + data.error);
      }
    } catch (err) {
      setMessage("❌ Error: " + err.message);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <button
        onClick={onBack}
        className="mb-6 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
      >
        ← Kembali
      </button>

      <h1 className="text-2xl font-bold mb-4 text-gray-800">➕ Tambah Device</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Nama Device"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border rounded px-3 py-2"
          required
        />
        <input
          type="text"
          placeholder="Device EUI"
          value={form.eui}
          onChange={(e) => setForm({ ...form, eui: e.target.value })}
          className="w-full border rounded px-3 py-2"
          required
        />
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="w-full border rounded px-3 py-2"
        >
          <option>LoRa</option>
          <option>WiFi</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Simpan Device
        </button>
      </form>

      {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
    </div>
  );
};

export default AddDevice;
