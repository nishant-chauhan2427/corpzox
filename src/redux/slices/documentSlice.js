import { createSlice } from "@reduxjs/toolkit";
import { getService, getServiceData, getFolderData } from "../actions/document-action";

// Initial State
const initialState = {
  documentList: [], 
  fetchingDocumentError: "", 
  serviceDocumentError: "", 
  folderDocumentError: "", 
  isLoading: false, 
  dataList: [],
  listData: [],
  isDataLoading: false,
  isDocumentLoading: false,
};

const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    removeDocumentListError: (state) => {
      state.fetchingDocumentError = "";
      state.serviceDocumentError = "";
      state.folderDocumentError = "";
    },
    clearDocumentList: (state) => {
      state.documentList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getService.pending, (state) => {
        state.isLoading = true;
        state.fetchingDocumentError = "";
      })
      .addCase(getService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.documentList = action.payload || [];
      })
      .addCase(getService.rejected, (state, action) => {
        state.isLoading = false;
        state.fetchingDocumentError =
          action.payload || "An error occurred while fetching services.";
      })
      .addCase(getServiceData.pending, (state) => {
        state.isDataLoading = true;
        state.serviceDocumentError = ""; 
      })
      .addCase(getServiceData.fulfilled, (state, action) => {
        state.isDataLoading = false;
        state.dataList = action.payload || [];
      })
      .addCase(getServiceData.rejected, (state, action) => {
        state.isDataLoading = false;
        state.serviceDocumentError =
          action.payload || "An error occurred while fetching service data.";
        state.dataList = [];
      })
      .addCase(getFolderData.pending, (state) => {
        state.isDocumentLoading = true;
        state.folderDocumentError = ""; 
      })
      .addCase(getFolderData.fulfilled, (state, action) => {
        state.isDocumentLoading = false;
        state.listData = action.payload || [];
      })
      .addCase(getFolderData.rejected, (state, action) => {
        state.isDocumentLoading = false;
        state.folderDocumentError =
          action.payload || "An error occurred while fetching documents.";
      });
  },
});

export const { removeDocumentListError, clearDocumentList } = documentSlice.actions;
export default documentSlice.reducer;
