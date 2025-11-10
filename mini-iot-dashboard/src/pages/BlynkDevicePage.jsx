import React, { useState } from "react";
import { Plus, Cpu, QrCode, Keyboard, Star, BarChart3, Code, Settings, Users, Building2, MapPin, Truck, MessageSquare, Menu, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BlynkDevicePage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

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
            {/* Empty State */}
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

                {/* Video Thumbnail */}
                <div className="mt-12">
                  <div className="relative w-96 h-56 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-lg overflow-hidden shadow-lg mx-auto">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="bg-red-600 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto cursor-pointer hover:bg-red-700">
                          <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
                        </div>
                        <p className="font-semibold text-lg">Blynk Onboarding #...</p>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4 bg-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-teal-600">
                      B
                    </div>
                    <div className="absolute bottom-4 left-4 text-white font-bold text-2xl">
                      Device
                    </div>
                    <div className="absolute bottom-4 right-4 bg-teal-700 bg-opacity-80 rounded px-3 py-1 text-white text-sm font-medium flex items-center gap-1">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-teal-600 font-bold text-xs">
                        B
                      </div>
                      Blynk
                    </div>
                    <div className="absolute top-4 right-4 text-white cursor-pointer">
                      <span className="text-xl">⋮</span>
                    </div>
                  </div>
                </div>
              </div>
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl">
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

            {/* Instructions */}
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
                onClick={() => setShowModal(false)}
                className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Cancel
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