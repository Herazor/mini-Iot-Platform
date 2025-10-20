// src/mqtt/mqttClient.js
import mqtt from "mqtt";

// Sesuaikan URL websocket broker-mu
const WS_URL = "ws://localhost:9001";

const client = mqtt.connect(WS_URL, {
  reconnectPeriod: 2000,
  connectTimeout: 30_000,
});

client.on("connect", () => {
  console.log("✅ MQTT (WS) connected:", WS_URL);
});

client.on("error", (err) => {
  console.error("❌ MQTT error:", err);
});

export default client;
