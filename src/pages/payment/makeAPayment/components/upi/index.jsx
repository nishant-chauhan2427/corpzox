import React from "react";
import { Controller } from "react-hook-form";
import { Input } from "../../../../../components/inputs";
import { Button } from "../../../../../components/buttons/button";

export const UPI = ({ control, errors }) => {
  return (
    <>
      <p className="font-semibold text-[14px] pb-2 text-[#0A1C40]">
        Please enter your UPI ID{" "}
      </p>
      <div className="flex flex-col ">
        <div className=" flex flex-row justify-between items-center gap-2 ">
          <Controller
            name="Upi"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                type={"name"}
                label={"Enter UPI ID "}
                placeholder={"Enter UPI ID"}
                containerClassName={"w-full"}
                className={"border-[#D9D9D9] border"}
                errorContent={errors?.email?.message}
              />
            )}
          />
          <Button primary={true}>Verify</Button>
        </div>
        <p className="font-semibold text-[12px] flex  pt-2 gap-1 items-center text-[#FF3B3B]">
          <img src="/icons/payment/error.svg" width={10} alt="" />
          Kindly provide a valid UPI ID
        </p>
        <p className="font-semibold text-[12px] pt-2 text-[#999999]">
          The UPI ID follows the format: name_or_phone_number@bankname
        </p>
        <p className="font-semibold text-[12px] flex  pt-2 gap-1 items-center text-[#029126]">
          <img src="/icons/payment/check-double.svg" width={20} alt="" />
          Verified{" "}
          <span>Kindly click "Continue" to finalize your purchase.</span>{" "}
        </p>
      </div>
    </>
  );
};
