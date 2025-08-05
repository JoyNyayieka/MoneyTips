import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { profile } from 'apis/api';


export default function ProfileSettings() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', bio: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    profile("get")
      .then((data) => {
        if (data?.email && data?.username) {
          setFormData({
            name: data.username || '',
            email: data.email || '',
            bio: data.bio || '',
        });
      } else {
          setError('Unexpected response from server.');
        }
        setLoading(false);
      })
      .catch((err) => {
        if (err.message === 'Token missing' || err.message.includes('401')) {
          navigate('/login');
        } else {
          setError(`Failed to load profile.${err.message}`);
          setLoading(false);
        }
      });
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    profile("update", formData)
      .then(() => {
        setSuccessMessage('Profile updated successfully.');
      })
      .catch((err) => {
        if (err.message === 'Token missing' || err.message.includes('401')) {
          navigate('/login');
        } else {
          setError('Update failed: ' + err.message);
        }
      });
  };

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
