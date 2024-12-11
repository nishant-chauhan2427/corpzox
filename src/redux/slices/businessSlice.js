import { createSlice } from "@reduxjs/toolkit";
import { updateKYCDetails, updateFundingDetails, fetchUserBusinessCard, getBusiness, registrationDetails, updateRegistrationDetails, updateAddressDetails, updateFinancialDetails } from "../actions/business-action";
import toast from "react-hot-toast";

// Define initial state with a structure similar to the API data you want
const initialState = {
  business: {
    registration: {
      typeOfBusiness: "",
      businessName: "",
      businessNumber:"",
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
            businessNumber: payload.businessNumber||"",
            active :payload.active||"",
            cinNumber: payload.cinNumber || "",
            roleOfCompany: payload.roleOfCompany||"",  
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
              capital: payload.capital || "",  
              revenue: payload.revenue || "", 
              profit: payload.profit || ""    
          },
          kyc: {
              kycUser: payload.kycUser || "", 
              id: payload.id || "",  
              addressProof: payload.addressProof || ""
          },
          funding: {
              lookingForFunding: payload.lookingForFunding || "", 
              existingBusinessName: payload.existingBusinessName || "" 
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


      builder.addCase(registrationDetails.pending, (state,action)=>{
          // console.log("registrationDetails.pending",action.payload);
          
      }).addCase( registrationDetails.rejected, (state,action)=>{
        // console.log("registrationDetails.rejected",action.payload);
        

      }).addCase( registrationDetails.fulfilled, (state,action)=>{
        // console.log("registrationDetails.fulfilled",action.payload);
        state.businessId = action.payload?.businessId;
        state.business.registration = action.payload?.data;
        toast.success("Registration details saved")
      })



      builder.addCase(updateRegistrationDetails.pending, (state,action)=>{
          // console.log("updateRegistrationDetails.pending",action.payload);
          
      }).addCase( updateRegistrationDetails.rejected, (state,action)=>{
        // console.log("updateRegistrationDetails.rejected",action.payload);
        

      }).addCase( updateRegistrationDetails.fulfilled, (state,action)=>{
        // console.log("updateRegistrationDetails.fulfilled",action.payload?.data);
        state.business.registration = action.payload?.data;
        toast.success("Registration details saved")
      })


      builder.addCase(updateAddressDetails.pending, (state,action)=>{
          // console.log("updateAddressDetails.pending",action.payload);
          
      }).addCase( updateAddressDetails.rejected, (state,action)=>{
        // console.log("updateAddressDetails.rejected",action.payload);
        

      }).addCase( updateAddressDetails.fulfilled, (state,action)=>{
        // console.log("updateAddressDetails.fulfilled",action.payload?.data);
        state.business.address = action.payload?.data;
        toast.success("Address details saved")
      })


      builder.addCase(updateFinancialDetails.pending, (state,action)=>{
          // console.log("updateFinancialDetails.pending",action.payload);
          
      }).addCase( updateFinancialDetails.rejected, (state,action)=>{
        // console.log("updateFinancialDetails.rejected",action.payload);
        

      }).addCase( updateFinancialDetails.fulfilled, (state,action)=>{
        // console.log("updateFinancialDetails.fulfilled",action.payload?.data);
        state.business.financial = action.payload?.data;
        toast.success("Financial details saved")
      })


      builder.addCase(updateKYCDetails.pending, (state,action)=>{
          // console.log("updateKYCDetails.pending",action.payload);
          
      }).addCase( updateKYCDetails.rejected, (state,action)=>{
        // console.log("updateKYCDetails.rejected",action.payload);
        

      }).addCase( updateKYCDetails.fulfilled, (state,action)=>{
        // console.log("updateKYCDetails.fulfilled",action.payload?.data);
        state.business.kyc = action.payload?.data;
        toast.success("KYC details saved")
      })


      builder.addCase(updateFundingDetails.pending, (state,action)=>{
          // console.log("updateKupdateFundingDetailsYCDetails.pending",action.payload);
          
      }).addCase( updateFundingDetails.rejected, (state,action)=>{
        // console.log("updateFundingDetails.rejected",action.payload);
        

      }).addCase( updateFundingDetails.fulfilled, (state,action)=>{
        // console.log("updateFundingDetails.fulfilled",action.payload?.data);

        state.business.funding = action.payload?.data;
        toast.success("Funding details saved")
      })
  }
});

export const { setBusinessId, createBusiness, resetBusiness } = businessSlice.actions;

export default businessSlice.reducer;
