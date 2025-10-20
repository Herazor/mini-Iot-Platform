import React, { useEffect, useState } from "react";

const DeviceList = ({ onBack, onOpenDashboard, onAddDevice }) => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ambil daftar device dari backend
  const fetchDevices = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/devices");
      if (!res.ok) throw new Error("Gagal mengambil data dari server");

      const data = await res.json();
      setDevices(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
        >
          ← Kembali
        </button>
        <button
          onClick={onAddDevice}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          ➕ Tambah Device
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-4 text-gray-800">📡 Daftar Device</h1>

      {loading && <p className="text-gray-600">⏳ Memuat data device...</p>}
      {error && <p className="text-red-600">⚠️ {error}</p>}

      {!loading && devices.length === 0 && (
        <p className="text-gray-600">Belum ada device terdaftar.</p>
      )}

      <div className="grid gap-4">
        {devices.map((d) => (
          <div
            key={d.eui}
            className="bg-white shadow rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-gray-800">{d.name}</p>
              <p className="text-sm text-gray-500">EUI: {d.eui}</p>
              <p className="text-sm text-gray-500">Tipe: {d.type}</p>
            </div>
            <button
              onClick={() => onOpenDashboard(d.eui)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
            >
              Lihat Dashboard
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceList;
