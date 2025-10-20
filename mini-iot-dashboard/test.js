// Gunakan CommonJS supaya tidak error import
const mqtt = require("mqtt");

// Connect ke broker lokal (Mosquitto default port 1883)
const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
  console.log("✅ Terhubung ke MQTT broker!");

  // Subscribe ke topik "sensor/data"
  client.subscribe("sensor/data", (err) => {
    if (!err) {
      console.log("📡 Berlangganan ke topik: sensor/data");

      // Kirim pesan contoh
      const message = JSON.stringify({
        suhu: 28.5,
        kelembapan: 65.2,
      });

      client.publish("sensor/data", message);
      console.log("📤 Pesan terkirim:", message);
    } else {
      console.error("❌ Gagal subscribe:", err);
    }
  });
});

// Saat menerima pesan
client.on("message", (topic, message) => {
  console.log(`📩 Pesan diterima di ${topic}: ${message.toString()}`);
});

// Jika error
client.on("error", (err) => {
  console.error("❌ Error koneksi MQTT:", err);
});
