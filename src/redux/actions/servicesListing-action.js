import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";

export const getUserServicesCatagory = createAsyncThunk("getUserServicesCatagory", async ({page,sort_by,query,categoryId,subCategoryId}, { rejectWithValue }) => {
    try {
        const response = await client.get(`/user/service-category`,{
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
            },
          });
        console.log(response,'service-category..');
        if(response?.data?.code==200||response?.data?.code==201){
            return response.data;
        }else{
            return rejectWithValue(response?.data?.message);            
        }
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error?.message);
    }
});
export const getUserServicesSubCatagory = createAsyncThunk("getUserSubServicesCatagory", async ({categoryId}, { rejectWithValue }) => {
    try {
        const response = await client.get(`/user/service-sub-category?sectionId=${categoryId}`,{
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
            },
          });
        console.log(response,'service-subcategory..');
        if(response?.data?.code==200||response?.data?.code==201){
            return response.data;
        }else{
            return rejectWithValue(response?.data?.message);            
        }
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || error?.message);
    }
});
export const getUserServices = createAsyncThunk("getUserServices", async ({page,sort_by='date_desc',query,categoryId,subCategoryId}, { rejectWithValue }) => {
    try {
        let params=new URLSearchParams();
        if(page) params.append('page',page);
        if(sort_by) params.append('sort_by',sort_by);
        if(query) params.append('query',query);
        if(categoryId) params.append('categoryId',categoryId);
        if(subCategoryId) params.append('subCategoryId',subCategoryId);
        const response = await client.get(`/user/service${params&&`?${params}`}`,{
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