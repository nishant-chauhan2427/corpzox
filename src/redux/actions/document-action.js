import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";

export const getService = createAsyncThunk(
  "document/getService",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        return rejectWithValue("Authentication token not found");
      }

      const response = await client.get("/application/services", {
       
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
            },
        
      });

      if (response.status === 200 && response.data.services) {
        return response.data.services; // Return the services array
      } else {
        return rejectWithValue("Unexpected response structure from server");
      }
    } catch (error) {
      // Return a meaningful error message to the rejected action
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch services"
      );
    }
  }
);


export const getServiceData = createAsyncThunk(
    "document/getServiceData",
    async ({formId,serviceId}, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("authToken");
  
        if (!token) {
          return rejectWithValue("Authentication token not found");
        }
  
        const response = await client.post("/application/caseId",{formId,serviceId}, {
         
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
              },
          
        });
  
        if (response.status === 200 ) {
          return response.data.caseIds; // Return the services array
        } else {
          return rejectWithValue("Unexpected response structure from server");
        }
      } catch (error) {
        // Return a meaningful error message to the rejected action
        return rejectWithValue(
          error.response?.data?.message || "Failed to fetch services"
        );
      }
    }
  );




export const getfolderData = createAsyncThunk(
  "document/getfolderData",
  async (id, { rejectWithValue }) => {
   console.log("app id",id);
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        return rejectWithValue("Authentication token not found");
      }

      const response = await client.get(`/application/documents?applicationId=${id}`, {
       
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
            },
        
      });

      if (response.status === 200 ) {
        return response.data.forms; // Return the services array
      } else {
        return rejectWithValue("Unexpected response structure from server");
      }
    } catch (error) {
      
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch services"
      );
    }
  }
);