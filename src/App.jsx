import React, { useState } from 'react';

import Header from './components/Header';
import CreatePage from './pages/CreatePage';
import AboutPage from './pages/AboutPage';
import Toast from './components/Toast';

export default function App() {
  const [activeTab, setActiveTab] = useState('create');
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white font-sans">
      {/* Header with [✦ Create] and [ⓘ About] Navigation */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Page Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'create' && (
          <CreatePage showToast={showToast} />
        )}

        {activeTab === 'about' && (
          <AboutPage />
        )}
      </main>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
