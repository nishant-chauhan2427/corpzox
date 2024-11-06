import { useEffect, useRef, useState } from "react";
import { Input } from "../../../components/inputs";
import { Button } from "../../../components/buttons";
import { CustomAuthLayout } from "../components/layout";
import { MetaTitle } from "../../../components/metaTitle";
import { DualHeadingTwo } from "../components/dualHeading/dualHeadingTwo";
import { CrossButton } from "../../../components/buttons/crossButton";
import { useDispatch } from "react-redux";
import { AuthLayout } from "../../../components/layout/auth";
import { Link } from "react-router-dom";

export const Verify = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const dispatch = useDispatch();
  const inputRefs = useRef([]);

  useEffect(() => {
    setTimer(30);
  }, []);

  // Function to handle OTP submission

  const validateOtp = (enteredOtp) => {
    if (enteredOtp.trim().length != 4) {
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    console.log(enteredOtp);
  };

  // Function to handle input change
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

  // Function to handle backspace key press
  const handleBackspace = (index, e) => {
    if (e.key === "Backspace" && index >= 0) {
      const newOtp = [...otp];
      newOtp[index] = ""; // Clear the digit at the current index
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
        email: email,
      })
    );
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    if (/^\d{4}$/.test(paste)) {
      // Check if the pasted content is exactly 5 digits
      const newOtp = paste.split("");
      setOtp(newOtp);

      // Delay focusing and blurring to allow state update
      setTimeout(() => {
        newOtp.forEach((_, index) => {
          inputRefs.current[index].focus();
          inputRefs.current[index].blur();
        });

        inputRefs.current[4].focus(); // Focus the last input field
      }, 0);
    }
    e.preventDefault();
  };

  useEffect(() => {
    if (timer === 0) {
      setIsResendDisabled(false); // Enable the resend button when the timer reaches 0
    } else if (timer > 0) {
      setIsResendDisabled(true);
      const countdown = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);

      return () => clearTimeout(countdown);
    }
  }, [timer]);

  const isVerification = false;
  const error = false;

  return (
    <>
      <MetaTitle title={"Verify"} />
      <AuthLayout>
        <img className="sm:w-32 w-36" src="public\logo.svg" alt="CORPZO Logo" />
        <div className="w-full  flex  ">
          <div className="w-full flex  ">
            <div className="flex flex-col  justify-between ">
              <div>
                <DualHeadingTwo
                  containerClassName={"text-left pt-5"}
                  heading={"Verification Code"}
                  subHeading={
                    "We have send you an OTP on your registered mobile no. and Email Id"
                  }
                />
                <form className="w-full sm:w-[100%] mt-8 flex flex-col gap-2">
                  <div className=" w-full flex justify-start items-start gap-4 pb-20 ">
                    {otp.map((digit, index) => (
                      <input
                        className={`${
                          error ? "border-error" : "border-[#DFEAF2]"
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
                  <div className="h-1">
                    {/* {error && <p className="text-error text-xs">{errorContent}</p>} */}
                  </div>
                  <div className="w-full flex flex-col justify-center items-center">
                    <button
                      className={`text-xs text-primary disabled:text-[#8D8D8D]`}
                      onClick={handleResendOtp}
                      type="button"
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
                      type={"submit"}
                      v2={true}
                      mainPrimary={true}
                      className={
                        "mt-2 py-2 w-full rounded-lg text-[#0A1C40] font-semibold !border-none "
                      }
                    >
                      Continue
                    </Button>
                  </div>
                </form>
              </div>
              <div>
                <div className="text-center flex  justify-center gap-2  pt-20 font-normal text-[#6C6C6C]">
                  <p>
                    Need an account?
                    <Link className="p-2 text-[#F1359C] font-semibold ">
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
