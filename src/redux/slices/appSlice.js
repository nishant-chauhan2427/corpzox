import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pin: false,
  servicesMainTab: 0,
  redirectedTo: ""
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setPin: (state, action) => {
      state.pin = action.payload;
    },
    setServicesMainTab: (state, action) => {
      state.servicesMainTab = action.payload;
    },
    setRedirectTo: (state, action) => {
      console.log(action, "redirect slice");
      state.redirectedTo = action.payload;
    },
  },
});

export const { setPin, setServicesMainTab, setRedirectTo } = appSlice.actions;

export default appSlice.reducer;
