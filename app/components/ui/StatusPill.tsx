import { LeadStatus } from '@/app/types/models';
import React from 'react';

/**
 * Status pill for displaying lead status with color coding.
 */
export interface StatusPillProps {
  status: LeadStatus;
}

const colorMap: Record<LeadStatus, string> = {
  [LeadStatus.New]: 'bg-blue-100 text-blue-700',
  [LeadStatus.Contacted]: 'bg-yellow-100 text-yellow-800',
  [LeadStatus.Converted]: 'bg-green-100 text-green-700',
};

export const StatusPill: React.FC<StatusPillProps> = ({ status }) => (
  <span
    className={`px-3 py-1 rounded-full text-xs font-semibold ${colorMap[status]}`}
    aria-label={status}
    role="status"
  >
    {status}
  </span>
);

export default StatusPill; 