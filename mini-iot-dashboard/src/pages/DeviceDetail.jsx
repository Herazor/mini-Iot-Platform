import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, BarChart3, Code, Cpu, Settings, Users, Building2, 
  MapPin, Truck, MessageSquare, Menu, ChevronRight, 
  ArrowLeft, Activity, Thermometer, Droplets, Gauge
} from 'lucide-react';
import { supabase } from '../config/supabase';

export default function DeviceDetail() {
  const { deviceId } = useParams();
  const navigate = useNavigate();
  const [device, setDevice] = useState(null);
  const [deviceData, setDeviceData] = useState([]);
  const [latestData, setLatestData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeviceInfo();
    fetchDeviceData();
    
    // Auto refresh every 5 seconds
    const interval = setInterval(() => {
      fetchDeviceData();
    }, 5000);

    return () => clearInterval(interval);
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
    } catch (error) {
      console.error('Error fetching device:', error);
    }
  };

  const fetchDeviceData = async () => {
    try {
      setLoading(true);
      
      // Get device info first
      const { data: deviceInfo, error: deviceError } = await supabase
        .from('devices')
        .select('device_key')
        .eq('id', deviceId)
        .single();

      if (deviceError) throw deviceError;

      // Get device data
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

  if (!device) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    );
  }

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
              <div className="ml-auto">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  latestData ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  <span className={`w-2 h-2 rounded-full mr-2 ${
                    latestData ? 'bg-green-500' : 'bg-gray-500'
                  }`}></span>
                  {latestData ? 'Receiving Data' : 'Offline'}
                </span>
              </div>
            </div>

            {/* Latest Data Cards */}
            {latestData && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <DataCard
                  icon={<Activity size={24} className="text-blue-600" />}
                  title="Sensor Value"
                  value={latestData.sensor_value}
                  color="blue"
                />
                <DataCard
                  icon={<Thermometer size={24} className="text-red-600" />}
                  title="Temperature"
                  value={latestData.temperature ? `${latestData.temperature}°C` : 'N/A'}
                  color="red"
                />
                <DataCard
                  icon={<Droplets size={24} className="text-cyan-600" />}
                  title="Humidity"
                  value={latestData.humidity ? `${latestData.humidity}%` : 'N/A'}
                  color="cyan"
                />
              </div>
            )}

            {/* Data Table */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Recent Data</h2>
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
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Sensor Value
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Temperature
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Humidity
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {deviceData.map((data) => (
                        <tr key={data.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatDate(data.created_at)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {data.sensor_value || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {data.temperature ? `${data.temperature}°C` : '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {data.humidity ? `${data.humidity}%` : '-'}
                          </td>
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

function DataCard({ icon, title, value, color }) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    red: 'bg-red-50 border-red-200',
    cyan: 'bg-cyan-50 border-cyan-200'
  };

  return (
    <div className={`${colorClasses[color]} border rounded-lg p-6`}>
      <div className="flex items-center justify-between mb-2">
        {icon}
      </div>
      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}