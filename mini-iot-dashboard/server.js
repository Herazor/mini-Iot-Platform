// server.js (versi ES Module)
import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import mqtt from "mqtt";
import sqlite3pkg from "sqlite3";

const sqlite3 = sqlite3pkg.verbose();
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// === DATABASE SETUP ===
const db = new sqlite3.Database("./iot_data.db", (err) => {
  if (err) console.error("❌ Database error:", err);
  else console.log("✅ Connected to SQLite database");
});

db.run(`
  CREATE TABLE IF NOT EXISTS device_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    device_eui TEXT,
    temperature REAL,
    humidity REAL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// === MQTT SETUP ===
const mqttClient = mqtt.connect("mqtt://localhost:1883");

mqttClient.on("connect", () => {
  console.log("📡 MQTT connected (Node.js subscribed)");
  mqttClient.subscribe("device/+/data");
});

mqttClient.on("message", (topic, message) => {
  try {
    const payload = JSON.parse(message.toString());

    // Milesight payload: topic seperti application/1/device/24E124136D058953/up
    const parts = topic.split("/");
    const deviceEui = parts[3]; // ambil dari topic

    // Decode Base64 ke suhu & kelembapan
    const bytes = Buffer.from(payload.data, "base64");

    const tempRaw = (bytes[3] << 8) | bytes[4];
    const temperature = (tempRaw & 0x8000)
      ? (tempRaw - 0x10000) / 10
      : tempRaw / 10;

    const humidity = bytes[6] / 2;

    console.log(`🌡️ Device ${deviceEui} → Temp: ${temperature}°C, Hum: ${humidity}%`);

    // Simpan ke database
    db.run(
      `INSERT INTO device_data (device_eui, temperature, humidity) VALUES (?, ?, ?)`,
      [deviceEui, temperature, humidity],
      (err) => {
        if (err) console.error("❌ DB insert error:", err);
      }
    );
  } catch (err) {
    console.error("❌ MQTT message error:", err);
  }
});


// === API ENDPOINT ===
app.get("/api/device/:eui/history", (req, res) => {
  const { eui } = req.params;
  db.all(
    `SELECT * FROM device_data WHERE device_eui = ? ORDER BY timestamp DESC LIMIT 20`,
    [eui],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// === API UNTUK REGISTRASI DEVICE ===
db.run(`
  CREATE TABLE IF NOT EXISTS devices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    eui TEXT UNIQUE,
    type TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

app.post("/api/devices", (req, res) => {
  const { name, eui, type } = req.body;
  if (!name || !eui) {
    return res.status(400).json({ success: false, error: "Nama dan EUI wajib diisi" });
  }

  db.run(
    `INSERT INTO devices (name, eui, type) VALUES (?, ?, ?)`,
    [name, eui, type],
    (err) => {
      if (err) {
        console.error("❌ DB insert device error:", err);
        return res.status(500).json({ success: false, error: err.message });
      }
      console.log(`✅ Device ditambahkan: ${name} (${eui})`);
      res.json({ success: true });
    }
  );
});

// === API UNTUK MENGAMBIL SEMUA DEVICE ===
app.get("/api/devices", (req, res) => {
  db.all(`SELECT * FROM devices ORDER BY created_at DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});


app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
