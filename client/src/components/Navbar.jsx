import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, Zap, LogOut, User } from 'lucide-react';

const Navbar = ({ user, onDemoLogin, onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-indigo-400 hover:text-indigo-300 transition">
          <Code2 className="w-6 h-6 text-indigo-500" />
          <span>DevPulse</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link to="/" className="hover:text-indigo-400 transition">
            Feed
          </Link>
          <Link to="/developers" className="hover:text-indigo-400 transition">
            Developers
          </Link>
        </div>

        {/* Right Action Section */}
        <div className="flex items-center gap-3">
          {user ? (
            /* Logged In View */
            <div className="flex items-center gap-3">
              <Link
                to="/profile"
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 text-sm font-medium transition"
              >
                <User className="w-4 h-4 text-indigo-400" />
                <span>{user.name || 'Demo User'}</span>
              </Link>
              <button
                onClick={onLogout}
                className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            /* Guest View -> Instant Demo Login */
            <button
              onClick={onDemoLogin}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium px-4 py-2 rounded-lg text-sm shadow-md shadow-indigo-500/20 transition transform active:scale-95"
            >
              <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              <span>Explore as Recruiter / Demo</span>
            </button>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;