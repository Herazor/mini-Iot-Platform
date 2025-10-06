import React, { useState } from 'react';
import {
  Menu, Settings, Sun, Pickaxe, ChevronRight, MoreVertical, Filter, BarChart3, Cpu, Users, Building2, MapPin, Truck, MessageSquare, Star
} from 'lucide-react';

export default function BlynkConsole({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('1d');
  
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-56 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="font-semibold text-gray-800">Blynk.Console</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          <NavItem icon={<Star size={18} />} label="Get Started" />
          <NavItem icon={<BarChart3 size={18} />} label="Dashboards" active />
          <NavItem icon={<Pickaxe size={18} />} label="Developer Zone" hasSubmenu />

          <div className="pt-4">
            {/* ✅ Navigasi ke halaman Devices */}
            <NavItem
              icon={<Cpu size={18} />}
              label="Devices"
              onClick={() => onNavigate && onNavigate('devices')}
            />
            <NavItem icon={<Sun size={18} />} label="Automations" />
            <NavItem icon={<Users size={18} />} label="Users" />
            <NavItem icon={<Building2 size={18} />} label="Organizations" />
            <NavItem icon={<MapPin size={18} />} label="Locations" />
          </div>

          <div className="pt-4">
            <NavItem icon={<Truck size={18} />} label="Fleet Management" hasSubmenu />
            <NavItem icon={<MessageSquare size={18} />} label="In-App Messaging" />
          </div>
        </nav>

        {/* Upgrade Banner */}
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
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">My organization - 77588DT</span>
            <ChevronRight size={16} className="text-gray-400" />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-green-50 text-green-700 px-3 py-1 rounded-md text-sm">
              Messages used: <span className="font-semibold">0 of 30k</span>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded">
              <Menu size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded">
              <Settings size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded">
              <Settings size={20} className="text-gray-600" />
            </button>
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">U</span>
            </div>
          </div>
        </div>

        {/* Dashboard Sidebar */}
        <div className="flex flex-1 overflow-hidden">
          <div className="w-64 bg-white border-r border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-700">DASHBOARDS</span>
                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded font-medium">BETA</span>
              </div>
              <button className="p-1 hover:bg-gray-100 rounded">
                <Menu size={16} className="text-gray-600" />
              </button>
            </div>
            
            <div className="bg-gray-50 hover:bg-gray-100 p-3 rounded-lg cursor-pointer transition-colors">
              <span className="text-sm font-medium text-gray-700">New Dashboard</span>
            </div>
          </div>

          {/* Main Dashboard Area */}
          <div className="flex-1 p-6 overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">New Dashboard</h1>
              <button className="p-2 hover:bg-gray-100 rounded">
                <MoreVertical size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Time Range Tabs */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1">
                {['1d', '1w', '1mo', '3mo', '1y'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? 'bg-gray-100 text-gray-800'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
                <button className="px-3 py-1.5 text-gray-600 hover:bg-gray-50 rounded">
                  <Menu size={16} />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  📊 All organizations
                </button>
                <button className="px-4 py-2 bg-teal-50 text-teal-600 rounded-lg text-sm font-medium hover:bg-teal-100 transition-colors flex items-center gap-2">
                  <Filter size={16} />
                  Filter
                </button>
              </div>
            </div>

            {/* Empty State */}
            <div className="flex flex-col items-center justify-center mt-32">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">No widgets</h2>
              <button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
                <Settings size={18} />
                Edit Dashboard
              </button>
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
