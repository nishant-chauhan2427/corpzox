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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../redux/slices/userLoginSlice";
import { Checkbox } from "../../../components/inputs/checkbox";
import { ThemeSwitch } from "../../../components/theme/switch";
import { AuthLayout } from "../../../components/layout/auth";
import { PhoneNumberInput } from "../../../components/inputs/phoneInput";
import { registerUser } from "../../../redux/actions/userAuth-action";
import toast from "react-hot-toast";
export const Signup = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm({
    resolver: yupResolver(signUpValidationSchema),
    mode: "onChange",
  });
  const {
    isRegistering = false,
    registeringError,
    registerMessage,
  } = useSelector((state) => state.auth);
  const handleBlur = async (field) => {
    await trigger(field);
  };

  const [error, setError] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setIsSubmit(true);
    if (data?.phone) {
      data.countryCode = `+${data.phone.toString().slice(0, 2)}`;
      data.phone = data.phone.toString().slice(2);
    }
    console.log(data);
    // Reset error message
    setError("");
    dispatch(registerUser(data));
  };
  useEffect(() => {
    // console.log(isRegistering,isSubmit,registeringError)
    if (!isRegistering && isSubmit) {
      setIsSubmit(false);
      if (registeringError) {
        toast.error(registeringError);
      } else {
        toast.success(registerMessage);
        navigate("/verify");
      }
    }
    // console.log(isRegistering,isSubmit,registeringError)
  }, [isRegistering]);
  return (
    <>
      <MetaTitle title={"Sign Up"} />
      <AuthLayout>
      <img className="sm:w-32 w-36" src="logo.svg" alt="CORPZO Logo" />
        <div className="w-full  flex  ">
          <div className="w-full flex flex-col">
            <DualHeadingTwo
              containerClassName={"text-left pt-5"}
              heading={"Sign Up"}
              subHeading={"Welcome to CorpZO. Please sign up here!"}
            />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2 "
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-5">
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      {...field}
                      // label={"First name"}
                      type={"name"}
                      placeholder={"First Name"}
                      className={"border-[#D9D9D9] border"}
                      errorContent={errors?.firstName?.message}
                      onBlur={() => handleBlur("name")}
                    />
                  )}
                  // rules={{ required: "Email Address is required" }}
                />
                <Controller
                  name="lastName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      {...field}
                      // label={"Last name"}
                      type={"name"}
                      placeholder={"Last Name"}
                      className={"border-[#D9D9D9] border"}
                      errorContent={errors?.lastName?.message}
                      onBlur={() => handleBlur("name")}
                    />
                  )}
                  // rules={{ required: "Email Address is required" }}
                />
              </div>
              <div className="">
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <PhoneNumberInput
                      {...field}
                      // label={"Phone Number"}
                      country={"in"}
                      placeholder={"Phone No."}
                      touched={true}
                      errorContent={errors?.phoneNumber?.message}
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
                      errorContent={errors.password?.message}
                      onBlur={() => handleBlur("password")}
                    />
                  )}
                  // rules={{ required: "Password is required" }}
                />
              </div>

              <div className="flex flex-col gap-4 sm:pt-4">
                <Button
                  type={"submit"}
                  v2={true}
                  mainPrimary={true}
                  className={
                    "mt-2 py-2 w-full rounded-lg text-[#0A1C40] font-semibold !border-none "
                  }
                  disabled={!isValid || isSubmit}
                >
                  Sign Up
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
                <div className="text-center flex  justify-center gap-2 font-normal text-[#6C6C6C]">
                  <p>
                    Allready have an account?
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
