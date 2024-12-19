import { useState, useEffect } from "react";
import { Button } from "../../../components/buttons";
import { Insight } from "../../../components/insight";
import { MainTab } from "../../../pages/services/components/tabs/mainTab";
import { ServicesCard } from "./components/servicesCard";
import { servicesListing } from "../../../database";
import Filtertab from "../../../pages/services/components/tabs/filterTab";
import { SelectAllTabs } from "../components/tabs/selectAllTab/index";
import { useSelector, useDispatch } from "react-redux";
import { Heading } from "../../../components/heading";

import { useLocation, useParams, useSearchParams } from "react-router-dom";
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
  onChangeSelectAll,
} from "../../../redux/slices/serviceListingSlice";
import toast from "react-hot-toast";
import { Offers } from "../../../components/offers";
import { updateServiveProgress } from "../../../redux/actions/dashboard-action";
import { NoData } from "../../../components/errors/noData";
import { ImSpinner2 } from "react-icons/im";
import { MetaTitle } from "../../../components/metaTitle";
import { CategorySubCategoryTabLoader } from "../../../components/loader/CategorySubCategoryTabLoader";
import { BusinessCardShimmer } from "../../../components/loader/ProfileShimmer";
const ServicesListing = () => {
  const dispatch = useDispatch();
  const { servicesMainTab } = useSelector((state) => state.app);
  console.log(servicesMainTab, "serviceMainTab");
  const { category, subCategory, loading, page, limit, totalCount, totalPage, list, wishList } = useSelector(
    (state) => state.service
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const subCategoryId = searchParams.get("subCategoryId");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchValue = queryParams.get("search");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isServicesFetched, setIsServicesFetched] = useState(false);
  useEffect(() => {
    // dispatch(resetService({}));
    category?.list && category?.list?.length === 0 && dispatch(getUserServicesCatagory({}));

  }, []);

  useEffect(() => {
    if (categoryId) {
      dispatch(getUserServicesSubCatagory({ categoryId }));
    }
  }, [categoryId]);

  useEffect(() => {
    if (
      categoryId &&
      subCategoryId &&
      !subCategory?.subCategoryLoading &&
      !isServicesFetched
    ) {
      const search = searchParams.get("search");
      dispatch(
        getUserServices({
          categoryId,
          subCategoryId,
          page,
          limit,
          query: search || searchValue,
        })
      );
      setIsServicesFetched(true);
    }
  }, [categoryId, subCategoryId, subCategory?.subCategoryLoading, searchValue, isServicesFetched]);

  useEffect(() => {
    setIsServicesFetched(false);
  }, [categoryId, subCategoryId]);

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


  //  let onClickAddWishlistHandler = () => {
  //     const wishlistSelectedData=wishList?.list?.map(item => item._id);
  //     dispatch(updateServiceQuickWishlist({ serviceIdArray: wishlistSelectedData }));
  //     toast.success("Wishlist Created")
  //   };
  //   let onChangeSelectAllHandler = () => {
  //     dispatch(onChangeSelectAll());
  //     // document.getElementsByClassName('service-checkbox').forEach(element => {

  //     // });
  //   }; 

  return (
    <section className="flex sm:flex-row flex-col gap-4 sm:pt-6 pt-3 bg-white">
      <div className="w-full flex justify-center flex-col overflow-hidden">
        <MetaTitle title={"Service"} />
        <div className="w-full mb-4">
          {category.categoryLoading ? <CategorySubCategoryTabLoader /> : <MainTab />}
          {subCategory?.subCategoryLoading ? <CategorySubCategoryTabLoader /> : <Filtertab />}
        </div>
        <>
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <BusinessCardShimmer />
            </div>

          ) : (

            list && list.length > 0 ? (
              <ServicesCard
                data={list}
                onClick={(service) => onClickWishList(service)}
                onCheckedChange={(val) => onCheckHandler(val)}
              />
            ) : (<NoData />)
          )}

          {list && list.length > 5 && (
            <div className="mt-10 flex justify-center">
              {list.length == totalCount ? (
                <></>
              ) : (
                <Button primary={true}>Load More </Button>
              )}
            </div>
          )}

        </>
      </div>
    </section>
  );
};
export default ServicesListing;