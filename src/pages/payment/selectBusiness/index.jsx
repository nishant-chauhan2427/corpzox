import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../../../components/inputs";
import { Selector } from "../../../components/select";
import { Button } from "../../../components/buttons";
import BusinessDetails from "./components/business";
import Documents from ".//components/documents";
import { Heading } from "../../../components/heading";
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

  const selectBusiness = [
    { label: "Reyan Ventures", value: "Reyan" },
    { label: "Education Sector", value: "Education" },
    { label: "Real Estate", value: "Estate" },
    { label: "Finance", value: "Finance" },
    { label: "Technology", value: "Technology" },
    { label: "Health Sector", value: "Health" },
    { label: "Education Sector", value: "Education" },
  ];

  const documentPoints = [
    {
      point: "The Aadhaar card image should include both front and back sides.",
    },
    {
      point: "PAN card should include your signature.",
    },
    {
      point: "Do not upload photocopies.",
    },
    {
      point:
        "Address proof can be your Aadhaar card, driving license, or electricity bill.",
    },
    {
      point:
        "All documents must be uploaded as PDF files, with a maximum file size of 20KB each.",
    },
  ];
  const previewPdf = [
    {
      view: "View",
    },
    {
      view: "View",
    },
    {
      view: "View",
    },
  ];

  return (
    <>
      <div className="flex flex-col  gap-4 py-4">
        <Heading title={"Select Business"} backButton={true}>
          Select Buisness{" "}
        </Heading>
        <div>
          <div className="grid sm:grid-cols-2 grid-cols-1 pb-2 ">
            <Controller
              name={`selectBusiness`}
              control={control}
              render={({ field }) => (
                <Selector
                  {...field}
                  label={"Select Business"}
                  placeholder={"Select Business"}
                  errorContent={errors.industryType?.message}
                  options={selectBusiness}
                  // required={true}
                />
              )}
            />
          </div>
          <Documents control={control} errors={errors} />
          <div className="grid sm:grid-cols-3 grid-cols-1 gap-4 sm:w-[60%] pt-5">
            {previewPdf.map((data, index) => (
              <div
                key={index}
                className="flex bg-[#7676801F] pt-12 rounded gap-2  pb-4 py-4 flex-col justify-center items-center"
              >
                <img
                  src="/public/images/payment/pdf-preview.svg"
                  width={100}
                  alt=""
                />
                <Link className="text-[#007AFF] font-normal text-base underline">
                  {data.view}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div>
          <ul className="list-disc pl-5">
            {documentPoints.map((data, index) => (
              <li
                className="font-normal text-[13px]  text-[#0A1C40CC]"
                key={index}
              >
                {data.point}
              </li>
            ))}
          </ul>
        </div>
        <BusinessDetails control={control} errors={errors} />
      </div>
    </>
  );
};
export default SelectBusiness;
