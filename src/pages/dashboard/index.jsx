import { Link } from "react-router-dom";
import { BiSolidMessageRounded } from "react-icons/bi";
import { IoMdCall } from "react-icons/io";
import { CiMenuKebab } from "react-icons/ci";
import { FaPlayCircle } from "react-icons/fa";
import { Button } from "../../components/buttons/button";
import { GoTriangleDown } from "react-icons/go";
import { businessCard, recommednedDetail } from "../../database";
import { GoDotFill } from "react-icons/go";
import { serviceProgressUpdateDetail } from "../../database";
import { ImCross } from "react-icons/im";
import { useState } from "react";

const Dashboard = () => {
  const [accountShowButton, setAccountShowButton] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleBannerdisplay = () => {
    setIsFadingOut(true); // Start fade-out animation
    setIsVisible(false);
  };

  const handleAccountShowBtn = () => {
    setAccountShowButton((previous) => !previous);
  };
  return (
    <>
      <section className="pb-10">
        {/* Card */}
        <div className="my-2 justify-between flex sm:flex-row flex-col gap-4">
          <div className="flex flex-row  gap-4 w-full">
            <div className="px-4 py-2 w-fit flex gap-2 bg-white border items-center border-[#DFEAF2] rounded-2xl">
              <div className="relative">
                <img
                  className="w-12 h-12 rounded-full object-cover object-top border-4 p-1 "
                  src="../../../public/images/insight-1.jfif"
                  alt=""
                />
                <p className="absolute inset-0 rounded-full border-8 border-[#FFD700] border-t-0 border-l-0  "></p>
              </div>
              <div>
                <p className="font-bold text-2xl">45%</p>
                <p className="font-semibold text-sm text-[#232323]">Mehul</p>
                <Link className="font-semibold text-[10px] text-[#FF4141]">
                  Complete Your Profile
                </Link>
              </div>
            </div>
            <div className="px-4 py-2 sm:w-[40%] w-full flex gap-4  bg-white border border-[#DFEAF2] rounded-2xl">
              <div className=" flex items-center">
                {" "}
                <img
                  className="w-12 h-12 rounded-full "
                  src="../../../public/images/asuthosh-gupta.svg"
                  alt=""
                />
              </div>
              <div>
                <p className="font-semibold text-[10px] text-[#FF4141]">
                  Account Manager
                </p>
                <p className="font-semibold text-lg text-[#232323]">
                  Ashutosh Gupta
                </p>
                <div className="flex gap-2">
                  <div className="bg-[#D9D9D9] rounded-full px-1 py-1">
                    {" "}
                    <BiSolidMessageRounded />
                  </div>
                  <div className="bg-[#D9D9D9] rounded-full px-1 py-1">
                    <IoMdCall />
                  </div>
                </div>
              </div>
              <div className="pl-10">
                <div className="realtive">
                  <div
                    onClick={handleAccountShowBtn}
                    className="cursor-pointer bg-[#D9D9D9] rounded-full px-1 py-1"
                  >
                    <CiMenuKebab />
                  </div>
                  {accountShowButton && (
                    <Link className="absolute  pt-3">
                      <button className="px-3 py-2 cursor-pointer w-full bg-[#D9D9D9] font-medium text-xs rounded-md">
                        Request to Change Manager
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
            {isVisible && (
              <div
                className={`relative rounded-lg px-5 py-4 bg-[#007AFF] pr-20 bg-[url(public\images\invest-bg-shape.png)] bg-contain bottom-0 right-0 transition-opacity duration-300 ${
                  isFadingOut ? "opacity-0" : "opacity-100"
                }`}
              >
                <p className="text-white font-semibold text-lg ">
                  Looking for an investment?
                </p>
                <button className="text-white">Avail CORPZO X</button>
                <div
                  onClick={handleBannerdisplay}
                  className="absolute -right-2 -top-2 cursor-pointer bg-[#FF2323] rounded-full  p-2"
                >
                  <ImCross color="white" size={10} />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col pt-10 ">
          <div className="flex justify-between gap-4">
            <p className="flex items-center gap-4 font-semibold text-2xl text-[#0A1C40] ">
              Your Business (09){" "}
              <span>
                <FaPlayCircle size={20} />
              </span>
            </p>
            <Button />
          </div>
          {businessCard.length > 0 ? (
            <div className="grid grid-cols-1 pb-10 sm:grid-cols-2 !rounded-lg  p-4 mt-4 bg-[#F3F7FF] lg:grid-cols-3 gap-4">
              {businessCard.map((data, index) => (
                <div>
                  <div className="gap-2 flex flex-col  bg-white rounded-md px-4 py-2">
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
        <div className="pt-10">
          <div className="flex justify-between gap-4">
            <p className="flex items-center font-semibold gap-4 text-2xl text-[#0A1C40] ">
              Recommended Services (09)
              <span>
                <FaPlayCircle size={20} />
              </span>
            </p>
            <p className="font-semibold text-lg text-[#606060]">View All</p>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 !rounded-lg pb-5 mt-4 
           lg:grid-cols-3 gap-4 bg-white"
          >
            {recommednedDetail.map((data, index) => (
              <div
                key={index}
                className="flex items-center bg-[#F3F7FF] gap-2 w-full py-2 px-2 rounded-lg"
              >
                <img
                  src="../../../public/images/recommedned-services-icon.png"
                  alt=""
                />
                <div>
                  <p className="font-semibold text-xl text-[#171717]">
                    {data.companyName}{" "}
                  </p>
                  <p className="font-semibold text-xs ">
                    {data.companyDeatil}{" "}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pt-10">
          <div className="flex justify-between gap-4 pb-4">
            <p className="flex items-center font-semibold gap-4 text-2xl text-[#0A1C40] ">
              Your Service Progress Updates{" "}
              <span>
                <FaPlayCircle size={20} />
              </span>
            </p>
            <p className="font-semibold text-lg text-[#606060]">View All</p>
          </div>
          {serviceProgressUpdateDetail.length > 0 ? (
            <div className="grid grid-rows-1 gap-4">
              {serviceProgressUpdateDetail.map((data, index) => (
                <div
                  key={index}
                  className="flex justify-between bg-[#F8FAFF] px-4 py-2  rounded-md"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex  gap-2">
                      {" "}
                      <img src="../../../public/images/settings.png" alt="" />
                      <p className="font-bold text-2xl">{data.name} </p>
                      <img
                        src="../../../public/images/errors.png"
                        width={15}
                        alt=""
                      />
                    </div>
                    <div className="flex gap-2">
                      <p className="font-normal text-sm ">{data.detail1} </p>
                      <p className="font-normal text-sm ">{data.detail2} </p>
                    </div>
                  </div>
                  <div className="flex gap-2 ">
                    <p className="flex items-center h-8  px-2 py-1 rounded-full font-semibold text-[#037847] bg-[#03784728]">
                      <GoDotFill />
                      On Time
                    </p>
                    <GoTriangleDown size={30} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center gap-2 items-center flex-col h-[80vh]">
              <img src="../../../public/images/service-prgress.svg  " alt="" />
              <p className="font-bold  text-xl text-[#000000] ">No Services </p>
              <p className="font-normal text-[#797979]">
                Create a Business to add your Service{" "}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
