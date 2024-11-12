import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pin: false,
  servicesMainTab: 0,
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
  },
});

export const { setPin, setServicesMainTab } = appSlice.actions;

export default appSlice.reducer;
