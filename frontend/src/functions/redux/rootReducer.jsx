import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../auth/authSlice";
import cartReducer from "./cart/cartSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

export default rootReducer;
