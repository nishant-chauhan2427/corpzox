// import { Outlet } from "react-router-dom";
// import { useLocation,Navigate } from "react-router-dom";
// export const IsLoggedInWrapper = () => {
//   const location = useLocation();
//   let userInfo=null
//   try {
//    userInfo=JSON.parse(localStorage.getItem('userInfo'))?.token;
//   } catch (error) {
//     userInfo=null;
//   }
//   let signedInFlag=userInfo.token
//   if (signedInFlag&&userInfo&&(location.pathname.includes('sign-in')||location.pathname.includes('sign-up')||location.pathname.includes('forgot-password')||location.pathname.includes('verify'))) {
//     return <Navigate to="/dashboard" />;
//   }
//   return <Outlet />;
// };

import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useLocation, Navigate } from "react-router-dom";

export const IsLoggedInWrapper = () => {
  const location = useLocation();
  const [signedInFlag, setSignedInFlag] = useState(false);

  useEffect(() => {
    let userInfo = null;
    try {
      userInfo = JSON.parse(localStorage.getItem('userInfo'))?.token;
    } catch (error) {
      userInfo = null;
    }
  
    setSignedInFlag(!!userInfo);
  }, []); 
  if (signedInFlag && (location.pathname.includes('sign-in') || location.pathname.includes('sign-up') || location.pathname.includes('forgot-password') || location.pathname.includes('verify'))) {
    return <Navigate to="/dashboard" />;
  }
  return <Outlet />;
};

