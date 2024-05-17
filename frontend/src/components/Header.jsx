import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { logout } from "../functions/auth/authSlice";
import Cookies from "js-cookie";

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const { isAuthenticated, currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("currentUser");
    dispatch(logout());
  };
  return (
    <div className="w-screen h-[60px] flex items-center justify-center fixed top-0 left-0 shadow bg-white">
      <div className="container mx-auto">
        <div className="w-full flex items-center justify-between gap-5">
          <div className=" uppercase text-[19px] text-blue-600">
            Shoping Site With React and Express
          </div>
          <div className="text-gray-500 flex gap-6 items-center">
            <Link to="/">Home</Link>
            <Link to="/product/create">Add new product</Link>
            {!isAuthenticated && (
              <>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
              </>
            )}
            {isAuthenticated && (
              <>
                <Link to="/orderHistory">Order History</Link>
                <div onClick={handleLogout} className="cursor-pointer">Logout</div>
              </>
            )}
          </div>
          <div className="relative ">
            {cartItems.length > 0 && (
              <Link to="/viewCart">
                <div className="absolute top-[-15px] right-[-10px] w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center">
                  {cartItems.length}
                </div>
                <FaCartShopping size={25} />
              </Link>
            )}
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default Header;
