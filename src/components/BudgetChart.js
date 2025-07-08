import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useBudgetStore } from '../stores/budgetStore';

export default function BudgetChart() {
  const { budget } = useBudgetStore();
  const [data, setData] = useState([]);

  useEffect(() => {
    // Generate sample data based on the budget
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const generatedData = months.map((month, index) => ({
      month,
      budget: budget,
      expenses: Math.floor(Math.random() * (budget * 0.8)) + (budget * 0.2),
      savings: budget - (Math.floor(Math.random() * (budget * 0.8)) + (budget * 0.2))
    }));
    setData(generatedData);
  }, [budget]);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Monthly Budget Overview</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 39,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              tick={{ fill: '#6b7280' }} 
              axisLine={{ stroke: '#d1d5db' }} 
            />
            <YAxis 
              tick={{ fill: '#6b7280' }} 
              axisLine={{ stroke: '#d1d5db' }} 
              domain={[0, budget * 1.2]} 
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="budget"
              stroke="#4f46e5"
              strokeWidth={2}
              activeDot={{ r: 8 }}
              name="Budget"
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#ef4444"
              strokeWidth={2}
              name="Expenses"
            />
            <Line
              type="monotone"
              dataKey="savings"
              stroke="#10b981"
              strokeWidth={2}
              name="Savings"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex justify-center space-x-6">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-indigo-600 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Budget</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Expenses</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-emerald-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Savings</span>
        </div>
      </div>
    </div>
  );
}