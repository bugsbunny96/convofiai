import React from 'react';

const BillingTab: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Current Plan */}
      <section className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row md:space-x-8">
        <div className="flex-1 mb-8 md:mb-0">
          <h2 className="text-lg font-semibold mb-2">Current Plan</h2>
          <div className="mb-2 text-base font-medium">Pro Plan <span className="text-gray-500 font-normal">$49/monthly</span></div>
          <div className="text-xs text-gray-500 mb-2">Renews on 12/1/2023 <span className="ml-2 px-2 py-0.5 rounded bg-green-100 text-green-700">Active</span></div>
          <div className="mb-4">
            <div className="text-sm font-semibold mb-1">Plan Features</div>
            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
              <li>3 AI Agents</li>
              <li>Unlimited conversations</li>
              <li>All integrations</li>
              <li>5 team members</li>
              <li>Email support</li>
            </ul>
          </div>
          <div className="flex space-x-2">
            <button className="bg-primary text-white px-4 py-2 rounded font-medium">Upgrade Plan</button>
            <button className="border border-gray-300 px-4 py-2 rounded font-medium">Change Billing Cycle</button>
            <button className="border border-red-300 text-red-600 px-4 py-2 rounded font-medium">Change Subscription</button>
          </div>
        </div>
        {/* Billing History */}
        <div className="w-full md:w-72">
          <h3 className="text-base font-semibold mb-2">Billing History</h3>
          <div className="space-y-2">
            {[1,2,3].map(i => (
              <div key={i} className="flex items-center justify-between bg-gray-50 rounded px-3 py-2 border">
                <div>
                  <div className="font-medium text-sm">INV-001</div>
                  <div className="text-xs text-gray-500">9/1/2023</div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded">paid</span>
                  <span className="font-semibold text-sm">$49.00</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Payment Method */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
        <p className="text-gray-500 text-sm mb-4">Manage your payment details</p>
        <div className="flex items-center justify-between bg-gray-50 border rounded p-4 mb-4">
          <div>
            <div className="font-medium text-gray-900">Visa ending in 4242</div>
            <div className="text-xs text-gray-500">Expires 12/2025</div>
          </div>
          <button className="border px-3 py-1 rounded text-sm font-medium">Edit</button>
        </div>
        <button className="border px-4 py-2 rounded font-medium">Add Payment Method</button>
      </section>
    </div>
  );
};

export default BillingTab; 