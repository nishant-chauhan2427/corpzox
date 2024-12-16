import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../../../components/inputs";
import { Button } from "../../../components/buttons";
import { ConfirmationModal } from "../../../components/modal/confirmationModal";
import changePasswordSchema from "../../../validation/changePasswordSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../redux/actions/settings-actions";
import { useNavigate } from "react-router-dom";
const ChangePassword = () => {
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [isVerify, setIsVerify] = useState(false);

  const dispatch = useDispatch();
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { isPasswordChanging, changePasswordError } = useSelector(
    (state) => state.settings
  );

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      oldPassword: "",
    },
  });

  let error;

  const onSubmit = (data) => {
    // test dev branch

    const passwordData = {
      newPassword: data.confirmPassword,
      oldPassword: data.password,
    };
    console.log(passwordData, "password Data");
    dispatch(changePassword({ passwordData, navigate }));
  };

  const onConfirmationModalClose = () => {
    setConfirmationModal(!confirmationModal);
  };

  useEffect(() => {
    setTimer(30);
  }, []);

  useEffect(() => {
    if (timer === 0 || timer == "00") {
      setIsResendDisabled(false); // Enable the resend button when the timer reaches 0
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

  const handleChange = (index, value) => {
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value !== "" && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
  };

  const handleResendOtp = (event) => {
    event.preventDefault();
    setTimer(30);
  };
  useEffect(() => {
    if (!isPasswordChanging && !changePasswordError) {
      reset({
        password: "",
        confirmPassword: "",
        newPassword: "",
      });
    }
  }, [isPasswordChanging]);
  return (
    <>
      <div className="mt-4 w-full">
        <p className="font-bold text-xl text-black">Change Password</p>
        <p className="text-sm text-[#4E4E4E]">
          Change your password to keep account secure.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="mt-4 w-full md:w-1/3 flex flex-col gap-4">
            <Controller
              name={`password`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Old Password`}
                  placeholder={`Enter your old password`}
                  className={"border-[#D9D9D9] border"}
                
                  errorContent={errors.password?.message}
                  required={true}
                  maxLength={20}
                />
              )}
            />
            <Controller
              name={`newPassword`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`New Password`}
                  placeholder={`Enter your new password`}
                  className={"border-[#D9D9D9] border"}

                  errorContent={errors.newPassword?.message}
                  required={true}
                  maxLength={20}
                />
              )}
            />
            <Controller
              name={`confirmPassword`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Re enter new Password`}
                  placeholder={`Re enter your new password`}
                  className={"border-[#D9D9D9] border"}

                  errorContent={errors.confirmPassword?.message}
                  required={true}
                  maxLength={20}
                />
              )}
            />
            <div className="flex justify-start items-center gap-3">
              <Button
                type={"submit"}
                className={"px-4 py-1.5 rounded-lg"}
                primary={true}
                isLoading={isPasswordChanging}
                disabled={!isValid}
              >
                Update
              </Button>
            </div>
          </div>
        </form>
      </div>
      <ConfirmationModal
        isOpen={confirmationModal}
        onClose={onConfirmationModalClose}
      >
        <>
          <h4 className="font-bold text-2xl">OTP Verification</h4>
          <p className="text-sm text-[#525252]">
            We have sent you an OTP on your registered mobile no and email id
          </p>
          <form
            onSubmit={handleVerify}
            className="w-full sm:w-full mt-8 flex flex-col gap-2"
          >
            <div className="w-full flex justify-start items-start gap-4 pb-6">
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
                disabled={isResendDisabled}
              >
                {timer > 0 ? (
                  <p className="!text-[#969696] font-normal text-sm">
                    Resend Code{" "}
                    <span className="!font-semibold text-[#5753FF] text-sm">
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
                type={"submit"}
                primary={true}
                className={
                  "mt-2 py-2 w-full rounded-lg text-[#0A1C40] font-semibold"
                }
                disabled={otp?.[otp.length - 1] == ""}
                isLoading={isVerify}
              >
                Continue
              </Button>
            </div>
          </form>
        </>
      </ConfirmationModal>
    </>
  );
};

export default ChangePassword;
