import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Input } from "../../../components/inputs";
import { Button } from "../../../components/buttons";
import { MetaTitle } from "../../../components/metaTitle";
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
import { setIsSignedIn, setRedirectTo } from "../../../redux/slices/appSlice";

export const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: yupResolver(signinValidationSchema),
    mode: "onChange",
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checkedCheckbox, setCheckedCheckbox] = useState(false);
  console.log(checkedCheckbox, "prev");

  const handleCheckbox = (e) => {
    e.preventDefault();
    // console.log(checkedCheckbox, "check 1");
    setCheckedCheckbox((prev) => !prev);

    // if (checkedCheckbox) {
    //   localStorage.removeItem("signedIn");
    //   setIsSignedIn(true)
    // } else {
    //   localStorage.setItem("signedIn", true);
    //   // setIsSignedIn(true)
    // }
  };

  console.log(checkedCheckbox, "checkbox");

  const phoneRegex = /^[1-9][0-9]{8,11}$/;
  const emailOrPhone = watch("email"); // Watch the 'email' field

  const onSubmit = async (data) => {
    setIsSubmit(true);
    let transformedData = {};
    const isPhoneNumber = phoneRegex.test(emailOrPhone);
    if (isPhoneNumber) {
      transformedData.phone = emailOrPhone;
      transformedData.password = data.password;
    } else {
      transformedData.email = emailOrPhone;
      transformedData.password = data.password;
    }

    const token = await recaptchaRef.current.executeAsync().then((res) => {
      data = { ...transformedData, recaptchaToken: res, userType: "end_user" };
      dispatch(loginUser(data));
    });
    dispatch(setIsSignedIn(checkedCheckbox));
    dispatch(setRedirectTo("verify"));
  };

  useEffect(() => {
    if (!isLoggingIn && isSubmit) {
      setIsSubmit(false);
      if (error) {
        toast.dismiss();
        toast.error(error);
      } else {
        if (profile?.source == "GOOGLE") {
          navigate("/dashboard");
        } else {
          navigate("/verify");
        }
      }
    }
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
                    // maxLength={50}
                    maxLength={phoneRegex.test(emailOrPhone) ? 12 : 50}
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
                state={{ email: emailOrPhone }} // Passing email/phone as state
                className="font-medium text-base text-[#0A1C40]"
              >
                <div>
                  {" "}
                  <a>Forgot Password?</a>
                </div>
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
                disabled={!isValid}
                isLoading={isSubmit}
              >
                {/* {phoneRegex.test(emailOrPhone)
                  ? "Sign in"
                  : "Sign in"} */}
                Sign in
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
                  prompt="select_account"
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
                  Don’t have an account yet?
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
