import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import BlynkConsole from "./components/ConsoleBlynk.jsx";
import DashboardEditor from "./components/DashboardEditor.jsx";
import EditDashboard from "./components/EditDashboard.jsx";
import BlynkDevicePage from "./pages/BlynkDevicePage.jsx"
import DeviceDashboard from "./pages/DeviceDashboard.jsx";
import DeviceDetail from "./pages/DeviceDetail.jsx";  // ← TAMBAHKAN INI
import AddDevice from "./pages/addDevice.jsx";
import TemplateList from "./pages/TemplateList.jsx";
import AddTemplate from "./pages/AddTemplate.jsx";
import TemplateDetail from "./pages/TemplateDetail.jsx";


function App() {
  return (
    <Router>
      <Routes>
        {/* Rute utama, langsung mengarah ke halaman console */}
        <Route path="/" element={<Navigate to="/console" />} />

        {/* Rute untuk Console */}
        <Route path="/console" element={<BlynkConsole />} />

        {/* Rute untuk Dashboard Editor */}
        <Route path="/editor" element={<DashboardEditor />} />
        
        {/* Daftar Device */}
        <Route path="/devices" element={<BlynkDevicePage />} />

        {/* Device Detail - TAMBAHKAN ROUTE INI */}
        <Route path="/devices/:deviceId" element={<DeviceDetail />} />

        {/* Device Dashboard (yang lama, bisa dihapus atau rename) */}
        <Route path="/devices/dashboard/:deviceEui" element={<DeviceDashboard />} />

        {/* Halaman untuk Menambah Device */}
        <Route path="/addDevice" element={<AddDevice />} />

        {/* Daftar Template */}
        <Route path="/templates" element={<TemplateList />} />

        {/* Halaman untuk Menambah Template */}
        <Route path="/addTemplate" element={<AddTemplate />} />

        {/* Detail Template */}
        <Route path="/templates/:templateId" element={<TemplateDetail />} />

        {/* Rute untuk Dashboard (View Mode) */}
        <Route path="/dashboard" element={<DashboardEditor />} />
        
        {/* Rute untuk Dashboard Edit Mode */}
        <Route path="/dashboard/edit" element={<EditDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;