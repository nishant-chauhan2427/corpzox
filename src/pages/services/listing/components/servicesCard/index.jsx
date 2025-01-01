import React, { useEffect, useState } from "react";
import { Checkbox } from "../../../../../components/inputs/checkbox";
import { CiHeart } from "react-icons/ci";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LinkButton } from "../../../../../components/link";
import { useDispatch, useSelector } from "react-redux";
import { FaRupeeSign } from "react-icons/fa";
import { SelectAllTabs } from "../../../components/tabs/selectAllTab";
import { updateServiceQuickWishlist } from "../../../../../redux/actions/servicesListing-action";
import toast from "react-hot-toast";
import {
  onChangeSelectAll,
  updateServiceWishlistFlag,
} from "../../../../../redux/slices/serviceListingSlice";

export const ServicesCard = ({
  data,
  onClick = (service) => console.log("Heart icon clicked"),
  onCheckedChange = () => console.log("checked clicked"),
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { addLoading, removeLoading } = useSelector((state) => state.service);
  const { isLoading, heartloading, childLoading } = useSelector(
    (state) => state.wishlist
  );

  const { wishList, list, recommendedServiceList } = useSelector(
    (state) => state.service
  );

  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [expandedServices, setExpandedServices] = useState({});
  let checkListSet = new Set(wishList?.list?.map((service) => service._id)); //checkListSet :["serviceId1","serviceId2",....]

  useEffect(() => {
    setSelectAllChecked(
      wishList?.list?.length == (list?.length || recommendedServiceList?.length)
    );
  }, [wishList]);

  let onClickAddWishlistHandler = () => {
    const wishlistSelectedData = wishList?.list?.map((item) => item._id);
    console.log(wishlistSelectedData, "wishlistSelectedData");
    if (wishlistSelectedData?.length) {
      dispatch(
        updateServiceQuickWishlist({ serviceIdArray: wishlistSelectedData })
      ).then((res) => {
        // console.log("updateServiceQuickWishlist res",res);
        dispatch(updateServiceWishlistFlag(Array.from(checkListSet))); //ie: mark there service as wishlist:true
      });
    }
  };

  const onChangeSelectAllHandler = () => {
    dispatch(onChangeSelectAll());
  };

  const navigate = useNavigate();
  const url = window.location.href;

  const navigateToServiceDetail = (serviceId) => {
    navigate(`/services/detail/${serviceId}`);
  };

  return (
    <>
      {(list.length !== 0 || recommendedServiceList.length !== 0) &&
        url.includes("services") && (
          <SelectAllTabs
            hideBtn={wishList?.list?.length <= 0}
            checked={selectAllChecked}
            checkListCount={wishList?.list?.length}
            onChangeSelectAllHandler={onChangeSelectAllHandler}
            onClickAddWishlistHandler={onClickAddWishlistHandler}
          />
        )}
      <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4">
        {data &&
          data.map((service, index) => {
            const text =
              url.includes("services")
                ? service?.details
                  ? service?.details
                  : "___"
                : service?.service[0]?.details
                ? service?.service[0]?.details
                : "___";

            const truncatedText =
              text.length > 100 ? text.slice(0, 100) + "..Read more" : text;

            return (
              <div
                key={index}
                className="flex flex-col gap-2 bg-[#F3F7FF] px-4 py-4  rounded-lg sm:gap-4 justify-between cursor-pointer"
                onClick={() => navigateToServiceDetail(service?._id)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <p className="font-bold text-[#0A1C40]">
                      {url.includes("services")
                        ? service?.name
                          ? service?.name
                          : "___"
                        : service?.service?.[0]?.name
                        ? service?.service[0]?.name
                        : "___"}
                    </p>

                    {url.includes("services") &&
                      service?.offerservices?.[0]?.offers?.[0]
                        ?.discountPercent && (
                        <p className="font-medium rounded-full text-[12px] text-[#15580B] bg-[#B5FFBC] px-2 py-1">
                          {service.offerservices[0].offers[0].discountPercent} %
                        </p>
                      )}
                    {url.includes("wishlist") &&
                      service?.service?.[0]?.offerservices?.[0]?.offers?.[0]
                        ?.discountPercent && (
                        <p className="font-medium rounded-full text-[12px] text-[#15580B] bg-[#B5FFBC] px-2 py-1">
                          {
                            service?.service?.[0]?.offerservices?.[0]?.offers?.[0]
                              ?.discountPercent
                          }{" "}
                          %
                        </p>
                      )}
                  </div>

                  {url.includes("services") ? (
                    <Checkbox
                      className="service-checkbox"
                      checked={checkListSet.has(service?._id)} //O(n)
                      onChange={() => onCheckedChange(service)}
                    />
                  ) : (
                    <></>
                  )}
                </div>
                <p className="text-base leading-[22px] font-normal text-[#7C7C7C]" dangerouslySetInnerHTML={{__html : truncatedText}}>
                </p>

                <div className="flex flex-col gap-1 pt-1">
                  <div className="flex justify-between sm:w-4/5">
                    <p className="font-semibold text-sm text-[#7E7E7E]">
                      Estimated Time(Month(s))
                    </p>
                    <p className="font-bold text-[12px] text-[#000000]">
                      {url.includes("services")
                        ? service?.duration
                          ? service?.duration
                          : "___"
                        : service?.service[0]?.duration
                        ? service?.service[0]?.duration
                        : "___"}
                    </p>
                  </div>

                  <div className="flex justify-between sm:w-4/5">
                    <p className="font-semibold text-sm text-[#7E7E7E] flex items-center">
                      Price (<FaRupeeSign className="ml-1" />)
                    </p>
                    <p className="font-bold text-[12px] text-[#000000]">
                      {url.includes("services")
                        ? service?.cost
                          ? service?.cost
                          : "___"
                        : service?.service[0]?.cost
                        ? service?.service[0]?.cost
                        : "___"}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end pt-5 items-end">
                  <div className="flex items-center  justify-center gap-2">
                    {addLoading[service._id] ||
                      removeLoading[service._id] ||
                      childLoading[service.serviceId] ?
                      (<CiHeart size={30} color="#777777" />)
                    //    (
                    //   <img src="/icons/wishlist/grey-heart.svg" alt="Red Heart" />
                    // ) 
                    : (
                      <button
                        data-tooltip-content={
                          service.wishlistCount === 1
                            ? "Remove From WishList"
                            : "Add to WishList"
                        }
                        data-tooltip-id="my-tooltip"
                        onClick={(event) => {
                          event.stopPropagation();
                          onClick(service);
                        }}
                      >
                        {location.pathname === "/wishlist" ? (
                          <img
                            src="/icons/wishlist/red-heart.svg"
                            alt="Red Heart"
                          />
                        ) : service?.wishlistCount && service.wishlistCount === 1 ? (
                          <img
                            src="/icons/wishlist/red-heart.svg"
                            alt="Red Heart"
                          />
                        ) : (
                          <CiHeart size={30} color="#777777" />
                        )}
                      </button>
                    )}

                    <LinkButton
                      type="submit"
                      to={`/services/detail/${service?._id}`}
                      primary={true}
                    >
                      Avail It Now
                    </LinkButton>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
