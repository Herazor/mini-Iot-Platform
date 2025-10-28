import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link untuk routing

const TemplateList = ({ onBack, onAddTemplate }) => {
  const [templates, setTemplates] = useState([
    { id: 1, name: "Sensor Suhu", widgets: 3 },
    { id: 2, name: "Smart Lamp", widgets: 5 },
  ]);
  
  const navigate = useNavigate(); // Untuk navigasi programatis jika diperlukan

  // Fungsi untuk mengarahkan ke halaman dashboard
  const handleNewDashboard = () => {
    navigate("/dashboard"); // Mengalihkan ke halaman dashboard
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Panel untuk Dashboard */}
      <div className="flex flex-col space-y-4 bg-gray-100 p-4 w-1/4">
        {/* Tombol New Dashboard */}
        <button
          onClick={handleNewDashboard} // Fungsi untuk mengarahkan ke /dashboard
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          New Dashboard
        </button>

        {/* Tombol Filter */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Filter
        </button>

        {/* Tombol untuk menambah template */}
        <button
          onClick={onAddTemplate}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          ➕ Tambah Template
        </button>
      </div>

      {/* Konten Template */}
      <div className="ml-1/4 p-6">
        {/* Tombol kembali */}
        <button
          onClick={onBack}
          className="mb-6 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
        >
          ← Kembali
        </button>

        {/* Judul halaman */}
        <h1 className="text-2xl font-bold mb-4 text-gray-800">📦 Template</h1>

        {/* Grid untuk menampilkan daftar template */}
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {templates.map((t) => (
            <div
              key={t.id}
              className="bg-white shadow rounded-lg p-4 flex flex-col justify-between items-center"
            >
              <div className="flex flex-col items-center">
                <div className="h-14 w-14 rounded-xl bg-emerald-100 mb-3" />
                <p className="font-semibold text-gray-800">{t.name}</p>
                <p className="text-sm text-gray-500">{t.widgets} widget</p>
              </div>
              {/* Menggunakan Link untuk navigasi ke halaman detail template */}
              <Link
                to={`/templates/${t.id}`} // Routing ke template detail
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mt-3"
              >
                Buka
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateList;








