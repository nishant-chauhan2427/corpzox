import { Link } from "react-router-dom";

export const RecommendedServices = ({ data }) => {
  return (
    <div className="pt-10">
      <div className="flex justify-between gap-4">
        <p className="flex items-center font-semibold gap-4 text-xl text-[#0A1C40] ">
          Recommended Services (09)
          <span>
            <img src="/icons/dashboard/take-a-tour.svg" alt="" />
          </span>
        </p>
        <Link className="font-semibold text-[#606060]">View All</Link>
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 !rounded-lg pb-5 mt-4 
     lg:grid-cols-3 gap-4 bg-white"
      >
        {data.map((data, index) => (
          <button
            key={index}
            className="flex justify-between items-center bg-[#F3F7FF] gap-2 w-full p-2 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <img src="/images/dashboard/recommended-services.svg" alt="recommended-services" />
              <div>
                <p className="font-semibold text-[#171717]">
                  {data.companyName}
                </p>
                <p className="font-semibold text-[11px]">
                  {data.companyDetail}{" "}
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
  );
};
