'use client';

import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  change: {
    value: number;
    trend: 'up' | 'down';
  };
  icon: ReactNode;
}

export default function StatCard({ title, value, change, icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm text-gray-500 font-medium">{title}</h3>
          <p className="text-2xl font-semibold mt-2">{value}</p>
          <p className={`text-sm mt-2 ${change.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            {change.trend === 'up' ? '+' : '-'}{Math.abs(change.value)}% vs last month
          </p>
        </div>
        <div className="text-blue-600">
          {icon}
        </div>
      </div>
    </div>
  );
} 