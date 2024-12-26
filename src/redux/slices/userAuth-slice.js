import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  verifyUser,
  resendOtp,
  resetPassword,
  logOutUser,
  updatePassword,
  thirdPartyLogin
} from "../actions/userAuth-action";
let profile=()=>{
  try {
    let info=JSON.parse(localStorage.getItem("userInfo"));  

    return info
  } catch (error) {
    return null    
  }
}
const initialState = {
  profile: profile() ,//localStorage.getItem("userInfo")!= undefined ? JSON.parse(localStorage.getItem("userInfo")) : null,
  isLoggingIn: false,
  isLoggingOut: false,
  isRegistering: false,
  isRegisterSuccessfull: false,
  registerMessage: "",
  registeringError: false,
  isVerifying: false,
  isVerificationSuccessfull: false,
  verifyingError: null,
  verifyMessage: "",
  error: "",
  loginMessage: "",
  resendOtpSuccessfull: false,
  resendingOtp: false,
  resendingOtpError: "",
  changePasswordSuccessfull: false,
  changingPassword: false,
  changingPasswordError: "",
  changedPasswordMessage: "",
  resetPasswordUrl: null,
  isLogoutSuccess: false,
  isUpdatingPassword: false,
  isUpdatePasswordSuccessfull: false,
  updatePasswordError: "",
  email : ""
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    removeError: (state, action) => {
      state.error = "";
      state.loginMessage = "";
    },
    removeChangingPasswordError: (state, action) => {
      state.changingPasswordError = "";
      state.changePasswordSuccessfull = false;
      state.changedPasswordMessage = "";
    },
    removeRegisterError: (state, action) => {
      state.registeringError = "";
      state.registerMessage = "";
    },
    removeVerifyError: (state, action) => {
      state.verifyingError = "";
      state.isVerificationSuccessfull = false;
      state.verifyMessage = "";
      state.resetPasswordUrl = null;
    },
    removeResendOtpError: (state, action) => {
      state.resendOtpSuccessfull = false;
      state.resendingOtpError = "";
    },
    resetLogoutSuccess: (state, action) => {
      state.isLogoutSuccess = false;
    },
    removeUpdatePasswordError: (state, action) => {
      state.updatePasswordError = "";
    },
    resetIsUpdatePasswordSuccessfull: (state, action) => {
      state.isUpdatePasswordSuccessfull = false;

    },
    updateProfile(state,action){
      state.profile=action.payload
    },
    updateEmail : (state, action)=>{
      state.email = action.payload
    }
    
  },
  extraReducers: (builder) => {
    //login
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoggingIn = true;
      state.error=initialState.error;
      state.loginMessage=initialState.loginMessage;
    }).addCase(loginUser.fulfilled, (state, action) => {
      state.isLoggingIn = false;
      state.profile = action.payload.data;
      console.log(action.payload.data,"DAWQ123");
      state.error = "";
      state.loginMessage = action.payload.message;
      localStorage.setItem("auth", JSON.stringify(action.payload.data));
      state.error=initialState.error;
    }).addCase(loginUser.rejected, (state, action) => {
      state.isLoggingIn = false;
      state.error = action.payload;
    });
    builder.addCase(thirdPartyLogin.pending, (state, action) => {
      state.isLoggingIn = true;
      state.error=initialState.error;
      state.loginMessage=initialState.loginMessage;
    }).addCase(thirdPartyLogin.fulfilled, (state, action) => {
      state.isLoggingIn = false;
      //console.log(action.payload.data,"GOGGLE PAYLOAD");
      state.profile = action.payload.data?.[0];
      state.error = "";
      state.loginMessage = action.payload.message;
      localStorage.setItem("auth", JSON.stringify(action.payload.data));
      localStorage.setItem("userInfo", JSON.stringify(state.profile));
      state.error=initialState.error;
    }).addCase(thirdPartyLogin.rejected, (state, action) => {
      state.isLoggingIn = false;
      state.error = action.payload;
    });

    //logout
    builder.addCase(logOutUser.pending, (state, action) => {
      state.isLoggingOut = true;
      state.isLogoutSuccess = false;
    }).addCase(logOutUser.fulfilled, (state, action) => {
      state.isLoggingOut = false;
      localStorage.removeItem("userInfo");
      state.profile = null;
      state.error = "";
      state.isLogoutSuccess = true;
    }).addCase(logOutUser.rejected, (state, action) => {
      state.isLoggingIn = false;
      state.error = action.payload;
      state.isLogoutSuccess = false;
    });

    //register user
    builder.addCase(registerUser.pending, (state, action) => {
      state.isRegistering = true;
    }).addCase(registerUser.fulfilled, (state, action) => {
      state.isRegistering = false;
      state.profile = action.payload.data;
      state.isRegisterSuccessfull = true;
      state.registerMessage = action.payload.message;
      localStorage.setItem("auth", JSON.stringify(action.payload.data));
      state.registeringError=initialState.registeringError;
      // localStorage.setItem("userInfo", JSON.stringify(action.payload.profile));
    }).addCase(registerUser.rejected, (state, action) => {
      state.isRegistering = false;
      state.registerMessage = initialState.registerMessage;
      state.registeringError = action.payload;
    });

    builder.addCase(verifyUser.pending, (state, action) => {
      state.isVerifying = true;
    }).addCase(verifyUser.fulfilled, (state, action) => {
      state.isVerifying = false;
      state.verifyingError=initialState.verifyingError;
      state.isVerificationSuccessfull = true;
      state.verifyMessage = action.payload.message;
      state.profile={...action.payload?.data?.[0],isVerified:true};
      localStorage.setItem("userInfo", JSON.stringify(state.profile));
    }).addCase(verifyUser.rejected, (state, action) => {
      state.isVerifying = false;
      state.verifyingError = action.payload;
    });

    builder.addCase(resendOtp.pending, (state, action) => {
      state.resendingOtp = true;
    }).addCase(resendOtp.fulfilled, (state, action) => {
      state.resendingOtp = false;
      state.resendOtpSuccessfull = true;
      state.profile=action.payload?.data
    }).addCase(resendOtp.rejected, (state, action) => {
      state.resendingOtp = false;
      state.resendingOtpError = action.payload;
    });

    builder.addCase(resetPassword.pending, (state, action) => {
      state.changingPassword = true;
    }).addCase(resetPassword.fulfilled, (state, action) => {
      state.changingPassword = false;
      state.changePasswordSuccessfull = true;
      state.changedPasswordMessage = action.payload.message;
    }).addCase(resetPassword.rejected, (state, action) => {
      state.changingPassword = false;
      state.changingPasswordError = action.payload;
    });

    //update password

    builder.addCase(updatePassword.pending, (state, action) => {
      state.isUpdatingPassword = true;
    }).addCase(updatePassword.fulfilled, (state, action) => {
      state.isUpdatingPassword = false;
      state.isUpdatePasswordSuccessfull = true;
    }).addCase(updatePassword.rejected, (state, action) => {
      state.isUpdatingPassword = false;
      state.updatePasswordError = action.payload;
    });
  },
});

export const {
  removeError,
  removeRegisterError,
  removeVerifyError,
  removeResendOtpError,
  removeChangingPasswordError,
  resetLogoutSuccess,
  resetIsUpdatePasswordSuccessfull,
  removeUpdatePasswordError,
  updateProfile,
  updateEmail
} = authSlice.actions;
export default authSlice.reducer;
