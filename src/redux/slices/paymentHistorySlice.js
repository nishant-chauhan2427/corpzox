import { createSlice } from "@reduxjs/toolkit";
import { downloadInvoice, getPaymentTransaction } from "../actions/payment-history-action";
import toast from "react-hot-toast";

// Slice
const paymentHistorySlice = createSlice({
  name: "paymentHistorySlice",
  initialState: {
    isPaymentHistoryLoading: false,
    isTransactionDownloading : false,
    error: null,
    paymentHistory: [],
    isDeactivate: false,
    totalTransaction : 0,
    downloadTransactionUrl : ""
  },
  reducers: {
    clearState: (state) => {
      state.isPaymentHistoryLoading = false;
      state.error = null;
      state.wishList = null;
    },
    clearUrl : (state)=>{
      state.downloadTransactionUrl = ""
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPaymentTransaction.pending, (state) => {
        state.isPaymentHistoryLoading = true;
        state.error = null;
      })
      .addCase(getPaymentTransaction.fulfilled, (state, action) => {
       
       
        state.isPaymentHistoryLoading = false;
        state.paymentHistory = action.payload.paymentHistory;
        state.totalTransaction = action.payload.totalPayments
        state.error = null;
      })
      .addCase(getPaymentTransaction.rejected, (state, action) => {
       
        const errorMessage = action.payload?.message || "Something went wrong";
        toast.error(errorMessage);
        state.isPaymentHistoryLoading = false;
        state.error = action.payload;
        state.paymentHistory = null;
      })
      .addCase(downloadInvoice.pending, (state) => {
        state.isTransactionDownloading = true;
        state.error = null;
      })
      .addCase(downloadInvoice.fulfilled, (state, action) => {
        state.isTransactionDownloading = false;
        state.downloadTransactionUrl = action.payload;
        state.error = null;
      })
      .addCase(downloadInvoice.rejected, (state, action) => {
        const errorMessage = action.payload?.message || "Something went wrong";
        toast.error(errorMessage);
        state.isTransactionDownloading = false;
        state.error = action.payload;
        state.downloadTransactionUrl = null;
      })
      ;
  },
});

export const { clearState, clearUrl } = paymentHistorySlice.actions;
export default paymentHistorySlice.reducer;

