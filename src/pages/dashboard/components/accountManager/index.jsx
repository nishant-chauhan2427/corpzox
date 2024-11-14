import { useState } from "react";
import { BiSolidMessageRounded } from "react-icons/bi";
import { CiMenuKebab } from "react-icons/ci";
import { IoMdCall } from "react-icons/io";
import { Link } from "react-router-dom";

export const AccountManager = ({manager}) => {
  const [accountShowButton, setAccountShowButton] = useState(false);

  const handleAccountShowBtn = () => {
    setAccountShowButton((previous) => !previous);
  };
console.log(manager,'manager')
  return (
    <div className="px-[17px] py-[17px] w-full sm:w-auto flex gap-4 bg-white border border-[#DFEAF2] rounded-2xl">
      <div className=" flex items-center">
        <img
          className="w-20 h-20 rounded-full "
          src="../../../public/images/asuthosh-gupta.svg"
          alt=""
        />
      </div>
      <div>
        <p className="ps-0.5 font-semibold text-[10px] text-[#FF4141]">
          {manager?.role?.toUpperCase() ? manager?.role?.toUpperCase() : "Manager Role"}
        </p>
        <p className="-mt-1 font-semibold text-lg text-[#232323]">{manager?.name ? manager?.name : "Manager Name"}</p>
        <div className="pt-2 flex gap-2">
          <div className="bg-[#D9D9D9] rounded-full px-1 py-1">
            <BiSolidMessageRounded />
          </div>
          <div className="bg-[#D9D9D9] rounded-full px-1 py-1">
            <IoMdCall />
          </div>
        </div>
      </div>
      <div className="pl-10">
        <div className="realtive">
          <button
            onClick={handleAccountShowBtn}
            className="cursor-pointer bg-[#D9D9D9] rounded-full px-1 py-1"
          >
            <CiMenuKebab />
          </button>
          {accountShowButton && (
            <div className="absolute  pt-3">
              <button className="px-3 py-2 cursor-pointer w-full bg-[#D9D9D9] font-medium text-xs rounded-md">
                Request to Change Manager
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
