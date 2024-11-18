import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { Button } from "../../../../components/buttons";

const ProfileCard = () => {
  return (
    <>
      <div className="pb-4">
        <p className="flex items-center py-6 gap-4 font-semibold text-2xl text-[#0A1C40">
          <Link>
            <span>
              <IoIosArrowRoundBack size={30} />
            </span>
          </Link>
          Welcome Mehul!{" "}
          <span className="bg-[#ECFDF5] text-sm font-medium px-4 py-1 rounded-full text-[#059669] drop-shadow-md">
            User Profile
          </span>
        </p>
        <div className="flex flex-col gap-4 sm:flex-row justify-between drop-shadow-md bg-[#F4F9FF] border px-4 rounded-2xl py-4 border-[#DFEAF2] ">
          <div className="flex gap-4">
            <div>
              <img src="/public/images/profile/profile.svg" alt="" />
            </div>
            <div className="flex flex-col gap-4 justify-center">
              <p className="text-black font-semibold text-base sm:text-xl">
                Mehul
              </p>
              <p className="text-[#525252] text-base font-semibold sm:text-lg">
                Email Id:{" "}
                <span className="text-black">rahulm.vayuz@gmail.com</span>
              </p>
              <p className="text-[#525252] text-base font-semibold sm:text-lg">
                Business email Id: <span className="text-black">--</span>
              </p>
            </div>
          </div>
          <div>
            <Link to={"edit"}>
              <Button primary={true}>Edit </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
