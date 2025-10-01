import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Trash2, Settings } from 'lucide-react';

export default function DashboardEditor({ onBack }) {
  const [widgets, setWidgets] = useState([]);
  const [mqttStatus, setMqttStatus] = useState('disconnected');
  const [draggedType, setDraggedType] = useState(null);
  
  useEffect(() => {
    // Connect to MQTT
    connectMQTT();
  }, []);
  
  const connectMQTT = () => {
    // Simulate MQTT connection
    setTimeout(() => {
      setMqttStatus('connected');
      simulateData();
    }, 1000);
  };
  
  const simulateData = () => {
    // Simulate LoRa data every 5 seconds
    setInterval(() => {
      const temp = (15 + Math.random() * 20).toFixed(1);
      const humidity = Math.floor(30 + Math.random() * 50);
      
      setWidgets(prev => prev.map(w => {
        if (w.type === 'temperature') return { ...w, value: temp };
        if (w.type === 'humidity') return { ...w, value: humidity };
        return w;
      }));
    }, 5000);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedType) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const newWidget = {
        id: Date.now(),
        type: draggedType,
        x: Math.max(0, x - 100),
        y: Math.max(0, y - 75),
        value: '--'
      };
      
      setWidgets([...widgets, newWidget]);
      setDraggedType(null);
    }
  };
  
  const deleteWidget = (id) => {
    setWidgets(widgets.filter(w => w.id !== id));
  };
  
  const widgetTypes = [
    { type: 'temperature', icon: '🌡️', label: 'Temperature' },
    { type: 'humidity', icon: '💧', label: 'Humidity' },
    { type: 'battery', icon: '🔋', label: 'Battery' },
    { type: 'signal', icon: '📡', label: 'Signal' }
  ];
  
  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <button style={styles.backBtn} onClick={onBack}>
            <ArrowLeft size={20} />
          </button>
          <h1 style={styles.title}>LoRa Dashboard Editor</h1>
          <div style={{
            ...styles.mqttStatus,
            ...(mqttStatus === 'connected' ? styles.mqttConnected : styles.mqttDisconnected)
          }}>
            <div style={styles.statusDot} />
            {mqttStatus === 'connected' ? 'MQTT Connected' : 'MQTT Disconnected'}
          </div>
        </div>
        <div style={styles.headerRight}>
          <button style={styles.btnSecondary} onClick={() => setWidgets([])}>
            <Trash2 size={16} />
            Clear
          </button>
          <button style={styles.btnPrimary} onClick={() => alert('Dashboard saved!')}>
            <Save size={16} />
            Save
          </button>
        </div>
      </div>
      
      {/* Main Layout */}
      <div style={styles.main}>
        {/* Widget Library */}
        <div style={styles.sidebar}>
          <h3 style={styles.sidebarTitle}>Widget Library</h3>
          <div style={styles.category}>
            <h4 style={styles.categoryTitle}>LoRa EM300-TH</h4>
            <div style={styles.widgetGrid}>
              {widgetTypes.map(widget => (
                <div
                  key={widget.type}
                  draggable
                  onDragStart={() => setDraggedType(widget.type)}
                  style={styles.widgetItem}
                >
                  <span style={styles.widgetIcon}>{widget.icon}</span>
                  <span style={styles.widgetLabel}>{widget.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Canvas */}
        <div 
          style={styles.canvas}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {widgets.length === 0 ? (
            <div style={styles.emptyState}>
              <span style={styles.emptyIcon}>🎨</span>
              <h3>Drag widgets here</h3>
              <p>Build your LoRa dashboard</p>
            </div>
          ) : (
            widgets.map(widget => (
              <div
                key={widget.id}
                style={{
                  ...styles.canvasWidget,
                  left: widget.x,
                  top: widget.y
                }}
              >
                <div style={styles.widgetHeader}>
                  <span style={styles.widgetTitle}>
                    {widgetTypes.find(w => w.type === widget.type)?.label}
                  </span>
                  <button 
                    style={styles.deleteBtn}
                    onClick={() => deleteWidget(widget.id)}
                  >
                    ×
                  </button>
                </div>
                <div style={styles.widgetBody}>
                  <div style={styles.widgetValue}>{widget.value}</div>
                  <div style={styles.widgetUnit}>
                    {widget.type === 'temperature' && '°C'}
                    {widget.type === 'humidity' && '%RH'}
                    {widget.type === 'battery' && '%'}
                    {widget.type === 'signal' && 'dBm'}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: '#f8f9fc'
  },
  header: {
    background: 'white',
    borderBottom: '1px solid #e2e8f0',
    padding: '16px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  backBtn: {
    padding: '8px',
    background: 'transparent',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center'
  },
  title: {
    fontSize: '20px',
    fontWeight: '600'
  },
  mqttStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '500'
  },
  mqttConnected: {
    background: '#f0fff4',
    color: '#22543d',
    border: '1px solid #c6f6d5'
  },
  mqttDisconnected: {
    background: '#fed7d7',
    color: '#742a2a',
    border: '1px solid #feb2b2'
  },
  statusDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: 'currentColor'
  },
  headerRight: {
    display: 'flex',
    gap: '12px'
  },
  btnSecondary: {
    padding: '8px 16px',
    background: 'white',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '600'
  },
  btnPrimary: {
    padding: '8px 16px',
    background: 'linear-gradient(135deg, #48bb78, #38a169)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '600'
  },
  main: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden'
  },
  sidebar: {
    width: '280px',
    background: 'white',
    borderRight: '1px solid #e2e8f0',
    padding: '24px',
    overflowY: 'auto'
  },
  sidebarTitle: {
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '20px'
  },
  category: {
    marginBottom: '24px'
  },
  categoryTitle: {
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
    color: '#718096',
    marginBottom: '12px'
  },
  widgetGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px'
  },
  widgetItem: {
    background: '#f7fafc',
    border: '2px dashed #cbd5e0',
    borderRadius: '12px',
    padding: '16px',
    textAlign: 'center',
    cursor: 'grab',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px'
  },
  widgetIcon: {
    fontSize: '24px'
  },
  widgetLabel: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#4a5568'
  },
  canvas: {
    flex: 1,
    background: '#f8f9fc',
    backgroundImage: `
      linear-gradient(rgba(0,0,0,.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,0,0,.05) 1px, transparent 1px)
    `,
    backgroundSize: '20px 20px',
    position: 'relative',
    overflow: 'auto',
    padding: '24px'
  },
  emptyState: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    color: '#718096'
  },
  emptyIcon: {
    fontSize: '48px',
    display: 'block',
    marginBottom: '16px'
  },
  canvasWidget: {
    position: 'absolute',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
    width: '200px',
    height: '150px',
    overflow: 'hidden'
  },
  widgetHeader: {
    background: '#f8fafc',
    padding: '12px 16px',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  widgetTitle: {
    fontSize: '14px',
    fontWeight: '600'
  },
  deleteBtn: {
    background: 'none',
    border: 'none',
    color: '#718096',
    cursor: 'pointer',
    fontSize: '20px',
    lineHeight: 1,
    padding: '0 4px'
  },
  widgetBody: {
    padding: '24px',
    textAlign: 'center'
  },
  widgetValue: {
    fontSize: '36px',
    fontWeight: '700',
    fontFamily: 'monospace'
  },
  widgetUnit: {
    fontSize: '14px',
    color: '#718096',
    marginTop: '4px'
  }
};