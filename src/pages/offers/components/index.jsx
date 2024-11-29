import React from "react";
import { Heading } from "../../../components/heading";
import { Offerss } from "../../../database";
import { Button } from "../../../components/buttons/button";

function OffersDetails() {
  return (
    <>
      <Heading title={"Offers"} backButton={true}>
        Offers
      </Heading>
      <div>
        {Offerss.map((offers, index) => (
          <div
            key={index}
            className="flex sm:flex-row flex-col gap-3 px-4 py-4 mb-6 bg-[#F3F7FF] border border-[#DFEAF2] rounded-lg    "
          >
            <div
              style={{ backgroundImage: `url(${offers.image})` }}
              className={`sm:w-[30%] rounded-lg bg-cover bg-no-repeat bg-center overflow-hidden`}
            ></div>
            <div className="flex sm:w-[70%] flex-col gap-2">
              <p className="font-bold text-[20px]  text-[#0A1C40]">
                {offers.title}
              </p>
              <div className="flex items-center gap-4 ">
                <p className="font-bold rounded-full text-[14px] text-white bg-[#4CAF50] px-2 py-1 ">
                  {offers.off}
                </p>
                <p className="font-normal  text-[12px] text-[#737373] ">
                  {offers.gst}
                </p>
              </div>
              <p className="font-medium text-[12px] text-[#0A1C40]">
                {offers.description}
              </p>
              <p className="font-normal text-[12px] text-[#4B4F58]">
                <li>{offers.offertime}</li>
              </p>
              <div className="flex justify-end pt-5">
                <Button primary={true}> Avail Now</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default OffersDetails;
