
import React from 'react';
import { Link } from 'react-router-dom';
import { MoneyIcon, ChatIcon, DashboardIcon, SavingsIcon, ReportIcon, GoalIcon } from '../components/icons';

export default function HomePage() {
  const features = [
    {
      icon: <ChatIcon className="w-8 h-8" />,
      title: "AI Financial Assistant",
      description: "Get personalized money advice from our AI chatbot"
    },
    {
      icon: <ReportIcon className="w-8 h-8" />,
      title: "Detailed Reports",
      description: "Visualize your financial health with charts"
    },
    {
      icon: <MoneyIcon className="w-8 h-8" />,
      title: "Budget Tracking",
      description: "Monitor your spending and stay on budget"
    },
    {
      icon: <GoalIcon className="w-8 h-8" />,
      title: "Goal Planning",
      description: "Plan for big purchases or retirement"
    },
    {
      icon: <SavingsIcon className="w-8 h-8" />,
      title: "Savings Goals",
      description: "Set and track your financial objectives"
    },
    {
      icon: <DashboardIcon className="w-8 h-8" />,
      title: "Dashboard Overview",
      description: "See all your finances at a glance"
    }
  ];

  const stats = [
    { value: "88%", label: "User Satisfaction Rate" },
    { value: "10K+", label: "Active Users" },
    { value: "24/7", label: "AI Support Available" }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-4">
          AI Financial Assistant
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Get personalized money advice from our AI chatbot
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/chat" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
          >
            Start Chatting
          </Link>
          <Link 
            to="/dashboard" 
            className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-medium py-3 px-6 rounded-lg transition duration-300"
          >
            View Dashboard
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-indigo-50 rounded-xl p-8 my-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="p-4">
              <p className="text-4xl font-bold text-indigo-600">{stat.value}</p>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100"
            >
              <div className="text-indigo-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-xl p-12 my-12 text-center text-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to improve your financial health?</h2>
        <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
          Join thousands of users who are taking control of their money with our AI-powered tools.
        </p>
        <Link 
          to="/signup" 
          className="inline-block bg-white text-indigo-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition duration-300"
        >
          Get Started Now
        </Link>
      </section>
    </div>
  );
}