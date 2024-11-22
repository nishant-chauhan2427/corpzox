import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";

export const loginUser = createAsyncThunk("loginUser", async (authInfo, { rejectWithValue }) => {
    try {
        console.log('authInfo......',authInfo);
        const response = await client.post("/user/auth/login", authInfo, {
            withCredentials: true
        });
        if(response?.data?.code==200||response?.data?.code==201){
            return response.data;
        }else{
            return rejectWithValue(response?.data?.message);            
        }
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error?.message);
    }
});
export const thirdPartyLogin = createAsyncThunk("thirdPartyLogin", async (authInfo, { rejectWithValue }) => {
    try {
        const response = await client.post("/user/auth/third-party-login", authInfo, {
            withCredentials: true
        });
        if(response?.data?.code==200||response?.data?.code==201){
            return response.data;
        }else{
            return rejectWithValue(response?.data?.message);            
        }
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error?.message);
    }
});

export const registerUser = createAsyncThunk("registerUser", async (authInfo, { rejectWithValue }) => {
    try {
        const response = await client.post("/user/auth/signUp", authInfo, {
            withCredentials: true
        });
        console.log('user',response?.data)
        if(response?.data?.code==200||response?.data?.code==201){
            return response.data;
        }else{
            return rejectWithValue(response?.data?.message );    
        }
        
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error?.message);
    }
});

export const verifyUser = createAsyncThunk("verifyUser", async (info, { rejectWithValue }) => {
    try {
        const response = await client.post("/user/auth/verify-otp", info, {
            withCredentials: true
        });
        console.log(response,'verifyUser..',response?.data?.code==200||response?.data?.code==201)
        if(response?.data?.code==200||response?.data?.code==201){
            return response.data;
        }else{
            return rejectWithValue(response?.data?.message);
        }
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error?.message);
    }
});

export const resendOtp = createAsyncThunk("resendOtp", async (data, { rejectWithValue }) => {
    try {
        const response = await client.post("/user/auth/resend-otp", data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error?.message);
    }
});

export const resetPassword = createAsyncThunk("resetPassword", async (payload, { rejectWithValue }) => {
    try {
        const response = await client.put(`/user/auth/new-password`, payload, {
            withCredentials: true
        });
        if(response?.data?.code==200||response?.data?.code==201){
            return response.data;
        }else{
            return rejectWithValue(response?.data?.message);            
        }
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error?.message);
    }
});

export const logOutUser = createAsyncThunk("logOutUser", async ( { rejectWithValue }) => {
    try {
        const response = await client("/admin/user/logout", {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error?.message);
    }
});


export const updatePassword = createAsyncThunk("updatePassword", async (info, { rejectWithValue }) => {
    try {
        const response = await client.patch("/user/update-password", info, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error?.message);
    }
});