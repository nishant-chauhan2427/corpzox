import React from "react";

const BusinessListing = () => {
  return (
    <>
      <div className="gap-2 flex flex-col  bg-white rounded-md px-4 py-2">
        <div key={index} className="px-2 py-3 flex gap-4">
          <img
            src="/images/business/business-logo.svg"
            className=""
            alt=""
          />
          <div className="pt-5">
            <p className="font-bold text-xl text-[#171717]">
              {data.businessName}
            </p>
            <p className="text-semibold text-sm text-[#343C6A]">
              {data.businesSubTitle}{" "}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1 w-[100%]">
          <div className="flex justify-between">
            <p className="font-medium text-base text-[#000000B2] ">Type:</p>
            <p className="font-semibold text-base text-black">{data.type}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-base text-[#000000B2] ">
              Registered Office:
            </p>
            <p className="font-semibold text-base text-black">
              {data.registeredOffice}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-base text-[#000000B2] ">
              Company Status:
            </p>
            <p className="font-semibold text-base text-black">
              {data.companyStatus}{" "}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-base text-[#000000B2] ">
              Company Age:{" "}
            </p>
            <p className="font-semibold text-base text-black">
              {data.companyAge}{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessListing;
