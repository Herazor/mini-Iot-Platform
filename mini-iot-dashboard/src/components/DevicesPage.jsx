import React, { useState } from 'react';
import { Search, Plus, MoreVertical, Edit, Copy, Trash2, ArrowLeft } from 'lucide-react';

export default function DevicesPage({ onBack }) {
  const [devices, setDevices] = useState([
    {
      id: 1,
      name: 'EM300-TH Sensor #1',
      authToken: 'nAm3JpAbY6kqBrGx4bNmTAn4',
      deviceType: 'LoRa EM300-TH',
      status: 'online',
      lastSeen: '2 minutes ago',
      owner: 'aldi@example.com'
    },
    {
      id: 2,
      name: 'EM300-TH Sensor #2',
      authToken: 'kB7xMn2PqR8sYt4ZvC9wDh5',
      deviceType: 'LoRa EM300-TH',
      status: 'offline',
      lastSeen: '1 hour ago',
      owner: 'aldi@example.com'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDevice, setNewDevice] = useState({ name: '', deviceType: 'LoRa EM300-TH' });

  const filteredDevices = devices.filter(device => {
    const matchSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       device.authToken.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'all' || device.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const generateAuthToken = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 24; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  };

  const handleAddDevice = () => {
    if (newDevice.name.trim()) {
      const device = {
        id: Date.now(),
        name: newDevice.name,
        authToken: generateAuthToken(),
        deviceType: newDevice.deviceType,
        status: 'offline',
        lastSeen: 'Never',
        owner: 'aldi@example.com'
      };
      setDevices([...devices, device]);
      setNewDevice({ name: '', deviceType: 'LoRa EM300-TH' });
      setShowAddModal(false);
    }
  };

  const handleDeleteDevice = (id) => {
    if (window.confirm('Are you sure you want to delete this device?')) {
      setDevices(devices.filter(d => d.id !== id));
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Auth token copied to clipboard!');
  };

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
<div className="bg-white border-b border-gray-200 px-6 py-4">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-4">
      <button 
        onClick={onBack}
        className="text-gray-600 hover:text-gray-800 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        title="Back to Console"
      >
        <ArrowLeft size={24} />
      </button>
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Devices</h1>
        <p className="text-sm text-gray-600 mt-1">Manage your IoT devices</p>
      </div>
    </div>
    <button 
      onClick={() => setShowAddModal(true)}
      className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
    >
      <Plus size={20} />
      New Device
    </button>
  </div>
</div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search devices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === 'all'
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({devices.length})
            </button>
            <button
              onClick={() => setFilterStatus('online')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === 'online'
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Online ({devices.filter(d => d.status === 'online').length})
            </button>
            <button
              onClick={() => setFilterStatus('offline')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === 'offline'
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Offline ({devices.filter(d => d.status === 'offline').length})
            </button>
          </div>
        </div>
      </div>

      {/* Devices Table */}
      <div className="p-6">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Device Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Auth Token
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Last Seen
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDevices.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    No devices found
                  </td>
                </tr>
              ) : (
                filteredDevices.map(device => (
                  <tr key={device.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">{device.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">
                          {device.authToken}
                        </code>
                        <button
                          onClick={() => copyToClipboard(device.authToken)}
                          className="text-gray-400 hover:text-gray-600"
                          title="Copy token"
                        >
                          <Copy size={16} />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{device.deviceType}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        device.status === 'online'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          device.status === 'online' ? 'bg-green-600' : 'bg-gray-600'
                        }`} />
                        {device.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {device.lastSeen}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="text-gray-400 hover:text-blue-600 p-1"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteDevice(device.id)}
                          className="text-gray-400 hover:text-red-600 p-1"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Device Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Device</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Device Name
                </label>
                <input
                  type="text"
                  value={newDevice.name}
                  onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="e.g., EM300-TH Sensor #3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Device Type
                </label>
                <select
                  value={newDevice.deviceType}
                  onChange={(e) => setNewDevice({ ...newDevice, deviceType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option>LoRa EM300-TH</option>
                  <option>LoRa EM300-SLD</option>
                  <option>ESP32</option>
                  <option>Arduino</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddDevice}
                className="flex-1 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
              >
                Add Device
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}