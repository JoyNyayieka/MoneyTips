// pages/DashboardPage.js
import React from 'react';
import BudgetChart from '../components/BudgetChart';
import DashboardCard from '../components/DashboardCard';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Financial Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard title="Monthly Budget" value="$2,500" />
        <DashboardCard title="Expenses" value="$1,200" />
        <DashboardCard title="Savings" value="$1,300" />
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <BudgetChart />
      </div>
    </div>
  );
}