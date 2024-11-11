import { useState } from "react";
import { BiSolidMessageRounded } from "react-icons/bi";
import { CiMenuKebab } from "react-icons/ci";
import { IoMdCall } from "react-icons/io";

export const AccountManager = () => {
  const [accountShowButton, setAccountShowButton] = useState(false);

  const handleAccountShowBtn = () => {
    setAccountShowButton((previous) => !previous);
  };

  return (
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
        <p className="font-semibold text-lg text-[#232323]">Ashutosh Gupta</p>
        <div className="flex gap-2">
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
  );
};
