import { createSlice } from "@reduxjs/toolkit";
import { requestChangeManager, getRatingReviews } from "../actions/dashboard-action";
import toast from "react-hot-toast";

// Slice
const dashBoardSlice = createSlice({
  name: "dashBoardSlice",
  initialState: {
    isChangeManagerLoading: false,
    error: null,
    isRatingLoading : false,
    ratingReviewList : []
  },
  reducers: {
    clearState: (state) => {
      state.isChangeManagerLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestChangeManager.pending, (state) => {
        state.isChangeManagerLoading = true;
        state.error = null;
      })
      .addCase(requestChangeManager.fulfilled, (state, action) => {
        //console.log("wishList wishlist", action.payload);
       
        toast.success(action.payload.message || "Wishlist fetched wishListfully");
        state.isChangeManagerLoading = false;
    
        state.error = null;
      })
      .addCase(requestChangeManager.rejected, (state, action) => {
       
        const errorMessage = action.payload?.message || "Something went wrong";
        toast.error(errorMessage);
        state.isChangeManagerLoading = false;
      })
    
      .addCase(getRatingReviews.pending, (state)=>{
        state.isRatingLoading = true
      })
      .addCase(getRatingReviews.fulfilled, (state)=>{
        state.isRatingLoading = false
      })
      .addCase(getRatingReviews.rejected, (state)=>{
        state.isRatingLoading = false
        toast.error(action?.payload)
      });
  },
});

export const { clearState } = dashBoardSlice.actions;
export default dashBoardSlice.reducer;

