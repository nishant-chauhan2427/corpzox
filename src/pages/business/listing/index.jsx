import { FaPlayCircle } from "react-icons/fa";
import { Button } from "../../../components/buttons/button";
import { businessCard, recommednedDetail } from "../../../database";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const BusinessListing = () => {
  return (
    <>
      <div className="flex flex-col pt-10 ">
        <div className="flex justify-between gap-4">
          <p className="flex items-center gap-4 font-semibold text-2xl text-[#0A1C40] ">
            <Link>
              <span>
                <IoIosArrowRoundBack size={30} />
              </span>
            </Link>
            Your Business (09){" "}
            
          </p>
          <div className="flex gap-2 items-center">
            <Button />
            <Link>
              {" "}
              <span className="font-semibold text-lg">View All</span>
            </Link>
          </div>
        </div>
        {businessCard.length > 0 ? (
          <div className="grid grid-cols-1 pb-10 sm:grid-cols-2 !rounded-lg bg-white p-4 mt-4  lg:grid-cols-3 gap-4">
            {businessCard.map((data, index) => (
              <div>
                <div className="gap-2 flex flex-col   bg-[#F3F7FF] rounded-md px-4 py-2">
                  <div key={index} className="px-2 py-3 flex gap-4">
                    <img
                      src="../../../public/images/business-imh.svg"
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
                    <img
                      src="../../../public/images/critical-icon.svg "
                      width={20}
                      alt=""
                    />
                    <p className="font-bold  text-base  text-[#FF3B3B]">
                      CRITICAL
                    </p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <img
                      src="../../../public/images/settinn-icon.svg"
                      width={20}
                      alt=""
                    />
                    <p className="font-bold text-sm text-[#007453]">
                      2 ACTIVE SERVICES{" "}
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
    </>
  );
};

export default BusinessListing;
