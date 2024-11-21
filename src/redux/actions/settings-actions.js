import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";

export const changePassword = createAsyncThunk(
    "settings/changePassword",
    async (formData, { rejectWithValue }) => {
        console.log(formData, "formdata fropmm actions")
        try {
            const response = await client.put("/user/change-password", formData, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
                },
            });
            console.log(response, "change password response")
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);
export const deactivateAccount = createAsyncThunk(
    "settings/deactivateAccount",
    async (formData, { rejectWithValue }) => {
        console.log(formData, "formdata fropmm actions")
        try {
            const response = await client.put("/user/deactivate-account", formData, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
                },
            });
            console.log(response, "change password response")
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);