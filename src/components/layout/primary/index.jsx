import { useState } from "react";
import { Header } from "../../header";
import { Sidebar } from "../../sidebars";
import { Outlet, Navigate } from "react-router-dom"; // Import Navigate
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { RightSidebar } from "../../sidebars/rightSidebar";

export const PrimaryLayout = () => {
  const [collapse, setCollapse] = useState(false);
  const [phoneCollapse, setPhoneCollapse] = useState(true);
  // const sidebarClassName = useSelector((state) => state.theme.sidebarClassName);
  const sidebarClassName = "";
  // profile = //useSelector((state) => state.auth);
  let userInfo = localStorage.getItem("userInfo");
  // if (!userInfo) {
  //   return <Navigate to="/sign-in" />;
  // }

  // 

  return (
    <div className="w-full">
      <Header
        className={"sticky top-0 left-0"}
        collapse={collapse}
        setCollapse={setCollapse}
      />
      <div
        className={`w-full flex page-body-wrapper lg:px-4 md:px-2 sm:px-2 dark:dark:bg-slate-800`}
      >
        <Sidebar
          className={`${
            sidebarClassName ? sidebarClassName : ""
          } hidden lg:block max-w-48 fixed top-4 bottom-4 left-10 z-[1001] bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100`}
        />
        <Sidebar
          className={`${sidebarClassName ? sidebarClassName : ""} ${
            collapse ? "block" : "hidden"
          } lg:hidden max-w-48 fixed top-20 left-0 z-[1001] bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100`}
        />
        <motion.div
          initial={{ left: "-50%" }}
          animate={{ left: 0, transition: { duration: 0.3 } }}
          exit={{ left: "-50%", transition: { duration: 0.3 } }}
          className={`lg:ps-48 w-full overflow-hidden`}
        >
          <motion.div className="px-4 lg:pr-0 bg-[#ffffff] dark:dark:bg-slate-800 flex gap-5">
            <div className="w-full md:w-3/4">
              <Outlet />
            </div>
            <RightSidebar
              className={
                "w-full md:w-1/4 hidden md:flex flex-col gap-4 md:sticky top-0 right-0"
              }
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
