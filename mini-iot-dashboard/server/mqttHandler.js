import mqtt from "mqtt";
import DeviceData from "./models/DeviceData.js";

const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
  console.log("✅ MQTT backend connected");
  client.subscribe("device/+/data"); // semua device
});

client.on("message", async (topic, message) => {
  try {
    const payload = JSON.parse(message.toString());
    const deviceEui = topic.split("/")[1];

    await DeviceData.create({
      deviceEui,
      temperature: payload.temperature,
      humidity: payload.humidity,
      timestamp: new Date(),
    });
    console.log(`💾 Saved data for ${deviceEui}`);
  } catch (e) {
    console.error("❌ Error saving MQTT data:", e);
  }
});
