import { createSlice } from "@reduxjs/toolkit";
import { changePassword, deactivateAccount } from "../actions/settings-actions";
import toast from "react-hot-toast";
// Slice
const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    loading: false,
    error: null,
    success: null,
    isDeactivate : false
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
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        console.log(action.payload, "password changed successfully");
        toast.success(action.payload.message);
        state.loading = false;
        state.success = action.payload;
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        console.log(action.payload, "password change failed");
        toast.error(action.payload.message || "Password change failed");
        state.loading = false;
        state.error = action.payload;
        state.success = null;
      })
      .addCase(deactivateAccount.pending, (state) => {
        state.isDeactivate = true;
        state.error = null;
        state.success = null;
      })
      .addCase(deactivateAccount.fulfilled, (state, action) => {
        console.log(action.payload, "account deactivated successfully");
        toast.success(action.payload.message);
        state.isDeactivate = false;
        state.success = action.payload;
        state.error = null;
      })
      .addCase(deactivateAccount.rejected, (state, action) => {
        console.log(action.payload, "account deactivation failed");
        toast.error(action.payload.message || "Account deactivation failed");
        state.isDeactivate = false;
        state.error = action.payload;
        state.success = null;
      });
  },
});

export const { clearState } = settingsSlice.actions;
export default settingsSlice.reducer;
