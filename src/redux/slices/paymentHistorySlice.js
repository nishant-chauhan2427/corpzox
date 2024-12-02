import { createSlice } from "@reduxjs/toolkit";
import { getPaymentTransaction } from "../actions/payment-history-action";
import toast from "react-hot-toast";

// Slice
const paymentHistorySlice = createSlice({
  name: "paymentHistorySlice",
  initialState: {
    isPaymentHistoryLoading: false,
    error: null,
    paymentHistory: [],
    isDeactivate: false,
    totalTransaction : 0
  },
  reducers: {
    clearState: (state) => {
      state.isPaymentHistoryLoading = false;
      state.error = null;
      state.wishList = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPaymentTransaction.pending, (state) => {
        state.isPaymentHistoryLoading = true;
        state.error = null;
      })
      .addCase(getPaymentTransaction.fulfilled, (state, action) => {
        console.log("wishList wishlist", action.payload);
       
        // toast.success(action.payload.message || "Wishlist fetched wishListfully");
        state.isPaymentHistoryLoading = false;
        state.paymentHistory = action.payload.paymentHistory;
        state.totalTransaction = action.payload.totalPayments
        state.error = null;
      })
      .addCase(getPaymentTransaction.rejected, (state, action) => {
        console.log("rejected");
        const errorMessage = action.payload?.message || "Something went wrong";
        toast.error(errorMessage);
        state.isPaymentHistoryLoading = false;
        state.error = action.payload;
        state.paymentHistory = null;
      });
  },
});

export const { clearState } = paymentHistorySlice.actions;
export default paymentHistorySlice.reducer;

