import { IoMdAddCircle } from "react-icons/io";
import { businessListing } from "../../../database";
import { Button } from "../../../components/buttons/button";
import { LinkButton } from "../../../components/link";

const BusinessListing = () => {
  const data = businessListing;

  return (
    <div className="flex flex-col pt-10">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <p className="flex items-center gap-4 font-semibold text-xl text-[#0A1C40]">
          Your Business (09)
          <span>
            <img src="/icons/dashboard/take-a-tour.svg" alt="" />
          </span>
        </p>
        <div className="flex items-center gap-2">
          <LinkButton to={"create"} primary={true} leftIcon={<IoMdAddCircle />}>
            New Business
          </LinkButton>
          <LinkButton className="font-semibold text-[#606060]">View all</LinkButton>
        </div>
      </div>
      {data.length > 0 ? (
        <div className="pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {data.map((data, index) => (
            <div className="p-4 bg-[#F3F7FF] rounded-xl">
              <div className="flex flex-col gap-2 bg-white rounded-xl p-2">
                <div key={index} className="flex items-end gap-2">
                  <div className="p-2 bg-[#F3F7FF] rounded-xl flex justify-center items-center">
                    <img src="/images/business/business-logo.svg" className="" alt="" />
                  </div>
                  <div>
                    <p className="font-bold text-base text-[#171717]">
                      {data.businessName}
                    </p>
                    <p className="font-semibold text-[11px] text-[#343C6A]">
                      {data.businesSubTitle}{" "}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 w-[100%]">
                  {labelValue("Type:", data.type)}
                  {labelValue("Registered Office:", data.registeredOffice)}
                  {labelValue("Company Status:", data.companyStatus)}
                  {labelValue("Company Age:", data.companyAge)}
                </div>
              </div>
              <div className="flex justify-between items-center gap-2 pt-5">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1 items-center">
                    <img src="images/critical-icon.svg" width={20} alt="" />
                    <p className="font-bold text-[10px] text-[#FF3B3B]">
                      CRITICAL
                    </p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <img src="images/settinn-icon.svg" width={20} alt="" />
                    <p className="font-bold text-[10px] text-[#007453]">
                      2 ACTIVE SERVICES
                    </p>
                  </div>
                </div>
                <Button
                  className={"w-fit px-2 py-1 text-[10px]"}
                  primary={true}
                >
                  +Service
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center gap-2 items-center flex-col h-[80vh]">
          <img src="/images/business/no-business.svg" alt="" />
          <p className="font-bold  text-xl text-[#000000] ">
            No Business Created
          </p>
          <p className="font-normal text-[#797979]">
            Create one to start your services
          </p>
        </div>
      )}
    </div>
  );
};

export default BusinessListing;


const labelValue = (label, value) => (
  <div className="flex justify-between">
    <p className="font-medium text-sm text-[#000000B2] ">{label}</p>
    <p className="font-semibold text-sm text-black">{value}</p>
  </div>
);