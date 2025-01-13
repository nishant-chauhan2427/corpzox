import { useLocation } from "react-router-dom";
// import { BiSolidMessageRounded } from "react-icons/bi";
// import { IoMdCall } from "react-icons/io";
// import { CiMenuKebab } from "react-icons/ci";
// import { FaPlayCircle } from "react-icons/fa";
// import { Button } from "../../components/buttons/button";
// import { GoTriangleDown } from "react-icons/go";
// import { businessCard, recommednedDetail,serviceProgressUpdateDetail } from "../../database";
// import { GoDotFill } from "react-icons/go";
// import { ImCross } from "react-icons/im";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heading } from "../../components/heading";
import { BusinessCardShimmer } from "../../components/loader/BusinessCardShimmer";
import { DashboardProfileCardShimmer } from "../../components/loader/DashboardProfileCardShimmer";
import { RecommendedServiceCardShimmer } from "../../components/loader/RecommendedServiceCardShimmer";
import { ServiceProgressShimmer } from "../../components/loader/ServiceProgressShimmer";
import {
  servicesProgress
} from "../../database";
import {
  getUserBusiness,
  updateServiveProgress
} from "../../redux/actions/dashboard-action";
import { clearEmail } from "../../redux/slices/userAuth-slice";
import { Business } from "./components/business";
import { Profile } from "./components/profile";

const Dashboard = () => {
  const [accountShowButton, setAccountShowButton] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [userInfo, setUserInfo] = useState(() =>
    localStorage.getItem("userInfo")
  );
  const dispatch = useDispatch();
  const location = useLocation();
  // const { businessId } = useSelector((state) => state.business);
  const queryParams = new URLSearchParams(location.search);
  const searchValue = queryParams.get("search");
  const url = window.location.href;

  const {
    user = {},
    manager = {},
    business,
    businessLoading,
    businessError,
    service = {},
    serviceLoading,
    servicesError,
    dataUpdate,
    loading,
    fetching,
  } = useSelector((state) => state.user);
  const { email } = useSelector((state) => state.auth);

  const { isSignedIn } = useSelector((state) => state.app);

  // const isSignedIn = localStorage.getItem('signedIn');

  // useEffect(() => {
  //   if (!isSignedIn) {
  //     let userInfo = null;
  //     try {
  //       userInfo = JSON.parse(localStorage.getItem('userInfo'))?.token;
  //       localStorage.removeItem('userInfo');
  //     } catch (error) {
  //       userInfo = null;
  //     }
  //   }
  // }, [isSignedIn]);

  console.log(isSignedIn, "Session...");

  useEffect(() => {
    if (email) {
      dispatch(clearEmail());
    }
  });
  useEffect(() => {
    dispatch(updateServiveProgress({ page: 1 }));
  }, [dispatch]);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");

    // if (storedUserInfo !== userInfo) {
    //   setUserInfo(storedUserInfo); // Update the state with new userInfo
    // }
    // if(!user?.email){

    //   dispatch(getUser()); // Dispatch the action
    // }
  }, [dispatch, userInfo]);
  useEffect(() => {
    dispatch(getUserBusiness({ query: searchValue ? searchValue : "" }));
    // dispatch(getUserServices({ query: searchValue ? searchValue : "" }));
  }, [searchValue]);

  return (
    <>
      <Heading title={"Dashboard"}></Heading>
      <section className="py-4 flex flex-col gap-4 ">
        <div className="py-2 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            {loading ? (
              <DashboardProfileCardShimmer />
            ) : (
              <Profile user={user} />
            )}
            {/* <Profile user={user} /> */}
            {/* <AccountManager manager={manager} /> */}
          </div>
          {/* <Advertisement /> */}
        </div>
        {businessLoading ? (
          <BusinessCardShimmer />
        ) : (
          <Business data={business?.list} total={business?.totalPage} />
        )}
      </section>
    </>
  );
};

export default Dashboard;
