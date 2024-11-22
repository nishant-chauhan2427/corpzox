import { createSlice } from "@reduxjs/toolkit";
import { updateKYCDetails, updateFundingDetails, fetchUserBusinessCard, getBusiness } from "../actions/business-action";
const initialState = {
    business: {
      registration: {},
      address: {},
      financial: {},
      kyc: {},
      funding: {},
    },
    businessId: null,  // Add businessId to the state
    loading: false,
    error: null,
//   // businessType: "",
//   // businessName: "",
//   // cinNo: "",
//   // role: "",
//   // yearOfEstablishment: "",
//   // headquarterLocation: "",
//   // businessAddress: {
//   //   line1: "",
//   //   line2: "",
//   //   pinCode: "",
//   //   city: "",
//   //   state: "",
//   // },
//   // communicationAddress: {
//   //   line1: "",
//   //   line2: "",
//   //   pinCode: "",
//   //   city: "",
//   //   state: "",
//   // },
//   // financialDetails: {
//   //   capital: "",
//   //   revenue: "",
//   //   profit: "",
//   // },
//   // kycDetails: {
//   //   username: "",
//   //   idProofNo: "",
//   //   addressProofNo: "",
//   // },
//   // fundingRequirement: {
//   //   fundingRequired: "",
//   //   existingBusiness: false,
//   // },
};

const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    setBusinessId(state, action) {
      state.businessId = action.payload;
    },
    createBusiness(state, action) {
      const { section, data } = action.payload;
      state.business[section] = { ...state.business[section], ...data };
    },
    
    // Reset all form fields
    resetBusiness(state, action) {
      return initialState;
    },
  },
  extraReducers:(builder)=>{
    builder
    .addCase(getBusiness.pending, (state) => {
      state.loading = true;
    })
    .addCase(getBusiness.fulfilled, (state, action) => {
      state.loading = false;
      state.business = { ...action.payload }; 
    })
    .addCase(getBusiness.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    }
    
});

export const { setBusinessId, createBusiness, resetBusiness } = businessSlice.actions;

export default businessSlice.reducer;

