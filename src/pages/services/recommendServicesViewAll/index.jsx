import React from "react";
import { Heading } from "../../../components/heading";

const RecommendedServicesViewAll = ({ title = "Re", totalCount = 0, data=[],  }) => {
  return (
    <>
      <div className="flex flex-col overflow-y-auto pb-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <Heading title={title} backButton={true} tourButton={true}>
            Recommended Services {totalCount ? `(${totalCount})` : ""}
          </Heading>
        </div>
        <div>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 rounded-lg 
     lg:grid-cols-2 gap-4 bg-white"
          >
            {data?.slice(0, 2).map((data, index) => (
              <button
                key={index}
                className="flex justify-between items-center bg-[#f3f7ff] stroke-[#dfeaf2] stroke-1 gap-2 w-full p-2 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <img
                    className="w-8"
                    src="/images/dashboard/recommended-services.svg"
                    alt="recommended-services"
                  />
                  <div className="flex  flex-col text-start">
                    <p className="font-semibold text-sm text-[#0a1c40]">
                      {data.name}
                    </p>
                    <p className="font- text-[12px]">
                      {data?.details?.length > 50
                        ? data?.details?.slice(0, 40) + "..."
                        : data?.details}{" "}
                    </p>
                  </div>
                </div>
                <div className="border-l h-full flex justify-center items-center">
                  <img src="/icons/dashboard/arrow-right.svg" alt="" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecommendedServicesViewAll;
