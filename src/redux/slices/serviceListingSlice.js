import { createSlice } from '@reduxjs/toolkit';
import {getUserServicesCatagory,getUserServices} from '../actions/servicesListing-action';
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
        setUser(state, action) {
            state.user = action.payload;
        },
        clearUser(state) {
            state.user = null;
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(getUserServicesCatagory.pending, (state, action) => {
            state.category.categoryLoading = true;
          }).addCase(getUserServicesCatagory.fulfilled, (state, action) => {
            state.category.categoryLoading = false;
            state.category.categoryError = action.payload.message;
            state.category.total=action.payload.totalPage;
            state.category.list=action.payload?.data;
          }).addCase(getUserServicesCatagory.rejected, (state, action) => {
            state.category.categoryLoading = false;
            state.category.categoryError = action.payload;
          });
    }
});

// Export actions
export const { setUser, clearUser } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
