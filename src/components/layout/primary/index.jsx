import { useState } from "react";
import { Header } from "../../header";
import { Sidebar } from "../../sidebars";
import { Outlet, Navigate } from "react-router-dom"; // Import Navigate
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export const PrimaryLayout = () => {
  const [collapse, setCollapse] = useState(false);
  const [phoneCollapse, setPhoneCollapse] = useState(true);
  // const sidebarClassName = useSelector((state) => state.theme.sidebarClassName);
  const sidebarClassName = "bg-red-500";
  // profile = //useSelector((state) => state.auth);
  let userInfo=localStorage.getItem('userInfo');
  // if (!userInfo) {
  //   return <Navigate to="/sign-in" />;
  // }

  return (
    <div className="w-full">
      <Header
        className={"sticky top-0 left-0"}
        collapse={collapse}
        setCollapse={setCollapse}
      />
      <div className={`w-full flex page-body-wrapper lg:px-4 md:px-2 sm:px-2 dark:dark:bg-slate-800`}>
        <Sidebar
          collapse={collapse}
          setCollapse={setCollapse}
          className={`${sidebarClassName ? sidebarClassName : ""} ${!collapse ? "min-w-60 min-h-screen" : "min-h-screen"
            } hidden lg:block fixed top-4 left-10 px-8 py-4 z-[1001] bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100`}
        />
        {/* <Sidebar
          collapse={phoneCollapse}
          setCollapse={setPhoneCollapse}
          className={`${sidebarClassName ? sidebarClassName : ""} ${!phoneCollapse ? "min-w-60 min-h-screen" : "min-h-screen"
            } block lg:hidden fixed top-4 left-0 px-8 py-4 z-[1001] bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100`}
        /> */}
        <motion.div
          initial={{ left: "-50%" }}
          animate={{ left: 0, transition: { duration: 0.3 } }}
          exit={{ left: "-50%", transition: { duration: 0.3 } }}
          className={`lg:ps-60 w-full overflow-hidden`}
        >
          <motion.div className="page-body bg-[#ffffff] dark:dark:bg-slate-800 px-4">
            <Outlet />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
