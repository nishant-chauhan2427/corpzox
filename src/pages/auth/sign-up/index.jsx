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
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slices/userLoginSlice";
import { Checkbox } from "../../../components/inputs/checkbox";
import { ThemeSwitch } from "../../../components/theme/switch";
import { AuthLayout } from "../../../components/layout/auth";
import { PhoneNumberInput } from "../../../components/inputs/phoneInput";

export const Signup = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm({
    // resolver: yupResolver(signinValidator),
    mode: "onChange",
  });

  const handleBlur = async (field) => {
    await trigger(field);
  };

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const superAdmin = {
      email: "superAdmin@gmail.com",
      password: "Super@1234",
    };
    const manager = {
      email: "runwallManager@gmail.com",
      password: "Manager@1234",
    };
    // Reset error message
    setError("");

    if (
      data.email === superAdmin.email &&
      data.password === superAdmin.password
    ) {
      dispatch(setUser(superAdmin));
      navigate("/");
    } else if (
      data.email === manager.email &&
      data.password === manager.password
    ) {
      dispatch(setUser(manager));
      navigate("/");
    } else {
      setError("Wrong email or password");
    }
  };

  return (
    <>
      <MetaTitle title={"Sign Up"} />
      <AuthLayout>
        <img className="sm:w-32 w-36" src="public\logo.svg" alt="CORPZO Logo" />
        <div className="w-full  flex  ">
          <div className="w-full flex flex-col">
            <DualHeadingTwo
              containerClassName={"text-left pt-5"}
              heading={"Sign Up"}
              subHeading={"Welcome to CorpZO. Please sign up here!"}
            />
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ">
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      {...field}
                      label={"First name"}
                      type={"name"}
                      placeholder={"First Name"}
                      className={"border-[#D9D9D9] border"}
                      errorContent={errors?.email?.message}
                      onBlur={() => handleBlur("name")}
                    />
                  )}
                  // rules={{ required: "Email Address is required" }}
                />
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      {...field}
                      label={"Last name"}
                      type={"name"}
                      placeholder={"Last Name"}
                      className={"border-[#D9D9D9] border"}
                      errorContent={errors?.email?.message}
                      onBlur={() => handleBlur("name")}
                    />
                  )}
                  // rules={{ required: "Email Address is required" }}
                />
              </div>
              <div>
                <Controller
                  name="company.phoneNumber"
                  control={control}
                  render={({ field }) => (
                    <PhoneNumberInput
                      {...field}
                      label={"Phone Number"}
                      country={"in"}
                      placeholder={"Phone No."}
                      errorContent={errors.company?.phoneNumber?.message}
                    />
                  )}
                />
              </div>
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
                    // errorContent={errors.password}
                    onBlur={() => handleBlur("password")}
                  />
                )}
                // rules={{ required: "Password is required" }}
              />

              <div className="flex flex-col gap-4 sm:pt-4">
                <Button
                  type={"submit"}
                  v2={true}
                  mainPrimary={true}
                  className={
                    "mt-2 py-2 w-full rounded-lg text-[#0A1C40] font-semibold !border-none "
                  }
                  disabled={!isValid}
                >
                  Sign Up
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
                <div className="text-center flex  justify-center gap-2 font-normal text-[#6C6C6C]">
                  <p>
                    Allready have an account?
                    <Link to={"/sign-in"} className="p-2 text-[#F1359C] font-semibold ">
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
