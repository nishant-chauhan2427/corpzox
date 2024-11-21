import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { Button } from "../../../components/buttons";
import Steps from "../../services/detail/components/steps";
import Details from "../../services/detail/components/details";
import Pricing from "../../services/detail/components/pricing";
import { Heading } from "../../../components/heading";

const ServiceDetail = () => {
  return (
    <>
      <section className="pb-10">
        <div className="flex flex-col pt-10 gap-5 ">
          <div className="flex items-center justify-between gap-4">
            <Heading>Service Details</Heading>
            <Button></Button>
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
