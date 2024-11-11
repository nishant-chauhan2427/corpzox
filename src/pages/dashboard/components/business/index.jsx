import { Link } from "react-router-dom";
import { Button } from "../../../../components/buttons";

export const Business = ({ data }) => {
  return (
    <div className="flex flex-col pt-10">
      <div className="flex justify-between gap-4">
        <p className="flex items-center gap-4 font-semibold text-xl text-[#0A1C40] ">
          Your Business (09)
          <span>
            <img src="/icons/dashboard/take-a-tour.svg" alt="" />
          </span>
        </p>
        <div className="flex items-center gap-2">
          <Button primary={true}>New Business</Button>
          <Link className="font-semibold text-[#606060]">View all</Link>
        </div>
      </div>
      {data.length > 0 ? (
        <div className="pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {data.slice(0, 3).map((data, index) => (
            <div className="p-4 bg-[#F3F7FF] rounded-xl">
              <div className="flex flex-col gap-2 bg-white rounded-xl px-4 py-2">
                <div key={index} className="px-2 py-3 flex gap-4">
                  <img src="images/business-imh.svg" className="" alt="" />
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
                    <p className="font-medium text-base text-[#000000B2] ">
                      Type:
                    </p>
                    <p className="font-semibold text-base text-black">
                      {data.type}
                    </p>
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
              <div className="flex gap-2 items-center pt-5">
                <div className="flex gap-1 items-center">
                  <img src="images/critical-icon.svg " width={20} alt="" />
                  <p className="font-bold  text-base  text-[#FF3B3B]">
                    CRITICAL
                  </p>
                </div>
                <div className="flex gap-1 items-center">
                  <img src="images/settinn-icon.svg" width={20} alt="" />
                  <p className="font-bold text-sm text-[#007453]">
                    2 ACTIVE SERVICES
                  </p>
                </div>
                <button>Service</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center gap-2 items-center flex-col h-[80vh]">
          <img src="../../../public/images/no-business.svg  " alt="" />
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
