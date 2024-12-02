import { createSlice } from "@reduxjs/toolkit";
import { getOffers, loadMoreOffers } from "../actions/offer-action";
import toast from "react-hot-toast";

// Slice
const offerSlice = createSlice({
  name: "offers",
  initialState: {
    loading: false,
    error: null,
    offers: null,
    isDeactivate: false,
    isLoading: false,
    totalCount: null,
    loadingMore:false
  },
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.error = null;
      state.offers = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOffers.pending, (state) => {
        state.loading = true;
        state.isLoading = true;
        state.error= null;
        state.offers= null;
        state.totalCount=null;
        console.log("OfferSice : getOffers.pending");
      })
      .addCase(getOffers.fulfilled, (state, action) => {
        console.log("OfferSice : getOffers.fulfilled");
        console.log("getOffers.fulfilled",action.payload);

        state.loading = false;
        state.isLoading = false;
        state.totalCount=action.payload?.totalCount;
        state.offers = action.payload?.offers;
        state.error = null;
      })
      .addCase(getOffers.rejected, (state, action) => {
        console.log("OfferSice : getOffers.rejected");
        state.loading = false;
        state.isLoading = false;
        state.error = action.payload;
        state.offers = null;
        state.totalCount=null;
      });


      builder
      .addCase(loadMoreOffers.pending, (state) => {
        state.loadingMore = true;
        console.log("OfferSice : getOffers.pending");
      })
      .addCase(loadMoreOffers.fulfilled, (state, action) => {
        console.log("OfferSice : getOffers.fulfilled");
        console.log("getOffers.fulfilled",action.payload);

        state.loadingMore = false;
        if(action.payload?.offers?.length <=0 ){
            toast.error("No more offer found")
        }else{
            state.offers = state.offers?.concat(action.payload?.offers);
            state.totalCount=action.payload?.totalCount;
        }
       
        state.error = null;
      })
      .addCase(loadMoreOffers.rejected, (state, action) => {
        console.log("OfferSice : getOffers.rejected");
        toast.error("error while loading more data")
        state.loadingMore = false;
      });


  },
});

export const { clearState } = offerSlice.actions;
export default offerSlice.reducer;

