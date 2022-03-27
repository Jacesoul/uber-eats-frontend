import React from "react";

interface IFormErrorProps {
  errorMessage: string;
}

export const FormError: React.FC<IFormErrorProps> = ({ errorMessage }) => {
  return <span className=" text-red-400 font-medium">{errorMessage}</span>;
};
