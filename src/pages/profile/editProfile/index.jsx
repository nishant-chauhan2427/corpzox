import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { Button } from "../../../components/buttons";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signinValidationSchema } from "../../../validation/authValidatiorSchema";
import { Input } from "../../../components/inputs";

const Edit = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm({
    resolver: yupResolver(signinValidationSchema),
    mode: "onChange",
  });
  return (
    <>
      <div className="pb-4 flex gap-4 flex-col">
        <p className="flex items-center py-6 gap-4 font-semibold text-2xl text-[#0A1C40">
          <Link>
            <span>
              <IoIosArrowRoundBack size={30} />
            </span>
          </Link>
          Edit Profile
        </p>
        <div className="flex  drop-shadow-md bg-[#F4F9FF] border px-4 rounded-2xl py-4 border-[#DFEAF2] ">
          <div
            className="flex w-full
           gap-4"
          >
            <div>
              <img src="/public/images/profile/profile.svg" alt="" />
            </div>
            <div className="flex flex-col gap-4 w-full ">
              <p className=" text-[#171717] font-medium text-lg">
                Basic Details
              </p>
              <div className="flex gap-4">
                <div>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        {...field}
                        label={"First Name"}
                        type={"name"}
                        placeholder={"First Name"}
                        className={"border-[#D9D9D9] border"}
                        errorContent={errors?.email?.message}
                        onBlur={() => handleBlur("email")}
                      />
                    )}
                    rules={{ required: "First name is required" }}
                  />
                </div>
                <div>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        {...field}
                        label={"First Name"}
                        type={"name"}
                        placeholder={"First Name"}
                        className={"border-[#D9D9D9] border"}
                        errorContent={errors?.email?.message}
                        onBlur={() => handleBlur("email")}
                      />
                    )}
                    rules={{ required: "First name is required" }}
                  />
                </div>
              </div>
              <div>
                <div className="w-[50%]">
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
                        onBlur={() => handleBlur("email")}
                      />
                    )}
                    rules={{ required: "Email is required" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Link to={"edit"}>
            <Button primary={true}>Save </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Edit;
