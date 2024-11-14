import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { RegistraionDetails } from "../../business/createEdit/components/registration";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../../../components/inputs";

const SelectBusiness = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm({
    // resolver: yupResolver(),
    mode: "onChange",
    defaultValues: {},
  });
  return (
    <>
      <div>
        <p className="flex items-center py-6 gap-4 font-semibold text-2xl text-[#0A1C40">
          <Link>
            <span>
              <IoIosArrowRoundBack size={30} />
            </span>
          </Link>
          Select Business
        </p>
        <div>
          <Controller
            name={`Select Business`}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={`Select Business`}
                placeholder={`Select Business`}
                errorContent={errors.fullName?.message}
                required={true}
              />
            )}
          />
        </div>
      </div>
    </>
  );
};

export default SelectBusiness;
