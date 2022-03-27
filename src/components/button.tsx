import React from "react";

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => {
  return (
    <button
      className={`text-white text-lg font-medium focus:outline-none py-3 transition-colors ${
        canClick
          ? "bg-emerald-600 hover:bg-emerald-800"
          : "bg-emerald-300 pointer-events-none"
      }`}
    >
      {loading ? "Loading..." : actionText}
    </button>
  );
};
