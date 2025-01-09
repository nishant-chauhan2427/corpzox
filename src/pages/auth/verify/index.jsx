import { useEffect, useRef, useState } from "react";
import { Button } from "../../../components/buttons";
import { CustomAuthLayout } from "../components/layout";
import { MetaTitle } from "../../../components/metaTitle";
import { DualHeadingTwo } from "../components/dualHeading/dualHeadingTwo";
import { useDispatch, useSelector } from "react-redux";
import { AuthLayout } from "../../../components/layout/auth";
import { useNavigate } from "react-router-dom";
import { resendOtp, verifyUser } from "../../../redux/actions/userAuth-action";
import toast from "react-hot-toast";
import OTPInput from "react-otp-input";

export const Verify = () => {
  //const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const [otpMessage, setOtpMessage] = useState("");

  const {
    isVerifying = false,
    verifyingError,
    verifyMessage,
    resendingOtp,
    email,
  } = useSelector((state) => state.auth);

  const { redirectedTo } = useSelector((state) => state.app);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const { profile } = useSelector((state) => state.auth);

  const [isActiveIndex, setActiveIndex] = useState(0);
  console.log(localStorage.getItem("forgotPassword"), "forgotPassword")

  useEffect(() => {
    if (inputRefs.current && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
    if (redirectedTo !== "verify") {
      navigate("/sign-in");
    }
    setTimer(30);
  }, []);

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const phoneRegex = /^\d{10}$/;

  const profileEmail = profile?.[0]?.email;
  const profilePhone = profile?.[0]?.phone;

  const isEmail = emailRegex.test(profileEmail);
  const isPhone = phoneRegex.test(profilePhone);

  const subHeading = isEmail
    ? `We have sent you an OTP on your registered email id ${profileEmail}`
    : profilePhone
      ? `We have sent you an OTP on your registered phone number ${profilePhone}`
      : `We have sent you an OTP on your registered email id ${email} `;

  const validateOtp = (enteredOtp) => {
    if (enteredOtp.trim().length !== 4) {
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //const enteredOtp = otp.join("");
    setIsVerify(true);
    dispatch(verifyUser({ otp: otp, id: profile?.[0]?.id }));
  };
  console.log(localStorage.getItem("forgotPassword"), "localStorage.getItem");
  // useEffect(() => {
  //   if (isVerify && !isVerifying) {
  //     setIsVerify(false);
  //     if (verifyingError) {
  //       setOtpMessage(verifyingError);
  //     } else {

  //       if (localStorage.getItem("forgotPassword") === true) {
  //         navigate("/dashboard")
  //       }
  //       else {
  //         navigate("/create-new-password");
  //       }
  //     }
  //   }
  // }, [
  //   isVerifying,
  //   verifyingError,
  //   profileEmail,
  //   profilePhone,
  //   email,
  //   navigate,
  // ]);

  useEffect(() => {
    if (isVerify && !isVerifying) {
      setIsVerify(false);
      if (verifyingError) {
        setOtpMessage(verifyingError);
      } else {
        
        const forgotPassword = localStorage.getItem("forgotPassword") === 'true';
        
        if (forgotPassword) {
          navigate("/create-new-password"); 
        } else {
          navigate("/dashboard"); 
        }
        localStorage.removeItem("forgotPassword")
      }
    }
  }, [isVerify, isVerifying, verifyingError, navigate]); // Ensure all dependencies are included
  
  useEffect(() => {
    if (otpMessage) {
      const timer = setTimeout(() => {
        setOtpMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [otpMessage]);

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

  useEffect(() => {
    if (timer === 0 || timer === "00") {
      setIsResendDisabled(false);
    } else if (timer > 0) {
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

  const handlePaste = (e) => {
    e.preventDefault(); // Prevent paste event
    toast.dismiss();
    toast.error("Pasting OTP is not allowed. Please enter the OTP manually.");
  };
  return (
    <>
      <MetaTitle title={"Verify"} />
      <AuthLayout>
        {/* className="sm:w-32 w-36" */}
        <img src="logo.svg" alt="CORPZO Logo" width={120} />
        <div className="w-full flex">
          <div className="w-full">
            <div className="flex flex-col justify-between">
              <div>
                <DualHeadingTwo
                  containerClassName={"text-left pt-2"}
                  heading={"Verification Code"}
                  subHeading={subHeading}
                />
                <form
                  onSubmit={handleSubmit}
                  className="w-full sm:w-[100%] mt-8 flex flex-col gap-2"
                >
                  <div className="w-full flex flex-col sm:pb-16 sm:pt-5 gap-4">
                    <div className="w-full flex justify-between items-start gap-2">
                      <OTPInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span></span>}
                        renderInput={(props, index) => {
                          const isActive = focusedIndex === index; // Check if this input is focused

                          return (
                            <input
                              {...props}
                              autoFocus={index === 0}
                              onPaste={handlePaste}
                              onFocus={() => setFocusedIndex(index)} // Set focusedIndex when this input is focused
                              onBlur={() => setFocusedIndex(null)} // Reset focusedIndex when this input loses focus
                              style={{
                                border: isActive
                                  ? "1px solid #FFD700"
                                  : "1px solid #DFEAF2", // Apply red border only if focused
                                width: "4rem",
                                height: "4rem",
                                fontWeight: "600",
                                textAlign: "center",
                                fontSize: "1.5rem",
                                display: "flex",
                                gap: "2px",
                                borderRadius: "12px",
                                margin: "4px"
                              }}
                            />
                          );
                        }}
                        containerStyle="flex w-full justify-between items-start"
                        inputType="number"
                      />
                    </div>
                    <div className="text-red-500 mt-2 font-medium text-sm text-center">
                      {otpMessage ? otpMessage : null}
                    </div>
                  </div>
                  <div className="h-1"></div>
                  <div className="w-full flex flex-col justify-center items-center">
                    <button
                      className={`text-xs text-primary disabled:text-[#8D8D8D]`}
                      onClick={handleResendOtp}
                      type="button"
                      disabled={isResendDisabled || resendingOtp}
                    >
                      {timer > 0 ? (
                        <p className="!text-[#969696] font-normal text-sm">
                          Resend Code{" "}
                          <span className="!font-semibold text-[#040203] text-sm">
                            00:{timer}
                          </span>
                        </p>
                      ) : (
                        <p className="!font-medium text-[#FF2C9C] text-sm">
                          {" "}
                          Resend Code
                        </p>
                      )}
                    </button>
                    <Button
                      type={"submit"}
                      primary={true}
                      className={
                        "mt-2 py-2 w-full rounded-lg text-[#0A1C40] font-semibold !border-none "
                      }
                      disabled={otp?.length < 6}
                      isLoading={isVerify}
                    >
                      Continue
                    </Button>
                  </div>
                </form>
              </div>
              <div>
                {/* <div className="text-center flex justify-center gap-2 pt-4 font-normal text-[#6C6C6C]">
                  <p>
                    Need an account?
                    <Link
                      to={"/sign-up"}
                      className="p-2 text-[#F1359C] font-semibold"
                    >
                      Create one
                    </Link>
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  );
};
