import React from 'react';
import RetroButton from './RetroButton';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#EFEFDE] p-1 border-2 border-white shadow-xl max-w-md w-full relative">
        {/* Outer Bevel wrapper */}
        <div className="border-2 border-gray-600 h-full flex flex-col">
          
          {/* Header */}
          <div className="bg-[#000080] text-white px-2 py-1 flex justify-between items-center font-bold font-mono">
            <span>{title}</span>
            <button onClick={onClose} className="bg-[#EFEFDE] text-black w-5 h-5 flex items-center justify-center border border-white text-xs leading-none hover:bg-red-500 hover:text-white cursor-pointer">
              X
            </button>
          </div>

          {/* Content */}
          <div className="p-4 font-mono text-sm text-black">
            {children}
            <div className="mt-4 flex justify-end">
              <RetroButton onClick={onClose}>OK</RetroButton>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Modal;