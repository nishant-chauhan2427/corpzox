import { createSlice } from '@reduxjs/toolkit';
import {getUser} from '../actions/dashboard-action';
const initialState = {
    loading:false,
    user: null,
    manager:null,
    error:null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        clearUser(state) {
            state.user = null;
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(getUser.pending, (state, action) => {
            state.loading = true;
          });
          builder.addCase(getUser.fulfilled, (state, action) => {
            state.loading = false;
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
          });
          builder.addCase(getUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
    }
});

// Export actions
export const { setUser, clearUser } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
