import React, { useState } from 'react';
import BlynkConsole from './components/BlynkConsole';
import DashboardEditor from './components/DashboardEditor';
import DevicesPage from './components/DevicesPage';

function App() {
  const [view, setView] = useState('console');

  return (
    <div>
      {view === 'console' && <BlynkConsole onNavigate={setView} />}
      {view === 'editor' && <DashboardEditor onBack={() => setView('console')} />}
      {view === 'devices' && <DevicesPage onBack={() => setView('console')} />}
    </div>
  );
}

export default App;
