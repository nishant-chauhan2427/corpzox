import { createSlice } from '@reduxjs/toolkit';
import {getUser,getUserBusiness,getUserServices, updateServiveProgress} from '../actions/dashboard-action';
const initialState = {
    loading:false,
    user: null,
    dataUpdate:null,
    manager:null,
    business:{
        list:[],
        totalPage:0,
        page:1,
        
        limit:10,
    },
    businessLoading:false,
    businessError:null,
    service:{
        list:[],
        totalPage:0,
        totalCount:0,
        page:1,
        limit:10,
    },
    serviceLoading:false,
    servicesError:null,
    error:null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
           // localStorage.setItem("userInfo",action.payload);

        },
        clearUser(state) {
            state.user = null;
            localStorage.removeItem("userInfo")
            
        },
        setBusinessPage(state,action){
          state.business.page=action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getUser.pending, (state, action) => {
            state.loading = true;
          }).addCase(getUser.fulfilled, (state, action) => {
            state.loading = false;
            console.log(action.payload?.agent_data?.[0]?.manager_data?.[0].
              name
              ,"action.payload23");
            // state.isVerificationSuccessfull = true;
            
            state.error = action.payload.message;
            state.user=action.payload;
            
            state.manager=action.payload?.agent_data?.[0]?.manager_data?.[0];
            // state.profile={...action.payload?.data?.[0],isVerified:true};
            // localStorage.setItem("userInfo", JSON.stringify(state.profile));
            // if (action.payload?.isVerification) {
            //   state.profile = { ...state.profile, isVerified: true };
            //   localStorage.setItem("userInfo", JSON.stringify(state.profile));
            // } else {
            //   state.resetPasswordUrl = action.payload?.url;
            // }
          }).addCase(getUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
        builder.addCase(getUserBusiness.pending, (state, action) => {
          state.businessLoading = true;
        }).addCase(getUserBusiness.fulfilled, (state, action) => {
          state.businessLoading = false;
          state.businessError = action.payload.message;
          // console.log('6',state.business.list,action.payload);
          // if(state.business.list.length>0){
          //   state.business.list=[...state.business.list,...action.payload.data];
          // }else{
            state.business.list=action.payload.data;
          // }
          state.business.totalPage=action.payload?.total;
        }).addCase(getUserBusiness.rejected, (state, action) => {
          state.businessLoading = false;
          state.businessError = action.payload;
        });
        builder.addCase(getUserServices.pending, (state, action) => {
          state.serviceLoading = true;
        }).addCase(getUserServices.fulfilled, (state, action) => {
          console.log(action.payload.total,"action.payload13");
          state.serviceLoading = false;
          state.servicesError = action.payload.message;
          state.service.list=action.payload.data;
          state.service.totalPage=action.payload?.total;
          state.service.totalCount=action.payload?.total;
          console.log(state.service.totalCount,"1234");
        }).addCase(getUserServices.rejected, (state, action) => {
          state.serviceLoading = false;
          state.servicesError = action.payload;
        })

        .addCase(updateServiveProgress.pending, (state, action) => {
          state.fetching = true;
        })
      
        .addCase(updateServiveProgress.fulfilled, (state, action) => {
          state.fetching = false;
          state.error = action.payload.message;
         // console.log(action.payload,"action.payload22");
          state.dataUpdate=action.payload;
          //state.manager=action.payload?.agent_data?.[0]?.manager_data?.[0];
          
        }).addCase(updateServiveProgress.rejected, (state, action) => {
          state.fetching = false;
          state.error = action.payload;
        });;
    }
});

// Export actions
export const { setUser, clearUser,setBusinessPage } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
