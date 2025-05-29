'use client';

import { ReactNode } from 'react';

interface StatusItemProps {
  icon: ReactNode;
  name: string;
  status?: string;
  conversations: number;
  responseRate?: number;
  isActive?: boolean;
}

interface StatusListProps {
  title: string;
  items: StatusItemProps[];
}

function StatusItem({ icon, name, status, conversations, responseRate, isActive }: StatusItemProps) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-3">
        <div className="text-blue-600">
          {icon}
        </div>
        <div>
          <p className="font-medium">{name}</p>
          {status && <p className="text-sm text-gray-500">{status}</p>}
        </div>
      </div>
      <div className="text-right flex flex-row gap-3 items-center">
        <div className="flex flex-col">
        <p className="font-medium">{conversations} conv.</p>
        {responseRate && (
          <p className="text-sm text-gray-500">{responseRate}% response rate</p>
        )}
        </div>
        {typeof isActive !== 'undefined' && (
          <div className={`w-2 h-2 rounded-full ml-auto mt-1 ${isActive ? 'bg-green-500' : 'bg-red-500'}`} />
        )}
      </div>
    </div>
  );
}

export default function StatusList({ title, items }: StatusListProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-medium mb-4">{title}</h2>
      <div className="divide-y">
        {items.map((item, index) => (
          <StatusItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
} 