import React from 'react'; // React import is not strictly necessary for functional components in modern React, but good practice

const Button = ({
  children,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  variant = 'primary', // New prop for different styles
  size = 'md',        // New prop for different sizes
}) => {
  // Base styles applied to all buttons
  const baseStyles = `
    inline-flex items-center justify-center
    font-semibold rounded-lg
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-60 disabled:cursor-not-allowed
  `;

  // Variant-specific styles
  const variantStyles = {
    primary: `
      bg-indigo-600 text-white shadow-md
      hover:bg-indigo-700
      focus:ring-indigo-500
    `,
    secondary: `
      bg-gray-200 text-gray-800 shadow-sm
      hover:bg-gray-300
      focus:ring-gray-400
    `,
    danger: `
      bg-red-600 text-white shadow-md
      hover:bg-red-700
      focus:ring-red-500
    `,
    outline: `
      bg-transparent border border-indigo-600 text-indigo-600
      hover:bg-indigo-50 hover:text-indigo-700
      focus:ring-indigo-500
    `,
    ghost: `
      bg-transparent text-gray-700
      hover:bg-gray-100 hover:text-gray-900
      focus:ring-gray-200
    `,
  };

  // Size-specific styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      // Combine base, variant, size, and any additional className props
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;