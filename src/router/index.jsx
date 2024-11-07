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
import { Dashboard } from "../pages/dashboard";
import { Signup } from "../pages/auth/sign-up";
import { CreateNewPassword } from "../pages/auth/create-new-password";
import ServicesListing from "../pages/services/listing";

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
          //   {
          //     path: "verify-email",
          //     element: <EmailVerification />,
          //   },
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
          {
            path: "services-listing",
            element: <ServicesListing />,
          },
        ],
      },
    ],
  },
]);

export const RouterConfigration = () => {
  return <RouterProvider router={router} />;
};
