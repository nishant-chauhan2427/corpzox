import React, { useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { Button } from "../../../components/buttons";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signinValidationSchema } from "../../../validation/authValidatiorSchema";
import { Input } from "../../../components/inputs";
import { Heading } from "../../../components/heading";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../redux/actions/dashboard-action";
import { submitEditProfile } from "../../../redux/actions/profile-actions";
import { profileValidationSchema } from "./editProfileValidationSchema";
const Edit = () => {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.profile);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver : yupResolver(profileValidationSchema),
    mode: "onChange", // Enables form validation tracking on change
  });

  const onSubmit = (data) => {
    console.log(data, "Form submitted");

    dispatch(submitEditProfile({
      firstName: data.firstName,
      lastName: data.lastName,
      businessEmail: data.businessEmail
    }));
  };

  useEffect(() => {
     dispatch(getUser());
    const data = (user.name || "").split(" ");
    console.log(data,"data123");
    console.log("useer",user);
    setValue("firstName", data[0]);
    setValue("lastName", data[1]);
    setValue("email", user?.email);
    setValue("businessEmail", user?.busniessEmail ? user?.busniessEmail : "");
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 flex-col">
        <Heading title={"Payment"} backButton={true}>
          Edit Profile
        </Heading>
        <div className="flex drop-shadow-md bg-[#F4F9FF] border px-4 rounded-2xl py-10 border-[#DFEAF2]">
          <div
            className="flex sm:flex-row flex-col w-full items-center gap-4"
          >
            <div>
              <img src="/images/profile/profile.svg" alt="" />
            </div>
            <div className="flex flex-col gap-4 w-full">
              <p className="text-[#171717] font-medium text-lg">
                Basic Details
              </p>
              <div className="sm:w-[70%] flex gap-4 flex-col">
                <div className="flex flex-row gap-4">
                  <div className="w-full">
                    <Controller
                      name="firstName"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Input
                          {...field}
                          label={"First Name"}
                          type={"text"}
                          placeholder={"First Name"}
                          className={"border-[#D9D9D9] border"}
                          errorContent={errors?.firstName?.message}
                        />
                      )}
                      
                    />
                  </div>
                  <div className="w-full">
                    <Controller
                      name="lastName"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Input
                          {...field}
                          label={"Last Name"}
                          type={"text"}
                          placeholder={"Last Name"}
                          className={"border-[#D9D9D9] border"}
                          errorContent={errors?.lastName?.message}
                        />
                      )}
                    
                    />
                  </div>
                </div>
                <div>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        {...field}
                        label={"Email id"}
                        type={"email"}
                        placeholder={"Email id"}
                        className={"border-[#D9D9D9] border"}
                        errorContent={errors?.email?.message}
                        disabled={true}
                      />
                    )}
                   
                  />
                </div>
                <div>
                  <Controller
                    name="businessEmail"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        {...field}
                        label={"Business Email id"}
                        type={"email"}
                        placeholder={"Business Email id"}
                        className={"border-[#D9D9D9] border"}
                        errorContent={errors?.businessEmail?.message}
                        disabled={true}
                      />
                    )}
                   
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button disabled={!isValid} primary={true} isLoading={loading}>
          Save
        </Button>
      </form>
    </>
  );
};

export default Edit;
