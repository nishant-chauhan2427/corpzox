import { createSlice } from '@reduxjs/toolkit';
import {getUserServicesCatagory,getUserServicesSubCatagory,getUserServices} from '../actions/servicesListing-action';
const initialState = {
        list:[],
        totalPage:0,
        page:1,
        limit:10,
        loading:false,
        error:null,
        category:{
            list:[],
            total:0,
            categoryLoading:false,
            categoryError:null,
            selectedCategory:null,
        },
        subCategory:{
            list:[],
            total:0,
            subCategoryLoading:false,
            subCategoryError:null,
            selectedSubCategory:null,
        }
};

const serviceListingSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setSelectedCategory(state, action) {
            state.category.selectedCategory = action.payload;
        },
        setSelectedSubCategory(state, action) {
            state.subCategory.selectedSubCategory = action.payload;
        },
        // clearUser(state) {
        //     state.user = null;
        // },
    },
    extraReducers:(builder)=>{
        builder.addCase(getUserServicesCatagory.pending, (state, action) => {
            state.category.categoryLoading = true;
          }).addCase(getUserServicesCatagory.fulfilled, (state, action) => {
            state.category.categoryLoading = false;
            state.category.categoryError = action.payload.message;
            state.category.total=action.payload.totalPage;
            state.category.list=action.payload?.data;
            state.category.selectedCategory=action.payload?.data?.[0];
          }).addCase(getUserServicesCatagory.rejected, (state, action) => {
            state.category.categoryLoading = false;
            state.category.categoryError = action.payload;
          });
        builder.addCase(getUserServicesSubCatagory.pending, (state, action) => {
        state.subCategory.subCategoryLoading = true;
        }).addCase(getUserServicesSubCatagory.fulfilled, (state, action) => {
        state.subCategory.subCategoryLoading = false;
        state.subCategory.subCategoryError = action.payload.message;
        state.subCategory.total=action.payload.totalPage;
        state.subCategory.list=action.payload?.data;
        state.subCategory.selectedSubCategory=action.payload?.data?.[0];
        }).addCase(getUserServicesSubCatagory.rejected, (state, action) => {
        state.subCategory.subCategoryLoading = false;
        state.subCategory.subCategoryError = action.payload;
        });
        builder.addCase(getUserServices.pending, (state, action) => {
            state.loading = true;
            }).addCase(getUserServices.fulfilled, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
            state.totalPage=action.payload.totalPage;
            state.list=action.payload?.data;
            }).addCase(getUserServices.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            });
    }
});

// Export actions
export const { setSelectedCategory, setSelectedSubCategory } = serviceListingSlice.actions;

// Export the reducer
export default serviceListingSlice.reducer;
