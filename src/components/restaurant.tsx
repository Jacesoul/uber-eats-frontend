import React from "react";
import { Link } from "react-router-dom";

interface IRestaurantProps {
  id: number;
  coverImg: string;
  name: string;
  categoryName?: string;
}

export const Restaurant: React.FC<IRestaurantProps> = ({
  id,
  coverImg,
  name,
  categoryName,
}) => {
  return (
    <Link to={`/restaurant/${id}`}>
      <div className="flex flex-col">
        <div
          className=" py-24 bg-cover bg-center mb-2"
          style={{ backgroundImage: `url(${coverImg})` }}
        ></div>
        <h3 className=" text-sm font-medium">{name}</h3>
        <span className=" border-t py-1 border-gray-400 text-xs mt-2 opacity-50">
          {categoryName}
        </span>
      </div>
    </Link>
  );
};
