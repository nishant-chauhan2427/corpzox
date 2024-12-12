import { useEffect, useRef, useState } from "react";
import { Input } from "../../../components/inputs";
import { Button } from "../../../components/buttons";
import { CustomAuthLayout } from "../components/layout";
import { MetaTitle } from "../../../components/metaTitle";
import { DualHeadingTwo } from "../components/dualHeading/dualHeadingTwo";
import { CrossButton } from "../../../components/buttons/crossButton";
import { useDispatch, useSelector } from "react-redux";
import { AuthLayout } from "../../../components/layout/auth";
import { Link, useNavigate } from "react-router-dom";
import { resendOtp, verifyUser } from "../../../redux/actions/userAuth-action";
import toast from "react-hot-toast";

export const Verify = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const [otpMessage, setOtpMessage] = useState('');
  
  const {
    isVerifying = false,
    verifyingError,
    verifyMessage,
    resendingOtp,
  } = useSelector((state) => state.auth);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const { profile } = useSelector((state) => state.auth);

  useEffect(() => {
    setTimer(30);
  }, []);

  
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const phoneRegex = /^\d{10}$/;

  const profileEmailOrPhone = profile[0]?.email;

  
  const isEmail = emailRegex.test(profileEmailOrPhone);
  const isPhoneNumber = phoneRegex.test(profileEmailOrPhone);

  const subHeading = isEmail
    ? `We have sent you an OTP on your registered email id ${profileEmailOrPhone}`
    : isPhoneNumber
    ? `We have sent you an OTP on your registered phone number ${profileEmailOrPhone}`
    : "Invalid contact information provided.";

  const validateOtp = (enteredOtp) => {
    if (enteredOtp.trim().length !== 4) {
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    setIsVerify(true);
    dispatch(verifyUser({ otp: enteredOtp, id: profile?.[0]?.id }));
  };

  useEffect(() => {
    if (isVerify && !isVerifying) {
      setIsVerify(false);
      if (verifyingError) {
        setOtpMessage(verifyingError);
      } else {
        toast.success(verifyMessage);
        navigate("/dashboard");
      }
    }
  }, [isVerifying]);

  useEffect(() => {
    setTimeout(() => {
      setOtpMessage("");
    }, 5000);
  }, [verifyingError]);

  const handleChange = (index, value) => {
    setOtpMessage("");
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value !== "" && index < 5) {
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

  const handleResendOtp = (event) => {
    event.preventDefault();
    setTimer(30);
    dispatch(
      resendOtp({
        id: profile?.[0]?.id || profile?.id || profile?.userId,
      })
    );
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

  return (
    <>
      <MetaTitle title={"Verify"} />
      <AuthLayout>
        <img className="sm:w-32 w-36" src="logo.svg" alt="CORPZO Logo" />
        <div className="w-full flex">
          <div className="w-full flex">
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
                      {otp.map((digit, index) => (
                        <input
                          className={`${
                            otpMessage ? "border-error" : "border-[#DFEAF2]"
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
                          <span className="!font-semibold text-[#F1359C] text-sm">
                            00:{timer}
                          </span>
                        </p>
                      ) : (
                        "Resend Code"
                      )}
                    </button>
                    <Button
                      type={"submit"}
                      primary={true}
                      className={
                        "mt-2 py-2 w-full rounded-lg text-[#0A1C40] font-semibold !border-none "
                      }
                      disabled={otp?.[otp.length - 1] == ""}
                      isLoading={isVerify}
                    >
                      Continue
                    </Button>
                  </div>
                </form>
              </div>
              <div>
                <div className="text-center flex justify-center gap-2 pt-4 font-normal text-[#6C6C6C]">
                  <p>
                    Need an account?
                    <Link
                      to={"/sign-up"}
                      className="p-2 text-[#F1359C] font-semibold"
                    >
                      Create one
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  );
};
