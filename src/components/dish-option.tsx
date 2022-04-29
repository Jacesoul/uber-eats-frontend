import React from "react";

interface IDishOptionProps {
  isSelected: boolean;
  name: string;
  extra?: number | null;
  dishId: number;
  addOptionToItem: (dishId: number, optionName: string) => void;
  removeOptionFromItem: (dishId: number, optionName: string) => void;
}

export const DishOption: React.FC<IDishOptionProps> = ({
  isSelected,
  name,
  extra,
  dishId,
  addOptionToItem,
  removeOptionFromItem,
}) => {
  const onClick = () => {
    if (isSelected) {
      removeOptionFromItem(dishId, name);
    } else {
      addOptionToItem(dishId, name);
    }
  };
  return (
    <span
      onClick={onClick}
      className={`flex items-center border px-2 py-1 ${
        isSelected ? " border-gray-800" : " hover:border-gray-800"
      }`}
    >
      <h6 className=" mr-2 font-medium">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </h6>
      {<h6 className=" text-sm opacity-75">(${extra})</h6>}
    </span>
  );
};
