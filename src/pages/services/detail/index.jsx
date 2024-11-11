import { section } from "framer-motion/client";
import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { Button } from "../../../components/buttons";

const ServiceDetail = () => {
  return (
    <>
      <section className="pb-10">
        <div className="flex flex-col pt-10 gap-4 ">
          <div className="flex justify-between gap-4 ">
            <p className="flex items-center gap-4 font-semibold text-2xl text-[#0A1C40] ">
              <Link>
                <span>
                  <IoIosArrowRoundBack size={30} />
                </span>
              </Link>
              Services{" "}
            </p>
          </div>
          <div className="bg-[#0E38BD] rounded-md flex py-2 px-2 justify-center ">
            <div className="w-[70%] flex ">
              <div className="flex flex-col gap-2 text-center">
                <p className="font-medium text-5xl  text-white">1</p>
                <p className="font-bold  text-xs  text-[#F8F8F8]">
                  {" "}
                  Initial Consultation and Assessment
                </p>
                <p className="font-normal text-[8px] text-white ">
                  We begin with a detailed discussion to understand your unique
                  needs.
                </p>
              </div>
              <div>
                <img
                  src="../../../../public/services/services-polygon.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetail;
