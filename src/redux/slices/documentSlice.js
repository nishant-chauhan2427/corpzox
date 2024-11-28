import { createSlice } from "@reduxjs/toolkit";
import { getService, getServiceData, getfolderData } from "../actions/document-action";

// Initial State
const initialState = {
  documentList: [], // Stores the fetched documents/services
  fetchingDocumentError: "", // Stores errors during fetching
  isLoading: false, // Indicates loading state
  dataList :[],
  listData:[],
  isdataLoading: false,
  isdocumentLoading:false,
};

// Document Slice
const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    // Action to clear error messages
    removeDocumentListError: (state) => {
      state.fetchingDocumentError = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle pending state
      .addCase(getService.pending, (state) => {
        state.isLoading = true;
        state.fetchingDocumentError = ""; // Reset error when loading starts
      })

      // Handle fulfilled state
      .addCase(getService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.documentList = action.payload || []; // Update document list
      })

      // Handle rejected state
      .addCase(getService.rejected, (state, action) => {
        state.isLoading = false;
        state.fetchingDocumentError =
          action.payload || "An error occurred while fetching services.";
      })
      .addCase(getServiceData .pending, (state) => {
        state.isdataLoading= true;
        state.fetchingDocumentError = ""; // Reset error when loading starts
      })

      // Handle fulfilled state
      .addCase(getServiceData .fulfilled, (state, action) => {
        state.isdataLoading= false;
        state.dataList = action.payload || []; // Update document list
      })

      // Handle rejected state
      .addCase(getServiceData .rejected, (state, action) => {
        state.isdataLoading= false;
        state.fetchingDocumentError =
          action.payload || "An error occurred while fetching services.";



      }).addCase(getfolderData .pending, (state) => {
        state.isdocumentLoading= true;
        state.fetchingDocumentError = ""; // Reset error when loading starts
      })

      // Handle fulfilled state
      .addCase(getfolderData .fulfilled, (state, action) => {
        state.isdocumentLoading = false;
        state.listData = action.payload || []; // Update document list
      })

      // Handle rejected state
      .addCase(getfolderData .rejected, (state, action) => {
        state.isdocumentLoading = false;
        state.fetchingDocumentError =
          action.payload || "An error occurred while fetching services.";
      });
  },
});

// Export actions and reducer
export const { removeDocumentListError } = documentSlice.actions;
export default documentSlice.reducer;
