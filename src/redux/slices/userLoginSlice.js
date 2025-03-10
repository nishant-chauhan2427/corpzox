import { createSlice } from "@reduxjs/toolkit";
import {
  getMoreService,
  getMoreServiceUpdate,
  getUser,
  getUserBusiness,
  getUserServices,
  updateServiveProgress,
} from "../actions/dashboard-action";

const initialState = {
  loading: false,
  userLoading: false,
  user: null,
  dataUpdate: [],
  manager: null,
  totalCount: 0,
  morePage: 1,
  error: null,
  loadingMore: false,

  business: {
    list: [],
    totalPage: 0,
    page: 1,

    limit: 10,
  },
  businessLoading: false,
  businessError: null,
  service: {
    list: [],
    totalPage: 0,
    totalCount: 0,
    page: 1,
    limit: 10,
  },
  serviceLoading: false,
  servicesError: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      // localStorage.setItem("userInfo",action.payload);
    },
    clearUser(state) {
      state.user = null;
      state.morePage = 0;
      localStorage.removeItem("userInfo");
    },
    setBusinessPage(state, action) {
      state.business.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state, action) => {
        state.loading = true;
        state.userLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userLoading = false;

        // state.isVerificationSuccessfull = true;

        state.error = action.payload?.message;
        state.user = action.payload;

        state.manager = action.payload?.agent_data?.[0]?.manager_data?.[0];
        // state.profile={...action.payload?.data?.[0],isVerified:true};
        // localStorage.setItem("userInfo", JSON.stringify(state.profile));
        // if (action.payload?.isVerification) {
        //   state.profile = { ...state.profile, isVerified: true };
        //   localStorage.setItem("userInfo", JSON.stringify(state.profile));
        // } else {
        //   state.resetPasswordUrl = action.payload?.url;
        // }
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.userLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getUserBusiness.pending, (state, action) => {
        state.businessLoading = true;
      })
      .addCase(getUserBusiness.fulfilled, (state, action) => {
        state.businessLoading = false;
        state.businessError = action.payload.message;
        // console.log('6',state.business.list,action.payload);
        // if(state.business.list.length>0){
        //   state.business.list=[...state.business.list,...action.payload.data];
        // }else{
        state.business.list = action.payload.data;
        // }
        state.business.totalPage = action.payload?.total;
      })
      .addCase(getUserBusiness.rejected, (state, action) => {
        state.businessLoading = false;
        state.businessError = action.payload;
      });
    builder
      .addCase(getUserServices.pending, (state, action) => {
        state.serviceLoading = true;
      })
      .addCase(getUserServices.fulfilled, (state, action) => {
        state.serviceLoading = false;
        state.servicesError = action.payload.message;
        state.service.list = action.payload.data;
        state.service.totalPage = action.payload?.total;
        state.service.totalCount = action.payload?.total;
      })
      .addCase(getUserServices.rejected, (state, action) => {
        state.serviceLoading = false;
        state.servicesError = action.payload;
      })

      .addCase(updateServiveProgress.pending, (state, action) => {
        state.fetching = true;
      })

      .addCase(updateServiveProgress.fulfilled, (state, action) => {
        state.fetching = false;
        state.totalCount = action.payload?.total;
        state.error = action.payload.message;
        // console.log(action.payload,"action.payload22");
        // console.log(action.payload);
        state.dataUpdate = action.payload;
        state.serviceProgressDataUpdate = action.payload?.data;
        state.morePage = 1
        //state.manager=action.payload?.agent_data?.[0]?.manager_data?.[0];
      })
      .addCase(updateServiveProgress.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload;
      })

      // .addCase(ratingReview.fulfilled, (state, action) => {
      //   state.fetching = false;
      //   const applicationId = action.payload.responseData?.data?.applicationId; 

      //   state.dataUpdate = state.dataUpdate.map((item )=>{

      //   })
      //   console.log(action.payload, "payload data");

      // })

      .addCase(getMoreServiceUpdate.pending, (state) => {
        state.loadingMore = true;
        console.log("businessPageSlice : getAllService.pending");
      })

      .addCase(getMoreServiceUpdate.fulfilled, (state, action) => {

        state.totalCount = action.payload?.total;
        state.loadingMore = false;
        // state.totalCount = action.payload?.total;
        console.log(state.totalCount, "totalCount12345");
        if (state.dataUpdate) {
          //console.log("state", JSON.stringify(state.dataUpdate.data));
          //console.log("data", action.payload?.data);
          state.dataUpdate.data = [...state.dataUpdate.data, ...action.payload?.data];
          if (action.payload?.data?.length > 0) {
            state.morePage = state.morePage + 1;
          }
        }

        console.log(state.morePage, "getMoreServices5");
        state.error = null;
      })
      .addCase(getMoreServiceUpdate.rejected, (state, action) => {
        //console.log("businessPageSlice :getMoreService.rejected");
        state.loadingMore = false;
        // state.error = action.payload;
      });
  },
});

export const { setUser, clearUser, setBusinessPage } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
