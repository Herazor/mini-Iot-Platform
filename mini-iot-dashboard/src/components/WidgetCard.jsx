// src/components/WidgetCard.jsx
import React from "react";
import { Thermometer, Droplets, Power, Activity } from "lucide-react";

export default function WidgetCard({ widget, value, isEditor, onRemove, onEdit }) {
  const { type, title } = widget;

  const renderIcon = () => {
    if (type === "temperature") return <Thermometer size={20} />;
    if (type === "humidity") return <Droplets size={20} />;
    if (type === "indicator") return <Activity size={20} />;
    if (type === "switch") return <Power size={20} />;
    return <Activity size={20} />;
  };

  const renderBody = () => {
    if (type === "temperature") {
      const t = value?.temperature ?? value?.temp ?? "--";
      return <div style={{ fontSize: 28, fontWeight: 700 }}>{t !== "--" ? `${t} °C` : "--"}</div>;
    }

    if (type === "humidity") {
      const h = value?.humidity ?? value?.hum ?? "--";
      return <div style={{ fontSize: 28, fontWeight: 700 }}>{h !== "--" ? `${h} %` : "--"}</div>;
    }

    if (type === "indicator") {
      const ok = !!value?.ok;
      return (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              background: ok ? "#10b981" : "#f97373",
            }}
          />
          <div style={{ fontWeight: 600 }}>{ok ? "OK" : "ALERT"}</div>
        </div>
      );
    }

    if (type === "switch") {
      const on = !!value?.on;
      return (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 40,
              height: 24,
              borderRadius: 12,
              background: on ? "#06b6d4" : "#e5e7eb",
              display: "flex",
              alignItems: "center",
              padding: 3,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 9,
                background: "#fff",
                transform: on ? "translateX(16px)" : "translateX(0)",
                transition: "transform .15s",
              }}
            />
          </div>
          <div style={{ fontWeight: 600 }}>{on ? "ON" : "OFF"}</div>
        </div>
      );
    }

    return <div style={{ color: "#6b7280" }}>Widget preview</div>;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        height: "100%",
        padding: 12,
        boxSizing: "border-box",
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ color: "#374151" }}>{renderIcon()}</div>
          <div style={{ fontWeight: 700 }}>{title}</div>
        </div>

        {isEditor && (
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={onEdit} title="Edit" style={{ border: "none", background: "none", cursor: "pointer" }}>✏️</button>
            <button onClick={onRemove} title="Remove" style={{ border: "none", background: "none", cursor: "pointer" }}>🗑️</button>
          </div>
        )}
      </div>

      <div
        style={{
          marginTop: 6,
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {renderBody()}
      </div>

      <div style={{ fontSize: 12, color: "#6b7280" }}>
        {widget.topic ? `topic: ${widget.topic}` : "no topic"}
      </div>
    </div>
  );
}
