import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Input } from "../../../components/inputs";
import { Button } from "../../../components/buttons";
import { MetaTitle } from "../../../components/metaTitle";
import { MdOutlineHorizontalRule } from "react-icons/md";
import { FaFacebookSquare, FaGoogle, FaInstagramSquare } from "react-icons/fa";
import { DualHeadingTwo } from "../components/dualHeading/dualHeadingTwo";
import { Checkbox } from "../../../components/inputs/checkbox";
import { AuthLayout } from "../../../components/layout/auth";
import {
  loginUser,
  thirdPartyLogin,
} from "../../../redux/actions/userAuth-action";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";
import { signinValidationSchema } from "../../../validation/authValidatiorSchema";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { yupResolver } from "@hookform/resolvers/yup";

export const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: yupResolver(signinValidationSchema),
    mode: "onSubmit",
  });
  const recaptchaRef = useRef(null);
  const RECAPTCHA_SITE_KEY = "6LemSE0qAAAAADhn4nN770nVLBJxAGRz_LoFXP6h";
  const [isSubmit, setIsSubmit] = useState(false);

  const {
    isLoggingIn = false,
    error,
    loginMessage,
    profile,
  } = useSelector((state) => state.auth);
  console.log(profile,1234567891);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checkedCheckbox, setCheckedCheckbox] = useState(false);

  const handleCheckbox = (e) => {
    e.preventDefault();
    setCheckedCheckbox(!checkedCheckbox);
    if (checkedCheckbox) {
      localStorage.removeItem("signedIn");
    } else {
      localStorage.setItem("signedIn", true);
    }
  };

  const phoneRegex = /^[6-9]\d{9}$/; // Regex for a valid 10-digit mobile number
  const emailOrPhone = watch("email"); // Watch the 'email' field

  const onSubmit = async (data) => {
    setIsSubmit(true);

    // Check if the input is a phone number or email
    const isPhoneNumber = phoneRegex.test(emailOrPhone);
    if (isPhoneNumber) {
      data.phone = emailOrPhone; // Send phone number to the server
      delete data.email; // Remove email if it's a phone number
    } else {
      data.email = emailOrPhone; // Send email to the server
      delete data.phone; // Remove phone if it's an email
    }

    const token = await recaptchaRef.current.executeAsync().then((res) => {
      console.log("check response ", res);
      data = { ...data, recaptchaToken: res, userType: "end_user" };
      console.log(data, "data from form");
      dispatch(loginUser(data));
    });
  };

  useEffect(() => {
    if (!isLoggingIn && isSubmit) {
      setIsSubmit(false);
      if (error) {
        toast.error(error);
      } else {
        if (profile?.source == "GOOGLE") {
          navigate("/dashboard");
        } else {
          navigate("/verify");
        }
      }
    }
    console.log(isLoggingIn, isSubmit, profile);
  }, [isLoggingIn]);

  const googleLogin = (data) => {
    setIsSubmit(true);
    dispatch(
      thirdPartyLogin({
        email: data?.profileObj?.email,
        name: data?.profileObj?.givenName,
        profilePicture: data?.profileObj?.imageUrl,
      })
    );
  };

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.client.init({
        clientId:
          "1028618978770-l4is0dsn2rtk3ig0k15aqgvvhtfd6qas.apps.googleusercontent.com",
        scope: "",
      });
    });
  });

  return (
    <>
      <MetaTitle title={"Sign In"} />
      <AuthLayout>
        <img className="sm:w-32 w-36" src="logo.svg" alt="CORPZO Logo" />
        <div className="w-full flex">
          <div className="w-full flex flex-col ">
            <DualHeadingTwo
              containerClassName={"text-left pt-2"}
              heading={"Sign In"}
              subHeading={"Please Sign in to continue to your account."}
            />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3 pt-5"
            >
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Email or Phone"
                    type="text"
                    placeholder="Email Id / Phone No."
                    className="border-[#D9D9D9] border"
                    errorContent={errors?.email?.message}
                    maxLength={50}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    label={"Password"}
                    type={"password"}
                    className={"border-[#D9D9D9] border"}
                    placeholder={"Password"}
                    maxLength={20}
                    errorContent={errors?.password?.message}
                  />
                )}
                rules={{ required: "Password is required" }}
              />
              <Link
                to={"/forgot-password"}
                state={{ email: emailOrPhone }}  // Passing email/phone as state
                className="flex font-medium cursor-default text-base text-[#0A1C40]"
              >
                <div className="cursor-default"> <p className="cursor-pointer">Forgot Password?</p> </div>
              </Link>
              <ReCAPTCHA
                ref={recaptchaRef}
                size="invisible"
                sitekey={RECAPTCHA_SITE_KEY}
              />
              <div
                onClick={handleCheckbox}
                className="flex items-center font-normal text-[14px] text-[#a5a3a3] -mt-2 gap-2"
              >
                <Checkbox
                  checked={checkedCheckbox}
                  onClick={(e) => e.stopPropagation()}
                  onChange={handleCheckbox}
                />
                <div>
                  <span
                    className={`${
                      checkedCheckbox
                        ? "text-[#000] cursor-pointer "
                        : "text-[#a5a3a3] cursor-pointer"
                    }`}
                  >
                    Keep me Signed in
                  </span>
                </div>
              </div>
              <Button
                type={"submit"}
                primary={true}
                className={
                  "mt-2 py-3 w-full rounded-lg text-[#0A1C40] font-semibold !border-none "
                }
                isLoading={isSubmit}
              >
                {phoneRegex.test(emailOrPhone)
                  ? "Get an OTP on your Phone No."
                  : "Sign in"}
              </Button>

              <div className="flex gap-2 items-center">
                <div className="border-t w-full border-[#D9D9D9]" />
                <p className="text-base text-[#6E6E6E] font-medium">or</p>
                <div className="border-t w-full border-[#D9D9D9]" />
              </div>

              <div className="flex items-center justify-center rounded p-2 text-center !text-[#232323] font-semibold border border-[#E6E8E7] !bg-white">
                <GoogleLogin
                  clientId="1028618978770-l4is0dsn2rtk3ig0k15aqgvvhtfd6qas.apps.googleusercontent.com"
                  onSuccess={googleLogin}
                  onError={() => console.log("Errors")}
                  cookiePolicy={"single_host_origin"}
                  scope="openid profile email"
                  render={(renderProps) => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className="flex items-center gap-2"
                    >
                      <img
                        src="google.svg"
                        alt="Google Logo"
                        className="w-5 h-5"
                      />
                      Sign in with Google
                    </button>
                  )}
                />
              </div>
              <div className="text-center flex justify-center gap-2 font-normal text-[#6C6C6C]">
                <p>
                  Need an account?
                  <Link
                    to={"/sign-up"}
                    className="p-2 text-[#F1359C] font-semibold "
                  >
                    Create one
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </AuthLayout>
    </>
  );
};
