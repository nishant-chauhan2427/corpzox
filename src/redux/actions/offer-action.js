import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";

export const getOffers = createAsyncThunk(
    "offer/getOffers",
    async (_, { rejectWithValue }) => {
        console.log("Action : getOffers");
        
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo?.token;
        console.log(token, "token")
  
        if (!token) {
          return rejectWithValue("No token found");
        }
  
        const response = await client.get("/admin/offer", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log("getOffers",response.data.data);
        return response.data.data;
      } catch (error) {
        console.log(error, "get offer list error");
        return rejectWithValue(error.response?.data || "Something went wrong");
      }
    }
  );


  
export const loadMoreOffers = createAsyncThunk(
    "offer/loadMoreOffers",
    async (page, { rejectWithValue }) => {
        console.log("Action : loadMoreOffers");
        
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo?.token;
        console.log(token, "token")
  
        if (!token) {
          return rejectWithValue("No token found");
        }
  
        const response = await client.get("/admin/offer", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
          params:{page:page}
        });
        console.log("loadMoreOffers",response.data.data);
        return response.data.data;
      } catch (error) {
        console.log(error, "get offer list error");
        return rejectWithValue(error.response?.data || "Something went wrong");
      }
    }
  );