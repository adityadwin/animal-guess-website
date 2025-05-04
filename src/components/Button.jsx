import React from "react";

const Button = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`py-3 px-6 text-xl font-bold rounded-full bg-amber-600 text-white hover:bg-amber-700 transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
