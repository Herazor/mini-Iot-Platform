// ==== server.js ====
import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import mqtt from "mqtt";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

// === Konfigurasi MQTT ===
const MQTT_BROKER = "mqtt://localhost:1883"; // kalau broker lokal
const TOPIC = "em300th/data"; // ubah sesuai topik dari gateway kamu

const mqttClient = mqtt.connect(MQTT_BROKER);

mqttClient.on("connect", () => {
  console.log("✅ Terhubung ke broker MQTT");
  mqttClient.subscribe(TOPIC, (err) => {
    if (!err) console.log(`📡 Subscribed ke topik: ${TOPIC}`);
  });
});

// === Fungsi decode data EM300-TH ===
function decodeEM300(hex) {
  try {
    if (!hex || hex.length < 14) return null;

    const tempHex = hex.substring(4, 8);
    const humHex = hex.substring(12, 14);

    const tempSigned = parseInt(tempHex, 16);
    const temperature =
      tempSigned > 0x7fff
        ? (tempSigned - 0x10000) / 10
        : tempSigned / 10;

    const humidity = parseInt(humHex, 16) / 2;

    return { temperature, humidity };
  } catch (e) {
    console.error("Decode error:", e);
    return null;
  }
}

// === Saat menerima data dari MQTT ===
mqttClient.on("message", (topic, message) => {
  try {
    const payload = message.toString();
    console.log("📥 Data diterima:", payload);

    let hexData = null;

    try {
      // Jika payload JSON dari gateway LoRa
      const json = JSON.parse(payload);
      hexData = json.data || json.payload_hex || null;
    } catch {
      // Jika langsung hex string
      hexData = payload;
    }

    if (hexData) {
      const decoded = decodeEM300(hexData);
      console.log("🌡️", decoded);
      io.emit("deviceData", decoded); // kirim ke frontend
    }
  } catch (error) {
    console.error("Error processing MQTT message:", error);
  }
});

// === Jalankan server HTTP ===
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
