import React, { useState, useRef, useEffect } from "react";
import { Input } from "../../../components/inputs";
import { Button } from "../../../components/buttons";
import { Controller, useForm } from "react-hook-form";
import { AuthLayout } from "../../../components/layout/auth";
import { DualHeadingTwo } from "../components/dualHeading/dualHeadingTwo";
import { MetaTitle } from "../../../components/metaTitle";
import { Link ,useNavigate} from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";
import {createNewPasswordSchema} from '../../../validation/authValidatiorSchema';
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPassword } from "../../../redux/actions/userAuth-action";
import toast from "react-hot-toast";
export const CreateNewPassword = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const [isVerify, setIsVerify] = useState(false);
  const { changingPassword=false,changedPasswordMessage,changingPasswordError,profile ,} = useSelector((state) => state.auth);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(createNewPasswordSchema),
    mode: "onChange",
  });
  const [isOtpScreen, setIsOtpScreen] = useState(false);

  useEffect(() => {
    if (timer === 0) {
      setIsResendDisabled(false);
    } else {
      setIsResendDisabled(true);
      const countdown = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);
  useEffect(()=>{
    if(isVerify&&!changingPassword){
     setIsVerify(false);
     if(changingPasswordError){
       toast.error(changingPasswordError);
     }else{
       toast.success(changingPasswordError);
       navigate('/sign-in')
     }
    }
   },[changingPassword])
  const handleChange = (index, value) => {
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value !== "" && index < 4) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleBackspace = (index, e) => {
    if (e.key === "Backspace" && index >= 0) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    if (/^\d{4}$/.test(paste)) {
      const newOtp = paste.split("");
      setOtp(newOtp);
      setTimeout(() => {
        newOtp.forEach((_, index) => {
          inputRefs.current[index].focus();
          inputRefs.current[index].blur();
        });
        inputRefs.current[4].focus();
      }, 0);
    }
    e.preventDefault();
  };

  const handleResendOtp = (event) => {
    event.preventDefault();
    setTimer(30);
    dispatch(
      resendOtp({
        email: email,
      })
    );
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    console.log("Entered OTP:", enteredOtp);
    // Add further OTP validation logic here
  };

  const handleEmailSubmit = (data) => {
    console.log("Submitted Email:", data,profile);
    setIsVerify(true);
    dispatch(resetPassword({
      userId: profile?.userId,
      newPassword: data.password,
    }))
  };

  return (
    <>
      <MetaTitle title={isOtpScreen ? "Verify OTP" : "Create New Password"} />
      <AuthLayout>
        <img className=" w-36" src="public/logo.svg" alt="CORPZO Logo" />
        <div className="flex flex-col justify-between">
          <DualHeadingTwo
            containerClassName={"text-left pt-5"}
            heading={"Create New Password"}
            // subHeading={"Please enter password."}
          />
          <form
            onSubmit={handleSubmit(handleEmailSubmit)}
            className="flex flex-col gap-2 pt-3 pb-2"
          >
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
                    // onBlur={() => handleBlur("password")}
                  />
                )}
                // rules={{ required: "Password is required" }}
              />
            <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    label={"Confirm Password"}
                    type={"password"}
                    className={"border-[#D9D9D9] border"}
                    placeholder={"Re-enter Password"}
                    errorContent={errors.confirmPassword?.message}
                    // onBlur={() => handleBlur("password")}
                  />
                )}
                // rules={{ required: "Password is required" }}
              />
            <Button
              type="submit"
              v2={true}
              primary={true}
              className="mt-2 py-2 w-full rounded-lg text-[#0A1C40] font-semibold !border-none"
              disabled={!isValid}
              isLoading={changingPassword}
            >
              Continue
            </Button>
            <div className="flex gap-2 items-center  ">
              <div className="border-t w-full border-[#D9D9D9] "></div>
              <p className="text-base text-[#6E6E6E] font-medium">or</p>
              <div className="border-t w-full border-[#D9D9D9]"></div>
            </div>
            <div className="flex items-center justify-center rounded p-2 gap-2 text-center !text-[#232323] font-semibold border border-[#E6E8E7] !bg-white">
              Sign in with Google <img src="google.svg" alt="" />
              <img src="" alt="" />
            </div>
          </form>
        </div>

        <div className="text-center flex justify-center gap-2 pt-20 font-normal text-[#6C6C6C]">
          <p>
            Need an account?
            <Link to={"/sign-up"} className="p-2 text-[#F1359C] font-semibold ">
              Create one
            </Link>
          </p>
        </div>
      </AuthLayout>
    </>
  );
};
