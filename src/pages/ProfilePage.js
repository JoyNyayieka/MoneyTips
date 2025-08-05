import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiCalendar } from 'react-icons/fi';
import { profile } from 'apis/api';

export default function ProfilePage() {
  const [user, setUser] = useState({ email: '', username: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    profile("get")
      .then((data) => {
        if (typeof data === 'object' && data.email && data.username) {
          setUser({ email: data.email, username: data.username });
        } else {
          console.warn('Unexpected response:', data);
          setError('Unexpected response from server.');
        }
      })
      .catch((err) => {
        if (err.status) {
          if (err.status === 401) {
            if (err.message === 'Token missing') {
              navigate('/login');
            } else {
              setError('No user found. Please log in');
            }
          } else {
            setError(`Error ${err.status}: ${err.message || 'Unexpected error'}`);
          }
        } else if (err.message === 'Failed to fetch') {
          setError('No response received. Is the server running?');
        } else {
          setError(`Request error: ${err.message}`);
        }
      });
  }, [navigate]);

  if (error) {
    return <p className="text-red-600 text-center mt-6">{error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>; // or a spinner
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-6 mb-8">
          <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center">
            <FiUser className="text-indigo-600 text-3xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user.username}</h1>
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
              <p>{user.joinDate || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
