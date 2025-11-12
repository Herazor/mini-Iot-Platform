import React, { useState, useEffect } from "react";
import { Plus, Cpu, QrCode, Keyboard, Star, BarChart3, Code, Settings, Users, Building2, MapPin, Truck, MessageSquare, Menu, ChevronRight, ArrowLeft, Copy, Check, Search, MoreVertical, Trash2, Edit2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../config/supabase";

export default function BlynkDevicePage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [modalStep, setModalStep] = useState('method');
  const [isCreating, setIsCreating] = useState(false);
  const [createdDevice, setCreatedDevice] = useState(null);
  const [copied, setCopied] = useState(false);
  
  // Device list states
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const deviceOptions = [
    {
      id: 1,
      icon: Plus,
      title: "Create New",
      description: "Create a new device from scratch with custom configuration"
    },
    {
      id: 2,
      icon: Cpu,
      title: "From Template",
      description: "Use a pre-configured template to quickly set up your device"
    },
    {
      id: 3,
      icon: QrCode,
      title: "Scan QR Code",
      description: "Scan a QR code from your device to automatically configure it"
    },
    {
      id: 4,
      icon: Keyboard,
      title: "Manual Entry",
      description: "Manually enter device credentials and configuration details"
    }
  ];

  const deviceTypes = [
    {
      id: 'esp32',
      name: 'ESP32',
      description: 'Popular WiFi & Bluetooth microcontroller',
      icon: '📡'
    }
  ];

  // Fetch devices from Supabase
  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('devices')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDevices(data || []);
    } catch (error) {
      console.error('Error fetching devices:', error);
    } finally {
      setLoading(false);
    }
  };

  // Generate unique device key
  const generateDeviceKey = () => {
    const prefix = 'BLYNK';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
  };

  // Create device in Supabase
  const createDevice = async (deviceType) => {
    setIsCreating(true);
    setModalStep('creating');

    try {
      const deviceKey = generateDeviceKey();
      const deviceName = `${deviceType.name} Device`;

      const { data, error } = await supabase
        .from('devices')
        .insert([
          {
            device_key: deviceKey,
            device_name: deviceName,
            device_type: deviceType.id,
            status: 'offline'
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setCreatedDevice(data);
      setModalStep('success');
    } catch (error) {
      console.error('Error creating device:', error);
      alert('Failed to create device: ' + error.message);
      setModalStep('device-type');
    } finally {
      setIsCreating(false);
    }
  };

  // Delete device
  const deleteDevice = async (deviceId) => {
    if (!window.confirm("Are you sure you want to delete this device?")) return;


    try {
      const { error } = await supabase
        .from('devices')
        .delete()
        .eq('id', deviceId);

      if (error) throw error;
      
      // Refresh device list
      fetchDevices();
    } catch (error) {
      console.error('Error deleting device:', error);
      alert('Failed to delete device: ' + error.message);
    }
  };

  const handleMethodClick = (methodId) => {
    if (methodId === 1) {
      setModalStep('device-type');
    }
  };

  const handleDeviceTypeSelect = (deviceType) => {
    createDevice(deviceType);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalStep('method');
    setHoveredCard(null);
    setCreatedDevice(null);
    setCopied(false);
  };

  const goBackToMethod = () => {
    setModalStep('method');
    setHoveredCard(null);
  };

  const goToDashboard = () => {
    closeModal();
    fetchDevices();
  };

  // Filter devices based on search
  const filteredDevices = devices.filter(device => 
    device.device_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.device_key.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.device_type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar - Main Navigation */}
      <div className="w-56 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="font-semibold text-gray-800">Blynk.Console</span>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <NavItem 
            icon={<Star size={18} />} 
            label="Get Started"
            onClick={() => navigate('/console')}
          />
          <NavItem 
            icon={<BarChart3 size={18} />} 
            label="Dashboards"
            onClick={() => navigate('/dashboard')}
          />
          <NavItem 
            icon={<Code size={18} />} 
            label="Developer Zone" 
            hasSubmenu
            onClick={() => navigate('/console')}
          />
          
          <div className="pt-4">
            <NavItem 
              icon={<Cpu size={18} />} 
              label="Devices"
              active
            />
            <NavItem 
              icon={<Settings size={18} />} 
              label="Automations" 
            />
            <NavItem 
              icon={<Users size={18} />} 
              label="Users" 
            />
            <NavItem 
              icon={<Building2 size={18} />} 
              label="Organizations" 
            />
            <NavItem 
              icon={<MapPin size={18} />} 
              label="Locations" 
            />
          </div>
          
          <div className="pt-4">
            <NavItem 
              icon={<Truck size={18} />} 
              label="Fleet Management" 
              hasSubmenu 
            />
            <NavItem 
              icon={<MessageSquare size={18} />} 
              label="In-App Messaging" 
            />
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="bg-white rounded-lg p-4 space-y-2">
            <h3 className="font-semibold text-gray-800 text-sm">Add more Dashboards!</h3>
            <p className="text-xs text-gray-600">
              Create up to 5 dashboards and share them with users in sub-organizations.
            </p>
            <button className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-red-600 hover:to-orange-600 transition-all">
              🚀 Upgrade to PRO
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700 font-medium">My organization - 5612RO</span>
            <ChevronRight size={16} className="text-gray-400" />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-green-50 text-green-700 px-3 py-1.5 rounded-md text-sm">
              Messages used: <span className="font-semibold">0 of 200k</span>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded transition-colors">
              <MessageSquare size={18} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded transition-colors">
              <Settings size={18} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded transition-colors">
              <Menu size={18} className="text-gray-600" />
            </button>
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer">
              <span className="text-white font-medium text-sm">U</span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-6">
            {/* Header with Search and Add Button */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Devices</h1>
              <button
                onClick={() => setShowModal(true)}
                className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors font-medium inline-flex items-center gap-2"
              >
                <Plus size={18} />
                New Device
              </button>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search devices by name, key, or type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
              </div>
            )}

            {/* Empty State */}
            {!loading && devices.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="text-center max-w-2xl">
                  <h2 className="text-3xl font-bold text-gray-800 mb-3">
                    Create your first device
                  </h2>
                  <p className="text-gray-500 mb-8">
                    We'll help you get your first device online
                  </p>
                  
                  <button
                    onClick={() => setShowModal(true)}
                    className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors font-medium inline-flex items-center gap-2"
                  >
                    <Plus size={20} />
                    New Device
                  </button>
                </div>
              </div>
            )}

            {/* Device List */}
            {!loading && devices.length > 0 && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Device
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Device Key
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredDevices.map((device) => (
                      <tr key={device.id} onClick={() => navigate(`/devices/${device.id}`)} className="hover:bg-gray-50 transition-colors cursor-pointer">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-teal-600 hover:text-teal-800">
                              {device.device_name}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {device.device_type.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <code className="text-sm text-gray-600 font-mono">
                              {device.device_key}
                            </code>
                            <button
                              onClick={() => copyToClipboard(device.device_key)}
                              className="p-1 hover:bg-gray-100 rounded transition-colors"
                              title="Copy device key"
                            >
                              <Copy size={14} className="text-gray-400" />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            device.status === 'online' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                              device.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                            }`}></span>
                            {device.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(device.created_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => navigate(`/devices/${device.id}`)}
                              className="text-teal-600 hover:text-teal-900"
                              title="View details"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => deleteDevice(device.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete device"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* No Results */}
                {filteredDevices.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No devices found matching "{searchQuery}"</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-gray-200 px-6 py-3 flex items-center justify-end gap-4 text-xs text-gray-500">
          <span>Region: SGP1</span>
          <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>
          <a href="#" className="text-blue-500 hover:underline">Terms of Service</a>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl">
            {/* Step 1: Choose Method */}
            {modalStep === 'method' && (
              <>
                <h2 className="text-3xl font-bold mb-2 text-gray-800">New Device</h2>
                <p className="text-gray-600 mb-8">
                  Choose a way to create new device
                </p>

                <div className="grid grid-cols-4 gap-6 mb-8">
                  {deviceOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <div
                        key={option.id}
                        onClick={() => handleMethodClick(option.id)}
                        className="border-2 border-gray-200 rounded-xl flex flex-col items-center justify-center py-10 px-4 hover:border-teal-500 hover:shadow-lg cursor-pointer transition-all duration-200"
                        onMouseEnter={() => setHoveredCard(option.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                      >
                        <Icon size={40} className="text-teal-600 mb-3" />
                        <span className="font-semibold text-gray-800 text-center">
                          {option.title}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-6 min-h-20">
                  {hoveredCard ? (
                    <p className="text-teal-800 text-sm">
                      {deviceOptions.find(opt => opt.id === hoveredCard)?.description}
                    </p>
                  ) : (
                    <p className="text-teal-600 text-sm flex items-center gap-2">
                      <span className="text-lg">✓</span> Point on the cards to see instructions
                    </p>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={closeModal}
                    className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}

            {/* Step 2: Choose Device Type */}
            {modalStep === 'device-type' && (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <button
                    onClick={goBackToMethod}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ArrowLeft size={20} className="text-gray-600" />
                  </button>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800">Select Device Type</h2>
                    <p className="text-gray-600 text-sm mt-1">
                      Choose the type of device you want to add
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 mb-8">
                  {deviceTypes.map((device) => (
                    <div
                      key={device.id}
                      onClick={() => handleDeviceTypeSelect(device)}
                      className="border-2 border-gray-200 rounded-xl p-6 hover:border-teal-500 hover:shadow-lg cursor-pointer transition-all duration-200"
                    >
                      <div className="text-5xl mb-4 text-center">{device.icon}</div>
                      <h3 className="font-bold text-gray-800 text-lg text-center mb-2">
                        {device.name}
                      </h3>
                      <p className="text-sm text-gray-600 text-center">
                        {device.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-blue-800 text-sm">
                    💡 More device types will be available soon!
                  </p>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={closeModal}
                    className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}

            {/* Step 3: Creating Device */}
            {modalStep === 'creating' && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-teal-500 mb-6"></div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Creating your device...</h2>
                <p className="text-gray-600">Please wait while we set up your device</p>
              </div>
            )}

            {/* Step 4: Success */}
            {modalStep === 'success' && createdDevice && (
              <>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <Check size={32} className="text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Device Created!</h2>
                  <p className="text-gray-600">
                    Your device has been successfully created
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Device Information</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Device Name</label>
                      <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
                        {createdDevice.device_name}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Device Type</label>
                      <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
                        {createdDevice.device_type.toUpperCase()}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Device Key (Authentication)</label>
                      <div className="flex gap-2">
                        <div className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2 font-mono text-sm">
                          {createdDevice.device_key}
                        </div>
                        <button
                          onClick={() => copyToClipboard(createdDevice.device_key)}
                          className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors flex items-center gap-2"
                        >
                          {copied ? <Check size={18} /> : <Copy size={18} />}
                          {copied ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                  <p className="text-amber-800 text-sm">
                    ⚠️ <strong>Important:</strong> Save your device key! You'll need it to connect your ESP32 to Blynk.
                  </p>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={closeModal}
                    className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Close
                  </button>
                  <button
                    onClick={goToDashboard}
                    className="bg-teal-500 text-white px-6 py-2.5 rounded-lg hover:bg-teal-600 transition-colors font-medium"
                  >
                    View Devices
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function NavItem({ icon, label, active, hasSubmenu, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${
        active
          ? 'bg-teal-50 text-teal-600'
          : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      {hasSubmenu && <ChevronRight size={16} className="text-gray-400" />}
    </div>
  );
}