import { GoDotFill, GoTriangleDown } from "react-icons/go";
import { Link } from "react-router-dom";

export const ServicesProgress = ({ data }) => {
  return (
    <div className="pt-10">
      <div className="flex justify-between gap-4 pb-4">
        <p className="flex items-center font-semibold gap-4 text-xl text-[#0A1C40] ">
          Your Service Progress Updates
          <span>
            <img src="/icons/dashboard/take-a-tour.svg" alt="" />
          </span>
        </p>
        <Link className="font-semibold text-[#606060]">View All</Link>
      </div>
      {data.length > 0 ? (
        <div className="grid grid-rows-1 gap-4">
          {data.map((data, index) => (
            <div
              key={index}
              className="flex justify-between bg-[#F8FAFF] px-4 py-2  rounded-md"
            >
              <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                  <img src="/images/dashboard/service-progress.svg" alt="" />
                  <p className="font-bold">{data.name} </p>
                  <img src="/icons/dashboard/service-error.svg" width={15} alt="" />
                </div>
                <div className="flex gap-2">
                  <h6 className="font-normal text-sm">{data.detail1} </h6>
                  <p className="font-normal text-sm ">{data.detail2} </p>
                </div>
              </div>
              <div className="flex gap-2 ">
                <p className="flex items-center h-8  px-2 py-1 rounded-full font-semibold text-[#037847] bg-[#03784728]">
                  <GoDotFill />
                  On Time
                </p>
                <GoTriangleDown size={30} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center gap-2 items-center flex-col h-[80vh]">
          <img src="/images/service-prgress.svg  " alt="" />
          <p className="font-bold  text-xl text-[#000000] ">No Services </p>
          <p className="font-normal text-[#797979]">
            Create a Business to add your Service{" "}
          </p>
        </div>
      )}
    </div>
  );
};
