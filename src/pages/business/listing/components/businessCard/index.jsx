import { Link, useNavigate } from "react-router-dom";
import { calculateAge } from "../../../../../utils/index";
import { Button } from "../../../../../components/buttons";
import { BusinessCardShimmer } from "../../../../../components/loader/BusinessCardShimmer";

export const BusinessCard = ({ data }) => {

  const navigate = useNavigate();

  
  const handleServices = () =>{
    navigate("/services");
  }
  return (
    <>
      {data.length > 0 ? (
        <BusinessCardShimmer />
      ) : (
        <div className="p-4 bg-[#F3F7FF] rounded-xl hover:shadow-lg">
          <div onClick={()=>navigate(`/business/detail?id=${data?._id}`)} className="flex flex-col gap-2 hover:cursor-pointer bg-white rounded-xl p-2">
            <div className="flex items-end gap-2">
              <div className="p-2 bg-[#F3F7FF] rounded-xl flex justify-center items-center">
                <img
                  src="/images/business/business-logo.svg"
                  className=""
                  alt=""
                />
              </div>
              <div>
                <Link to={`/business/detail?id=${data?._id}`}>
                  <h4 className="font-bold text-base text-[#171717] break-all">
                    {data.businessName}
                  </h4>
                </Link>
                <p className="font-semibold text-[11px] text-[#343C6A]">
                  {data.businesSubTitle}{" "}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-1 w-[100%]">
              {labelValue("Type:", data.typeOfBusiness)}
              {labelValue(
                "",
                data?.businessAddressCity && data?.businessAddressState
                  ? `${data?.businessAddressCity},${data?.businessAddressState}`
                  : data?.businessAddressCity
                  ? data?.businessAddressCity
                  : data?.businessAddressState
              )}
              {labelValue(
                "Company Status:",
                data?.active ? "Active" : "In Active"
              )}
              {labelValue(
                "Company Age:",
                data?.yearOfStablish
                  ? `${calculateAge(data?.yearOfStablish)}`
                  : null
              )}
            </div>
          </div>
          <div className="flex justify-between items-center gap-2 pt-5">
            <div className="flex items-center gap-2">
              <div className="flex gap-1 items-center">
                <img
                  src="/icons/business/critical-icon.svg"
                  width={20}
                  alt=""
                />
                <p className="font-bold text-[10px] text-[#FF3B3B]">CRITICAL</p>
              </div>
              <div className="flex gap-1 items-center">
                <img src="images/settinn-icon.svg" width={20} alt="" />
                <p className="font-bold text-[10px] text-[#007453]">
                  {data?.totalService} ACTIVE SERVICES
                </p>
              </div>
            </div>
            <Button className={"w-fit px-2 py-1 text-[10px]"} primary={true} onClick={handleServices}>
              Add Service
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

const labelValue = (label, value) => (
  <div className="flex justify-between">
    <p className="font-medium text-sm text-[#000000B2] ">{label}</p>
    <p className="font-semibold text-sm text-black break-all">{value}</p>
  </div>
);
