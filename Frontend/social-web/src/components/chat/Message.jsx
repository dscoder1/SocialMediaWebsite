import React, { useState } from "react";

const Message = ({ ownMessage, message }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
    className={`mb-3 ${ownMessage ? "text-right" : "text-left"}`}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    <span
      className={`inline-block p-3 rounded-lg transition-all duration-300 ease-in-out transform ${
        ownMessage
          ? "bg-blue-500 text-white shadow-md hover:bg-blue-600"
          : "bg-gray-300 text-black shadow-sm hover:bg-gray-400"
      } ${
        isHovered ? "scale-105 shadow-lg" : "scale-100"
      }`} // Hover animation for scaling
    >
      {message}
    </span>
  </div>
  );
};

export default Message;