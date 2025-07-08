// pages/BudgetPage.js
import React, { useState } from 'react';
import { useBudgetStore } from '../stores/budgetStore';

export default function BudgetPage() {
  const { budget, setBudget } = useBudgetStore();
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setBudget(input);
    setInput('');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Budget Planner</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-xl mb-4">Current Budget: ${budget}</p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter new budget"
            className="border p-2 rounded flex-1"
          />
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
            Set Budget
          </button>
        </form>
      </div>
    </div>
  );
}