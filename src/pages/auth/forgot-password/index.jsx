import React, { useState, useRef, useEffect } from "react";
import { Input } from "../../../components/inputs";
import { Button } from "../../../components/buttons";
import { Controller, useForm } from "react-hook-form";
import { AuthLayout } from "../../../components/layout/auth";
import { DualHeadingTwo } from "../components/dualHeading/dualHeadingTwo";
import { MetaTitle } from "../../../components/metaTitle";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordSchema } from "../../../validation/authValidatiorSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { resendOtp, verifyUser } from "../../../redux/actions/userAuth-action";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";
import { setRedirectTo } from "../../../redux/slices/appSlice";

export const ForgotPassword = () => {
  const location = useLocation();
  const emailOrPhone = location.state?.email;
  const [timer, setTimer] = useState(30); 
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    mode: "onChange",
  });
  const [isOtpScreen, setIsOtpScreen] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const {
    isVerifying = false,
    verifyingError,
    verifyMessage,
    resendingOtp,
    profile,
  } = useSelector((state) => state.auth);
  const [otpMessage, setOtpMessage] = useState("");


  localStorage.setItem("forgotPassword", true);
  useEffect(() => {
    if (emailOrPhone) {
      setValue("email", emailOrPhone); // Set the email in the form if passed
    }
  }, [emailOrPhone, setValue]);

  useEffect(() => {
    if (isOtpScreen && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [isOtpScreen]);

  useEffect(() => {
    if (timer === 0 || timer == "00") {
      setIsResendDisabled(false);
    } else {
      setIsResendDisabled(true);
      const countdown = setTimeout(() => {
        setTimer(
          (timer - 1).toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })
        );
      }, 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  useEffect(() => {
    if (isVerify && !isVerifying) {
      setIsVerify(false);
      if (verifyingError) {
        setOtpMessage(verifyingError);
      } else {
        navigate("/create-new-password");
      }
    }
  }, [isVerifying]);

  useEffect(() => {
    if (otpMessage) {
      const timer = setTimeout(() => {
        setOtpMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [otpMessage]);
  
  const handleEmailSubmit = (data) => {
    dispatch(resendOtp({data,navigate}));
    dispatch(setRedirectTo("verify"))
  };
  useEffect(() => {
    if (!isOtpScreen && resendingOtp) {
      setIsOtpScreen(true);
      setTimer(30);
    }
  }, [resendingOtp]);

  return (
    <>
      <MetaTitle title={isOtpScreen ? "Verify OTP" : "Forgot Password"} />
      <AuthLayout>
      {/* className="sm:w-32 w-36" */}
        <img  src="logo.svg" alt="CORPZO Logo" width={120} />
        <div className="w-full ">
          <div className="w-full">
            <div className="flex flex-col justify-between">
            <div>
                  <DualHeadingTwo
                    containerClassName={"text-left pt-2"}
                    heading={"Forgot Password"}
                    subHeading={
                      "Please enter your registered email id to reset password."
                    }
                  />
                  <form
                    onSubmit={handleSubmit(handleEmailSubmit)}
                    className="flex flex-col gap-7 pt-5"
                  >
                    <Controller
                      name="email"
                      control={control}
                      defaultValue={
                        profile?.[0]?.email
                          ? profile?.[0]?.email
                          : profile?.[0]?.phone
                      }
                      render={({ field }) => (
                        <Input
                          {...field}
                          label={"Email"}
                          type={"email"}
                          placeholder={"Email Id"}
                          className={"border-[#D9D9D9] border"}
                          errorContent={errors?.email?.message}
                          maxLength={50}
                        />
                      )}
                    />

                    <Button
                      type="submit"
                      primary={true}
                      className={
                        "mt-2 py-3 w-full rounded-lg  text-[#0A1C40] font-semibold !border-none "
                      }
                     // disabled={!isValid}
                      isLoading={resendingOtp}
                    >
                      Continue
                    </Button>
                  </form>
                </div>
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  );
};
