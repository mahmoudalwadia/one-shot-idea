import React, { useState } from 'react';

interface TerminalInputProps {
  onSubmit: (cmd: string) => void;
  disabled?: boolean;
}

const TerminalInput: React.FC<TerminalInputProps> = ({ onSubmit, disabled }) => {
  const [input, setInput] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      onSubmit(input);
      setInput('');
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black border-t border-red-900 p-2 z-50 flex items-center font-mono text-sm md:text-base">
      <span className="text-red-500 mr-2 blink">{'>'}</span>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="bg-transparent border-none outline-none text-red-500 w-full placeholder-red-900"
        placeholder={disabled ? "PROCESSING..." : "ENTER COMMAND..."}
        autoFocus
      />
      <div className="text-red-900 text-xs px-2 border border-red-900 hidden md:block">
        SYS.READY
      </div>
    </div>
  );
};

export default TerminalInput;
