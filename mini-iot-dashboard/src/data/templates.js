// src/data/templates.js
export const TEMPLATES = [
  { id: "tmpl-sensecap", name: "SenseCAP", board: "ESP32", network: "WiFi" },
  { id: "tmpl-weather",  name: "Weather Node", board: "ESP8266", network: "WiFi" },
];

export const getTemplateById = (id) => TEMPLATES.find(t => t.id === id);
