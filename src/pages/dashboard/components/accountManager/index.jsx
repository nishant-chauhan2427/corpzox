import { useRef, useState } from "react";
import { BiSolidMessageRounded } from "react-icons/bi";
import { CiMenuKebab } from "react-icons/ci";
import { IoMdCall } from "react-icons/io";
import { useOutsideClick } from "../../../../utils";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { requestChangeManager } from "../../../../redux/actions/dashboard-action";
import { FaExchangeAlt } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";

export const AccountManager = ({ manager, sidebar }) => {
  const [accountShowButton, setAccountShowButton] = useState(false);
  const dispatch = useDispatch();
  const accountShowButtonRef = useRef();
  const { user } = useSelector((state) => state.user);

  const handleAccountShowBtn = () => {
    setAccountShowButton((previous) => !previous);
  };

  useOutsideClick(accountShowButtonRef, handleAccountShowBtn);
  // console.log(manager, "manager1234");

  const requestManagerChange = () => {
    dispatch(requestChangeManager());
    handleAccountShowBtn();
  };
  return (
    <div
      className={`${
        sidebar
          ? "relative px-2 py-3 bg-[url('/images/dashboard/am-bg.svg')] bg-no-repeat bg-cover items-start gap-2"
          : "bg-white px-[17px] py-[17px] gap-4"
      } w-full sm:w-auto flex border border-[#DFEAF2] rounded-2xl`}
    >
      <div className="flex items-center">
        <img
          className={`${sidebar ? "w-8 h-8" : "w-12 h-20"} rounded-full`}
          src="/images/dashboard/user-default.jpg"
          alt=""
        />
      </div>
      <div>
        {/* <p className={`${sidebar ? "text-black" : "text-[#FF4141]"} font-semibold text-[10px]`}>
          {manager?.role?.toUpperCase()
            ? manager?.role?.toUpperCase()
            : "Manager Role"}
        </p> */}
        <div
          className={`${
            sidebar ? "text-xs text-white" : "text-sm text-[#232323] -mt-1"
          } font-bold`}
        >
          <p className="font-semibold text-xs text-gray-700">Account Manager</p>
          <p className="max-w-24 whitespace-nowrap overflow-hidden font-medium text-xs">
            {user?.agent_data?.[0]?.manager_data?.[0]?.name
              ? user?.agent_data?.[0]?.manager_data?.[0]?.name.slice(0, 15) + "..."
              : "------"}
          </p>
        </div>

        {/* <div className="pt-2 flex gap-2">
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
          <button
            data-tooltip-content={user?.agent_data?.[0]?.manager_data?.[0]?.name ? "Request to change manager?" : "Request to add manager"}
            data-tooltip-id="my-tooltip"
            onClick={requestManagerChange}
            className="bg-[#D9D9D9] rounded-full px-1 py-1"
          >
            {user?.agent_data?.[0]?.manager_data?.[0]?.name ? (
              <FaExchangeAlt />
            ) : (
              <IoAdd />
            )}
          </button>
        </div> */}
      </div>
      {/* <div className={`${sidebar ? "absolute top-2 right-2" : "ps-10"}`}>
        <div>
          {user?.agent_data?.[0]?.manager_data?.[0]?.name ? (
            <button
              onClick={handleAccountShowBtn}
              className={`${
                !sidebar && "cursor-pointer bg-[#D9D9D9] rounded-full px-1 py-1"
              }`}
            >
              {<CiMenuKebab className={`${sidebar && "text-white"}`} />}
            </button>
          ) : (
            <></>
          )}
          {accountShowButton && (
            <div ref={accountShowButtonRef} className="absolute pt-3">
              <button
                onClick={requestManagerChange}
                className="px-3 py-2 cursor-pointer w-full bg-[#D9D9D9] font-medium text-xs rounded-md"
              >
                {user?.agent_data?.[0]?.manager_data?.[0]?.name
                  ? "Request to change manager?"
                  : "Request to add manager"}
              </button>
            </div>
          )}
        </div>
      </div> */}
    </div>
  );
};
