import React, { useState } from 'react';
import { FiCreditCard, FiPlus } from 'react-icons/fi';

export default function PaymentSettings() {
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'Visa', last4: '4242', expiry: '12/24' },
    { id: 2, type: 'Mastercard', last4: '5555', expiry: '05/25' }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const removePaymentMethod = (id) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium flex items-center">
          <FiCreditCard className="mr-2" /> Payment Methods
        </h3>
        <div className="mt-4 space-y-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center mr-4">
                  {method.type}
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• {method.last4}</p>
                  <p className="text-gray-500 text-sm">Expires {method.expiry}</p>
                </div>
              </div>
              <button
                onClick={() => removePaymentMethod(method.id)}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Remove
              </button>
            </div>
          ))}

          {showAddForm ? (
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-4">Add New Payment Method</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Expiration Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Security Code</label>
                    <input
                      type="text"
                      placeholder="CVC"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg"
                  >
                    Save Card
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center text-indigo-600 hover:text-indigo-800 mt-4"
            >
              <FiPlus className="mr-2" /> Add Payment Method
            </button>
          )}
        </div>
      </div>
    </div>
  );
}