import React, { useState } from "react";

const TemplateList = ({ onBack, onAddTemplate, onOpenTemplate }) => {
  const [templates, setTemplates] = useState([
    { id: 1, name: "Sensor Suhu", widgets: 3 },
    { id: 2, name: "Smart Lamp", widgets: 5 },
  ]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <button
        onClick={onBack}
        className="mb-6 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
      >
        ← Kembali
      </button>

      <h1 className="text-2xl font-bold mb-4 text-gray-800">📦 Template</h1>

      <button
        onClick={onAddTemplate}
        className="mb-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        ➕ Tambah Template
      </button>

      <div className="grid gap-4">
        {templates.map((t) => (
          <div
            key={t.id}
            className="bg-white shadow rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-gray-800">{t.name}</p>
              <p className="text-sm text-gray-500">{t.widgets} widget</p>
            </div>
            <button
              onClick={() => onOpenTemplate(t.id)}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
            >
              Buka
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateList;
