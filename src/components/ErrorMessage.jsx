import React from 'react';
import { FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa'; // Import relevant icons

const ErrorMessage = ({
  message,
  onDismiss, // New optional prop for a dismiss button
  className = '', // Allows for additional custom styling
  type = 'error', // New prop: 'error' (default) or 'warning'
}) => {
  if (!message) {
    return null;
  }

  // Define base styles and type-specific styles
  const baseStyles = `
    p-4 rounded-lg flex items-start space-x-3 text-sm font-medium
    shadow-sm transition-all duration-300 ease-in-out
  `;

  const typeStyles = {
    error: `
      bg-red-50 text-red-800 border border-red-300
      dark:bg-red-900 dark:text-red-100 dark:border-red-700
    `,
    warning: `
      bg-yellow-50 text-yellow-800 border border-yellow-300
      dark:bg-yellow-900 dark:text-yellow-100 dark:border-yellow-700
    `,
    // You could add 'info' or 'success' variants if this component is generalized
  };

  const Icon = type === 'error' ? FaExclamationTriangle : FaInfoCircle; // FaInfoCircle from previous contexts, or a new FaExclamationTriangle for warning

  return (
    <div
      role="alert" // Accessibility: indicates this is an alert
      aria-live="assertive" // Accessibility: announces changes to screen readers
      className={`${baseStyles} ${typeStyles[type]} ${className}`}
    >
      <div className="flex-shrink-0 mt-0.5">
        {type === 'error' && <FaExclamationTriangle className="h-5 w-5 text-red-500 dark:text-red-300" aria-hidden="true" />}
        {type === 'warning' && <FaInfoCircle className="h-5 w-5 text-yellow-500 dark:text-yellow-300" aria-hidden="true" />}
        {/* If FaInfoCircle is not available, use a generic icon or add it to imports */}
      </div>
      <div className="flex-1">
        {message}
      </div>
      {onDismiss && (
        <div className="flex-shrink-0">
          <button
            type="button"
            onClick={onDismiss}
            className={`
              inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2
              ${type === 'error'
                ? 'bg-red-50 text-red-500 hover:bg-red-100 focus:ring-offset-red-50 focus:ring-red-600 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800'
                : 'bg-yellow-50 text-yellow-500 hover:bg-yellow-100 focus:ring-offset-yellow-50 focus:ring-yellow-600 dark:bg-yellow-900 dark:text-yellow-300 dark:hover:bg-yellow-800'
              }
            `}
            aria-label="Dismiss" // Accessibility label for screen readers
          >
            <span className="sr-only">Dismiss</span>
            <FaTimesCircle className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;