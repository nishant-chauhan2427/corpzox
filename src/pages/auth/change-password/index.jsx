import React, { useState, useRef, useEffect } from "react";
import { Input } from "../../../components/inputs";
import { Button } from "../../../components/buttons";
import { Controller, useForm } from "react-hook-form";
import { AuthLayout } from "../../../components/layout/auth";
import { DualHeadingTwo } from "../components/dualHeading/dualHeadingTwo";
import { MetaTitle } from "../../../components/metaTitle";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

export const ChangePassword = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const dispatch = useDispatch();
  const inputRefs = useRef([]);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();
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
    console.log("Submitted Email:", data.email);
    setIsOtpScreen(true);
    setTimer(30);
  };

  return (
    <>
      <MetaTitle title={isOtpScreen ? "Verify OTP" : "Reset Password"} />
      <AuthLayout>
        <img className=" w-36" src="public/logo.svg" alt="CORPZO Logo" />
        <div className="flex flex-col justify-between">
          {isOtpScreen ? (
            <div>
              <DualHeadingTwo
                containerClassName={"text-left pt-5"}
                heading={"Verification Code"}
                subHeading={
                  "We have sent you an OTP on your registered mobile no. and Email Id"
                }
              />
              <form
                onSubmit={handleOtpSubmit}
                className="w-full sm:w-[100%] sm:mt-8 flex flex-col gap-2"
              >
                <div className="w-full flex justify-start items-start gap-4 sm:pb-20">
                  {otp.map((digit, index) => (
                    <input
                      className={`${
                        errors ? "border-error" : "border-[#DFEAF2]"
                      } w-[15%] h-14 font-bold border rounded-lg text-center`}
                      key={index}
                      type="text"
                      maxLength="1"
                      value={digit}
                      ref={(ref) => (inputRefs.current[index] = ref)}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleBackspace(index, e)}
                      onPaste={index === 0 ? handlePaste : null}
                    />
                  ))}
                </div>
                <div className="w-full flex flex-col justify-center items-center">
                  <button
                    className={`text-xs text-primary disabled:text-[#8D8D8D]`}
                    onClick={handleResendOtp}
                    type="button"
                    disabled={isResendDisabled}
                  >
                    {timer > 0 ? (
                      <p className="!text-[#969696] font-normal text-sm">
                        Resend Code{" "}
                        <span className="!font-semibold text-[#FF2C9C] text-sm">
                          00:{timer}
                        </span>{" "}
                      </p>
                    ) : (
                      "Resend Code"
                    )}
                  </button>
                  <Button
                    type="submit"
                    v2={true}
                    mainPrimary={true}
                    className="mt-2 py-2 w-full rounded-lg text-[#0A1C40] font-semibold !border-none"
                  >
                    Continue
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <DualHeadingTwo
                containerClassName={"text-left pt-5"}
                heading={"Reset Password"}
                subHeading={
                  "Please enter your registered email id to reset password."
                }
              />
              <form
                onSubmit={handleSubmit(handleEmailSubmit)}
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
                      placeholder={"Email Id"}
                      className={"border-[#D9D9D9] border"}
                      errorContent={errors?.email?.message}
                    />
                  )}
                />
                <Button
                  type="submit"
                  v2={true}
                  mainPrimary={true}
                  className="mt-2 py-2 w-full rounded-lg text-[#0A1C40] font-semibold !border-none"
                  disabled={!isValid}
                >
                  Continue
                </Button>
                <div className="flex gap-2 items-center  ">
                  <div className="border-t w-full border-[#D9D9D9] "></div>
                  <p className="text-base text-[#6E6E6E] font-medium">or</p>
                  <div className="border-t w-full border-[#D9D9D9]"></div>
                </div>
                <div className="flex items-center justify-center rounded p-2  text-center !text-[#232323] font-semibold border border-[#E6E8E7] !bg-white">
                  <p>Sign in with Google</p>
                  <img src="" alt="" />
                </div>
              </form>
            </div>
          )}
          <div className="text-center flex justify-center gap-2 pt-20 font-normal text-[#6C6C6C]">
            <p>
              Need an account?
              <Link className="p-2 text-[#F1359C] font-semibold ">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </AuthLayout>
    </>
  );
};
