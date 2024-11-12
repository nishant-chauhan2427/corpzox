import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { Button } from "../../../components/buttons";
import Steps from "../../services/components/steps";
import Details from "../../services/components/details";
import Pricing from "../../services/components/pricing";

const ServiceDetail = () => {
  return (
    <>
      <section className="pb-10">
        <div className="flex flex-col pt-10 gap-5 ">
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
          <Steps />
          <Details />
          <Pricing />
        </div>
      </section>
    </>
  );
};

export default ServiceDetail;
