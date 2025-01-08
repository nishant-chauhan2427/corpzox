import React, { useEffect, useState } from "react";
import { Heading } from "../../../components/heading";
import { recommendedServiceListing, removeRecommendServiceWishlist, removeServiceWishlist, updateRecommendServiceWishlist, updateServiceWishlist } from "../../../redux/actions/servicesListing-action";
import { useDispatch, useSelector } from "react-redux";
import { ServicesCard } from "../listing/components/servicesCard";
import {
  getUserServicesCatagory,
  getUserServicesSubCatagory,
  getUserServices,
 
  updateServiceQuickWishlist,
  getMoreUserServices,
} from "../../../redux/actions/servicesListing-action";
import toast from "react-hot-toast";
import { ServiceCardShimmer } from "../../../components/loader/ServiceCardShimmer";
const RecommendedServicesViewAll = ({ title = "", totalCount = 0, data = [], }) => {
  const {
    category,
    subCategory,
    loading,
    loadingMore,
    page,
    limit,
    // totalCount,
    totalPage,
    list,
    wishList,
  } = useSelector((state) => state.service);

const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const { recommendedServiceList, isRecommendedServiceLoading } = useSelector(
    (state) => state.service
  );
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  
  
  useEffect(() => {
    if (isSubmit && !wishList?.loading) {
      toast.success(wishList?.error);
    }
  }, [wishList?.loading]);

  let onClickWishList = (service) => {
    setIsSubmit(true);
   // console.log(service?.servicewishlistsSize,"service?.servicewishlistsSize");
    if (service?.servicewishlistsSize) {
      dispatch(removeRecommendServiceWishlist({ serviceId: service?._id }));
    } else {
      dispatch(updateRecommendServiceWishlist({ serviceId: service?._id }));
    }
  };


  let onCheckHandler = (service) => {
  };
  
  useEffect(()=>{
    dispatch(recommendedServiceListing())
  }, [])
  //console.log(recommendedServiceList, "recommended")
  const formattedRecommendedServices = recommendedServiceList?.map(
    (service) => {
      return {
        _id : service._id,
        name: service.service[0]?.name ? service.service[0]?.name : "N/A",
        details: service?.service[0]?.details,
        duration: service?.service[0]?.duration,
        cost: service?.service[0]?.cost,
        servicewishlistsSize : service?.service[0]?.servicewishlistsSize
      };
    }
  );
// console.log(recommendedServiceList?.map((service)=>service._id) ,"formattedRecommendedServices ");
//   //console.log(formattedRecommendedServices?.map((service)=>service._id));
//   let checkListSet = new Set(recommendedServiceList?.map((service)=>service._id));

  // let onClickAddWishlistHandler = () => {
  //   const wishlistSelectedData = formattedRecommendedServices?.map((item)=>item._id);
  //   if (wishlistSelectedData?.length) {
  //     dispatch(
  //       updateServiceQuickWishlist({ serviceIdArray: wishlistSelectedData })
  //     ).then((res) => {
  //       // console.log("updateServiceQuickWishlist res",res);
  //       dispatch(updateServiceWishlistFlag(Array.from(checkListSet))); //ie: mark there service as wishlist:true
  //     });
  //   }
    //after succes, update service.wishlistCount = 1, in service store/state to avoid refresh

    // console.log(wishlistSelectedData?.length, "wishlistSelectedData");
    // if (wishlistSelectedData?.length > 0) {
    //   //toast.success("Wishlist Created");
    //   //toast.success(wishList?.error);
    // } else {
    //   toast.error("Please select at least one service");
    // }
 // };

  // const onChangeSelectAllHandler = () => {
  //   // const newSelectAllChecked = !selectAllChecked;
  //   // if(wishList?.list?.length == list?.length)
  //   // setSelectAllChecked(newSelectAllChecked);
  //   dispatch(onChangeSelectAll());
  // };
  // useEffect(() => {
  //   formattedRecommendedServices &&
  //     formattedRecommendedServices.length === 0 &&
  //     dispatch(recommendedServiceListing());
  // }, []);
  // const url = window.location.href;
  return (
    <>
      <div className="flex flex-col overflow-y-auto pb-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <Heading title={title} backButton={true} tourButton={true}>
            Recommended Services {totalCount ? `(${totalCount})` : ""}
          </Heading>
        </div>
        <div>
          {/* <div
            className="grid grid-cols-1 sm:grid-cols-2 rounded-lg 
     lg:grid-cols-2 gap-4 bg-white"
          >
            {formattedRecommendedServices?.map((data, index) => (
              <button
                key={index}
                className="flex justify-between items-center bg-[#f3f7ff] stroke-[#dfeaf2] stroke-1 gap-2 w-full p-2 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <img
                    className="w-8"
                    src="/images/dashboard/recommended-services.svg"
                    alt="recommended-services"
                  />
                  <div className="flex  flex-col text-start">
                    <p className="font-semibold text-sm text-[#0a1c40]">
                      {data.name}
                    </p>
                    <p className="font- text-[12px]">
                      {data?.details?.length > 50
                        ? data?.details?.slice(0, 40) + "..."
                        : data?.details}{" "}
                    </p>
                  </div>
                </div>
                <div className="border-l h-full flex justify-center items-center">
                  <img src="/icons/dashboard/arrow-right.svg" alt="" />
                </div>
              </button>
            ))}
          </div> */}
          {
            isRecommendedServiceLoading ? (<ServiceCardShimmer/>) : (
              <ServicesCard
              data={formattedRecommendedServices ? formattedRecommendedServices : []}
              onClick={(service) => onClickWishList(service)}
              onCheckedChange={(val) => onCheckHandler(val)}
            />
            )
          }
          {/* <ServicesCard
            data={formattedRecommendedServices ? formattedRecommendedServices : []}
            onClick={(service) => onClickWishList(service)}
            onCheckedChange={(val) => onCheckHandler(val)}
          /> */}
        </div>
      </div>
    </>
  );
};

export default RecommendedServicesViewAll;
