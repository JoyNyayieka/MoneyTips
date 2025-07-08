import React, { useState, useEffect } from 'react';
import { FiClock, FiSearch } from 'react-icons/fi';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Replace with actual data fetching
    const mockHistory = [
      { id: 1, query: 'How to save for retirement?', date: '2023-05-15', response: 'Consider contributing to a 401(k) or IRA...' },
      { id: 2, query: 'Best budgeting strategies', date: '2023-05-10', response: 'The 50/30/20 rule is effective...' },
      { id: 3, query: 'Investing for beginners', date: '2023-05-05', response: 'Start with index funds and diversify...' },
    ];
    setHistory(mockHistory);
  }, []);

  const filteredHistory = history.filter(item =>
    item.query.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.response.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold flex items-center">
          <FiClock className="mr-2" /> Chat History
        </h1>
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search history..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredHistory.length > 0 ? (
          filteredHistory.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex justify-between items-start">
                <h3 className="font-medium">{item.query}</h3>
                <span className="text-sm text-gray-500">{item.date}</span>
              </div>
              <p className="mt-2 text-gray-600">{item.response}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No history found
          </div>
        )}
      </div>
    </div>
  );
}