import { useRef, useState } from "react";
import { BiSolidMessageRounded } from "react-icons/bi";
import { CiMenuKebab } from "react-icons/ci";
import { IoMdCall } from "react-icons/io";
import { useOutsideClick } from "../../../../utils";
import { Link } from "react-router-dom";

export const AccountManager = ({ manager, sidebar }) => {
  const [accountShowButton, setAccountShowButton] = useState(false);

  const accountShowButtonRef = useRef();

  const handleAccountShowBtn = () => {
    setAccountShowButton((previous) => !previous);
  };

  useOutsideClick(accountShowButtonRef, handleAccountShowBtn);
  console.log(manager, "manager");

  return (
    <div
      className={`${
        sidebar ? "relative px-2 py-4 bg-[url('/images/dashboard/am-bg.svg')] bg-no-repeat bg-cover items-start gap-2" : "bg-white px-[17px] py-[17px] gap-4"} w-full sm:w-auto flex border border-[#DFEAF2] rounded-2xl`}
    >
      <div className="flex items-center">
        <img
          className={`${sidebar ? "w-05 h-05" : "w-12 h-20"} rounded-full`}
          src="/images/dashboard/asuthosh-gupta.svg"
          alt=""
        />
      </div>
      <div>
        {/* <p className={`${sidebar ? "text-black" : "text-[#FF4141]"} font-semibold text-[10px]`}>
          {manager?.role?.toUpperCase()
            ? manager?.role?.toUpperCase()
            : "Manager Role"}
        </p> */}
        <p className={`${sidebar ? "text-xs text-white" : "text-sm text-[#232323] -mt-1"} font-semibold`}>
          <p>Manager Name :</p>
          {manager?.name ? manager?.name : "____________"}
        </p>
        <div className="pt-2 flex gap-2">
          <Link
            to="mailto:example@example.com"
            className="bg-[#D9D9D9] rounded-full px-1 py-1"
          >
            <BiSolidMessageRounded />
          </Link>
          <a
            href="tel:+1234567890"
            className="bg-[#D9D9D9] rounded-full px-1 py-1"
          >
            <IoMdCall />
          </a>
        </div>
      </div>
      <div className={`${sidebar ? "absolute top-2 right-2" : "ps-10"}`}>
        <div>
          <button
            onClick={handleAccountShowBtn}
            className={`${!sidebar && "cursor-pointer bg-[#D9D9D9] rounded-full px-1 py-1"}`}
          >
            <CiMenuKebab className={`${sidebar && "text-white"}`} />
          </button>
          {accountShowButton && (
            <div ref={accountShowButtonRef} className="absolute  pt-3">
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
