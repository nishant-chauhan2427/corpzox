import { createSlice } from "@reduxjs/toolkit";
import { submitEditProfile } from "../actions/profile-actions";
import toast from "react-hot-toast";
// Slice
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitEditProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(submitEditProfile.fulfilled, (state, action) => {
        console.log(action.payload, "data from slice")
        //toast.success(action.payload.message)
        //console.log(action.payload,"action.payload12");
        state.loading = false;
        state.success = action.payload;
        state.error = null;
      })
      .addCase(submitEditProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = null;
       // console.log(action.payload, "rejected")
      })
  },
});

export const { clearState } = profileSlice.actions;
export default profileSlice.reducer;
