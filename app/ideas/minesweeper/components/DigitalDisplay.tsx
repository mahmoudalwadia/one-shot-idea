import React from 'react';

interface DigitalDisplayProps {
  value: number;
  digits?: number;
}

const DigitalDisplay: React.FC<DigitalDisplayProps> = ({ value, digits = 3 }) => {
  // Clamp value to fit display logic (e.g., -99 to 999)
  const clampedValue = Math.max(-99, Math.min(Math.pow(10, digits) - 1, value));
  
  // Format with leading zeros (or negative sign logic)
  let displayString = Math.abs(clampedValue).toString().padStart(digits, '0');
  if (clampedValue < 0) {
    // Basic handling for negative numbers in 3 digits: -01
    displayString = '-' + Math.abs(clampedValue).toString().padStart(digits - 1, '0');
  }

  return (
    <div className="bg-black text-red-600 font-digital font-bold text-3xl px-1 border-2 border-win-dark border-r-win-light border-b-win-light select-none tracking-widest">
      {displayString}
    </div>
  );
};

export default DigitalDisplay;