import { createSlice } from "@reduxjs/toolkit";
import { updateKYCDetails, updateFundingDetails, fetchUserBusinessCard, getBusiness } from "../actions/business-action";

// Define initial state with a structure similar to the API data you want
const initialState = {
  business: {
    registration: {
      typeOfBusiness: "",
      businessName: "",
      cinNumber: "",
      roleOfCompany: "",
      yearOfStablish: "",
      headQuarterLocation: "",
      industry: "",
      subIndustry: "",
      sizeOfCompany: "",
      funded: ""
    },
    address: {
        businessAddressL1: "",
        businessAddressL2: "",
        businessAddressPin: "",
        businessAddressState: "",
        businessAddressCity: "",
        communicationAddressL1: "",
        communicationAddressL2: "",
        communicationAddressPin: "",
        communicationAddressCity: "",
        communicationAddressState: ""
    },
    financial: {
      financialDetails: {
        capital: "",
        revenue: "",
        profit: ""
      }
    },
    kyc: {
      kycDetails: {
        kycUser: "",
        id: "",
        addressProof: ""
      }
    },
    funding: {
      fundingRequirement: {
        lookingForFunding: "",
        existingBusinessName: ""
      }
    }
  },
  businessId: null,  
  owner_data: null,
  active:null,
  loading: false,
  error: null,
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
    resetBusiness(state) {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBusiness.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBusiness.fulfilled, (state, action) => {
        state.loading = false;

        const { payload } = action;

        // Map the API response data into the initialState structure
        state.business = {
          registration: {
            typeOfBusiness: payload.typeOfBusiness || "",
            businessName: payload.businessName || "",
            cinNumber: payload.cinNumber || "",
            roleOfCompany: "",  // Placeholder, update if the API provides it
            yearOfStablish: payload.yearOfStablish || "",
            headQuarterLocation: payload.headQuarterLocation || "",
            industry: payload.industry || "",
            subIndustry: payload.subIndustry || "",
            sizeOfCompany: payload.sizeOfCompany || "",
            funded: payload.funded || ""
          },
          address: {
            
              businessAddressL1: payload.businessAddressL1 || "",
              businessAddressL2: payload.businessAddressL2 || "", // If provided
              businessAddressPin: payload.businessAddressPin || "",
              businessAddressState: payload.businessAddressState || "", // If provided
              businessAddressCity: payload.businessAddressCity || "",
           
            
              communicationAddressL1: payload.communicationAddressL1 || "", // If provided
              communicationAddressL2: payload.communicationAddressL2 || "", // If provided
              communicationAddressPin: payload.communicationAddressPin || "",
              communicationAddressCity: payload.communicationAddressCity || "",
              communicationAddressState: payload.communicationAddressState || "" // If provided
         
          },
          financial: {
              capital: "",  // Placeholder, update if the API provides it
              revenue: "",  // Placeholder, update if the API provides it
              profit: ""    // Placeholder, update if the API provides it
          },
          kyc: {
              kycUser: "",  // Placeholder, update if the API provides it
              id: "",       // Placeholder, update if the API provides it
              addressProof: ""  // Placeholder, update if the API provides it
          },
          funding: {
              lookingForFunding: "",  // Placeholder, update if the API provides it
              existingBusinessName: ""  // Placeholder, update if the API provides it
          }
        };
        state.businessId = payload?._id || "",
        state.owner_data = payload?.owner_data[0] || "",
        state.active = payload?.active || ""
      })
      .addCase(getBusiness.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setBusinessId, createBusiness, resetBusiness } = businessSlice.actions;

export default businessSlice.reducer;
