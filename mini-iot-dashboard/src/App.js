import React, { useState } from "react";
import BlynkConsole from "./components/ConsoleBlynk.jsx";
import DashboardEditor from "./components/DashboardEditor.jsx";
import DevicesList from "./pages/DeviceList.jsx";
import DeviceDashboard from "./pages/DeviceDashboard.jsx";
import AddDevice from "./pages/addDevice.jsx"; // ✅ huruf besar A disamakan
import TemplateList from "./pages/TemplateList.jsx";
import AddTemplate from "./pages/AddTemplate.jsx";
import TemplateDetail from "./pages/TemplateDetail.jsx";

function App() {
  const [view, setView] = useState("console");
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // ✅ Navigasi ke dashboard berdasarkan Device EUI
  const handleOpenDashboard = (deviceEui) => {
    setSelectedDevice(deviceEui);
    setView("dashboard");
  };

  return (
    <div>
      {/* ✅ Halaman utama seperti Blynk console */}
      {view === "console" && <BlynkConsole onNavigate={setView} />}

      {/* ✅ Editor dashboard */}
      {view === "editor" && (
        <DashboardEditor onBack={() => setView("console")} />
      )}

      {/* ✅ Daftar device */}
      {view === "devices" && (
        <DevicesList
          onBack={() => setView("console")}
          onOpenDashboard={handleOpenDashboard}
          onAddDevice={() => setView("addDevice")}
        />
      )}

      {/* ✅ Dashboard tiap device */}
      {view === "dashboard" && selectedDevice && (
        <DeviceDashboard
          deviceEui={selectedDevice}
          onBack={() => setView("devices")}
        />
      )}

      {/* ✅ Tambah device */}
      {view === "addDevice" && (
        <AddDevice onBack={() => setView("devices")} />
      )}

      {/* ✅ Daftar template */}
      {view === "templates" && (
        <TemplateList
          onBack={() => setView("console")}
          onOpenTemplate={(id) => {
            setSelectedTemplate(id);
            setView("templateDetail");
          }}
          onAddTemplate={() => setView("addTemplate")}
        />
      )}

      {/* ✅ Tambah template */}
      {view === "addTemplate" && (
        <AddTemplate onBack={() => setView("templates")} />
      )}

      {/* ✅ Detail template */}
      {view === "templateDetail" && selectedTemplate && (
        <TemplateDetail
          templateId={selectedTemplate}
          onBack={() => setView("templates")}
        />
      )}
    </div>
  );
}

export default App;
