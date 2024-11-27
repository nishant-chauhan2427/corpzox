import { Link } from "react-router-dom";
import { offers } from "../../database/index";
import { Button } from "../buttons/button";

export const Offers = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center ">
          <p className="font-medium text-[16px] text-[#004BBC]">Offers</p>
          <Link className="font-medium text-xs text-[#828282]">View All</Link>
        </div>
        <div className="h-[1px] bg-gradient-to-r rounded-lg from-[#E0E1E2] via-[#E0E1E2] to-[#E0E1E2]"></div>
        {offers.map((offers, index) => (
          <div className="!rounded-lg overflow-hidden">
            <div key={index} className="flex !rounded-lg  hover:shadow-lg  ">
              <div
                style={{ backgroundImage: `url(${offers.image})` }}
                className={`w-[40%] bg-cover bg-right overflow-hidden`}
              ></div>
              <div className="flex w-[60%] flex-col gap-1 bg-[#f9f9f9] pl-3 py-4">
                <div className="flex ">
                  <p className="font-bold text-[12px]  text-[#1A202E] ">
                    Special Summer Offer{" "}
                  </p>
                </div>
                <p className="font-bold  text-[#EB9527] text-[14px]">40% OFF</p>
                <p className="font-normal  text-[9px] text-[#737373]">
                  On GST Services
                </p>
                <div className="flex pt-2">
                  <Button
                    className={
                      "text-[13px] text-[#0A1C40]  px-4 rounded-md py-1 "
                    }
                    primary={true}
                  >
                    Avail Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
