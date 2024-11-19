import { IoMdAddCircle } from "react-icons/io";
import { businessListing } from "../../../database";
import { Button } from "../../../components/buttons/button";
import { LinkButton } from "../../../components/link";
import { getUserBusiness } from "../../../redux/actions/dashboard-action";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { setBusinessPage } from "../../../redux/slices/userLoginSlice";
import { calculateAge } from "../../../utils/index";
import { BusinessCard } from "./components/businessCard";

const BusinessListing = () => {
  const data = businessListing;
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchValue = queryParams.get("search");

  const { business, businessLoading, businessError } = useSelector(
    (state) => state.user
  );
  // useEffect(()=>{
  //   dispatch(getUserBusiness({}));
  // },[])
  useEffect(() => {
    if (!businessLoading) {
      dispatch(getUserBusiness({ query: searchValue, page: business.page }));
    }
  }, [searchValue, business?.page]);
  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    console.log(
      bottom,
      !businessLoading,
      business?.list?.length,
      business.totalPage
    );
    if (
      bottom &&
      !businessLoading &&
      business?.list?.length < business.totalPage
    ) {
      dispatch(setBusinessPage(business.page + 1)); // Load next page
    }
  };
  return (
    <div
      className="flex flex-col pt-10 overflow-y-auto"
      onScroll={handleScroll}
    >
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <p className="flex items-center gap-4 font-semibold text-xl text-[#0A1C40]">
          Your Business ({business?.totalPage})
          <span>
            <img src="/icons/dashboard/take-a-tour.svg" alt="" />
          </span>
        </p>
        <div className="flex items-center gap-2">
          <LinkButton to={"create"} primary={true} leftIcon={<IoMdAddCircle />}>
            New Business
          </LinkButton>
          {/* <LinkButton className="font-semibold text-[#606060]">View all</LinkButton> */}
        </div>
      </div>
      {business?.list.length > 0 ? (
        <>
          <div className="pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {business?.list.map((data, index) => (
              <BusinessCard key={index} data={data} />
            ))}
          </div>
          {!businessLoading && business.list.length < business.totalPage && (
            <div className="mt-10 flex justify-center">
              <Button
                primary={true}
                onClick={() => dispatch(setBusinessPage(business.page + 1))}
              >
                Load More{" "}
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
