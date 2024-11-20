import { useState, useEffect } from "react";
import { Button } from "../../../components/buttons";
import { Insight } from "../../../components/insight";
import { MainTab } from "../../../pages/services/components/tabs/mainTab";
import { ServicesCard } from "./components/servicesCard";
import { servicesListing } from "../../../database";
import Filtertab from "../../../pages/services/components/tabs/filterTab";
import { SelectAllTabs } from "../components/tabs/selectAllTab/index";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  getUserServicesCatagory,
  getUserServicesSubCatagory,
  getUserServices,
  updateServiceWishlist,
  removeServiceWishlist,
  updateServiceQuickWishlist,
} from "../../../redux/actions/servicesListing-action";
import {
  setToggleToCheckedWishlist,
  resetService,
} from "../../../redux/slices/serviceListingSlice";
import toast from "react-hot-toast";
import { Offers } from "../../../components/offers";
const ServicesListing = () => {
  const dispatch = useDispatch();
  const { servicesMainTab } = useSelector((state) => state.app);
  const { category, subCategory, page, limit, list, wishList } = useSelector(
    (state) => state.service
  );
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchValue = queryParams.get("search");
  const [isSubmit, setIsSubmit] = useState(false);
  useEffect(() => {
    dispatch(resetService({}));
    dispatch(getUserServicesCatagory({}));
  }, []);
  useEffect(() => {
    if (category?.selectedCategory?.categoryId) {
      dispatch(
        getUserServicesSubCatagory({
          categoryId: category?.selectedCategory?.categoryId,
        })
      );
    }
  }, [category.selectedCategory]);
  useEffect(() => {
    if (category?.selectedCategory && subCategory?.selectedSubCategory) {
      dispatch(
        getUserServices({
          categoryId: category?.selectedCategory?._id,
          subCategoryId: subCategory?.selectedSubCategory?._id,
          page,
          limit,
          query: searchValue,
        })
      );
    }
  }, [category.selectedCategory, subCategory.selectedSubCategory, searchValue]);
  // useEffect(()=>{
  //   if (category?.selectedCategory && subCategory?.selectedSubCategory) {
  //     dispatch(getUserServices({categoryId:category?.selectedCategory?._id
  //       ,subCategoryId:subCategory?.selectedSubCategory?._id
  //       ,page,limit,query:searchValue}));
  //   }
  // },[searchValue])
  useEffect(() => {
    if (isSubmit && !wishList?.loading) {
      toast.success(wishList?.error);
    }
  }, [wishList?.loading]);
  let onClickWishList = (service) => {
    setIsSubmit(true);
    if (service?.wishlistCount) {
      dispatch(removeServiceWishlist({ serviceId: service?._id }));
    } else {
      dispatch(updateServiceWishlist({ serviceId: service?._id }));
    }
  };
  let onCheckHandler = (service) => {
    dispatch(setToggleToCheckedWishlist(service));
  };
  let onClickAddWishlistHandler = () => {
    dispatch(updateServiceQuickWishlist({ serviceIdArray: wishList?.list }));
  };
  let onChangeSelectAllHandler = () => {
    dispatch(onChangeSelectAllHandler());
    // document.getElementsByClassName('service-checkbox').forEach(element => {

    // });
  };
  return (
    <section className="flex sm:flex-row flex-col gap-4 sm:pt-6 pt-3 bg-white">
      <div className="flex flex-col sm:w-[70%]">
        <div className="flex justify-center flex-col">
          <MainTab />
          {servicesMainTab !== 0 ? (
            <>
              <p className="font-bold  text-[20px] leading-6 text-[#0A1C40]">
                Service Category
              </p>
              <Filtertab />
              {list.length != 0 && (
                <SelectAllTabs
                  onChangeSelectAllHandler={onChangeSelectAllHandler}
                  onClickAddWishlistHandler={onClickAddWishlistHandler}
                />
              )}
              <ServicesCard
                data={list}
                onClick={(service) => onClickWishList(service)}
                onCheckedChange={(val) => onCheckHandler(val)}
              />
            </>
          ) : (
            <>
              <Filtertab />
              {list.length != 0 && (
                <SelectAllTabs
                  onChangeSelectAllHandler={onChangeSelectAllHandler}
                  onClickAddWishlistHandler={onClickAddWishlistHandler}
                />
              )}
              <ServicesCard
                data={list}
                onClick={(service) => onClickWishList(service)}
                onCheckedChange={(val) => onCheckHandler(val)}
              />
              {list && list.length > 5 && (
                <div className="mt-10 flex justify-center">
                  <Button primary={true}>Load More </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className=" sm:w-[30%] flex flex-col pt-4 gap-5">
        <Offers />
        <Insight />
      </div>
    </section>
  );
};
export default ServicesListing;
