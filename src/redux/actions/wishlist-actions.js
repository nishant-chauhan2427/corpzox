import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";

export const getWishList = createAsyncThunk(
    "wishlist/getWishList",
    async (_, { rejectWithValue }) => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo?.token;
        console.log(token, "token")
  
        if (!token) {
          return rejectWithValue("No token found");
        }
  
        const response = await client.get("/user/service-wishlist", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
        });
        //console.log(response.data.data[0]?.service, "wishlist response");
        return response.data.data;
      } catch (error) {
        console.log(error, "wishlist error");
        return rejectWithValue(error.response?.data || "Something went wrong");
      }
    }
  );