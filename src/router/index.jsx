import App from "../App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home";
import { SignIn } from "../pages/auth/sign-in";
import { Verify } from "../pages/auth/verify";
import { ForgotPassword } from "../pages/auth/forgot-password";
import { ErrorComponent } from "../components/error";
import { AuthWrapper } from "./authWrapper";
import { IsLoggedInWrapper } from "./isLoggedInWrapper";
import { IsRedirectWrapper } from "./isRedirectWrapper";
import { PrimaryLayout } from "../components/layout/primary";
import { Signup } from "../pages/auth/sign-up";
import { CreateNewPassword } from "../pages/auth/create-new-password";
import Dashboard from "../pages/dashboard";
import ServicesListing from "../pages/services/listing";
import ServiceDetail from "../pages/services/detail";
import BusinessListing from "../pages/business/listing";
import BusinessDetail from "../pages/business/detail";
import MakeAPayment from "../pages/payment/makeAPayment";
import CreateBusiness from "../pages/business/createEdit";
import SelectBusiness from "../pages/payment/selectBusiness";
import BusinessPreview from "../pages/business/preview";
import FundraiseListing from "../pages/fundraise/listing";
import InvestmentListing from "../pages/investment/listing";
import DocumentsListing from "../pages/documents/listing";
import ChangePassword from "../pages/settings/changePassword";
import PreviewPayment from "../pages/payment/previewPayment";
import DeactivateAccount from "../pages/settings/deactivateAccount";
import SubscriptionHistory from "../pages/settings/subscriptionHistory";
import Settings from "../pages/settings";
import History from "../pages/payment/history";
import Profile from "../pages/profile";
import ProfileEdit from "../pages/profile/editProfile";
import Wishlist from "../pages/wishlist";
import Payments from "../pages/payment";
import DocumentDetail from "../pages/documents/detail";
import OffersDetails from "../pages/offers/components";
import ServiceprogressViewAll from "../pages/services/serviceProgressViewAll";

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
              },
              {
                path: "edit",
                element: <CreateBusiness />,
              },
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
          // Services routes
          {
            path: "services",
            children: [
              {
                index: true,
                element: <ServicesListing />,
              },
              {
                path: "create/:serviceId",
                element: <ServiceDetail />,
              },
              {
                path: "edit/:serviceId",
                element: <ServiceDetail />,
              },
              {
                path: "detail/:serviceId",
                element: <ServiceDetail />,
              },
              {
                path: "serviceprogressdetail",
                element: <ServiceprogressViewAll />,
              },
            ],
          },
          // Payment route
          {
            path: "payment",
            element: <Payments />,
            children: [
              {
                path : ":serviceId",
                element: <MakeAPayment />,
              },
              {
                path: "create",
                element: <SelectBusiness />,
              },
              {
                path: "preview",
                element: <PreviewPayment />,
              },
              {
                path: "history",
                element: <History />,
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
          // Investment route
          {
            path: "investment",
            children: [
              {
                index: true,
                element: <InvestmentListing />,
              },
            ],
          },
          // Documents route
          {
            path: "documents",
            children: [
              {
                index: true,
                element: <DocumentsListing />,
              },
              
              {
                path: "detail/:id",
                element: <DocumentDetail />,
              },
            ],
          },
          // Settings route
          {
            path: "settings",
            element: <Settings />,
            children: [
              {
                index: true,
                element: <ChangePassword />,
              },
              {
                index: "change-password",
                element: <ChangePassword />,
              },
              {
                path: "deactivate-account",
                element: <DeactivateAccount />,
              },
              {
                path: "subscription-history",
                element: <SubscriptionHistory />,
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
          // Wishlist route
          {
            path: "wishlist",
            children: [
              {
                index: true,
                element: <Wishlist />,
              },
            ],
          },
          {
            path: "offersDetails",
            children: [
              {
                index: true,
                element: <OffersDetails />,
              },
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
