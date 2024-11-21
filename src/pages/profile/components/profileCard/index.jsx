import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { Button } from "../../../../components/buttons";
import {Heading } from "../../../../components/heading"
import { BusinessCardShimmer } from "../../../../components/loader/BusinessCardShimmer";
const ProfileCard = ({userData, loading}) => {
  console.log(loading, "userData")
  return (
    <>
    {
      loading ? <BusinessCardShimmer/> : 
      <div className="pb-4">
        {/* <div className="flex items-center py-6 gap-4 font-semibold text-2xl text-[#0A1C40"> */}
          <Heading title={"Profile"} backButton={true}>{userData && userData?.name}</Heading>
        {/* </div> */}
        <div className="flex flex-col gap-4 sm:flex-row justify-between drop-shadow-md bg-[#F4F9FF] border px-4 rounded-2xl py-4 border-[#DFEAF2] ">
          <div className="flex gap-4">
            <div>
              <img src="/public/images/profile/profile.svg" width={200} alt="" />
            </div>
            <div className="flex flex-col gap-4 justify-center">
              <p className="text-black font-semibold text-base sm:text-xl">
                Mehul
              </p>
              <p className="text-[#525252] text-base font-semibold sm:text-lg">
                Email Id:{" "}
                <span className="text-black">{userData && userData?.email}</span>
              </p>
              <p className="text-[#525252] text-base font-semibold sm:text-lg">
                Business email Id: <span className="text-black">{userData && userData.businessId ? userData.businessId : "--"}</span>
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
    }
    </>
  );
};

export default ProfileCard;
