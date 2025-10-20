import React, { useState, useEffect } from 'react';
import { Menu, Settings, ChevronRight, Search, Plus, Star, BarChart3, Code, Cpu, Users, Building2, MapPin, Truck, MessageSquare, Zap, QrCode, Key, Gauge, Webhook, Puzzle, X, ChevronDown } from 'lucide-react';

const SUPABASE_URL = 'https://fcfpyeyakkziebvoukzs.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjZnB5ZXlha2t6aWVidm91a3pzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1OTc2NzMsImV4cCI6MjA3NjE3MzY3M30.UDcM7WQu1tpGL-nkpjwskk78Txz872DIG0H-zwU2NHg';

export default function BlynkTemplates({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    hardware: 'ESP32',
    connectionType: 'WiFi',
    description: ''
  });

  // Fetch templates from Supabase
  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/templates?select=*&order=created_at.desc`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setTemplates(data);
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getRandomColor = () => {
    const colors = [
      "from-teal-400 to-teal-500",
      "from-blue-400 to-blue-500",
      "from-purple-400 to-purple-500",
      "from-pink-400 to-pink-500",
      "from-orange-400 to-orange-500",
      "from-green-400 to-green-500",
      "from-red-400 to-red-500",
      "from-indigo-400 to-indigo-500"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getIconByHardware = (hardware) => {
    const icons = {
      'ESP32': '📡',
      'ESP8266': '📶',
      'Arduino': '🔌',
      'Raspberry Pi': '🍓',
      'NodeMCU': '💻'
    };
    return icons[hardware] || '🔧';
  };

  const handleDone = async () => {
    if (!formData.name.trim()) return;

    const newTemplate = {
      title: formData.name,
      devices: "No devices",
      icon: getIconByHardware(formData.hardware),
      color: getRandomColor(),
      hardware: formData.hardware,
      connection_type: formData.connectionType,
      description: formData.description
    };

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/templates`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(newTemplate)
      });

      if (response.ok) {
        const data = await response.json();
        setTemplates(prev => [data[0], ...prev]);
        setShowModal(false);
        setFormData({ name: '', hardware: 'ESP32', connectionType: 'WiFi', description: '' });
      }
    } catch (error) {
      console.error('Error creating template:', error);
      alert('Failed to create template. Please try again.');
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setFormData({ name: '', hardware: 'ESP32', connectionType: 'WiFi', description: '' });
  };
  
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
          <NavItem icon={<Star size={18} />} label="Get Started" />
          <NavItem icon={<BarChart3 size={18} />} label="Dashboards" />
          <NavItem icon={<Code size={18} />} label="Developer Zone" active hasSubmenu />
          
          <div className="pt-4">
            <NavItem icon={<Cpu size={18} />} label="Devices" onClick={() => onNavigate && onNavigate('devices')} />
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
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700 font-medium">My organization - 5612RO</span>
            <ChevronRight size={16} className="text-gray-400" />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-green-50 text-green-700 px-3 py-1.5 rounded-md text-sm">
              Messages used: <span className="font-semibold">0 of 30k</span>
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

        <div className="flex flex-1 overflow-hidden">
          <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-4">
              <div className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                Developer Zone
              </div>
              
              <div className="space-y-1">
                <DeveloperNavItem icon={<Zap size={18} />} label="My Templates" active />
                <DeveloperNavItem icon={<QrCode size={18} />} label="Blueprints" />
                <DeveloperNavItem icon={<Gauge size={18} />} label="Blynk.Air (OTA)" />
                <DeveloperNavItem icon={<Key size={18} />} label="Static Tokens" />
                <DeveloperNavItem icon={<Settings size={18} />} label="Rule Engine" />
                <DeveloperNavItem icon={<Key size={18} />} label="OAuth 2.0" />
                <DeveloperNavItem icon={<Webhook size={18} />} label="Webhooks" />
                <DeveloperNavItem icon={<Puzzle size={18} />} label="Integrations" />
              </div>
            </div>
          </div>

          <div className="flex-1 bg-gray-50 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Templates</h1>
                <button 
                  onClick={() => setShowModal(true)}
                  className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <Plus size={18} />
                  New Template
                </button>
              </div>

              <div className="relative mb-6">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search Templates"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              {loading ? (
                <div className="text-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
                  <p className="text-gray-500 mt-4">Loading templates...</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {templates
                      .filter(template => 
                        template.title.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((template) => (
                        <TemplateCard
                          key={template.id}
                          title={template.title}
                          devices={template.devices}
                          icon={template.icon}
                          color={template.color}
                          hasImage={template.hasImage}
                        />
                      ))}
                  </div>
                  
                  {templates.filter(template => 
                    template.title.toLowerCase().includes(searchQuery.toLowerCase())
                  ).length === 0 && (
                    <div className="text-center py-16">
                      <div className="text-gray-400 mb-3">
                        <Search size={48} className="mx-auto" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">No templates found</h3>
                      <p className="text-sm text-gray-500">
                        {searchQuery ? 'Try searching with different keywords' : 'Click "New Template" to create your first template'}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white border-t border-gray-200 px-6 py-3 flex items-center justify-end gap-4 text-xs text-gray-500">
          <span>Region: SGP1</span>
          <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>
          <a href="#" className="text-blue-500 hover:underline">Terms of Service</a>
        </div>
      </div>

      {/* Create New Template Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Create New Template</h2>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {/* Name Field */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2 uppercase">
                  Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Name"
                    maxLength={50}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  <span className="absolute right-3 top-2 text-xs text-gray-400">
                    {formData.name.length} / 50
                  </span>
                </div>
              </div>

              {/* Hardware and Connection Type */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2 uppercase">
                    Hardware
                  </label>
                  <div className="relative">
                    <select
                      value={formData.hardware}
                      onChange={(e) => handleInputChange('hardware', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent pr-8"
                    >
                      <option value="ESP32">ESP32</option>
                      <option value="ESP8266">ESP8266</option>
                      <option value="Arduino">Arduino</option>
                      <option value="Raspberry Pi">Raspberry Pi</option>
                      <option value="NodeMCU">NodeMCU</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2 uppercase">
                    Connection Type
                  </label>
                  <div className="relative">
                    <select
                      value={formData.connectionType}
                      onChange={(e) => handleInputChange('connectionType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent pr-8"
                    >
                      <option value="WiFi">WiFi</option>
                      <option value="Ethernet">Ethernet</option>
                      <option value="Cellular">Cellular</option>
                      <option value="Bluetooth">Bluetooth</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Description Field */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2 uppercase">
                  Description
                </label>
                <div className="relative">
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Description"
                    maxLength={128}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  <span className="absolute right-3 bottom-2 text-xs text-gray-400">
                    {formData.description.length} / 128
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                onClick={handleCancel}
                className="px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDone}
                disabled={!formData.name.trim()}
                className="px-5 py-2 text-sm font-medium bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Done
              </button>
            </div>
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

function DeveloperNavItem({ icon, label, active }) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
        active
          ? 'bg-teal-50 text-teal-600'
          : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

function TemplateCard({ title, devices, icon, color, hasImage }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
      <div className={`h-32 bg-gradient-to-br ${color} flex items-center justify-center relative`}>
        {hasImage ? (
          <div className="text-6xl">🌤️</div>
        ) : (
          <div className="text-6xl">{icon}</div>
        )}
      </div>
      <div className={`bg-gradient-to-br ${color} px-4 py-3`}>
        <h3 className="text-white font-semibold text-sm mb-1">{title}</h3>
        <p className="text-white text-xs opacity-90">{devices}</p>
      </div>
    </div>
  );
} 