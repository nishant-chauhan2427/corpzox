import React, { useEffect } from "react";
import { Checkbox } from "../../../../../components/inputs/checkbox";
import { CiHeart } from "react-icons/ci";
import { Button } from "../../../../../components/buttons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LinkButton } from "../../../../../components/link";
import { useSelector } from "react-redux";
import { ImSpinner2 } from "react-icons/im";
import { FaRupeeSign } from "react-icons/fa";

export const ServicesCard = ({
  data,

  onClick = (service) => console.log("Heart icon clicked"),
  onCheckedChange = () => console.log("checked clicked"),
}) => {
  const location = useLocation();
  const { isLoading, heartloading, childLoading } = useSelector((state) => state.wishlist);
  const { isAdding } = useSelector((state) => state.service);

  console.log(heartloading, "heartloading");
  useEffect(() => {
    console.log(isAdding, 'childloading')
  }, [isAdding])
  const heartAccordingToRoute = ["/wishlist", "/services"];
  const navigate = useNavigate();
  const url = window.location.href
  //console.log(data,"12345")
  //console.log(data, "Data123");
  const handleNavigate = () => {
    navigate("/services/detail");
  };
  return (
    <>
      <div className="grid grid-cols-1 sm:pt-3 pt-4  sm:grid-cols-2 xl:grid-cols-2  gap-4">
        {data &&
          data.map((service, index) => (

            <div
              key={index}

              className="sm:m-3 flex flex-col gap-2 bg-[#F3F7FF] px-4 py-4  rounded-lg sm:gap-4 justify-between"
            >


<div className="flex justify-between">
  <div className="flex gap-2">
    <p className="font-bold text-[#0A1C40]">
      {url.includes("services") ? service?.name : service?.service?.[0]?.name || "No Service Name"}
    </p>
    {(url.includes("services")||url.includes("services")) && service?.offerservices?.[0]?.offers?.[0]?.discountPercent && (
      <p className="font-medium rounded-full text-[12px] text-[#15580B] bg-[#B5FFBC] px-2 py-1">
        {service.offerservices[0].offers[0].discountPercent} %
      </p>
    )}
  </div>


                {url.includes("services") ? <Checkbox
                  className="service-checkbox"
                  onChange={() => onCheckedChange(service)}
                /> : <></>}
              </div>
              <p className="text-base leading-[22px] font-normal text-[#7C7C7C]">
                {url.includes("services") ? service?.details : service?.service[0]?.details}
              </p>
              <div className="flex flex-col gap-1 pt-1">
                <div className="flex justify-between sm:w-4/5">
                  <p className="font-semibold text-sm text-[#7E7E7E]">
                    Estimated Time(Month(s))
                  </p>
                  <p className="font-bold text-[12px] text-[#000000]">
                    {url.includes("services") ? service?.duration : service?.service[0]?.duration}
                  </p>
                </div>
                {/* <div className="flex justify-between sm:w-4/5">
                  <p className="font-semibold text-sm text-[#7E7E7E]">
                    Min Requirement
                  </p>
                  <p className="font-bold text-[12px] text-[#000000]">
                    {service?.minRequirement || "_ _"}
                  </p>
                </div> */}
                <div className="flex justify-between sm:w-4/5">
                  <p className="font-semibold text-sm text-[#7E7E7E] flex items-center">
                    Price (<FaRupeeSign className="ml-1" />)
                  </p>
                  <p className="font-bold text-[12px] text-[#000000]">
                    {url.includes("services") ? service?.cost : service?.service[0]?.cost}
                  </p>
                </div>

              </div>
              <div className="flex justify-end pt-5 items-end">
                <div className="flex items-center  justify-center gap-2">
                  {childLoading[service.serviceId] ? <ImSpinner2 className="animate-spin text-black !text-xl" /> : <button
                    onClick={() => {
                      onClick(service);
                      { console.log(service, "Service Onclick"); }
                    }}
                  >
                    {location.pathname === "/wishlist" ? (
                      <img
                        src="/icons/wishlist/red-heart.svg"
                        alt="Red Heart"
                      />
                    ) : (
                      <CiHeart
                        size={30}
                        color={service?.wishlistCount ? "#FF0000" : "#777777"}
                      />
                    )}
                  </button>}

                  <LinkButton

                    type="submit"
                    to={`/services/detail/${service?._id}`}
                    primary={true}
                  >
                    Avail It Now
                  </LinkButton >
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};


// import React, { useEffect } from "react";
// import { Checkbox } from "../../../../../components/inputs/checkbox";
// import { CiHeart } from "react-icons/ci";
// import { Button } from "../../../../../components/buttons";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { LinkButton } from "../../../../../components/link";
// import { useSelector } from "react-redux";
// import { ImSpinner2 } from "react-icons/im";

// export const ServicesCard = ({
//   data,

//   onClick = (service) => console.log("Heart icon clicked"),
//   onCheckedChange = () => console.log("checked clicked"),
// }) => {
//   const location = useLocation();
//   const { isLoading, heartloading, childLoading } = useSelector(
//     (state) => state.wishlist
//   );
//   const { isAdding } = useSelector((state) => state.service);

//   console.log(heartloading, "heartloading");
//   useEffect(() => {
//     console.log(isAdding, "childloading");
//   }, [isAdding]);
//   const heartAccordingToRoute = ["/wishlist", "/services"];
//   const navigate = useNavigate();
//   const url = window.location.href;
//   //console.log(data,"12345")
//   //console.log(data, "Data123");
//   const handleNavigate = () => {
//     navigate("/services/detail");
//   };
//   return (
//     <>
//       <div className="grid grid-cols-1 sm:pt-3 pt-4  sm:grid-cols-2 xl:grid-cols-2  gap-4">
//         {data &&
//           data.map((service, index) => (
//             <div
//               key={index}
//               className="sm:m-3 flex flex-col gap-2 bg-[#F3F7FF] px-4 py-4  rounded-lg sm:gap-4 justify-between"
//             >
//               <div className="flex justify-between">
//                 <div className="flex  gap-2">
//                   <p className="font-bold text-[#0A1C40]">
//                     {url.includes("services")
//                       ? service?.name
//                       : service?.service[0]?.name}
//                   </p>
//                   <p className="font-medium rounded-full text-[12px] text-[#15580B] bg-[#B5FFBC] px-2 py-1 ">
//                     {url.includes("services")
//                       ? service?.name
//                       : service?.service[0]?.name}
//                   </p>
//                 </div>
//                 <Checkbox
//                   className="service-checkbox"
//                   onChange={() => onCheckedChange(service)}
//                 />
//               </div>
//               <p className="text-base leading-[22px] font-normal text-[#7C7C7C]">
//                 {url.includes("services")
//                   ? service?.details
//                   : service?.service[0]?.details}
//               </p>
//               <div className="flex flex-col gap-1 pt-1">
//                 <div className="flex justify-between sm:w-4/5">
//                   <p className="font-semibold text-sm text-[#7E7E7E]">
//                     Estimated Time
//                   </p>
//                   <p className="font-bold text-[12px] text-[#000000]">
//                     {url.includes("services")
//                       ? service?.duration
//                       : service?.service[0]?.duration}
//                   </p>
//                 </div>
//                 {/* <div className="flex justify-between sm:w-4/5">
//                   <p className="font-semibold text-sm text-[#7E7E7E]">
//                     Min Requirement
//                   </p>
//                   <p className="font-bold text-[12px] text-[#000000]">
//                     {service?.minRequirement || "_ _"}
//                   </p>
//                 </div> */}
//                 <div className="flex justify-between sm:w-4/5">
//                   <p className="font-semibold text-sm text-[#7E7E7E]">Price</p>
//                   <p className="font-bold text-[12px] text-[#000000]">
//                     {url.includes("services")
//                       ? service?.cost
//                       : service?.service[0]?.cost}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex justify-end pt-5 items-end">
//                 <div className="flex items-center  justify-center gap-2">
//                   <HeartButton
//                     loading={
//                       location.pathname == "/whislist"
//                         ? childLoading[service.serviceId]
//                         : isAdding[service.serviceId]
//                     }
//                     service={service}
//                     onClick={onClick}
//                   />
//                   <LinkButton
//                     type="submit"
//                     to={`/services/detail/${service?._id}`}
//                     primary={true}
//                   >
//                     Avail It Now
//                   </LinkButton>
//                 </div>
//               </div>
//             </div>
//           ))}
//       </div>
//     </>
//   );
// };

// const HeartButton = ({ loading, service, onClick}) => {
//   return (
//     <>
//       {loading ? (
//         <ImSpinner2 className="animate-spin text-black !text-xl" />
//       ) : (
//         <button
//           onClick={onClick(service)}
//         >
//           {location.pathname === "/wishlist" ? (
//             <img src="/icons/wishlist/red-heart.svg" alt="Red Heart" />
//           ) : (
//             <CiHeart
//               size={30}
//               color={service?.wishlistCount ? "#FF0000" : "#777777"}
//             />
//           )}
//         </button>
//       )}
//     </>
//   );
// };

