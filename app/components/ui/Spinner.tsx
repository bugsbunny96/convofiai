import React from 'react';

/**
 * A simple loading spinner for indicating loading state.
 * @returns {JSX.Element}
 */
const Spinner: React.FC = () => (
  <div className="flex items-center justify-center p-4" role="status" aria-label="Loading">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

export default Spinner; 