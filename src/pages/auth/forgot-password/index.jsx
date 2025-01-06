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

export const ForgotPassword = () => {
  const location = useLocation();
  const emailOrPhone = location.state?.email;
  const [otp, setOtp] = useState("");
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
        //toast.error(verifyingError);
        setOtpMessage(verifyingError);
      } else {
        // toast.success(verifyMessage);
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

  const handlePaste = (e) => {
    e.preventDefault(); // Prevent paste event
    toast.dismiss();
    toast.error("Pasting OTP is not allowed. Please enter the OTP manually.");
  };

  const handleResendOtp = (event) => {
    event.preventDefault();
    setTimer(30);
    setOtp("");
    dispatch(
      resendOtp({
        id: profile?.[0]?.id || profile?.id || profile?.userId,
      })
    );
  };

  // const handleOtpSubmit = (e) => {
  //   e.preventDefault();
  //   setIsVerify(true);
  //   const enteredOtp = otp.join("");
  //   setIsVerify(true);
  //   dispatch(verifyUser({ otp: enteredOtp, id: profile?.[0]?.id }));
  // };
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    //const enteredOtp = otp.join("");
    setIsVerify(true);
    dispatch(verifyUser({ otp: otp, id: profile?.[0]?.id }));
  };

  const handleEmailSubmit = (data) => {
    console.log("Submitted Email:", data.email);
    // dispatch(updateProfile(data));
    dispatch(resendOtp(data));
    // setIsOtpScreen(true);
    // setTimer(30);
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
        <img className="sm:w-32 w-36" src="logo.svg" alt="CORPZO Logo" />
        <div className="w-full ">
          <div className="w-full">
            <div className="flex flex-col justify-between">
              {isOtpScreen ? (
                <div>
                  <DualHeadingTwo
                    containerClassName={"text-left pt-2"}
                    heading={"Verification Code"}
                    subHeading={`We have sent you an OTP on your registered Email Id ${profile?.[0]?.email}`}
                  />
                  <form
                    onSubmit={handleOtpSubmit}
                    className="w-full sm:w-[100%] sm:mt-5 flex flex-col gap-2"
                  >
                    <div className="w-full flex flex-col sm:pb-16 sm:pt-5 gap-4">
                      <div className="w-full flex justify-between items-start gap-2">
                        <OTPInput
                          value={otp}
                          onChange={setOtp}
                          numInputs={6}
                          renderSeparator={<span></span>}
                          renderInput={(props, index) => {
                            return (
                              <input
                                {...props}
                                autoFocus={index === 0}
                                onPaste={handlePaste}
                              />
                            );
                          }}
                          inputStyle={{
                            // This border css when apply when user active on that input field 
                            // border: "1px solid #FFD700",
                            
                            border: "1px solid #DFEAF2",
                            width: "4rem",
                            height: "4rem",
                            fontWeight: "600",
                            textAlign: "center",
                            fontSize: "1.5rem",
                            borderRadius: "12px",
                          }}
                          containerStyle={
                            "flex w-full justify-between items-start"
                          }
                          inputType="number"
                        />
                      </div>

                      <div className="text-red-500 mt-2 font-medium text-sm text-center">
                        {verifyingError ? otpMessage : null}
                      </div>
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
                          <p className="!font-medium text-[#FF2C9C] text-sm">
                            {" "}
                            Resend Code
                          </p>
                        )}
                      </button>
                      <Button
                        type="submit"
                        primary={true}
                        className={
                          "mt-2 py-3 w-full rounded-lg  text-[#0A1C40] font-semibold !border-none "
                        }
                        // disabled={otp?.[otp.length - 1] == ""}
                        disabled={otp?.length < 6}
                        isLoading={isVerifying}
                      >
                        Continue
                      </Button>
                    </div>
                  </form>
                </div>
              ) : (
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
                      //disabled={!isValid}
                      isLoading={resendingOtp}
                    >
                      Continue
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  );
};
