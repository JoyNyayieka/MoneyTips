
import React from 'react';
import { Link } from 'react-router-dom';
import ProfileDropdown from './Profile';

export default function Header() {
  const isAuthenticated = true; // Replace with actual auth check

  return (
    <header className="bg-indigo-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold hover:text-indigo-100 transition-colors">
            MoneyTips AI
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="hover:text-indigo-200 transition-colors font-medium">
                  Dashboard
                </Link>
                <Link to="/chat" className="hover:text-indigo-200 transition-colors font-medium">
                  Chat
                </Link>
                <Link to="/budget" className="hover:text-indigo-200 transition-colors font-medium">
                  Budget
                </Link>
                <ProfileDropdown />
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-indigo-200 transition-colors font-medium">
                  Login
                </Link>
                <Link to="/register" className="hover:text-indigo-200 transition-colors font-medium">
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}