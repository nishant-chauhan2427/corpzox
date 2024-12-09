import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetService } from "../../../../../redux/slices/serviceListingSlice";
import { Heading } from "../../../../../components/heading";
import { useEffect } from "react";

export const RecommendedServices = ({ data, total }) => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let onClickViewAll = () => {
    dispatch(resetService({}));
    navigate("/services");
  };
  console.log(total,"ˇTotal Service");
  return (
    <div className="">
      <div className="py-2 flex flex-col sm:flex-row justify-between gap-2" >
        <Heading title={"Dashboard"} className={"py-0"} tourButton={true}>
          Recommended Services  {total == undefined ? "" : "(" + total + ")"}
        </Heading>
        <Link to={"/services"}  className="font-medium text-sm text-[#797979]">View All</Link>
      </div>
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
                src="/images/dashboard/recommended-services.svg"
                alt="recommended-services"
              />
              <div className="flex  flex-col text-start">
                <p className="font-semibold text-[#171717]">{data.name}</p>
                <p className="font-medium text-[12px]">{data?.details?.length > 30 ? data?.details?.slice(0,30)+"..." : data?.details} </p>
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
