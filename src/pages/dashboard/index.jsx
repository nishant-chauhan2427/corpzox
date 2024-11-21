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
import { useState, useEffect } from "react";
import {
  getUser,
  getUserBusiness,
  getUserServices,
} from "../../redux/actions/dashboard-action";
import { useDispatch, useSelector } from "react-redux";
import {
  businessListing,
  recommendedServicesListing,
  servicesProgress,
} from "../../database";
import { Profile } from "./components/profile";
import { AccountManager } from "./components/accountManager";
import { Advertisement } from "./components/adverstisement";
import { RecommendedServices } from "./components/services/recommended";
import { ServicesProgress } from "./components/services/progress";
import { Business } from "./components/business";

const Dashboard = () => {
  const [accountShowButton, setAccountShowButton] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchValue = queryParams.get("search");
  const {
    user = {},
    manager = {},
    business,
    businessLoading,
    businessError,
    service = {},
    serviceLoading,
    servicesError,
  } = useSelector((state) => state.user);
  // const handleBannerdisplay = () => {
  //   setIsFadingOut(true); // Start fade-out animation
  //   setIsVisible(false);
  // };

  // const handleAccountShowBtn = () => {
  //   setAccountShowButton((previous) => !previous);
  // };
  useEffect(() => {
    dispatch(getUser());
    dispatch(getUserBusiness({}));
    dispatch(getUserServices({}));
  }, []);
  useEffect(() => {
    dispatch(getUserBusiness({ query: searchValue }));
    dispatch(getUserServices({ query: searchValue }));
  }, [searchValue]);
  return (
    <>
      <section className="py-4 flex flex-col gap-4">
        <div className="py-2 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Profile user={user} />
            <AccountManager manager={manager} />
          </div>
          {/* <Advertisement /> */}
        </div>
        <Business data={business?.list} total={business?.totalPage} />
        <RecommendedServices data={service?.list} total={service?.totalPage} />
        <ServicesProgress data={servicesProgress} />
      </section>
    </>
  );
};

export default Dashboard;
