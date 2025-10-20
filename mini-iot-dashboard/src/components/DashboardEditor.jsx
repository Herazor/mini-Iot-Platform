// src/components/DashboardEditor.jsx
import React, { useEffect, useState } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import WidgetCard from "./WidgetCard.jsx";
import WidgetSelector from "./WidgetSelector.jsx";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ReactGridLayout = WidthProvider(RGL);

const STORAGE_KEY = "mini-blynk:dashboard";

export default function DashboardEditor({ onBack }) {
  // layout is array of {i, x, y, w, h}
  const [layout, setLayout] = useState([]);
  const [widgets, setWidgets] = useState([]);
  const [showSelector, setShowSelector] = useState(false);

  // load saved
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setWidgets(parsed.widgets || []);
        setLayout(parsed.layout || []);
      } else {
        // default example
        const w1 = { id: "w-temp", type: "temperature", title: "Suhu", topic: "device/ABC123/data", options: {} };
        const w2 = { id: "w-hum", type: "humidity", title: "Kelembapan", topic: "device/ABC123/data", options: {} };
        setWidgets([w1, w2]);
        setLayout([
          { i: w1.id, x: 0, y: 0, w: 3, h: 4 },
          { i: w2.id, x: 3, y: 0, w: 3, h: 4 }
        ]);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const persist = (newWidgets, newLayout) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ widgets: newWidgets, layout: newLayout }));
  };

  const onAddWidget = (widget) => {
    // default placement
    const nextLayoutItem = { i: widget.id, x: 0, y: Infinity, w: 3, h: 4 };
    const newWidgets = [...widgets, widget];
    const newLayout = [...layout, nextLayoutItem];
    setWidgets(newWidgets);
    setLayout(newLayout);
    persist(newWidgets, newLayout);
  };

  const onRemove = (id) => {
    const newWidgets = widgets.filter(w => w.id !== id);
    const newLayout = layout.filter(l => l.i !== id);
    setWidgets(newWidgets);
    setLayout(newLayout);
    persist(newWidgets, newLayout);
  };

  const onEdit = (id) => {
    alert("Edit widget not implemented in editor demo — you can extend to edit title/topic.");
  };

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={onBack} className="border px-3 py-1 rounded">⬅️ Back</button>
          <button onClick={() => setShowSelector(true)} className="bg-teal-500 text-white px-3 py-1 rounded">+ Add Widget</button>
          <button onClick={() => { persist(widgets, layout); alert("Saved"); }} className="border px-3 py-1 rounded">Save</button>
        </div>
        <div style={{ color: "#6b7280" }}>Drag & resize widgets. Save to persist.</div>
      </div>

      <div>
        <ReactGridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={30}
          width={900}
          onLayoutChange={(newLayout) => {
            setLayout(newLayout);
            persist(widgets, newLayout);
          }}
        >
          {widgets.map(widget => (
            <div key={widget.id} data-grid={layout.find(l => l.i === widget.id) || { i: widget.id, x:0,y:0,w:3,h:4 }}>
              <WidgetCard
                widget={widget}
                isEditor={true}
                onRemove={() => onRemove(widget.id)}
                onEdit={() => onEdit(widget.id)}
              />
            </div>
          ))}
        </ReactGridLayout>
      </div>

      {showSelector && <WidgetSelector onAdd={onAddWidget} onClose={() => setShowSelector(false)} />}
    </div>
  );
}
