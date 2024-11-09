import { Link } from "react-router-dom";
import { BiSolidMessageRounded } from "react-icons/bi";
import { IoMdCall } from "react-icons/io";
import { CiMenuKebab } from "react-icons/ci";
import { FaPlayCircle } from "react-icons/fa";
import { Button } from "../../components/buttons/button";

import { useState } from "react";
import { button } from "framer-motion/client";

const Dashboard = () => {
  const [accountShowButton, setAccountShowButton] = useState(false);

  const handleAccountShowBtn = () => {
    setAccountShowButton((previous) => !previous);
  };
  return (
    <>
      <section>
        {/* Card */}
        <div className="my-2 flex sm:flex-row flex-col gap-4">
          <div className="px-4 py-2 w-fit flex gap-2 bg-white border items-center border-[#DFEAF2] rounded-2xl">
            <img
              className="w-12 h-12 rounded-full object-cover object-top border-4 p-1 bg-red-500"
              src="../../../public/images/insight-1.jfif"
              alt=""
            />

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
                className="w-12 h-12 rounded-full bg-red-500"
                src=""
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
        <div className="pt-4">
          <div className="flex justify-between gap-4">
            <p className="flex items-center gap-4 font-semibold text-2xl text-[#0A1C40] ">
              Your Business (09){" "}
              <span>
                <FaPlayCircle size={20} />
              </span>
            </p>
            <Button />
          </div>
          <div className="flex justify-center gap-2 items-center flex-col h-[80vh]">
            <img src="../../../public/images/no-business.svg  " alt="" />
            <p className="font-bold  text-xl text-[#000000] ">
              No Business Created
            </p>
            <p className="font-normal text-[#797979]">
              Create one to start your services
            </p>
          </div>
        </div>
        <div className="pt-4">
          <div className="flex justify-between gap-4">
            <p className="flex items-center font-semibold gap-4 text-2xl text-[#0A1C40] ">
              Your Service Progress Updates (09){" "}
              <span>
                <FaPlayCircle size={20} />
              </span>
            </p>
          </div>
          <div className="flex justify-center gap-2 items-center flex-col h-[80vh]">
            <img src="../../../public/images/service-prgress.svg  " alt="" />
            <p className="font-bold  text-xl text-[#000000] ">No Services </p>
            <p className="font-normal text-[#797979]">
              Create a Business to add your Service{" "}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
