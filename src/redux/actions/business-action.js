import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";

export const getBusiness = createAsyncThunk("getBusiness", async ({businessId}, { rejectWithValue }) => {
    try {
        const response = await client.get(`/user/user-details?businessId=${businessId}`,{
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
            },
          });
        console.log(response);
        if(response?.data?.code==200||response?.data?.code==201){
            return response.data?.data?.[0];
        }else{
            return rejectWithValue(response?.data?.message);            
        }
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error?.message);
    }
});