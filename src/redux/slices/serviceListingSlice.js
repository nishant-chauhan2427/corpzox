import { createSlice } from "@reduxjs/toolkit";
import {
  getUserServicesCatagory,
  getUserServicesSubCatagory,
  getUserServices,
  updateServiceWishlist,
  removeServiceWishlist,
  recommendedServiceListing,
  getMoreUserServices,
  removeRecommendServiceWishlist,
  updateRecommendServiceWishlist,
  
} from "../actions/servicesListing-action";
import toast from "react-hot-toast";
const initialState = {
  list: [],
  totalCount: 0,
  isAdding: {},
  removeLoading:{},
  addLoading:{},
  isfetching:false,
  page: 1,
  limit: 10,
  loading: false,
  loadingMore: false,
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
    resetCheckBox(state,action){
      console.log("resetCheckBox");
      state.wishList.list=[]
    },
    setToggleToCheckedWishlist(state,action){
      // console.log("setToggleToCheckedWishlist");
      
      let data=state.wishList.list.filter((service)=>service._id==action.payload._id);
      if(data?.length!=0){
        state.wishList.list=state.wishList.list.filter((service)=>service._id!=action.payload._id)
      }else{
        state.wishList.list=[...state.wishList.list,action.payload]
      }
    },
    onChangeSelectAll(state,action){
      // console.log("onChangeSelectAll");
      
      if(state.list.length==state.wishList.list.length){
        state.wishList.list=[]
      }else{
        state.wishList.list=state.list
      }
    },
    updateServiceWishlistFlag(state,action){
      // console.log("updatewishlistCount, checkedList",action.payload);
      const checkedList = action.payload;
      // Safeguard for state.list being undefined or not an array
    if (Array.isArray(state.list)) {
      state.list.forEach((service) => {
        if (checkedList?.includes(service._id)) {
          service.wishlistCount = 1; // Set count to 1 if the ID is in checkedList
        } 
      //   else {
      //     service.wishlistCount = 0; // Reset count if the ID is not in checkedList
      //  }
      })
    }

    // else{
    //   if (Array.isArray(state.recommendedServiceList)) {
    //   state.recommendedServiceList.forEach((service) => {
    //     if (checkedList?.includes(service._id)) {
    //       service.service[0].servicewishlistsSize=1;
    //     } 
    //   })
    //   {console.log("Inside Update");}
    // }}

    //Reset checkList state to []
      state.wishList.list=[];
   //   state.recommendedServiceList=1;

    },

    
    clearUser(state) {
      state.list =  [],
      state.totalCount= 0,
      state.category= {
        list: [], 
        total: 0,
        categoryLoading: false,
        categoryError: null,
        selectedCategory: null,
      },
      state.subCategory= {
        list: [],
        total: 0,
        subCategoryLoading: false,
        subCategoryError: null,
        selectedSubCategory: null,
      }
    },
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
        state.totalCount = action.payload.total;
        state.list = action.payload?.data;
        console.log(state.list,"recommendedServiceList1");
      })
      .addCase(getUserServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getMoreUserServices.pending, (state, action) => {
        // console.log("getMoreUserServices.pending");
        
        state.loadingMore = true;
      })
      .addCase(getMoreUserServices.fulfilled, (state, action) => {
        // console.log("getMoreUserServices.fulfilled",action.payload?.data);
        
        state.loadingMore = false;
        state.error = action.payload.message;
        state.totalCount = action.payload.total;
        if(state.list){
          state.list = [...state.list, ...action.payload?.data];
          if (action.payload?.data?.length > 0) {
              state.page = state.page + 1;
          }
        }
      })
      .addCase(getMoreUserServices.rejected, (state, action) => {
        // console.log("getMoreUserServices.rejected");
        
        state.loadingMore = false;
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
        // console.log(action.payload," WERERE PENDING");
        state.isfetching=true;
        // console.log(action.meta.arg.serviceId,'updateservicewishlist');
        
        state.isAdding[action.meta.arg.serviceId] = true;
      })
      .addCase(updateServiceWishlist.fulfilled, (state, action) => {
        // console.log(action.payload," WERERE UPDATE");
        state.wishList.loading = false;
        state.isfetching=false;
        state.addLoading[action.payload.data.serviceId]=false;
      state.isAdding[action.payload?.data.data?.serviceId]=false;

     state.list=state.list.map((service)=>{
      if(service?._id==action.payload?.data?.serviceId){
        service.wishlistCount=1;
      }
      return service
   });
       
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
       //console.log(state.list)removeRecommendServiceWishlist
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
        console.log(state.recommendedServiceList,"recommendedServiceList");
      })
      .addCase(recommendedServiceListing.rejected, (state, action) => {
        state.isRecommendedServiceLoading = false 
        const errorMessage = action.payload?.message || "Something went wrong";
        toast.error(errorMessage);
      })

      builder
      .addCase(removeRecommendServiceWishlist.pending, (state, action) => {
        state.wishList.loading = true;
        state.removeLoading[action.meta.arg.serviceId] = true;
      })
      
      .addCase(removeRecommendServiceWishlist.fulfilled, (state, action) => {
        state.wishList.loading = false;
        state.removeLoading[action.payload.serviceId]=false;
        console.log(state.recommendedServiceList,"Slice Inside1");
        state.recommendedServiceList=state.recommendedServiceList.map((service)=>{
            if(service?.service[0]?._id==action.payload?.serviceId){
              service.service[0].servicewishlistsSize=0;
            }
            return service
         });
       
       //console.log(state.list)removeRecommendServiceWishlist
        state.wishList.error=action.payload?.message;
      })
      .addCase(removeRecommendServiceWishlist.rejected, (state, action) => {
        state.wishList.loading = false;
        state.removeLoading[action.meta.arg.serviceId] = false;
        state.wishList.error=action.payload;
      })


      builder
      .addCase(updateRecommendServiceWishlist.pending, (state, action) => {
        state.wishList.loading = true;
        state.addLoading[action.meta.arg.serviceId] = true;   
        state.isfetching=true;    
        state.isAdding[action.meta.arg.serviceId] = true;
      })
      .addCase(updateRecommendServiceWishlist.fulfilled, (state, action) => {
        state.wishList.loading = false;
        state.isfetching=false;
        state.addLoading[action.payload.data.serviceId]=false;
      state.isAdding[action.payload?.data.data?.serviceId]=false;

     state.recommendedServiceList=state.recommendedServiceList.map((service)=>{
      if(service?.service[0]?._id==action.payload?.data?.serviceId){
        service.service[0].servicewishlistsSize=1;
      }
      return service
   });
       
        state.wishList.error=action.payload?.message;
      })
      .addCase(updateRecommendServiceWishlist.rejected, (state, action) => {
        state.wishList.loading = false;
        state.isfetching=false;
        state.isAdding = false
        state.addLoading[action.meta.arg.serviceId] = false
        state.wishList.error=action.payload;
      });


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
export const { setSelectedCategory,clearUser, setSelectedSubCategory,setToggleToCheckedWishlist,onChangeSelectAll,resetService,updateServiceWishlistFlag,resetCheckBox } =
  serviceListingSlice.actions;

// Export the reducer
export default serviceListingSlice.reducer;
