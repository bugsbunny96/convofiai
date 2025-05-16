import React from 'react';

/**
 * EmptyState displays a message and optional icon and action for empty data states.
 * @param message The message to display
 * @param icon Optional icon (JSX)
 * @param action Optional action button (JSX)
 */
export interface EmptyStateProps {
  message: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message, icon, action, className }) => (
  <div className={`flex flex-col items-center gap-2 ${className || ''}`.trim()}>
    {icon}
    <span className="text-gray-500">{message}</span>
    {action}
  </div>
);

export default EmptyState; 