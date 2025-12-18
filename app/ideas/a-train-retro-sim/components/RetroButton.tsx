import React from 'react';

interface RetroButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const RetroButton: React.FC<RetroButtonProps> = ({ children, className = '', active, fullWidth, ...props }) => {
  // Styles mimicking Windows 3.1 / A-Train bevels
  // Light Top/Left, Dark Bottom/Right for raised.
  // Dark Top/Left, Light Bottom/Right for depressed (active).

  const baseStyle = `
    font-mono text-sm px-2 py-1 font-bold
    transition-colors duration-75
    border-2
    outline-none
    select-none
    cursor-pointer
  `;

  const raisedStyle = `
    bg-[#EFEFDE] text-black
    border-t-white border-l-white
    border-b-[#444] border-r-[#444]
    active:border-t-[#444] active:border-l-[#444]
    active:border-b-white active:border-r-white
  `;

  const depressedStyle = `
    bg-[#ddd] text-black
    border-t-[#444] border-l-[#444]
    border-b-white border-r-white
  `;

  const finalClass = `
    ${baseStyle}
    ${active ? depressedStyle : raisedStyle}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  return (
    <button className={finalClass} {...props}>
      {children}
    </button>
  );
};

export default RetroButton;
