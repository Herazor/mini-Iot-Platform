// Simpan daftar device ke localStorage
export function saveDevice(device) {
  const devices = getAllDevices();
  devices.push(device);
  localStorage.setItem('devices', JSON.stringify(devices));
}

// Ambil semua device dari localStorage
export function getAllDevices() {
  return JSON.parse(localStorage.getItem('devices')) || [];
}

// Ambil satu device berdasarkan DEVICE_EUI
export function getDeviceByEUI(deviceEUI) {
  const devices = getAllDevices();
  return devices.find((device) => device.deviceEUI === deviceEUI);
}

// Hapus device berdasarkan DEVICE_EUI
export function deleteDevice(deviceEUI) {
  const devices = getAllDevices().filter((device) => device.deviceEUI !== deviceEUI);
  localStorage.setItem('devices', JSON.stringify(devices));
}
