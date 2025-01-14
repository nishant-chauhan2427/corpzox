import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../App";
import { ErrorComponent } from "../components/error";
import { PrimaryLayout } from "../components/layout/primary";
import { CreateNewPassword } from "../pages/auth/create-new-password";
import { ForgotPassword } from "../pages/auth/forgot-password";
import { SignIn } from "../pages/auth/sign-in";
import { Signup } from "../pages/auth/sign-up";
import { Verify } from "../pages/auth/verify";
import CreateBusiness from "../pages/business/createEdit";
import { AddressDetails } from "../pages/business/createEdit/components/address";
import { FinancialDetails } from "../pages/business/createEdit/components/financial";
import { FundingDetails } from "../pages/business/createEdit/components/funding";
import { KYCDetails } from "../pages/business/createEdit/components/kyc";
import { RegistrationDetails } from "../pages/business/createEdit/components/registration";
import BusinessDetail from "../pages/business/detail";
import BusinessListing from "../pages/business/listing";
import BusinessPreview from "../pages/business/preview";
import Dashboard from "../pages/dashboard";
import FundraiseListing from "../pages/fundraise/listing";
import HomePage from "../pages/home";
import Profile from "../pages/profile";
import ProfileEdit from "../pages/profile/editProfile";
import { AuthWrapper } from "./authWrapper";
import { IsLoggedInWrapper } from "./isLoggedInWrapper";
import { IsRedirectWrapper } from "./isRedirectWrapper";
import IntroVideo from "../pages/auth/introVideo";
import SelectUserType from "../pages/auth/selectUserType";
import SelectUserRole from "../pages/auth/selectUserRole";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorComponent />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/*",
        element: <ErrorComponent />,
      },
      //protected routes
      {
        path: "/",
        element: <AuthWrapper />,
        children: [],
      },
      //   isLoggedIn route
      {
        path: "/",
        element: <IsLoggedInWrapper />,
        children: [
          {
            path: "sign-in",
            element: <SignIn />,
          },
          {
            path: "sign-up",
            element: <Signup />,
          },
          {
            path: "forgot-password",
            element: <ForgotPassword />,
          },
          {
            path: "create-new-password",
            element: <CreateNewPassword />,
          },
          {
            path: "verify",
            element: <Verify />,
          },
          {
            path: "intro-video",
            element: <IntroVideo />,
          },
          {
            path: "select-user-role",
            element: <SelectUserRole/>,
          },
          {
            path: "select-user-type",
            element: <SelectUserType />,
          },
          
        ],
      },
      //redirect check
      {
        path: "/",
        element: <IsRedirectWrapper />,
        children: [
          // {
          //   path: "verify-email",
          //   element: <EmailVerification />,
          // },
        ],
      },
      // Main Layout Wrapper
      {
        path: "/",
        element: <PrimaryLayout />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          // Business routes
          {
            path: "business",
            children: [
              {
                index: true,
                element: <BusinessListing />,
              },

              {
                path: "create",
                element: <CreateBusiness />,
                children: [
                  { index: true, element: <RegistrationDetails /> }, // Default child for /create
                  { path: "registration", element: <RegistrationDetails /> },
                  { path: "address", element: <AddressDetails /> },
                  { path: "financial", element: <FinancialDetails /> },
                  { path: "kyc", element: <KYCDetails /> },
                  { path: "funding", element: <FundingDetails /> },
                ],
              },
              {
                path: "edit",
                element: <CreateBusiness isEdit={true} />,
                children: [
                  {
                    index: true,
                    element: <RegistrationDetails isEdit={true} />,
                  }, // Default child for /edit
                  {
                    path: "registration",
                    element: <RegistrationDetails isEdit={true} />,
                  },
                  {
                    path: "address",
                    element: <AddressDetails isEdit={true} />,
                  },
                  {
                    path: "financial",
                    element: <FinancialDetails isEdit={true} />,
                  },
                  { path: "kyc", element: <KYCDetails isEdit={true} /> },
                  {
                    path: "funding",
                    element: <FundingDetails isEdit={true} />,
                  },
                ],
              },
              // {
              //   path: "edit",
              //   element: <CreateBusiness isEdit={true} />,
              // },
              {
                path: "preview",
                element: <BusinessPreview />,
              },
              {
                path: "detail",
                element: <BusinessDetail />,
              },
            ],
          },
          // Fundraise route
          {
            path: "fundraise",
            children: [
              {
                index: true,
                element: <FundraiseListing />,
              },
            ],
          },
                    // Profile route
          {
            path: "profile",
            children: [
              {
                index: true,
                element: <Profile />,
              },
              {
                path: "edit",
                element: <ProfileEdit />,
              },
            ],
          },
          // Corpzo-X route
      
      {
        path: "/",
        // element: <AuthLayout />,
        children: [
         
          // {
          //   path: "intro-video",
          //   element: <IntroVideo />,
          // },
          // {
          //   path: "select-user",
          //   element: <SelectUser />,
          // },
          // {
          //   path: "investor-profile",
          //   element: <InvestorProfile />,
          // },
        ],
      },
        ],
      },
    ],
  },
]);

export const RouterConfigration = () => {
  return <RouterProvider router={router} />;
};
