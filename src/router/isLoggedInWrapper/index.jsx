import { Outlet } from "react-router-dom";
import { useLocation,Navigate } from "react-router-dom";
export const IsLoggedInWrapper = () => {
  const location = useLocation();
  let userInfo=null
  try {
   userInfo=JSON.parse(localStorage.getItem('userInfo'))?.token;
  } catch (error) {
    userInfo=null;
  }
  let signedInFlag=localStorage.getItem('signedIn');
  if (signedInFlag&&userInfo&&(location.pathname.includes('sign-in')||location.pathname.includes('sign-up')||location.pathname.includes('forgot-password')||location.pathname.includes('verify'))) {
    return <Navigate to="/dashboard" />;
  }
  return <Outlet />;
};
