import React from 'react';

/**
 * ErrorState displays an error message and an optional retry button.
 * @param message The error message to display
 * @param onRetry Optional retry handler
 * @param retryLabel Optional label for the retry button
 */
export interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry, retryLabel = 'Retry' }) => (
  <div className="flex flex-col items-center justify-center p-8">
    <div className="text-red-500 mb-2">{message}</div>
    {onRetry && (
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={retryLabel}
      >
        {retryLabel}
      </button>
    )}
  </div>
);

export default ErrorState; 