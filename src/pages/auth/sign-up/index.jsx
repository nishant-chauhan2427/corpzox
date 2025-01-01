import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Input } from "../../../components/inputs";
import { Button } from "../../../components/buttons";
import { Heading } from "../../../components/heading";
import { MetaTitle } from "../../../components/metaTitle";
import { signUpValidationSchema } from "../../../validation/authValidatiorSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { MdOutlineHorizontalRule } from "react-icons/md";
import { FaFacebookSquare, FaGoogle, FaInstagramSquare } from "react-icons/fa";
import { DualHeadingTwo } from "../components/dualHeading/dualHeadingTwo";
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import { setUser } from "../../../redux/slices/userLoginSlice";
import { Checkbox } from "../../../components/inputs/checkbox";
import { ThemeSwitch } from "../../../components/theme/switch";
import { AuthLayout } from "../../../components/layout/auth";
import { PhoneNumberInput } from "../../../components/inputs/phoneInput";
import {
  registerUser,
  thirdPartyLogin,
} from "../../../redux/actions/userAuth-action";
import toast from "react-hot-toast";
import GoogleLogin from "react-google-login";
import { setRedirectTo } from "../../../redux/slices/appSlice";
import { updateEmail } from "../../../redux/slices/userAuth-slice";
export const Signup = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    setFieldValue,
    reset,
  } = useForm({
    resolver: yupResolver(signUpValidationSchema),
    mode: "onChange",
  });
  const recaptchaRef = useRef(null);
  const RECAPTCHA_SITE_KEY = "6LemSE0qAAAAADhn4nN770nVLBJxAGRz_LoFXP6h";
  const {
    isRegistering = false,
    registeringError,
    registerMessage,
    profile,
  } = useSelector((state) => state.auth);

  // Corrected handleBlur function
  const handleBlur = async (field) => {
    //console.log("field", field);
    await trigger(field); // This will trigger validation for the field that is blurred
  };

  const googleLogin = (data) => {
    setIsSubmit(true);
    console.log(data,"GOOGLE");
    dispatch(
      thirdPartyLogin({
        email: data?.profileObj?.email,
        name: data?.profileObj?.givenName,
        profilePicture: data?.profileObj?.imageUrl,
      })
    );
   // setIsSubmit(false);
    reset();
  };

  const [error, setError] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [emailSignUp, setEmailSignUp] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    
    setIsSubmit(true);
    // if (data?.phone) {
    //  // console.log(data?.phone,"data?.phone");
    //   console.log(data?.phone,"data?.phone");
    //   data.countryCode = `+${data.phone.toString().slice(0, 2)}`;
    //   data.phone = +data.phone.toString().slice(2);
    // }
    //console.log(data);
    // Reset error message
    setError("");

    // const token = await recaptchaRef.current.executeAsync().then((res) => {
    //   console.log("check response ", res);
    //   data = { ...data, recaptchaToken: res, userType: "end_user" };
    //   console.log(data, "data from form");
    //   dispatch(loginUser(data));
    // });
    const token = await recaptchaRef.current.executeAsync().then((res) => {
      const userData = {
        ...data,
        countryCode:`+${data.phone.toString().slice(0, 2)}`,
        phone:+data.phone.toString().slice(2),
        firstName: data.full,
        recaptchaToken: res,
      };
      // console.log("data?.phone",data?.phone);
      // console.log(userData,"userData");
      delete userData.full;
      setEmailSignUp(data.email);
      dispatch(updateEmail(data.email));
      dispatch(registerUser(userData));
      // dispatch(registerUser(data));

      dispatch(setRedirectTo("verify"));
      //navigate("/verify", { state: { emailSign: data.email } })
      //console.log(data, "user data");
    });
  };

  useEffect(() => {
    if (!isRegistering && isSubmit) {
      setIsSubmit(false);
      if (registeringError) {
        toast.dismiss();
        toast.error(registeringError);
      } else {
        // reset();
        if (profile?.source == "GOOGLE") {
          navigate("/dashboard");
        } else {
          navigate("/verify");
        }
      }
    }
  }, [isRegistering, profile]);

  return (
    <>
      <MetaTitle title={"Sign Up"} />
      <AuthLayout>
        <img className="sm:w-32 w-36" src="logo.svg" alt="CORPZO Logo" />
        <div className="w-full  flex  ">
          <div className="w-full flex flex-col">
            <DualHeadingTwo
              containerClassName={"text-left pt-2"}
              heading={"Sign Up"}
              subHeading={"Welcome to CorpZO. Please sign up here!"}
            />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2 "
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-5">
                <Controller
                  name="full"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      {...field}
                      label={"Full name"}
                      type={"name"}
                      placeholder={"Full Name"}
                      className={"border-[#D9D9D9] border"}
                      errorContent={errors?.full?.message}
                      onBlur={() => handleBlur("full")}
                    />
                  )}
                />
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <PhoneNumberInput
                      {...field}
                      country={"in"}
                      placeholder={"Phone No."}
                      touched={true}
                      errorContent={errors?.phone?.message}
                      onBlur={() => handleBlur("phone")}
                      // onChange={(value, country) => {
                      //   // console.log("check country value", country?.dialCode,value);
                      //   if (country?.dialCode === value) {
                      //     setFieldError(
                      //       "phone",
                      //       "Please input Phone number"
                      //     );
                      //   }else{
                      //     setFieldValue("phone", value);
                      //   }
                       
                      // }}
                    />
                   
                  )}
                />
              </div>
              <div className="-mt-2 flex flex-col gap-3">
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      {...field}
                      label={"Email"}
                      type={"email"}
                      placeholder={"Email Id"}
                      className={"border-[#D9D9D9] border"}
                      errorContent={errors?.email?.message}
                      onBlur={() => handleBlur("email")}
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
                      errorContent={errors.password?.message}
                      onBlur={() => handleBlur("password")}
                      maxLength={20}
                    />
                  )}
                />

                <ReCAPTCHA
                  ref={recaptchaRef}
                  size="invisible"
                  sitekey={RECAPTCHA_SITE_KEY}
                />
              </div>

              <div className="flex flex-col gap-4 sm:pt-4">
                <Button
                  type={"submit"}
                  v2={true}
                  primary={true}
                  className={
                    "mt-2 py-3 w-full rounded-lg  text-[#0A1C40] font-semibold !border-none "
                  }
                  disabled={!isValid}
                  isLoading={isSubmit}
                >
                  Sign Up
                </Button>
                <div className="flex gap-2 items-center  ">
                  <div className="border-t w-full border-[#D9D9D9] "></div>
                  <p className="text-base text-[#6E6E6E] font-medium">or</p>
                  <div className="border-t w-full border-[#D9D9D9]"></div>
                </div>

                <div className="flex items-center justify-center rounded p-2 text-center !text-[#0A1C40] font-semibold border border-[#E6E8E7] !bg-white">
                  <div className="flex gap-2">
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
                          Sign Up with Google
                        </button>
                      )}
                    />
                  </div>
                </div>

                <div className="text-center flex  justify-center gap-2 font-normal text-[#6C6C6C]">
                  <p>
                    Already have an account?
                    <Link
                      to={"/sign-in"}
                      className="p-2 text-[#F1359C] font-semibold "
                    >
                      Login
                    </Link>
                  </p>
                </div>
                {error && (
                  <div className="text-red-500 mt-2 text-center">{error}</div>
                )}
              </div>
            </form>
          </div>
        </div>
      </AuthLayout>
    </>
  );
};
