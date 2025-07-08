import React from 'react';
import { Link } from 'react-router-dom';
import { MoneyIcon, ChatIcon, DashboardIcon } from './icons';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md hidden md:block">
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link 
              to="/dashboard" 
              className="flex items-center p-3 rounded-lg hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 transition-colors"
            >
              <DashboardIcon className="w-5 h-5" />
              <span className="ml-3 font-medium">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/chat" 
              className="flex items-center p-3 rounded-lg hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 transition-colors"
            >
              <ChatIcon className="w-5 h-5" />
              <span className="ml-3 font-medium">AI Chat</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/budget" 
              className="flex items-center p-3 rounded-lg hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 transition-colors"
            >
              <MoneyIcon className="w-5 h-5" />
              <span className="ml-3 font-medium">Budget</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}