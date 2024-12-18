import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";

export const getService = createAsyncThunk(
  "document/getService",
  async (_, { rejectWithValue }) => {
    console.log("local storage",JSON.parse(localStorage.getItem('userInfo'))?.token);
    try {
      const token = JSON.parse(localStorage.getItem('userInfo'))?.token;

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
        const token = JSON.parse(localStorage.getItem('userInfo'))?.token;

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
        console.log(error, "error fething")
        // Return a meaningful error message to the rejected action
        return rejectWithValue(
          error.response?.data?.message || "Failed to fetch services"
        );
      }
    }
  );

//   export const getUserServices = createAsyncThunk("getUserServices", async ({page,sort_by='date_desc',query,categoryId,subCategoryId}, { rejectWithValue }) => {
//     try {
//         let params=new URLSearchParams();
//         if(page) params.append('page',page);
//         if(sort_by) params.append('sort_by',sort_by);
//         if(query) params.append('query',query);
//         if(categoryId) params.append('categoryId',categoryId);
//         if(subCategoryId) params.append('subCategoryId',subCategoryId);
//         const response = await client.get(`/user/service${params&&`?${params}`}`,{
//             headers: {
//               Accept: "application/json",
//               "Content-Type": "application/json",
//               'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
//             },
//           });
//         console.log(response,'services..');
//         if(response?.data?.code==200||response?.data?.code==201){
//             return response.data;
//         }else{
//             return rejectWithValue(response?.data?.message);            
//         }
//     } catch (error) {
//         return rejectWithValue(error?.response?.data?.message || error?.message);
//     }
// });
export const getfolderData = createAsyncThunk(
  "document/getfolderData",
  async ({ id, query }, { rejectWithValue }) => {
    console.log("app id", id);

    try {
      // Prepare the params to be sent
      let params = new URLSearchParams();
      if (query) params.append('query', query);

      // Get the token from localStorage
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const token = userInfo?.token;

      if (!token) {
        return rejectWithValue("Authentication token not found");
      }

      // Make the GET request with the query parameters
      const response = await client.get(`/application/documents?applicationId=${id}&${params.toString()}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Using token directly here
        },
      });

      if (response.status === 200) {
        return response.data.forms; // Return the forms data from the response
      } else {
        return rejectWithValue("Unexpected response structure from server");
      }
    } catch (error) {
      // Check for network or server errors
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch services"
      );
    }
  }
);
