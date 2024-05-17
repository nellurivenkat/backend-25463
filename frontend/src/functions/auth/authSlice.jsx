import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const currentUserCookie = Cookies.get("currentUser");
const userDetails = currentUserCookie ? JSON.parse(currentUserCookie) : null;

const initialState = {
  currentUser: userDetails,
  isAuthenticated: userDetails ? true : false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
