import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Header />
      <div className="mt-[60px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
