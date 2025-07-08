
import { Link } from 'react-router-dom';
import { 
  FiHome, 
  FiMessageSquare, 
  FiPieChart, 
  FiDollarSign,
  FiClock,
  FiSettings
} from 'react-icons/fi';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md hidden md:block">
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link 
              to="/dashboard" 
              className="flex items-center p-3 rounded-lg hover:bg-indigo-50 text-gray-700 hover:text-indigo-600"
            >
              <FiHome className="w-5 h-5" />
              <span className="ml-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/chat" 
              className="flex items-center p-3 rounded-lg hover:bg-indigo-50 text-gray-700 hover:text-indigo-600"
            >
              <FiMessageSquare className="w-5 h-5" />
              <span className="ml-3">AI Chat</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/budget" 
              className="flex items-center p-3 rounded-lg hover:bg-indigo-50 text-gray-700 hover:text-indigo-600"
            >
              <FiDollarSign className="w-5 h-5" />
              <span className="ml-3">Budget</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/history" 
              className="flex items-center p-3 rounded-lg hover:bg-indigo-50 text-gray-700 hover:text-indigo-600"
            >
              <FiClock className="w-5 h-5" />
              <span className="ml-3">Chat History</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/settings" 
              className="flex items-center p-3 rounded-lg hover:bg-indigo-50 text-gray-700 hover:text-indigo-600"
            >
              <FiSettings className="w-5 h-5" />
              <span className="ml-3">Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
