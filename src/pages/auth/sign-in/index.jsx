import { useRef, useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Input } from "../../../components/inputs";
import { Button } from "../../../components/buttons";
import { Heading } from "../../../components/heading";
import { MetaTitle } from "../../../components/metaTitle";
// import { signinValidator } from "../../../validation/auth-validator";
import { yupResolver } from "@hookform/resolvers/yup";
import { MdOutlineHorizontalRule } from "react-icons/md";
import { FaFacebookSquare, FaGoogle, FaInstagramSquare } from "react-icons/fa";
import { DualHeadingTwo } from "../components/dualHeading/dualHeadingTwo";
// import { setUser } from "../../../redux/slices/userLoginSlice";
import { Checkbox } from "../../../components/inputs/checkbox";
// import { ThemeSwitch } from "../../../components/theme/switch";
import { AuthLayout } from "../../../components/layout/auth";
import {loginUser} from '../../../redux/actions/userAuth-action';
import ReCAPTCHA from 'react-google-recaptcha';
import toast from "react-hot-toast";
export const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm({
    // resolver: yupResolver(signinValidator),
    mode: "onChange",
  });
  const recaptchaRef=useRef(null);
  const RECAPTCHA_SITE_KEY = '6LemSE0qAAAAADhn4nN770nVLBJxAGRz_LoFXP6h';
  const [isSubmit, setIsSubmit] = useState(false);
  const handleBlur = async (field) => {
    await trigger(field);
  };
  const { isLoggingIn=false,error ,loginMessage } = useSelector((state) => state.auth);
  
  // const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async(data) => {
    setIsSubmit(true);
    const token = await recaptchaRef.current.executeAsync().then((res) => {
      console.log("check response ", res)

      data = {...data, recaptchaToken: res }
      console.log(data, "data from form")
      dispatch(loginUser(data))

    })
    // let newData={...data};
    // newData.captcha=recaptchaRef.current;
    // console.log(newData, "data");
    // dispatch(loginUser(newData))
    // const superAdmin = {
    //   email: "superAdmin@gmail.com",
    //   password: "Super@1234",
    // };
    // const manager = {
    //   email: "runwallManager@gmail.com",
    //   password: "Manager@1234",
    // };
    // // Reset error message
    // setError("");

    // if (
    //   data.email === superAdmin.email &&
    //   data.password === superAdmin.password
    // ) {
    //   dispatch(setUser(superAdmin));
    //   navigate("/");
    // } else if (
    //   data.email === manager.email &&
    //   data.password === manager.password
    // ) {
    //   dispatch(setUser(manager));
    //   navigate("/");
    // } else {
    //   setError("Wrong email or password");
    // }
  };
  useEffect(()=>{
    if(!isLoggingIn&&isSubmit){
      setIsSubmit(false)
      if(error){
        toast.error(error)
      }else{
        toast.success(loginMessage)
        navigate('/verify');
      }
    }
    // console.log(isRegistering,isSubmit,registeringError)
  },[isLoggingIn])
  return (
    <>
      <MetaTitle title={"Sign In"} />
      <AuthLayout>
        <img className="sm:w-32 w-36" src="public\logo.svg" alt="CORPZO Logo" />
        <div className="w-full flex">
          <div className="w-full flex flex-col">
            <DualHeadingTwo
              containerClassName={"text-left pt-5"}
              heading={"Sign In"}
              subHeading={"Please Sign in to continue to your account."}
            />
            {/* <ThemeSwitch/> */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    label={"Email"}
                    type={"email"}
                    placeholder={"Email Id / Phone No."}
                    className={"border-[#D9D9D9] border"}
                    errorContent={errors?.email?.message}
                    onBlur={() => handleBlur("email")}
                  />
                )}
                // rules={{ required: "Email Address is required" }}
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
                    // errorContent={errors.password}
                    onBlur={() => handleBlur("password")}
                  />
                )}
                // rules={{ required: "Password is required" }}
              />
              <Link to={"/forgot-password"} className="font-medium text-base text-[#0A1C40]">
                Forgot Password?
              </Link>
              <ReCAPTCHA
                ref={recaptchaRef}
                size="invisible"
                sitekey={RECAPTCHA_SITE_KEY}
              />
              <div className="flex items-center font-normal text-base text-[#a5a3a3]">
                {" "}
                <Checkbox field /> Keep me Signed in
              </div>
              <Button
                type={"submit"}
                v2={true}
                mainPrimary={true}
                className={
                  "mt-2 py-2 w-full rounded-lg text-[#0A1C40] font-semibold !border-none "
                }
                disabled={!isValid}
              >
                Sign in
              </Button>
              {/* <Button
                type={"submit"}
                v2={true}
                mainPrimary={true}
                className={
                  "mt-2 py-2 w-full rounded-lg !text-[#6C6C6C] !border-[#B7B7B7] !bg-white"
                }
                disabled={!isValid}
              >
                Get an OTP on your Phone No.{" "}
              </Button> */}

              <div className="flex gap-2 items-center  ">
                <div className="border-t w-full border-[#D9D9D9] "></div>
                <p className="text-base text-[#6E6E6E] font-medium">or</p>
                <div className="border-t w-full border-[#D9D9D9]"></div>
              </div>
              <div className="flex items-center justify-center rounded p-2  text-center !text-[#232323] font-semibold border border-[#E6E8E7] !bg-white">
                <p>Sign in with Google</p>
                <img src="" alt="" />
              </div>

              <div className="text-center flex  justify-center gap-2 font-normal text-[#6C6C6C]">
                <p>
                  Need an account?
                  <Link to={"/sign-up"} className="p-2 text-[#F1359C] font-semibold ">
                    Create one
                  </Link>
                </p>
              </div>
              {error && (
                <div className="text-red-500 mt-2 text-center">{error}</div>
              )}
            </form>
            {/* Uncomment if needed
            <div className="text-center">
              Don't have an account?{" "}
              <span className="font-bold text-base underline cursor-pointer hover:text-primary hover:no-underline text-primaryBg">
                Sign up for free
              </span>
            </div>
            <div className="flex text-center justify-center items-center font-semibold text-[#858181]">
              <MdOutlineHorizontalRule />
              <MdOutlineHorizontalRule />
              <MdOutlineHorizontalRule />
              Or Sign up With
              <MdOutlineHorizontalRule />
              <MdOutlineHorizontalRule />
              <MdOutlineHorizontalRule />
            </div>
            <div className="flex cursor-pointer justify-center items-center gap-3 text-2xl">
              <FaFacebookSquare color="#884EA7" />
              <FaGoogle color="#884EA7" />
              <FaInstagramSquare color="#884EA7" />
            </div>
            */}
          </div>
        </div>
      </AuthLayout>
    </>
  );
};
