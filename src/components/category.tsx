import React from "react";

interface ICategoryProps {
  coverImg: string | null;
  name: string;
}

export const Category: React.FC<ICategoryProps> = ({ coverImg, name }) => {
  return (
    <div className=" flex flex-col items-center cursor-pointer group">
      <div
        className=" w-14 h-14 bg-cover group-hover:bg-gray-100 rounded-full "
        style={{
          backgroundImage: `url(${coverImg})`,
          backgroundSize: "40px 40px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></div>
      <span className=" text-sm text-center font-medium mt-2">{name}</span>
    </div>
  );
};
