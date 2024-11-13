import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";

export const getUser = createAsyncThunk("getUser", async (authInfo, { rejectWithValue }) => {
    try {
        const response = await client.get("/user/user-details",{
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
            },
          });
        console.log(response);
        if(response.data?.code==200){
            return response.data?.data?.[0];
        }else{
            return rejectWithValue(response?.data?.message);            
        }
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error?.message);
    }
});