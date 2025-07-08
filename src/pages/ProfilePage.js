import React from 'react';
import { FiUser, FiMail, FiCalendar } from 'react-icons/fi';

export default function ProfilePage() {
  // Replace with actual user data
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    joinDate: 'January 2023'
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-6 mb-8">
          <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center">
            <FiUser className="text-indigo-600 text-3xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 border-b">
            <FiMail className="text-indigo-600" />
            <div>
              <p className="text-gray-500">Email</p>
              <p>{user.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4">
            <FiCalendar className="text-indigo-600" />
            <div>
              <p className="text-gray-500">Member since</p>
              <p>{user.joinDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
