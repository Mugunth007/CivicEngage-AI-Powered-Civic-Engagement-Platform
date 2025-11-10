import React, { useState, useMemo } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Page } from './types';
import Header from './components/layout/Header';
import HomePage from './components/pages/HomePage';
import ChatbotPage from './components/pages/ChatbotPage';
import TrackerPage from './components/pages/TrackerPage';
import PollingPage from './components/pages/PollingPage';
import DashboardPage from './components/pages/DashboardPage';
import AuthPage from './components/pages/AuthPage';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const { user } = useAuth();

  const renderPage = useMemo(() => {
    const protectedPages: Page[] = ['chatbot', 'polling', 'dashboard'];
    
    if (!user && protectedPages.includes(currentPage)) {
        return <AuthPage setCurrentPage={setCurrentPage}/>;
    }

    switch (currentPage) {
      case 'chatbot':
        return <ChatbotPage />;
      case 'tracker':
        return <TrackerPage />;
      case 'polling':
        return <PollingPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'auth':
        return <AuthPage setCurrentPage={setCurrentPage} />;
      case 'home':
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  }, [currentPage, user, setCurrentPage]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderPage}
      </main>
    </div>
  );
};


const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;