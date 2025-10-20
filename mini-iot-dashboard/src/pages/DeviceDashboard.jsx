// src/pages/DeviceDashboard.jsx
import React, { useEffect, useState, useRef } from "react";
import WidgetCard from "../components/WidgetCard.jsx";
import mqttClient from "../mqtt/mqttClient";

const STORAGE_KEY = "mini-blynk:dashboard";

export default function DeviceDashboard({ deviceEui, onBack }) {
  const [widgets, setWidgets] = useState([]);
  const [values, setValues] = useState({}); // map widgetId -> latest payload object
  const subscribedTopics = useRef(new Set());

  useEffect(() => {
    // load widgets config (same as editor)
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const { widgets: w } = JSON.parse(raw);
        setWidgets(w || []);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // helper: for each widget, subscribe to its topic (if not already)
  useEffect(() => {
    widgets.forEach(w => {
      // resolve topic template tokens (support {devEUI})
      const topic = w.topic.replace("{devEUI}", deviceEui);
      if (!subscribedTopics.current.has(topic)) {
        mqttClient.subscribe(topic, (err) => {
          if (err) console.error("Subscribe error", err);
          else {
            console.log("Subscribed to", topic);
            subscribedTopics.current.add(topic);
          }
        });
      }
    });

    const onMessage = (topic, message) => {
      const payloadStr = message.toString();
      let parsed;
      try {
        parsed = JSON.parse(payloadStr);
      } catch (_e) {
        // If raw payload (e.g., Antares style) may be nested: try extract m2m:cin.con
        parsed = { raw: payloadStr };
      }

      // update all widgets whose topic matches exactly
      widgets.forEach(w => {
        const widgetTopic = w.topic.replace("{devEUI}", deviceEui);
        if (widgetTopic === topic) {
          setValues(prev => ({ ...prev, [w.id]: parsed }));
        }
      });
    };

    mqttClient.on("message", onMessage);
    return () => {
      mqttClient.removeListener("message", onMessage);
      // optionally unsubscribe topics
      // widgets.forEach(w => mqttClient.unsubscribe(w.topic.replace("{devEUI}", deviceEui)));
    };
  }, [widgets, deviceEui]);

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <button onClick={onBack} className="border px-3 py-1 rounded">⬅️ Back</button>
          <h2 style={{ display: "inline-block", marginLeft: 12 }}>Dashboard — {deviceEui}</h2>
        </div>
      </div>

      <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
        {widgets.length === 0 && <div style={{ color: "#6b7280" }}>No widgets configured — go to Editor to add widgets.</div>}
        {widgets.map(w => (
          <div key={w.id}>
            <WidgetCard widget={w} value={values[w.id]} isEditor={false} />
          </div>
        ))}
      </div>
    </div>
  );
}
