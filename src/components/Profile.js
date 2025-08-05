import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { auth } from 'apis/api';

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Add logout logic here
  try {
    const res = auth("logout")
    navigate("/dashboard")
    
  } catch (error) {
    console.error("Logout error:", error);
  }
};

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
          <FiUser className="text-indigo-600" />
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
          <Link
            to="/profile"
            className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 flex items-center"
          >
            <FiUser className="mr-2" /> Profile
          </Link>
          <Link
            to="/settings"
            className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 flex items-center"
          >
            <FiSettings className="mr-2" /> Settings
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 flex items-center"
          >
            <FiLogOut className="mr-2" /> Logout
          </button>
        </div>
      )}
    </div>
  );
}