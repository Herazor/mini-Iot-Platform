
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Star, BarChart3, Code, Cpu, Settings, Users, Building2, 
  MapPin, Truck, MessageSquare, Menu, ChevronRight, 
  MoreHorizontal, Filter, LayoutGrid, X, ChevronDown
} from 'lucide-react';

export default function DashboardEditor() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('1d');
  const [showDashboardSidebar, setShowDashboardSidebar] = useState(true);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showDashboardMenu, setShowDashboardMenu] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState('all');
  const [selectedDevice, setSelectedDevice] = useState('all');
  const [expandedSections, setExpandedSections] = useState({
    organization: true,
    template: true,
    device: true
  });

  const timeRanges = [
    { label: '1d', value: '1d' },
    { label: '1w', value: '1w' },
    { label: '1mo', value: '1mo' },
    { label: '3mo', value: '3mo' },
    { label: '1y', value: '1y' },
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="flex h-screen bg-gray-50" onClick={() => setShowDashboardMenu(false)}>
      {/* Left Sidebar - Main Navigation (Always Visible) */}
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
          />
          <NavItem 
            icon={<BarChart3 size={18} />} 
            label="Dashboards" 
            active
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
      <div className="flex-1 flex flex-col relative">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700 font-medium">My organization - 7758DT</span>
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
          {/* Dashboard List Sidebar - Can be toggled */}
          {showDashboardSidebar ? (
            <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Dashboards
                    </h2>
                    <span className="bg-teal-100 text-teal-700 text-xs px-2 py-0.5 rounded font-semibold">
                      BETA
                    </span>
                  </div>
                  <button 
                    onClick={() => setShowDashboardSidebar(false)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    title="Hide sidebar"
                  >
                    <Menu size={16} className="text-gray-500" />
                  </button>
                </div>
                
                <div className="space-y-1">
                  <DashboardItem label="New Dashboard" active />
                </div>
              </div>
            </div>
          ) : (
            <div className="w-12 bg-white border-r border-gray-200 flex items-start justify-center pt-4">
              <button 
                onClick={() => setShowDashboardSidebar(true)}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
                title="Show sidebar"
              >
                <Menu size={20} className="text-gray-500" />
              </button>
            </div>
          )}

          {/* Main Dashboard Area */}
          <div className="flex-1 bg-gray-50 overflow-y-auto">
            <div className="p-6">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">New Dashboard</h1>
                <div className="relative">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDashboardMenu(!showDashboardMenu);
                    }}
                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                  >
                    <MoreHorizontal size={20} className="text-gray-600" />
                  </button>

                  {/* Dropdown Menu */}
                  {showDashboardMenu && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                      <button 
                        onClick={() => {
                          console.log('Edit Dashboard clicked');
                          setShowDashboardMenu(false);
                          console.log('Navigating to /dashboard/edit');
                          navigate('/dashboard/edit');
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                      >
                        <Settings size={16} />
                        Edit Dashboard
                      </button>
                      <button 
                        onClick={() => setShowDashboardMenu(false)}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        Duplicate Dashboard
                      </button>
                      <button 
                        onClick={() => setShowDashboardMenu(false)}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                      >
                        <Users size={16} />
                        Manage Access
                      </button>
                      <button 
                        onClick={() => setShowDashboardMenu(false)}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                          <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        Set as Homepage
                      </button>
                      <div className="border-t border-gray-200 my-1"></div>
                      <button 
                        onClick={() => setShowDashboardMenu(false)}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                        Delete Dashboard
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Time Range Selector */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1">
                  {timeRanges.map((range) => (
                    <button
                      key={range.value}
                      onClick={() => setTimeRange(range.value)}
                      className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                        timeRange === range.value
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                  <button className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded transition-colors">
                    <LayoutGrid size={16} />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    <Building2 size={16} />
                    All organizations
                  </button>
                  <button 
                    onClick={() => setShowFilterPanel(!showFilterPanel)}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-teal-600 hover:bg-teal-50 transition-colors"
                  >
                    <Filter size={16} />
                    Filter
                  </button>
                </div>
              </div>

              {/* No Widgets State */}
              <div className="flex flex-col items-center justify-center py-32">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">No widgets</h2>
                  <button 
                    onClick={() => navigate('/dashboard/edit')}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 mx-auto"
                  >
                    <Settings size={18} />
                    Edit Dashboard
                  </button>
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

        {/* Filter Panel (Slide from right) */}
        {showFilterPanel && (
          <>
            {/* Overlay */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-30 z-40"
              onClick={() => setShowFilterPanel(false)}
            />
            
            {/* Filter Panel */}
            <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col animate-slide-in">
              {/* Panel Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">FILTER DASHBOARD DATA</h2>
                <button 
                  onClick={() => setShowFilterPanel(false)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              {/* Panel Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <p className="text-sm text-gray-600">
                  This dashboard includes data from <span className="font-semibold">All devices</span>
                </p>

                {/* Organization Section */}
                <div className="border-b border-gray-200 pb-4">
                  <button
                    onClick={() => toggleSection('organization')}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <div className="flex items-center gap-2">
                      <ChevronDown 
                        size={16} 
                        className={`text-gray-600 transition-transform ${
                          expandedSections.organization ? '' : '-rotate-90'
                        }`}
                      />
                      <span className="font-semibold text-gray-900">Organization</span>
                    </div>
                    <span className="text-sm text-teal-600 cursor-pointer hover:underline">
                      All organizati...
                    </span>
                  </button>

                  {expandedSections.organization && (
                    <div className="mt-3 space-y-2 pl-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="organization"
                          value="all"
                          checked={selectedOrg === 'all'}
                          onChange={(e) => setSelectedOrg(e.target.value)}
                          className="w-4 h-4 text-teal-600"
                        />
                        <span className="text-sm text-gray-700">All organizations</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="organization"
                          value="current"
                          checked={selectedOrg === 'current'}
                          onChange={(e) => setSelectedOrg(e.target.value)}
                          className="w-4 h-4 text-teal-600"
                        />
                        <span className="text-sm text-gray-700">Current</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="organization"
                          value="sub"
                          checked={selectedOrg === 'sub'}
                          onChange={(e) => setSelectedOrg(e.target.value)}
                          className="w-4 h-4 text-teal-600"
                        />
                        <span className="text-sm text-gray-700">Only Sub-Organizations</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="organization"
                          value="select"
                          checked={selectedOrg === 'select'}
                          onChange={(e) => setSelectedOrg(e.target.value)}
                          className="w-4 h-4 text-teal-600"
                        />
                        <span className="text-sm text-gray-700">Select...</span>
                      </label>
                    </div>
                  )}

                  {expandedSections.organization && (
                    <div className="mt-3 pl-6 p-3 bg-gray-50 rounded text-xs text-gray-600">
                      <p className="font-semibold mb-1">All organizations</p>
                      <p>Includes data from both the current organization and all related sub-organizations.</p>
                    </div>
                  )}
                </div>

                {/* Template Section */}
                <div className="border-b border-gray-200 pb-4">
                  <button
                    onClick={() => toggleSection('template')}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <div className="flex items-center gap-2">
                      <ChevronDown 
                        size={16} 
                        className={`text-gray-600 transition-transform ${
                          expandedSections.template ? '' : '-rotate-90'
                        }`}
                      />
                      <span className="font-semibold text-gray-900">Template</span>
                    </div>
                    <span className="text-sm text-teal-600 cursor-pointer hover:underline">
                      All templates
                    </span>
                  </button>

                  {expandedSections.template && (
                    <div className="mt-3 space-y-2 pl-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="template"
                          value="all"
                          checked={selectedTemplate === 'all'}
                          onChange={(e) => setSelectedTemplate(e.target.value)}
                          className="w-4 h-4 text-teal-600"
                        />
                        <span className="text-sm text-gray-700">All templates</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="template"
                          value="select"
                          checked={selectedTemplate === 'select'}
                          onChange={(e) => setSelectedTemplate(e.target.value)}
                          className="w-4 h-4 text-teal-600"
                        />
                        <span className="text-sm text-gray-700">Select...</span>
                      </label>
                    </div>
                  )}
                </div>

                {/* Device Section */}
                <div className="border-b border-gray-200 pb-4">
                  <button
                    onClick={() => toggleSection('device')}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <div className="flex items-center gap-2">
                      <ChevronDown 
                        size={16} 
                        className={`text-gray-600 transition-transform ${
                          expandedSections.device ? '' : '-rotate-90'
                        }`}
                      />
                      <span className="font-semibold text-gray-900">Device</span>
                    </div>
                    <span className="text-sm text-teal-600 cursor-pointer hover:underline">
                      All devices
                    </span>
                  </button>

                  {expandedSections.device && (
                    <div className="mt-3 space-y-2 pl-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="device"
                          value="all"
                          checked={selectedDevice === 'all'}
                          onChange={(e) => setSelectedDevice(e.target.value)}
                          className="w-4 h-4 text-teal-600"
                        />
                        <span className="text-sm text-gray-700">All devices</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="device"
                          value="select"
                          checked={selectedDevice === 'select'}
                          onChange={(e) => setSelectedDevice(e.target.value)}
                          className="w-4 h-4 text-teal-600"
                        />
                        <span className="text-sm text-gray-700">Select...</span>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
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

function DashboardItem({ label, active }) {
  return (
    <div
      className={`px-3 py-2 rounded-lg cursor-pointer transition-colors text-sm font-medium ${
        active
          ? 'bg-teal-50 text-teal-600'
          : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      {label}
    </div>
  );
}