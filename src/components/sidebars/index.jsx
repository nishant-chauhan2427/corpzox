import { IconBox } from "../iconBox";
import { GoDotFill } from "react-icons/go";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { iconSize } from "../../utils";
import { Link } from "react-router-dom";
import { AccountManager } from "../../pages/dashboard/components/accountManager";
import { UpdateProfile } from "./updateProfile";

export const Sidebar = ({ className, collapse, setCollapse }) => {
  const user = useSelector((state) => state.user.user);
  console.log(user,"USER QWERy");

  const initialSidebarItems = [
    {
      id: 0,
      title: "Dashboard",
      icon: <img className="w-[18px]" src="/icons/dashboard/dashboard.svg" alt="" />,
      to: "/dashboard",
      isPinned: false,
    },
    {
      id: 1,
      title: "Business",
      icon: <img className="w-[18px]" src="/icons/dashboard/business.svg" alt="" />,
      to: "/business",
      isPinned: false,
    },
    // {
    //   id: 2,
    //   title: "Fundraise",
    //   icon: <img className="w-[18px]" src="/icons/dashboard/fundraise.svg" alt="" />,
    //   to: "/fundraise",
    //   isPinned: false,
    // },
    // {
    //   id: 3,
    //   title: "Investment",
    //   icon: <img className="w-[18px]" src="/icons/dashboard/investment.svg" alt="" />,
    //   to: "/investment",
    //   isPinned: false,
    // },
    {
      id: 4,
      title: "Services",
      icon: <img className="w-[18px]" src="/icons/dashboard/services.svg" alt="" />,
      to: "/services",
      isPinned: false,
    },
    {
      id: 5,
      title: "Payment History",
      icon: <img className="w-[18px]" src="/icons/dashboard/payment-history.svg" alt="" />,
      to: "/payment/history",
      isPinned: false,
    },
    {
      id: 6,
      title: "Documents",
      icon: <img className="w-[18px]" src="/icons/dashboard/documents.svg" alt="" />,
      to: "/documents",
      isPinned: false,
    },
    {
      id: 7,
      title: "Settings",
      icon: <img className="w-[18px]" src="/icons/dashboard/settings.svg" alt="" />,
      to: "/settings",
      isPinned: false,
    },
  ];

  // if (user && user.email == "superAdmin@gmail.com") {
  //   initialSidebarItems.push({
  //     id: 3,
  //     title: "Master Setting",
  //     icon: <LuSettings size={iconSize} />,
  //     child: [
  //       { title: "Assign Role", to: "/assign-role", icon: <GoDotFill /> },
  //       { title: "Companies", to: "/companies", icon: <GoDotFill /> },
  //     ],
  //     isPinned: false,
  //   });
  // }

  const [items, setItems] = useState(initialSidebarItems);
  const [percentage, setPercentage] = useState(100);

  let fieldsKey = ['name', 'email', 'busniessEmail', 'phone', 'profile_picture_url']
  
  let calculatePercentageHandler = () => {
    let count = 0;  
    console.log(user, "Percentage");
  
    Object.keys(user).forEach((data) => {
      if (fieldsKey.indexOf(data) !== -1) {
        count++;  
      }
    });
    let percentage = Math.floor((count / fieldsKey.length) * 100);
    
    setPercentage(percentage);  
  };
  
  
  useEffect(() => {
    if (user) {
      calculatePercentageHandler()
    }
  }, [user])

  // Handler to toggle the pin status of an item
  const handlePinToggle = (title) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.title === title ? { ...item, isPinned: !item.isPinned } : item
      );

      // Separate pinned and non-pinned items
      const pinnedItems = updatedItems.filter((item) => item.isPinned);
      const nonPinnedItems = updatedItems.filter((item) => !item.isPinned);

      // Reinsert non-pinned items to their initial positions
      nonPinnedItems.sort((a, b) => a.id - b.id);

      return [...pinnedItems, ...nonPinnedItems];
    });
  };

  const handleSidebar = () => {
    setCollapse(!collapse);
  };

  let profile = false;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ left: "-50%" }}
        animate={{ left: 10, transition: { duration: 0.3 } }}
        exit={{ left: "-50%", transition: { duration: 0.3 } }}
        className={`${className ? className : ""} overflow-hidden shadow-xl dark:bg-slate-900`}
      >
        {/* <div
          className={`${
            collapse ? "flex justify-center items-center" : "pl-2"
          } pb-4`}
        >
          <button onClick={handleSidebar}>
            {!collapse ? (
              <LuPanelLeftClose className="dark:text-white" size={iconSize} />
            ) : (
              <LuAlignJustify className="dark:text-white" size={iconSize} />
            )}
          </button>
        </div> */}
        {/* Logo */}

        <div className="py-4 flex justify-center items-center gap-6">
          <Link to={"/dashboard"}>
            
            <img
              width={0}
              height={0}
              className="block dark:hidden w-40 h-full"
              src="/CorpzoxNew.svg"
              alt="corpzo-logo"
            />
            <img
              width={0}
              height={0}
              className="hidden dark:block w-36 h-full"
              src="/corpzo_logo.svg"
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
          {/* <div
            className={`${
              collapse ? "flex justify-center items-center" : "pl-2"
            } pb-4`}
          >
            <button onClick={handleSidebar} className="header-icon">
              {collapse ? (
                <img
                  className={`w-5`}
                  src="/icons/hamburger-close.svg"
                  alt=""
                />
              ) : (
                <img className={`w-5`} src="/icons/hamburger.svg" alt="" />
              )}
            </button>
          </div> */}
        </div>
        <div className="h-[90vh] overflow-x-hidden overflow-y-auto">
          <div className="px-4 py-4 space-y-1">
            {items?.map((item, index) => (
              <IconBox
                containerClassName="px-4 py-2"
                titleClassName={
                  item.to == null && "font-semibold text-primary uppercase"
                }
                key={index}
                to={item.to}
                icon={item.icon}
                title={item.title}
                child={item.child}
                setPin={() => handlePinToggle(item.title)}
                // collapse={collapse}
              />
            ))}
          </div>
          <div className="px-2 pb-14 flex flex-col gap-4">
            {/*  */}
            <AccountManager sidebar={true} />
            {/* <UpdateProfile /> */}
            {percentage !== 100 ? (
          <UpdateProfile />
        ) : (
          ""
        )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
