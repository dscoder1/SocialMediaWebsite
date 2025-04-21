import React from "react";

const SimpleModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-bg-gradient-to-br from-[#f0f4ff] via-[#f7eaff] to-[#e0f7fa]  bg-opacity-50 flex items-center justify-center z-30">
      <div className="bg-white rounded-lg p-4 shadow-lg w-64">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500 text-2xl">
            &times;
          </button>
        </div>
        <div className="flex flex-col space-y-2 mt-2">{children}</div>
      </div>
    </div>
  );
};

export default SimpleModal;