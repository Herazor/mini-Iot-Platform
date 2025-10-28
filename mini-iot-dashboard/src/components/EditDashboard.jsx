import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, MessageSquare, Menu, ChevronDown, Star, BarChart3, Code, Cpu, Users, Building2, MapPin, Truck } from 'lucide-react';

export default function EditDashboard() {
  const navigate = useNavigate();
  const [dashboardName, setDashboardName] = useState('New Dashboard');
  const [selectedDateRange, setSelectedDateRange] = useState('1d');

  const dateRanges = ['1d', '1w', '1mo'];

  const handleCancel = () => {
    navigate('/dashboard');
  };

  const handleApplyChanges = () => {
    navigate('/dashboard');
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
          <NavItem icon={<Star size={18} />} label="Get Started" />
          <NavItem icon={<BarChart3 size={18} />} label="Dashboards" active />
          <NavItem icon={<Code size={18} />} label="Developer Zone" onClick={() => navigate('/console')} />
          
          <div className="pt-4">
            <NavItem icon={<Cpu size={18} />} label="Devices" onClick={() => navigate('/devices')} />
            <NavItem icon={<Settings size={18} />} label="Automations" />
            <NavItem icon={<Users size={18} />} label="Users" />
            <NavItem icon={<Building2 size={18} />} label="Organizations" />
            <NavItem icon={<MapPin size={18} />} label="Locations" />
          </div>
          
          <div className="pt-4">
            <NavItem icon={<Truck size={18} />} label="Fleet Management" />
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

      {/* Widget Box Sidebar */}
      <div className="w-72 bg-gray-50 border-r border-gray-200 overflow-y-auto">
        <div className="p-4">
          {/* Widget Box Header */}
          <div className="flex items-center gap-2 mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-700">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <h2 className="text-lg font-semibold text-gray-900">Widget Box</h2>
          </div>

          {/* Device Metrics Section */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Device metrics</h3>
          </div>

          {/* Controls Section */}
          <div className="mb-4">
            <h4 className="text-xs font-medium text-gray-500 mb-3">Controls</h4>
            
            {/* Switch Widget */}
            <div className="bg-white rounded-lg p-4 mb-3 cursor-move hover:shadow-md transition-shadow border border-gray-200">
              <h5 className="text-sm font-medium text-gray-900 mb-3">Switch</h5>
              <div className="flex items-center">
                <div className="relative inline-block w-12 h-6">
                  <div className="w-12 h-6 bg-gray-300 rounded-full"></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform"></div>
                </div>
              </div>
            </div>

            {/* Slider Widget */}
            <div className="bg-white rounded-lg p-4 mb-3 cursor-move hover:shadow-md transition-shadow border border-gray-200">
              <h5 className="text-sm font-medium text-gray-900 mb-3">Slider</h5>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-gray-200 rounded-full relative">
                  <div className="absolute left-0 top-0 h-1.5 w-0 bg-teal-500 rounded-full"></div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-teal-500 rounded-full border-2 border-white shadow"></div>
                </div>
                <span className="text-2xl font-light text-gray-700 w-8">1</span>
              </div>
            </div>
          </div>

          {/* Tiles Section */}
          <div className="mb-4">
            <h4 className="text-xs font-medium text-gray-500 mb-3">Tiles</h4>
            
            {/* Label Widget */}
            <div className="bg-white rounded-lg p-4 mb-3 cursor-move hover:shadow-md transition-shadow border border-gray-200">
              <h5 className="text-sm font-medium text-gray-900 mb-2">Label</h5>
              <p className="text-3xl font-light text-gray-700">111</p>
            </div>

            {/* Devices Online Widget */}
            <div className="bg-white rounded-lg p-4 mb-3 cursor-move hover:shadow-md transition-shadow border border-gray-200">
              <h5 className="text-sm font-medium text-gray-900 mb-2">Devices online now</h5>
              <p className="text-3xl font-light text-gray-700">112</p>
              <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>

          {/* Tables Section */}
          <div className="mb-4">
            <h4 className="text-xs font-medium text-gray-500 mb-3">Tables</h4>
            
            {/* Device Table Widget */}
            <div className="bg-white rounded-lg p-4 mb-3 cursor-move hover:shadow-md transition-shadow border border-gray-200">
              <h5 className="text-sm font-medium text-gray-900">Device table</h5>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1 hover:bg-gray-50 px-2 py-1 rounded transition-colors">
              <span className="text-sm text-gray-700">My organization - 7758DT</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div className="w-px h-5 bg-gray-300"></div>
            <button className="p-1 hover:bg-gray-100 rounded transition-colors">
              <Settings size={18} className="text-gray-600" />
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-green-50 text-green-700 px-3 py-1.5 rounded text-xs font-medium">
              Messages used: <span className="font-semibold">0 of 30k</span>
            </div>
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z"></path>
              </svg>
            </button>
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer">
              <span className="text-white font-medium text-sm">U</span>
            </div>
          </div>
        </div>

        {/* Dashboard Editor Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <input
              type="text"
              value={dashboardName}
              onChange={(e) => setDashboardName(e.target.value)}
              className="text-lg font-semibold text-gray-900 border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <div className="flex items-center gap-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyChanges}
                className="px-4 py-2 text-sm font-medium bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
              >
                Apply Changes
              </button>
            </div>
          </div>

          <div className="flex items-start gap-6 text-sm">
            {/* Data Source */}
            <div className="flex items-start gap-3">
              <div>
                <p className="text-xs font-semibold text-gray-900 mb-1">Data Source</p>
                <p className="text-xs text-gray-600">
                  This dashboard includes data from <span className="font-medium">All devices</span>
                </p>
              </div>
              <button className="px-3 py-1.5 text-xs font-medium text-teal-600 bg-teal-50 rounded hover:bg-teal-100 transition-colors whitespace-nowrap">
                Change...
              </button>
            </div>

            {/* Access */}
            <div className="flex items-start gap-3 pl-6 border-l border-gray-200">
              <div>
                <p className="text-xs font-semibold text-gray-900 mb-1">Access</p>
                <p className="text-xs text-gray-600">Manage who can view the dashboard</p>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-teal-600 bg-teal-50 rounded hover:bg-teal-100 transition-colors whitespace-nowrap">
                <Users size={14} />
                Manage...
              </button>
            </div>

            {/* Default Date Range */}
            <div className="flex items-start gap-3 pl-6 border-l border-gray-200">
              <div>
                <p className="text-xs font-semibold text-gray-900 mb-1">Default Date Range</p>
                <p className="text-xs text-gray-600">Will be applied by default</p>
              </div>
              <div className="flex items-center gap-1 bg-gray-100 rounded p-0.5">
                {dateRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => setSelectedDateRange(range)}
                    className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                      selectedDateRange === range
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-white overflow-auto p-6">
          <div className="min-h-full bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Add new widget</h3>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Double click</span> the widget on the left or{' '}
              <span className="font-medium">drag</span> it to the canvas
            </p>
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

function NavItem({ icon, label, active, onClick }) {
  return (
    <div
      onClick={onClick}
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