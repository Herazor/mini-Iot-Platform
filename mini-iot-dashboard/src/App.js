import React, { useState } from 'react';
import BlynkConsole from './components/BlynkConsole';
import DashboardEditor from './components/DashboardEditor';

function App() {
  const [view, setView] = useState('console');
  
  return (
    <div>
      {view === 'console' ? (
        <BlynkConsole onCreateDashboard={() => setView('editor')} />
      ) : (
        <DashboardEditor onBack={() => setView('console')} />
      )}
    </div>
  );
}

export default App;