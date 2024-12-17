import { IoMdAddCircle } from "react-icons/io";
import { businessListing } from "../../../database";
import { Button } from "../../../components/buttons/button";
import { LinkButton } from "../../../components/link";
import { getUserBusiness } from "../../../redux/actions/dashboard-action";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { setBusinessPage } from "../../../redux/slices/userLoginSlice";
import { calculateAge } from "../../../utils/index";
import { BusinessCard } from "./components/businessCard";
import { Heading } from "../../../components/heading";
import {
  getAllBusiness,
  getMoreBusiness,
} from "../../../redux/actions/businessPage-action";
import { BusinessCardShimmer } from "../../../components/loader/BusinessCardShimmer";
import { resetBusiness } from "../../../redux/slices/businessSlice";
// import { loadMoreBusiness } from "../../../redux/slices/businessPageSlice";

const BusinessListing = () => {
  const data = businessListing;
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchValue = queryParams.get("search");

  // const { business, businessLoading, businessError } = useSelector((state) => state.user);
  const { business, isLoading, totalCount, page, error, loadingMore } =
    useSelector((state) => state.businessList);

  console.log("businessData", business, totalCount, isLoading, error, page);

  useEffect(() => {
    dispatch(getAllBusiness({ query: searchValue, page: 1 }));
  }, [searchValue]);

  // console.log("User Business",business);
  // useEffect(()=>{
  //   dispatch(getUserBusiness({}));
  // },[])
  // useEffect(() => {
  //   if (!businessLoading) {
  //     dispatch(getUserBusiness({ query: searchValue, page: 1 }));
  //   }
  // }, [searchValue, business?.page]);

  const handleScroll = (e) => {
    console.log("handleScroll");

    const bottom =
      e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && !isLoading && business?.length < totalCount) {
      console.log("loading more...");

      // dispatch(loadMoreBusiness(page + 1)); // Load next page
    }

    console.log("Not loading...");
  };

  // return<div>Business page</div>

  if (isLoading) return <BusinessCardShimmer count={8} className={"p-2"} />;
  const title = location.pathname.includes("profile") ? "Profile" : "Business";
  return (
    <div className="flex flex-col overflow-y-auto pb-4" onScroll={handleScroll}>
      <div className="flex flex-col md:flex-row justify-between gap-4">
      
        <Heading title={title} tourButton={true}>
          Your Business {totalCount ? `(${totalCount})` : ""}
        </Heading>
        <div className="flex items-center gap-2">
          {/* <LinkButton to={"create"} primary={true} leftIcon={<IoMdAddCircle />}>
            New Business
          </LinkButton> */}
          <LinkButton
            onClick={() => {
              dispatch(resetBusiness());
              navigate("/business/create");
            }}
            primary={true}
            leftIcon={<IoMdAddCircle />}
          >
            New Business
          </LinkButton>
          {/* <LinkButton className="font-semibold text-[#606060]">View all</LinkButton> */}
        </div>
      </div>
      {business?.length > 0 ? (
        <>
          <div className="pb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
            {business?.map((data, index) => (
              <BusinessCard key={index} data={data} />
            ))}
          </div>
          {!isLoading && business?.length < totalCount && (
            <div className=" flex justify-center">
              <Button
                primary={true}
                onClick={() => dispatch(getMoreBusiness({ page: page + 1 }))}
                disabled={loadingMore}
              >
                {loadingMore ? "Loading" : "Load More"}
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-center gap-2 items-center flex-col h-[80vh]">
          <img src="/images/business/no-business.svg" alt="" />
          <p className="font-bold  text-xl text-[#000000] ">
            No Business Created
          </p>
          <p className="font-normal text-[#797979]">
            Create one to start your services
          </p>
        </div>
      )}
    </div>
  );
};

export default BusinessListing;

const labelValue = (label, value) => (
  <div className="flex justify-between">
    <p className="font-medium text-sm text-[#000000B2] ">{label}</p>
    <p className="font-semibold text-sm text-black">{value}</p>
  </div>
);
