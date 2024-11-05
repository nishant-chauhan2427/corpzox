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

export const SignIn = () => {
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
      navigate("/lease");
    } else if (
      data.email === manager.email &&
      data.password === manager.password
    ) {
      dispatch(setUser(manager));
      navigate("/lease");
    } else {
      setError("Wrong email or password");
    }
  };

  return (
    <>
      <MetaTitle title={"Sign In"} />
      <section className="w-full flex flex-row p-3">
        <div className="md:w-1/2">
          <img src="/images/auth-main.svg" alt="" />
        </div>

        <div className="w-full   md:w-1/2 min-h-screen flex flex-col  justify-start">
          <img
            className="py-10 sm:w-32 w-32"
            src="public\logo.svg"
            alt="CORPZO Logo"
          />
          <div className="  w-full sm:max-w-md flex flex-col  ">
            <div className="w-full flex flex-col gap-3">
              <DualHeadingTwo
                containerClassName={"text-left"}
                heading={"Sign In"}
                subHeading={"Please Sign in to continue to your account."}
              />
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-3"
              >
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      {...field}
                      className={"bg-[#f9fafc]"}
                      label={"Email"}
                      type={"email"}
                      placeholder={"Enter your email e.g. johndoe@gmail.com"}
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
                      className={"bg-[#f9fafc]"}
                      label={"Password"}
                      type={"password"}
                      placeholder={"Enter your password e.g. Johndoe@564"}
                      // errorContent={errors.password}
                      onBlur={() => handleBlur("password")}
                    />
                  )}
                  // rules={{ required: "Password is required" }}
                />
                <Link className="">Forgot Password?</Link>

                <div className="flex  items-center">
                  {" "}
                  <Checkbox /> Keep me Signed in
                </div>
                <Button
                  type={"submit"}
                  v2={true}
                  mainPrimary={true}
                  className={"mt-2 py-2 w-full rounded-lg"}
                  disabled={!isValid}
                >
                  Sign in
                </Button>
                <Button
                  type={"submit"}
                  v2={true}
                  mainPrimary={true}
                  className={"mt-2 py-2 w-full rounded-lg"}
                  disabled={!isValid}
                >
                  Get an OTP on your Phone No.{" "}
                </Button>

                <div className="flex gap-2 items-center  ">
                  <div className="border-t w-full "></div>
                  <p>or</p>
                  <div className="border-t w-full"></div>
                </div>
                <div className="flex items-center justify-center border rounded p-2  text-center ">
                  <p>Sign in with Google</p>
                  <img src="" alt="" />
                </div>

                <div className="text-center flex  justify-center gap-2">
                  <p>
                    Need an account?<span className="p-2">Create one</span>
                  </p>
                </div>
                {error && (
                  <div className="text-red-500 mt-2 text-center">{error}</div>
                )}
              </form>
              {/* Uncomment if needed
            <div className="text-center">
              Don't have an account?{" "}
              <span className="font-bold text-base underline cursor-pointer hover:text-primary hover:no-underline text-primaryBg">
                Sign up for free
              </span>
            </div>
            <div className="flex text-center justify-center items-center font-semibold text-[#858181]">
              <MdOutlineHorizontalRule />
              <MdOutlineHorizontalRule />
              <MdOutlineHorizontalRule />
              Or Sign up With
              <MdOutlineHorizontalRule />
              <MdOutlineHorizontalRule />
              <MdOutlineHorizontalRule />
            </div>
            <div className="flex cursor-pointer justify-center items-center gap-3 text-2xl">
              <FaFacebookSquare color="#884EA7" />
              <FaGoogle color="#884EA7" />
              <FaInstagramSquare color="#884EA7" />
            </div>
            */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
