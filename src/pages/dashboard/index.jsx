import { Link } from "react-router-dom";
import { BiSolidMessageRounded } from "react-icons/bi";
import { IoMdCall } from "react-icons/io";
import { CiMenuKebab } from "react-icons/ci";
import { FaPlayCircle } from "react-icons/fa";
import { Button } from "../../components/buttons/button";
import { GoTriangleDown } from "react-icons/go";
// import { businessCard, recommednedDetail } from "../../database";
import { GoDotFill } from "react-icons/go";
// import { serviceProgressUpdateDetail } from "../../database";
import { ImCross } from "react-icons/im";
import { useState, useEffect } from "react";
import { getUser } from "../../redux/actions/dashboard-action";
import { useDispatch } from "react-redux";
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
  const handleBannerdisplay = () => {
    setIsFadingOut(true); // Start fade-out animation
    setIsVisible(false);
  };

  const handleAccountShowBtn = () => {
    setAccountShowButton((previous) => !previous);
  };
  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <>
      <section className="py-6">
        <div className="my-2 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex flex-row gap-4 w-full">
            <Profile />
            <AccountManager />
          </div>
          {/* <Advertisement /> */}
        </div>
        <Business data={businessListing} />
        <RecommendedServices data={recommendedServicesListing} />
        <ServicesProgress data={servicesProgress} />
      </section>
    </>
  );
};

export default Dashboard;
