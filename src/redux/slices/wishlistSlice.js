import { createSlice } from "@reduxjs/toolkit";
// import { getWishList } from "../actions/wishlist-actions";
import { getWishList } from "../actions/wishlist-actions";
import toast from "react-hot-toast";

// Slice
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    loading: false,
    error: null,
    wishList: null,
    isDeactivate: false,
    isLoading: false,
    totalCount: null,
  },
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.error = null;
      state.wishList = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWishList.pending, (state) => {
        state.loading = true;
        state.isLoading = true;
        state.error = null;
        state.wishList = null;
        console.log("pending wishlist");
      })
      .addCase(getWishList.fulfilled, (state, action) => {
        console.log("wishList wishlist", action.payload);
        toast.success(action.payload.message || "Wishlist fetched wishListfully");
        state.loading = false;
        state.isLoading = false;
        state.totalCount=action.payload.length
        state.wishList = action.payload;
        state.error = null;
      })
      .addCase(getWishList.rejected, (state, action) => {
        console.log("rejected");
        const errorMessage = action.payload?.message || "Something went wrong";
        toast.error(errorMessage);
        state.loading = false;
        state.isLoading = false;
        state.error = action.payload;
        state.wishList = null;
      });
  },
});

export const { clearState } = wishlistSlice.actions;
export default wishlistSlice.reducer;

