export const RecommendedServices = ({ data }) => {
  return (
    <div className="pt-10">
      <div className="flex justify-between gap-4">
        <p className="flex items-center font-semibold gap-4 text-2xl text-[#0A1C40] ">
          Recommended Services (09)
          <span>
            <img src="/icons/dashboard/take-a-tour.svg" alt="" />
          </span>
        </p>
        <p className="font-semibold text-lg text-[#606060]">View All</p>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 !rounded-lg pb-5 mt-4 
     lg:grid-cols-3 gap-4 bg-white"
      >
        {data.map((data, index) => (
          <div
            key={index}
            className="flex items-center bg-[#F3F7FF] gap-2 w-full py-2 px-2 rounded-lg"
          >
            <img src="/images/recommedned-services-icon.png" alt="" />
            <div>
              <p className="font-semibold text-xl text-[#171717]">
                {data.companyName}{" "}
              </p>
              <p className="font-semibold text-xs ">{data.companyDeatil} </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
