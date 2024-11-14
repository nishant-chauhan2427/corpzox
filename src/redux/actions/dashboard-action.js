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
        if(response?.data?.code==200||response?.data?.code==201){
            return response.data?.data?.[0];
        }else{
            return rejectWithValue(response?.data?.message);            
        }
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error?.message);
    }
});
export const getUserBusiness = createAsyncThunk("getUserBusiness", async ({page,sort_by,query}, { rejectWithValue }) => {
    try {
        let params=new URLSearchParams();
        if(page) params.append('page',page);
        if(sort_by) params.append('sort_by',sort_by);
        if(query) params.append('query',query);
        const response = await client.get(`/business/user-business-card${(params)&&`?${params}`}`,{
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
            },
          });
        console.log(response);
        if(response?.data?.code==200||response?.data?.code==201){
            return response.data;
        }else{
            return rejectWithValue(response?.data?.message);            
        }
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error?.message);
    }
});
export const getUserServices = createAsyncThunk("getUserServices", async ({page,sort_by,query,categoryId,subCategoryId}, { rejectWithValue }) => {
    try {
        let params=new URLSearchParams();
        if(page) params.append('page',page);
        if(sort_by) params.append('sort_by',sort_by);
        if(query) params.append('query',query);
        if(categoryId) params.append('categoryId',categoryId);
        if(subCategoryId) params.append('subCategoryId',subCategoryId);
        const response = await client.get(`/user/service${(params)&&`?${params}`}`,{
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
            },
          });
        console.log(response,'services..');
        if(response?.data?.code==200||response?.data?.code==201){
            return response.data;
        }else{
            return rejectWithValue(response?.data?.message);            
        }
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error?.message);
    }
});