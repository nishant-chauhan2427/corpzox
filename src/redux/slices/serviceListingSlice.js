import { createSlice } from "@reduxjs/toolkit";
import {
  getUserServicesCatagory,
  getUserServicesSubCatagory,
  getUserServices,
  updateServiceWishlist,
  removeServiceWishlist,
  recommendedServiceListing,
  
} from "../actions/servicesListing-action";
import toast from "react-hot-toast";
const initialState = {
  list: [],
  totalPage: 0,
  isAdding: {},
  removeLoading:{},
  addLoading:{},
  isfetching:false,
  page: 1,
  limit: 10,
  loading: false,
  error: null,
  isRecommendedServiceLoading : false, 
  recommendedServiceList : [], 
  category: {
    list: [], 
    total: 0,
    categoryLoading: false,
    categoryError: null,
    selectedCategory: null,
  },
  subCategory: {
    list: [],
    total: 0,
    subCategoryLoading: false,
    subCategoryError: null,
    selectedSubCategory: null,
  },
  wishList: {
    loading: false,
    //isAdding: {},
    error: null,
    list:[],
    listData:[],
  },
};

const serviceListingSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedCategory(state, action) {
      state.category.selectedCategory = action.payload;
    },
    setSelectedSubCategory(state, action) {
      state.subCategory.selectedSubCategory = action.payload;
    },
    resetService(state,action){
      state.list=[]
    },
    setToggleToCheckedWishlist(state,action){
      let data=state.wishList.list.filter((service)=>service._id==action.payload._id);
      if(data?.length!=0){
        state.wishList.list=state.wishList.list.filter((service)=>service._id!=action.payload._id)
      }else{
        state.wishList.list=[...state.wishList.list,action.payload]
      }
    },
    onChangeSelectAll(state,action){
      if(state.list.length==state.wishList.list.length){
        state.wishList.list=[]
      }else{
        state.wishList.list=state.list
      }
    },
    // clearUser(state) {
    //     state.user = null;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserServicesCatagory.pending, (state, action) => {
        state.category.categoryLoading = true;
        state.list =[]
      })
      .addCase(getUserServicesCatagory.fulfilled, (state, action) => {
        state.category.categoryLoading = false;
        state.category.categoryError = action.payload.message;
        state.category.total = action.payload.totalPage;
        state.category.list = action.payload?.data;
        state.category.selectedCategory = action.payload?.data?.[0];
      })
      .addCase(getUserServicesCatagory.rejected, (state, action) => {
        state.category.categoryLoading = false;
        state.category.categoryError = action.payload;
      });
    builder
      .addCase(getUserServicesSubCatagory.pending, (state, action) => {
        state.subCategory.subCategoryLoading = true;
        state.list =[]
      })
      .addCase(getUserServicesSubCatagory.fulfilled, (state, action) => {
        state.subCategory.subCategoryLoading = false;
        state.subCategory.subCategoryError = action.payload.message;
        state.subCategory.total = action.payload.totalPage;
        state.subCategory.list = action.payload?.data;
        state.subCategory.selectedSubCategory = action.payload?.data?.[0];
      })
      .addCase(getUserServicesSubCatagory.rejected, (state, action) => {
        state.subCategory.subCategoryLoading = false;
        state.subCategory.subCategoryError = action.payload;
      });
    builder
      .addCase(getUserServices.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUserServices.fulfilled, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.totalPage = action.payload.total;
        state.list = action.payload?.data;
      })
      .addCase(getUserServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      // .addCase(removeServiceWishlistData1.pending, (state, action) => {
      //   state.heartloading = true;
      //  state.childLoading[action.meta.arg.serviceId] = true
      //  console.log(action.meta.arg.serviceId, "SERVICE DATA");
      // })
      // .addCase(removeServiceWishlistData1.fulfilled, (state, action) => {
      //   state.heartloading = false;
      //   //console.log(action.payload.serviceId, "SERVICE DATA");
      //  // console.log(state.childLoading[action.payload.serviceId] , 'chiloaing')
      //   state.childLoading[action.payload.serviceId]=false;
      //   let newList = state.wishList.filter((service) => {
      //     if (service?.serviceId != action.payload?.serviceId)
      //       return service
      //   });
      //   state.wishList = newList
      //   state.error = action.payload?.message;
      // })
      // .addCase(removeServiceWishlistData1.rejected, (state, action) => {
      //   state.heartloading = false;
      //   state.childLoading[action.meta.arg.serviceId] = false
      //   state.error = action.payload;
      // })
    builder
      .addCase(updateServiceWishlist.pending, (state, action) => {
        state.wishList.loading = true;
        state.addLoading[action.meta.arg.serviceId] = true;
        console.log(action.payload," WERERE PENDING");
        state.isfetching=true;
        // console.log(action.meta.arg.serviceId,'updateservicewishlist');
        
        state.isAdding[action.meta.arg.serviceId] = true;
      })
      .addCase(updateServiceWishlist.fulfilled, (state, action) => {
        console.log(action.payload," WERERE UPDATE");
        state.wishList.loading = false;
        state.isfetching=false;
        state.addLoading[action.payload.data.serviceId]=false;
      state.isAdding[action.payload?.data.data?.serviceId]=false;
    //    state.list = state.list.map((service) =>
    //    service?._id === action.payload?.data?.serviceId
    //      ? { ...service, ...action.payload }
    //      :service
    //  );
// console.log(action.payload," WERERE UPDATE");

     state.list=state.list.map((service)=>{
      if(service?._id==action.payload?.data?.serviceId){
        service.wishlistCount=1;
      }
      return service
   });
        // state.list=state.list.map((service)=>{
        //    if(service?._id!=action.payload?.data?.serviceId){
        //     return service
        //    }
          
        // })
        state.wishList.error=action.payload?.message;
      })
      .addCase(updateServiceWishlist.rejected, (state, action) => {
        state.wishList.loading = false;
        // console.log(action.payload," WERERE REHECTED ");
        state.isfetching=false;
        // console.log("erorrr rejcttt")
        // console.log("action.meta.arg.serviceId",action.meta.arg.serviceId);
        state.isAdding = false
        state.addLoading[action.meta.arg.serviceId] = false
        state.wishList.error=action.payload;
      });


    builder
      .addCase(removeServiceWishlist.pending, (state, action) => {
        state.wishList.loading = true;
        state.removeLoading[action.meta.arg.serviceId] = true;
      })
      .addCase(removeServiceWishlist.fulfilled, (state, action) => {
        state.wishList.loading = false;
        state.removeLoading[action.payload.serviceId]=false;
        state.list=state.list.map((service)=>{
            if(service?._id==action.payload?.serviceId){
              service.wishlistCount=0;
            }
            return service
         });
       //console.log(state.list)
        state.wishList.error=action.payload?.message;
      })
      .addCase(removeServiceWishlist.rejected, (state, action) => {
        state.wishList.loading = false;
        state.removeLoading[action.meta.arg.serviceId] = false;
        state.wishList.error=action.payload;
      })
      .addCase(recommendedServiceListing.pending, (state) => {
        state.isRecommendedServiceLoading = true
       
      })
      .addCase(recommendedServiceListing.fulfilled, (state, action) => {
        state.isRecommendedServiceLoading = false 
        state.recommendedServiceList = action.payload;
      })
      .addCase(recommendedServiceListing.rejected, (state, action) => {
        state.isRecommendedServiceLoading = false 
        const errorMessage = action.payload?.message || "Something went wrong";
        toast.error(errorMessage);
      })


      // Slice for Wishlist Remove Data
      // .addCase(removeServiceWishlistData.pending, (state, action) => {
      //   state.wishList.loading = true;
      // })
      // .addCase(removeServiceWishlistData.fulfilled, (state, action) => {
      //   state.wishList.loading = false;
      // //  console.log(action.payload,state.listData,"listData12");
        
      //   state.wishList=state.wishList.filter((service)=>{
      //    // {console.log(service,"listData12");}
      //       if(service?._id!=action.payload?.serviceId)
      //       console.log(service._id,"Service1234");
      //         return service
      //    });
      //  // console.log(state.list)
      //   state.wishList.error=action.payload?.message;
      // })
      // .addCase(removeServiceWishlistData.rejected, (state, action) => {
      //   state.wishList.loading = false;
      //   state.wishList.error=action.payload;
      // });
  },
});

// Export actions
export const { setSelectedCategory, setSelectedSubCategory,setToggleToCheckedWishlist,onChangeSelectAll,resetService } =
  serviceListingSlice.actions;

// Export the reducer
export default serviceListingSlice.reducer;
