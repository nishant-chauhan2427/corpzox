import React from "react";
import { Checkbox } from "../../../../../components/inputs/checkbox";
import { CiHeart } from "react-icons/ci";
import { Button } from "../../../../../components/buttons";

export const ServicesCard = ({
  data = [],
  onClick = () => console.log("wishlist clicked"),
  onCheckedChange = () => console.log("checked clicked"),
}) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:pt-3 pt-5  sm:grid-cols-2 xl:grid-cols-2  gap-4">
        {data.map((service, index) => (
          <div
            key={index}
            className="sm:m-3 flex flex-col gap-2 bg-[#F3F7FF]  rounded-lg sm:gap-4 justify-between"
          >
            <div className="flex justify-between">
              <p className="font-bold text-[#0A1C40]">{service.name}</p>
              <Checkbox
                className="service-checkbox"
                onChange={() => onCheckedChange(service)}
              />
            </div>
            <p className="text-base leading-[22px] font-normal text-[#7C7C7C]">
              {service.details}
            </p>
            <div className="flex flex-col gap-1 pt-1">
              <div className="flex justify-between sm:w-4/5">
                <p className="font-semibold text-sm text-[#7E7E7E]">
                  Estimated Time
                </p>
                <p className="font-bold text-[12px] text-[#000000]">
                  {service.duration}
                </p>
              </div>
              <div className="flex justify-between sm:w-4/5">
                <p className="font-semibold text-sm text-[#7E7E7E]">
                  Min Requirement
                </p>
                <p className="font-bold text-[12px] text-[#000000]">
                  {service?.minRequirement || "_ _"}
                </p>
              </div>
              <div className="flex justify-between sm:w-4/5">
                <p className="font-semibold text-sm text-[#7E7E7E]">Price</p>
                <p className="font-bold text-[12px] text-[#000000]">
                  {service.cost}
                </p>
              </div>
            </div>
            <div className="flex justify-end pt-5 items-end">
              <div className="flex items-center  justify-center gap-2">
                <CiHeart
                  size={30}
                  color={service?.wishlistCount ? "#FF0000" : "#777777"}
                  onClick={() => onClick(service)}
                />
                <Button type="submit" primary={true}>
                  Avail It Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
