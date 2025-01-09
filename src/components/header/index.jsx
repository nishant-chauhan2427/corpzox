import { Search } from "../search";
import { Button } from "../buttons";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { headerLinks } from "../../database";
import { HiOutlineUser } from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi";
import { CrossButton } from "../buttons/crossButton";
import { IoIosArrowDown, IoMdNotificationsOutline } from "react-icons/io";
import { RxArrowRight, RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { AnimatePresence, motion } from "framer-motion";
import { IconWrapper } from "../wrappers/icon-wrapper";
import { IoSettingsOutline } from "react-icons/io5";
import { titleCase, useOutsideClick } from "../../utils";
// import { FullScreenButton } from "../fullScreen";
import { ThemeSwitch } from "../theme/switch";
import { capitalize } from "../../utils";
import { Notification } from "../notification";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/slices/userLoginSlice";
import { ConfirmationModal } from "../modal/confirmationModal";
import { persistor } from "../../redux/store";
import { clearDocumentList } from "../../redux/slices/documentSlice";
import { getUser } from "../../redux/actions/dashboard-action";
import { Tooltip } from "../tooltip";

export const Header = ({ className, collapse, setCollapse }) => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [signedInMenuPopup, setSignedInMenuPopup] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const user = useSelector((state) => state.user.user);
  const { upload } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // To close when someone clicks outside

  const signedInMenuPopupRef = useRef();

  const handleSignInMenuPopup = () => {
    setSignedInMenuPopup(!signedInMenuPopup);
  };

  useOutsideClick(signedInMenuPopupRef, handleSignInMenuPopup);

  // Dummy variables

  const signedIn = true;
  const profile = false;

  // Handle sidebar collapse
  console.log(upload, "upload image");

  const handleSidebar = () => {
    setCollapse(!collapse);
  };

  const onConfirmationModalClose = () => {
    setConfirmationModal(!confirmationModal);
  };

  function getPageHeading(pathname) {
    switch (true) {
      case pathname.includes("dashboard"):
        return "Dashboard";
        case pathname.includes("wishlist"):
        return "Wishlist";
      case pathname.includes("business"):
        return "Business";
      case pathname.includes("fundraise"):
        return "Fundraise";
      case pathname.includes("investment"):
        return "Investment";
      case pathname.includes("services"):
        return "Services";
      case pathname.includes("payment"):
        return "Under Service";
      case pathname.includes("document"):
        return "Document";
      case pathname.includes("settings"):
        return "Settings";
      case pathname.includes("profile"):
        return "Profile";
      case pathname.includes("offersDetails"):
        return "Offers";
      default:
        return "";
    }
  }

  // import { persistor } from './reduxStore'; // Import persistor from your Redux store configuration

  // export const handleSignOut = () => {
  //   // Clear persisted data
  //   persistor.purge().then(() => {
  //     console.log('Persisted data cleared successfully!');
  //     // Perform additional sign-out tasks like redirecting to the login page
  //   });
  // };

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/sign-in");
    // persistor.purge().then(() => {
    //       console.log('Persisted data cleared successfully!');

    //     });
    persistor.pause();
    persistor.flush().then(() => {
      console.log("Persisted data cleared successfully!");
      return persistor.purge();
    });
    // dispatch(clearDocumentList())
    localStorage.clear();
  };

  const handleCancelLogout = () => {
    onConfirmationModalClose();
  };
  // const clearSearch = () => {
  //   // Get the current URL
  //   const currentUrl = new URL(window.location.href);

  //   // Remove the 'search' query parameter
  //   currentUrl.searchParams.delete("search");

  //   // Update the URL without reloading the page
  //   window.history.replaceState(null, "", currentUrl.toString());

  //   console.log(currentUrl.toString(), "Updated URL");
  //   navigate(currentUrl.toString())
  // };
  const clearSearch = () => {
    // Log the current 'search' query parameter
    //console.log(searchParams.get("search"));

    // Remove the 'search' query parameter by deleting it
    searchParams.delete("search");

    // Update the URL with the modified search parameters
    setSearchParams(searchParams);

    console.log("Search parameter removed:", searchParams.toString());
  };


  useEffect(() => {
    if (!user?.profile_picture_url || !user?.name || !user?.email) {
      dispatch(getUser());
    }
  }, []);

  return (
    <header
      className={`${className && className
        } bg-[#0A1C40] dark:bg-slate-900 lg:ps-[14rem] px-2 lg:px-4 py-4 z-[1000]`}
    >
      <div className="relative flex justify-between items-center">
        {/* Left Side Menu */}
        <div className="flex items-center gap-4 w-[60%]">
          {/* Logo */}
          <div className="lg:hidden flex items-center gap-2">
            <div className={`flex justify-center items-center`}>
              <IconWrapper>
                <button onClick={handleSidebar} className="header-icon">
                  {collapse ? (
                    <RxCross2 className="text-white" />
                  ) : (
                    <RxHamburgerMenu className="text-white" />
                  )}
                </button>
              </IconWrapper>
            </div>
            <Link to={"/"}>
              <img
                className="block dark:hidden w-10 h-full"
                src="/corpzo-logo-sm.svg"
                alt="corpzo-logo"
              />
              <img
                className="hidden dark:block w-10 h-full"
                src="/corpzo-logo-sm.svg"
                alt="corpzo-logo"
              />
              {profile ? (
                <div className="flex justify-end">
                  <h1 className="font-bold text-xs uppercase">
                    {capitalize(profile.role)}
                  </h1>{" "}
                </div>
              ) : (
                ""
              )}
            </Link>
          </div>
          {/* Page Heading */}
          <h1 className="font-bold text-white text-2xl">
            {getPageHeading(pathname)}
          </h1>
          {/* Search */}
          {
            !pathname.includes("settings") &&
            !pathname.includes("profile") &&
            !pathname.includes("wishlist") &&
            !pathname.includes("offersDetails") &&
            !pathname.includes("dashboard") &&
            !pathname.includes("payment") &&
            !pathname.includes("wishlist") &&
            !pathname.includes("services/detail") &&
            !pathname.includes("services/serviceprogressdetail") &&
             pathname !== "/documents" &&



            (
              <Search
                clearSerarch={clearSearch}
                placeholder={`Search ${getPageHeading(pathname)}`}
                containerClassName={
                  "hidden lg:block w-full h-10 lg:!max-w-lg !bg-[#3D485F] !rounded-full overflow-hidden   border-[#8c94a2] border !text-white"
                }
                inputClassName={"w-full h-10  !bg-[#3D485F] text-white"}
              />
            )}

          {/* Header Links */}
          <div className="hidden lg:flex items-center gap-4">
            {headerLinks?.map((data, index) => (
              <Link
                className={`${window.location.pathname.includes(data.url) && "text-primary"
                  } hover:text-primary`}
                to={data.url}
                key={index}
              >
                {data.label}
              </Link>
            ))}
          </div>
        </div>
        {/* Right Side Menu */}
        {signedIn ? (
          <div className="flex items-center gap-4 w-[40%] justify-end">
            {/* <ThemeSwitch /> */}

            {/* <FullScreenButton /> */}
            {/* <Notification /> */}
            <Link to={"/wishlist"}>
              <IconWrapper data-tooltip-content={"Wishlist"} data-tooltip-id="my-tooltip">
                <img src="/icons/header/heart.svg" alt="" />
              </IconWrapper>
            </Link>
            <div className="flex relative gap-2">
              <div className="md:bg-[#3c4962] md:dark:bg-[#22262C] lg:px-2 md:px-2 sm:bg-transparent sm:px-1 py-0.5 flex justify-center items-center rounded-full sm:border sm:border-[#97a3b5]">
                <button
                  onClick={() => setSignedInMenuPopup(!signedInMenuPopup)}
                  className="flex items-center gap-1 sm:gap-2"
                >
                  {
                    upload == null ? (
                      <img
                        className="w-8 h-8 inset-0 rounded-full object-cover ltr:absolute ltr:top-1/2 ltr:left-1/2 ltr:-translate-y-1/2 rtl:-translate-y-[31%] ltr:-translate-x-1/2"
                        src={
                          user?.profile_picture_url
                            ? user?.profile_picture_url
                            : "/images/insights/insight-user.svg"
                        }
                        alt="profile-pic"
                      />
                    ) : (
                      <img
                        className="w-8 h-8 inset-0 rounded-full object-cover ltr:absolute ltr:top-1/2 ltr:left-1/2 ltr:-translate-y-1/2 rtl:-translate-y-[31%] ltr:-translate-x-1/2"
                        src={upload ? upload : "/images/insights/insight-user.svg"}
                        alt="profile-pic"
                      />
                    )
                  }


                  <div className="hidden sm:flex flex-col items-start">
                    <h5 className="font-semibold text-sm text-white">
                      {user?.name ? (
                        user.name.slice(0, 25) +
                        (user.name.length > 25 ? "..." : "")
                      ) : (
                        <></>
                      )}
                    </h5>
                    <p className="text-[9px] text-white">
                      {user?.name ? user?.email : <></>}
                    </p>
                  </div>
                  <img src="/icons/header/down-arrow.svg" alt="" />
                </button>
              </div>
              <AnimatePresence>
                {signedInMenuPopup && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    ref={signedInMenuPopupRef}
                    className="p-4 sm:w-32 fixed top-20 right-1 sm:right-4 bg-white dark:text-white dark:bg-darkPrimary border border-gray-200 dark:border-gray-700 shadow rounded-md z-10 flex flex-col items-start justify-start gap-2"
                  >
                    <Link
                      onClick={() => setSignedInMenuPopup(!signedInMenuPopup)}
                      to={"/profile"}
                      className="flex items-center gap-2"
                    >
                      <HiOutlineUser />
                      <p className="text-sm">My Profile</p>
                    </Link>
                    <Link
                      onClick={() => setSignedInMenuPopup(!signedInMenuPopup)}
                      to={"/settings"}
                      className="flex items-center gap-2"
                    >
                      <IoSettingsOutline />
                      <p className="text-sm">Settings</p>
                    </Link>
                    <button
                      onClick={() => {
                        setConfirmationModal(true);
                        setSignedInMenuPopup(!signedInMenuPopup);
                        // dispatch(clearUser());
                        // navigate("/sign-in");
                      }}
                      className="flex items-center"
                    >
                      <FiLogOut />
                      <p className="text-sm px-2">Sign out</p>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* <button
              className="block lg:hidden"
              onClick={() => isOpen(!hamburgerOpen)}
            >
              <GiHamburgerMenu className="text-xl" />
            </button>{" "} */}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2">
              <Link v3={true} to={"/sign-in"}>
                Sign In
              </Link>
            </div>
            <button
              className="block lg:hidden"
              onClick={() => setHamburgerOpen(!hamburgerOpen)}
            >
              <GiHamburgerMenu className="text-xl" />
            </button>
          </div>
        )}
        {/* Mobile Hamburger Menu */}
        {/* <AnimatePresence>
          {hamburgerOpen && (
            <motion.div
              initial={{ scale: 0, translateX: 500 }}
              animate={{ scale: 1, translateX: 0 }}
              exit={{ scale: 0, translateX: 500 }}
              className="lg:hidden absolute top-0 left-0 p-4 w-full h-screen bg-white dark:bg-darkPrimary flex flex-col justify-center items-center gap-4 z-[999]"
            >
              <CrossButton onClick={() => setHamburgerOpen(!hamburgerOpen)} />
              <div className="flex flex-col items-center gap-4">
                {headerLinks?.map((data, index) => (
                  <Link
                    className="w-fit hover:text-primary"
                    to={data.url}
                    key={index}
                  >
                    {data.label}
                  </Link>
                ))}
              </div>
              {signedIn ? (
                <div className="relative sm:hidden">
                  <button
                    onClick={() => setSignedInMenu(!signedInMenu)}
                    className="flex items-center gap-2"
                  >
                    <HiOutlineUser className="text-lg" />
                    <p>My Account</p>
                    <IoIosArrowDown />
                  </button>
                  <div className="p-4 w-full absolute top-8 left-1/2 -translate-x-1/2 bg-white dark:bg-darkPrimary border border-[#C6C6C6] shadow rounded-md z-10 flex flex-col items-start justify-start gap-2">
                    <Link to={"/"} className="flex items-center gap-2">
                      <HiOutlineUser />
                      <p className="text-sm">My Profile</p>
                    </Link>
                    <Link to={"/"} className="flex items-center gap-2">
                      <IoSettingsOutline />
                      <p className="text-sm">Settings</p>
                    </Link>
                    <Link to={"/"} className="flex items-center gap-2">
                      <FiLogOut />
                      <p className="text-sm">Sign out</p>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link v3={true} className="w-fit" to={"/signin"}>
                    Sign In
                  </Link>
                  <Link
                    v2={true}
                    className="w-fit px-2 py-1 rounded-lg"
                    to={"/forgot-password"}
                  >
                    Forgot Password
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence> */}

        {/* Sign Out Modal */}
        <ConfirmationModal
          isOpen={confirmationModal}
          onClose={onConfirmationModalClose}
        >
          <div className="text-center flex flex-col gap-2 py-4">
            <p className="font-bold text-xl text-black ">Sign Out</p>
            <hr className=" bg-gradient-to-r from-[#D0D0D066] via-[#9E9E9E] to-[#D0D0D066]" />
            <p className="font-medium text-xl text-black">
              Are you sure you want to Sign out from CorpZo?
            </p>
            <div className="flex items-center justify-center gap-4 pt-4">
              {/* <Button primary={true}>Yes</Button> */}

              <Button primary={true} onClick={handleLogout}>
                Yes
              </Button>
              {/* <Button onClose={onConfirmationModalClose} primary={true}>
                No
              </Button> */}

              <Button primary={true} onClick={handleCancelLogout}>
                No
              </Button>
            </div>
          </div>
        </ConfirmationModal>
      </div>
    </header>
  );
};
