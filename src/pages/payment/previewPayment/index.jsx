import React from "react";
import Documents from "./components/documents";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/buttons";
import { previewDetail } from "../../../database";
import DocumentViewer from "./components/documentViewer";
import { Link } from "react-router-dom";
import { Heading } from "../../../components/heading";

const PreviewPayment = () => {
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
      <div className="py-5">
        <div>
          
          {/* <Documents control={control} errors={errors} /> */}
          <div className="grid sm:grid-cols-3 grid-cols-1 gap-4 sm:w-[60%] pt-5">
            {previewPdf.map((data, index) => (
              <div
                key={index}
                className="flex bg-[#7676801F] pt-12 rounded gap-2  pb-4 py-4 flex-col justify-center items-center"
              >
                <img
                  src="/images/payment/pdf-preview.svg"
                  width={100}
                  alt=""
                />
                <Link className="text-[#007AFF]  font-normal text-base underline">
                  {data.view}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="flex sm:flex-col flex-col gap-5 mt-10">
          {previewDetail.map((data, index) => (
            <div
              key={index}
              className="flex sm:flex-row flex-col sm:justify-between sm:w-[70%]"
            >
              <p className="text-[#525252] font-medium text-base">
                {data.title}
              </p>
              <p className="font-semibold text-[#0A1C40] text-base">
                {data.description}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2 flex-col">
          <p className="font-medium text-lg  text-[#525252] ">
            Business Description
          </p>
          <p className="text-base text-[#0A1C40] font-semibold ">
            A platform that helps aspiring entrepreneurs and startups to
            kickstart their businesses by offering document verification,
            state-specific guidance, and startup assistance.
          </p>
          <div className="inline-block mt-5">
            {" "}
            <Button primary={true}> Confirm</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviewPayment;
