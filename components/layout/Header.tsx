
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Page } from '../../types';
import Button from '../ui/Button';

interface NavLinkProps {
  page: Page;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ page, currentPage, setCurrentPage, children }) => {
  const isActive = currentPage === page;
  return (
    <button
      onClick={() => setCurrentPage(page)}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? 'text-slate-900'
          : 'text-slate-500 hover:text-slate-900'
      }`}
    >
      {children}
    </button>
  );
};

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
                <button onClick={() => setCurrentPage('home')} className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM5.5 9.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v5a.5.5 0 01-1 0V10H6a.5.5 0 01-.5-.5zm3 .5a.5.5 0 00-1 0v5a.5.5 0 001 0v-5zm3.5-.5a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xl font-bold text-slate-800">CivicEngage</span>
                </button>
            </div>
            <nav className="hidden md:flex items-center space-x-1">
              <NavLink page="home" currentPage={currentPage} setCurrentPage={setCurrentPage}>Home</NavLink>
              <NavLink page="chatbot" currentPage={currentPage} setCurrentPage={setCurrentPage}>Feedback</NavLink>
              <NavLink page="tracker" currentPage={currentPage} setCurrentPage={setCurrentPage}>Tracker</NavLink>
              <NavLink page="polling" currentPage={currentPage} setCurrentPage={setCurrentPage}>Polling</NavLink>
              <NavLink page="dashboard" currentPage={currentPage} setCurrentPage={setCurrentPage}>Dashboard</NavLink>
            </nav>
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-slate-600 hidden sm:block">Welcome, {user.name}</span>
                <Button onClick={logout} variant="secondary">Logout</Button>
              </div>
            ) : (
              <Button onClick={() => setCurrentPage('auth')}>Login / Sign Up</Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
