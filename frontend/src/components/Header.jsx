import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-screen h-[60px] flex items-center justify-center fixed top-0 left-0 shadow bg-white">
      <div className="container mx-auto">
        <div className="w-full flex items-center justify-between gap-5">
          <div className=" uppercase text-[19px] text-blue-600">
            Crud With React and Express
          </div>
          <div className="text-gray-500 flex gap-2 items-center">
            <Link to="/">Home</Link>
            <Link to="/product">Add new product</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
