import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children, user, onDemoLogin, onLogout }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      {/* Top Navbar */}
      <Navbar user={user} onDemoLogin={onDemoLogin} onLogout={onLogout} />

      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        DevPulse — Developer Portfolio Showcase
      </footer>
    </div>
  );
};

export default Layout;