import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  businessType: "",
  businessName: "",
  cinNo: "",
  role: "",
  yearOfEstablishment: "",
  headquarterLocation: "",
  completeBusinessAddress: {
    line1: "",
    line2: "",
    pinCode: "",
    city: "",
    state: "",
  },
  completeCommunicationAddress: {
    line1: "",
    line2: "",
    pinCode: "",
    city: "",
    state: "",
  },
  financialDetails: {
    capital: "",
    revenue: "",
    profit: "",
  },
  kycDetails: {
    username: "",
    idProofNo: "",
    addressProofNo: "",
  },
  fundingRequirement: {
    fundingRequired: "",
    existingBusiness: false,
  },
};

const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    createBusiness(state, action) {
      const { section, data } = action.payload;
      // If the section is provided, update the specific part of the state
      if (section && data) {
        state[section] = { ...state[section], ...data };
      }
    },

    // Reset all form fields
    resetBusiness(state, action) {
      return initialState;
    },
  },
});

export const { createBusiness, resetBusiness } = businessSlice.actions;

export default businessSlice.reducer;
