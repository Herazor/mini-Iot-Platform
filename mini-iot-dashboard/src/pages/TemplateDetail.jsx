import React from "react";

const TemplateDetail = ({ templateId, onBack }) => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <button
        onClick={onBack}
        className="mb-6 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
      >
        ← Kembali
      </button>

      <h1 className="text-2xl font-bold text-gray-800">
        🧩 Template Detail - ID {templateId}
      </h1>

      <div className="mt-4 p-4 bg-white shadow rounded-lg">
        <p>📘 Ini adalah halaman detail untuk template dengan ID {templateId}.</p>
        <p>Kedepannya di sini akan ada daftar widget seperti di Blynk.</p>
      </div>
    </div>
  );
};

export default TemplateDetail;
