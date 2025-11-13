import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, BarChart3, Code, Cpu, Settings, Users, Building2, 
  MapPin, Truck, MessageSquare, Menu, ChevronRight, 
  ArrowLeft, Activity, Thermometer, Droplets, Gauge, Wifi, WifiOff,
  Edit2, Save, X
} from 'lucide-react';
import { supabase } from '../config/supabase';
import mqttClient from '../mqtt/mqttClient';

export default function DeviceDetail() {
  const { deviceId } = useParams();
  const navigate = useNavigate();
  const [device, setDevice] = useState(null);
  const [deviceData, setDeviceData] = useState([]);
  const [latestData, setLatestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mqttConnected, setMqttConnected] = useState(false);
  const [showPinConfig, setShowPinConfig] = useState(false);
  
  // Pin Configuration - Default kosong, akan auto-detect dari data MQTT
  const [pinConfig, setPinConfig] = useState({});
  const [editingPin, setEditingPin] = useState(null);
  
  const deviceKeyRef = useRef(null);
  const mqttTopicRef = useRef(null);

  useEffect(() => {
    fetchDeviceInfo();
    fetchDeviceData();

    const checkMqttStatus = () => {
      setMqttConnected(mqttClient.connected);
    };
    
    mqttClient.on('connect', checkMqttStatus);
    mqttClient.on('close', checkMqttStatus);
    mqttClient.on('offline', checkMqttStatus);
    
    checkMqttStatus();

    return () => {
      if (mqttTopicRef.current) {
        mqttClient.unsubscribe(mqttTopicRef.current);
      }
    };
  }, [deviceId]);

  const fetchDeviceInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('devices')
        .select('*')
        .eq('id', deviceId)
        .single();

      if (error) throw error;
      
      setDevice(data);
      deviceKeyRef.current = data.device_key;
      
      // Load pin configuration from metadata
      if (data.metadata && data.metadata.pin_config) {
        setPinConfig(data.metadata.pin_config);
      }
      
      subscribeMQTT(data.device_key);
    } catch (error) {
      console.error('Error fetching device:', error);
    }
  };

  const subscribeMQTT = (deviceKey) => {
    if (!deviceKey) return;

    const topic = `device/${deviceKey}/data`;
    mqttTopicRef.current = topic;

    console.log(`📡 Subscribing to MQTT topic: ${topic}`);

    mqttClient.subscribe(topic, (err) => {
      if (err) {
        console.error('❌ MQTT Subscribe error:', err);
      } else {
        console.log(`✅ Subscribed to: ${topic}`);
      }
    });

    mqttClient.on('message', handleMqttMessage);
  };

  const handleMqttMessage = (topic, message) => {
    try {
      if (topic !== mqttTopicRef.current) return;

      const payload = JSON.parse(message.toString());
      console.log('📨 MQTT Data received:', payload);

      const newData = {
        id: Date.now(),
        device_key: deviceKeyRef.current,
        pins: {},
        created_at: new Date().toISOString()
      };

      // Parse pins dari payload - UNIVERSAL untuk semua format
      if (payload.pins) {
        // Format MiniIoT: { pins: { V0: 25.3, V1: 65.2 } }
        Object.keys(payload.pins).forEach(pin => {
          const value = parseFloat(payload.pins[pin]);
          if (!isNaN(value)) {
            newData.pins[pin] = value;
            
            // Auto-create pin config jika belum ada
            if (!pinConfig[pin]) {
              setPinConfig(prev => ({
                ...prev,
                [pin]: {
                  label: pin,
                  unit: '',
                  icon: 'Activity',
                  color: 'blue',
                  visible: true
                }
              }));
            }
          }
        });
      } else {
        // Format direct: { temperature: 25.3, humidity: 65.2 }
        Object.keys(payload).forEach(key => {
          if (key !== 'timestamp' && key !== 'deviceEui' && key !== 'device_eui') {
            const value = parseFloat(payload[key]);
            if (!isNaN(value)) {
              newData.pins[key] = value;
              
              // Auto-create pin config
              if (!pinConfig[key]) {
                setPinConfig(prev => ({
                  ...prev,
                  [key]: {
                    label: key,
                    unit: '',
                    icon: 'Activity',
                    color: 'blue',
                    visible: true
                  }
                }));
              }
            }
          }
        });
      }

      setLatestData(newData);
      setDeviceData(prevData => [newData, ...prevData.slice(0, 49)]);

    } catch (error) {
      console.error('❌ Error parsing MQTT message:', error);
    }
  };

  const fetchDeviceData = async () => {
    try {
      setLoading(true);
      
      const { data: deviceInfo, error: deviceError } = await supabase
        .from('devices')
        .select('device_key')
        .eq('id', deviceId)
        .single();

      if (deviceError) throw deviceError;

      const { data, error } = await supabase
        .from('device_data')
        .select('*')
        .eq('device_key', deviceInfo.device_key)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      
      setDeviceData(data || []);
      if (data && data.length > 0) {
        setLatestData(data[0]);
      }
    } catch (error) {
      console.error('Error fetching device data:', error);
    } finally {
      setLoading(false);
    }
  };

  const savePinConfig = async () => {
    try {
      const { error } = await supabase
        .from('devices')
        .update({ 
          metadata: { 
            ...device.metadata,
            pin_config: pinConfig 
          } 
        })
        .eq('id', deviceId);

      if (error) throw error;
      
      alert('✅ Pin configuration saved!');
      setShowPinConfig(false);
    } catch (error) {
      console.error('Error saving pin config:', error);
      alert('❌ Failed to save configuration');
    }
  };

  const updatePinConfig = (pin, field, value) => {
    setPinConfig(prev => ({
      ...prev,
      [pin]: {
        ...prev[pin],
        [field]: value
      }
    }));
  };

  const getIconComponent = (iconName) => {
    const icons = {
      Activity, Thermometer, Droplets, Gauge
    };
    return icons[iconName] || Activity;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatValue = (value) => {
    if (value === null || value === undefined) return 'N/A';
    return typeof value === 'number' ? value.toFixed(2) : value;
  };

  if (!device) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  // Filter visible pins
  const visiblePins = Object.keys(pinConfig).filter(pin => pinConfig[pin].visible);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
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
          />
          
          <div className="pt-4">
            <NavItem 
              icon={<Cpu size={18} />} 
              label="Devices"
              active
              onClick={() => navigate('/devices')}
            />
            <NavItem icon={<Settings size={18} />} label="Automations" />
            <NavItem icon={<Users size={18} />} label="Users" />
            <NavItem icon={<Building2 size={18} />} label="Organizations" />
            <NavItem icon={<MapPin size={18} />} label="Locations" />
          </div>
          
          <div className="pt-4">
            <NavItem icon={<Truck size={18} />} label="Fleet Management" hasSubmenu />
            <NavItem icon={<MessageSquare size={18} />} label="In-App Messaging" />
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
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm ${
              mqttConnected ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-600'
            }`}>
              {mqttConnected ? <Wifi size={16} /> : <WifiOff size={16} />}
              <span className="font-medium">
                {mqttConnected ? 'MQTT Connected' : 'MQTT Offline'}
              </span>
            </div>
            
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Header with back button */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => navigate('/devices')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{device.device_name}</h1>
                <p className="text-sm text-gray-500">Device Key: {device.device_key}</p>
              </div>
              <div className="ml-auto flex items-center gap-3">
                <button
                  onClick={() => setShowPinConfig(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Settings size={18} />
                  Configure Pins
                </button>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  mqttConnected && latestData ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  <span className={`w-2 h-2 rounded-full mr-2 ${
                    mqttConnected && latestData ? 'bg-green-500' : 'bg-gray-500'
                  } ${mqttConnected && latestData ? 'animate-pulse' : ''}`}></span>
                  {mqttConnected && latestData ? 'Live Data' : 'Offline'}
                </span>
              </div>
            </div>

            {/* Latest Data Cards - Dynamic */}
            {latestData && latestData.pins && visiblePins.length > 0 && (
              <div className={`grid grid-cols-1 md:grid-cols-${Math.min(visiblePins.length, 4)} gap-6 mb-6`}>
                {visiblePins.map(pin => {
                  const config = pinConfig[pin];
                  const IconComponent = getIconComponent(config.icon);
                  const colorClasses = {
                    blue: 'text-blue-600',
                    red: 'text-red-600',
                    cyan: 'text-cyan-600',
                    yellow: 'text-yellow-600',
                    green: 'text-green-600'
                  };
                  
                  return (
                    <DataCard
                      key={pin}
                      icon={<IconComponent size={24} className={colorClasses[config.color] || 'text-blue-600'} />}
                      title={config.label}
                      value={formatValue(latestData.pins[pin])}
                      unit={config.unit}
                      color={config.color}
                      live={mqttConnected}
                    />
                  );
                })}
              </div>
            )}

            {/* Data Table */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">Recent Data</h2>
                {mqttConnected && (
                  <span className="text-sm text-green-600 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Real-time updates
                  </span>
                )}
              </div>
              
              {loading && deviceData.length === 0 ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
                </div>
              ) : deviceData.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No data received yet</p>
                  <p className="text-sm text-gray-400 mt-2">Upload code to ESP32 to start sending data</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Timestamp
                        </th>
                        {visiblePins.map(pin => (
                          <th key={pin} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            {pinConfig[pin].label} {pinConfig[pin].unit && `(${pinConfig[pin].unit})`}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {deviceData.map((data) => (
                        <tr key={data.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatDate(data.created_at)}
                          </td>
                          {visiblePins.map(pin => (
                            <td key={pin} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {data.pins && data.pins[pin] !== undefined 
                                ? formatValue(data.pins[pin])
                                : '-'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-gray-200 px-6 py-3 flex items-center justify-end gap-4 text-xs text-gray-500">
          <span>Region: SGP1</span>
          <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>
          <a href="#" className="text-blue-500 hover:underline">Terms of Service</a>
        </div>
      </div>

      {/* Pin Configuration Modal */}
      {showPinConfig && (
        <PinConfigModal
          pinConfig={pinConfig}
          onUpdate={updatePinConfig}
          onSave={savePinConfig}
          onClose={() => setShowPinConfig(false)}
        />
      )}
    </div>
  );
}

function PinConfigModal({ pinConfig, onUpdate, onSave, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Configure Virtual Pins</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Pin</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Label</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Unit</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Icon</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Color</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Visible</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Object.keys(pinConfig).map(pin => (
                <tr key={pin}>
                  <td className="px-4 py-3 font-mono text-sm">{pin}</td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={pinConfig[pin].label}
                      onChange={(e) => onUpdate(pin, 'label', e.target.value)}
                      className="w-full px-2 py-1 border rounded"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={pinConfig[pin].unit}
                      onChange={(e) => onUpdate(pin, 'unit', e.target.value)}
                      className="w-full px-2 py-1 border rounded"
                      placeholder="°C, %, lux..."
                    />
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={pinConfig[pin].icon}
                      onChange={(e) => onUpdate(pin, 'icon', e.target.value)}
                      className="w-full px-2 py-1 border rounded"
                    >
                      <option value="Activity">Activity</option>
                      <option value="Thermometer">Thermometer</option>
                      <option value="Droplets">Droplets</option>
                      <option value="Gauge">Gauge</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={pinConfig[pin].color}
                      onChange={(e) => onUpdate(pin, 'color', e.target.value)}
                      className="w-full px-2 py-1 border rounded"
                    >
                      <option value="blue">Blue</option>
                      <option value="red">Red</option>
                      <option value="cyan">Cyan</option>
                      <option value="yellow">Yellow</option>
                      <option value="green">Green</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={pinConfig[pin].visible}
                      onChange={(e) => onUpdate(pin, 'visible', e.target.checked)}
                      className="w-4 h-4"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
          >
            <Save size={18} />
            Save Configuration
          </button>
        </div>
      </div>
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

function DataCard({ icon, title, value, unit, color, live }) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    red: 'bg-red-50 border-red-200',
    cyan: 'bg-cyan-50 border-cyan-200',
    yellow: 'bg-yellow-50 border-yellow-200',
    green: 'bg-green-50 border-green-200'
  };

  return (
    <div className={`${colorClasses[color]} border rounded-lg p-6 relative`}>
      {live && (
        <div className="absolute top-2 right-2">
          <span className="flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        </div>
      )}
      <div className="flex items-center justify-between mb-2">
        {icon}
      </div>
      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">
        {value}
        {unit && <span className="text-lg ml-1 text-gray-600">{unit}</span>}
      </p>
    </div>
  );
}