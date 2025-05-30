'use client';

interface ActivityLogProps {
  firstContact: string;
  lastActive: string;
  totalConversations: number;
}

export default function ActivityLog({
  firstContact,
  lastActive,
  totalConversations,
}: ActivityLogProps) {
  return (
    <div className="bg-white rounded-lg p-3 sm:p-4">
      <h3 className="text-xs sm:text-sm font-medium text-gray-900 mb-3 sm:mb-4">Activity</h3>
      <div className="space-y-2 sm:space-y-3">
        <div className="flex justify-between">
          <span className="text-xs sm:text-sm text-gray-500">First contact:</span>
          <span className="text-xs sm:text-sm font-medium text-gray-900">{firstContact}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-xs sm:text-sm text-gray-500">Last active:</span>
          <span className="text-xs sm:text-sm font-medium text-gray-900">{lastActive}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-xs sm:text-sm text-gray-500">Total conversations:</span>
          <span className="text-xs sm:text-sm font-medium text-gray-900">{totalConversations}</span>
        </div>
      </div>
    </div>
  );
} 