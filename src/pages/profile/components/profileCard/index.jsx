import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { Button } from "../../../../components/buttons";
import { Heading } from "../../../../components/heading";
import { BusinessCardShimmer } from "../../../../components/loader/BusinessCardShimmer";
import { useSelector } from "react-redux";
const ProfileCard = ({ userData, loading }) => {
  // console.log(userData, "userData123")
  const { user } = useSelector((state) => state.user);
  return (
    <>
      {loading ? (
        <BusinessCardShimmer />
      ) : (
        <div className="pb-4">
          {/* <div className="flex items-center py-6 gap-4 font-semibold text-2xl text-[#0A1C40"> */}
          <Heading title={"Profile"} backButton={true}>
            Profile
          </Heading>
          {/* </div> */}
          <div className="flex flex-col gap-4 sm:flex-row justify-between drop-shadow-md bg-[#F4F9FF] border px-4 rounded-2xl py-4 border-[#DFEAF2] ">
            <div className="flex gap-4">
              <div>
                <img
                  src={
                    user?.profile_picture_url
                      ? user?.profile_picture_url
                      : "/images/profile/profile.svg"
                  }
                  width={140}
                  className="rounded"
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-2 justify-center">
                <p className="text-[#525252] text-base font-semibold sm:text-base">
                  Name:{" "}
                  <span className="text-black">
                    {" "}
                    {userData && userData?.name ? userData?.name : "________"}
                  </span>
                </p>
                <p className="text-[#525252] text-base font-semibold sm:text-base">
                  Email Id:{" "}
                  <span className="text-black">
                    {userData && userData?.email
                      ? userData?.email
                      : "_________"}
                  </span>
                </p>
                <p className="text-[#525252] text-base font-semibold sm:text-base">
                  Business email Id:{" "}
                  <span className="text-black">
                    {userData && userData?.busniessEmail
                      ? userData?.busniessEmail
                      : "________"}
                  </span>
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
      )}
    </>
  );
};

export default ProfileCard;
