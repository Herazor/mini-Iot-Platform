import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Star, BarChart3, Code, Cpu, Settings, Users, Building2, 
  MapPin, Truck, MessageSquare, Menu, ChevronRight, X,
  Home, Activity, FileText, Gauge, Zap, Webhook, Bell, BookOpen, Smartphone, Mic, Image as ImageIcon, MoreHorizontal
} from 'lucide-react';

export default function TemplateDetail() {
  const navigate = useNavigate();
  const { templateId } = useParams();
  const [showSidebar, setShowSidebar] = useState(true);
  const [showOrgModal, setShowOrgModal] = useState(false);
  
  // Mock data - replace with actual data from API
  const template = {
    id: templateId,
    name: 'SenseCAP',
    icon: '🌱',
    hardware: 'ESP32, WiFi'
  };

  const steps = [
    { id: 1, label: 'Configure template', completed: false },
    { id: 2, label: 'Set Up Datastreams', completed: false },
    { id: 3, label: 'Set up the Web Dashboard', completed: false },
    { id: 4, label: 'Add first Device', completed: false }
  ];

  return (
    <div className="flex h-screen bg-gray-50" onClick={(e) => {
      // Don't close modal if clicking inside it
      if (!e.target.closest('.org-modal') && !e.target.closest('.org-button')) {
        setShowOrgModal(false);
      }
    }}>
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
          <NavItem icon={<BarChart3 size={18} />} label="Dashboards" onClick={() => navigate('/dashboard')} />
          <NavItem icon={<Code size={18} />} label="Developer Zone" active />
          
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

      {/* Template Navigation Sidebar */}
      {showSidebar && (
        <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <button 
              onClick={() => navigate('/console')}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <X size={18} className="text-gray-600" />
            </button>
            <h2 className="font-semibold text-gray-900 flex-1 text-center">SENSECAP</h2>
            <button 
              onClick={() => setShowSidebar(false)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <Menu size={18} className="text-gray-600" />
            </button>
          </div>

          <div className="p-3 space-y-1">
            <TemplateNavItem icon={<Home size={18} />} label="Home" active />
            <TemplateNavItem icon={<Activity size={18} />} label="Datastreams" />
            <TemplateNavItem icon={<FileText size={18} />} label="Data Converters" />
            <TemplateNavItem icon={<Gauge size={18} />} label="Web Dashboard" />
            <TemplateNavItem icon={<Zap size={18} />} label="Automation Templates" />
            <TemplateNavItem icon={<FileText size={18} />} label="Metadata" />
            <TemplateNavItem icon={<Zap size={18} />} label="Connection Lifecycle" />
            <TemplateNavItem icon={<Bell size={18} />} label="Events & Notifications" />
            <TemplateNavItem icon={<BookOpen size={18} />} label="User Guides" />
            <TemplateNavItem icon={<Smartphone size={18} />} label="Mobile Dashboard" />
            <TemplateNavItem icon={<Mic size={18} />} label="Voice Assistants" />
            <TemplateNavItem icon={<ImageIcon size={18} />} label="Assets" />
          </div>
        </div>
      )}

      {/* Collapsed Sidebar - Icon Only */}
      {!showSidebar && (
        <div className="w-16 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-3 border-b border-gray-200 flex flex-col items-center gap-3">
            <button 
              onClick={() => navigate('/console')}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <X size={18} className="text-gray-600" />
            </button>
            <button 
              onClick={() => setShowSidebar(true)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <Menu size={18} className="text-gray-600" />
            </button>
          </div>

          <div className="p-2 space-y-2">
            <TemplateNavIconOnly icon={<Home size={18} />} active />
            <TemplateNavIconOnly icon={<Activity size={18} />} />
            <TemplateNavIconOnly icon={<FileText size={18} />} />
            <TemplateNavIconOnly icon={<Gauge size={18} />} />
            <TemplateNavIconOnly icon={<Zap size={18} />} />
            <TemplateNavIconOnly icon={<FileText size={18} />} />
            <TemplateNavIconOnly icon={<Zap size={18} />} />
            <TemplateNavIconOnly icon={<Bell size={18} />} />
            <TemplateNavIconOnly icon={<BookOpen size={18} />} />
            <TemplateNavIconOnly icon={<Smartphone size={18} />} />
            <TemplateNavIconOnly icon={<Mic size={18} />} />
            <TemplateNavIconOnly icon={<ImageIcon size={18} />} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-2.5 flex items-center justify-between">
          <div className="relative">
            <button
              onClick={() => setShowOrgModal(!showOrgModal)}
              className="flex items-center gap-1 hover:bg-gray-50 px-2 py-1 rounded transition-colors"
            >
              <span className="text-sm text-gray-700">My organization - 7758DT</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {/* Organization Modal */}
            {showOrgModal && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowOrgModal(false)}
                />
                <div className="absolute left-0 top-full mt-2 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Building2 size={24} className="text-gray-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">My organization - 7758DT</h3>
                      </div>
                      <button 
                        onClick={() => setShowOrgModal(false)}
                        className="ml-auto p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <Settings size={20} className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-3">Organizations is a PRO feature</h2>
                    <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                      Manage your clients, regional offices and partners using a multi-level organization structure with editable roles and access permissions.
                    </p>
                    <button className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-red-600 hover:to-orange-600 transition-all flex items-center justify-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="m8 12 2 2 4-4"></path>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                      </svg>
                      Upgrade To PRO
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-green-50 text-green-700 px-3 py-1 rounded text-xs font-medium">
              Messages used: <span className="font-semibold">0 of 30k</span>
            </div>
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z"></path>
              </svg>
            </button>
            <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer">
              <span className="text-white font-medium text-xs">U</span>
            </div>
          </div>
        </div>

        {/* Template Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-4xl">{template.icon}</div>
              <h1 className="text-2xl font-bold text-gray-900">{template.name}</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded transition-colors">
              <MoreHorizontal size={20} className="text-gray-600" />
            </button>
            <button className="px-4 py-2 bg-teal-500 text-white rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors">
              Edit
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="max-w-4xl mx-auto p-8">
            {/* Home Section */}
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Home</h2>

            {/* What's Next Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What's next?</h3>
              
              <div className="space-y-3">
                {steps.map((step) => (
                  <div key={step.id} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center flex-shrink-0">
                      {step.completed && (
                        <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                      )}
                    </div>
                    <span className={`text-sm ${step.completed ? 'text-gray-500 line-through' : 'text-blue-600 hover:underline cursor-pointer'}`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Template Settings Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">Template settings</h3>
                <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                  <Settings size={18} className="text-gray-600" />
                </button>
              </div>
              <p className="text-sm text-gray-600">{template.hardware}</p>
            </div>

            {/* Firmware Configuration Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Firmware configuration</h3>
                <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Template ID and Template Name should be declared at the very top of the firmware code.
              </p>
              
              <div className="bg-gray-900 text-white rounded-lg p-4 font-mono text-sm">
                <div className="text-green-400">#define BLYNK_TEMPLATE_ID "TMPL6o3DClMGC"</div>
                <div className="text-green-400">#define BLYNK_TEMPLATE_NAME "SenseCAP"</div>
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

function TemplateNavItem({ icon, label, active }) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
        active
          ? 'bg-gray-100 text-gray-900'
          : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

function TemplateNavIconOnly({ icon, active }) {
  return (
    <div
      className={`flex items-center justify-center p-2 rounded-lg cursor-pointer transition-colors ${
        active
          ? 'bg-gray-100 text-gray-900'
          : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      {icon}
    </div>
  );
}