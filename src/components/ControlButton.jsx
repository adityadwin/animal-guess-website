import React from "react";

const ControlButton = ({ icon, onClick, ariaLabel }) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white hover:bg-yellow-600 transition-colors"
    >
      {icon}
    </button>
  );
};

export default ControlButton;
