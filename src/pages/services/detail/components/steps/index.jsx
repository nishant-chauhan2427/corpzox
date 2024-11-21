export const Steps = () => {
  return (
    <section>
      <div className="bg-[#0E38BD] rounded-md flex py-2 px-2 justify-center ">
        <div className="w-[70%] flex gap-2 ">
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
            <img src="/services/services-polygon.svg" alt="" />
          </div>
          <div className="flex flex-col gap-2 text-center">
            <p className="font-medium text-5xl  text-white">2</p>
            <p className="font-bold  text-xs  text-[#F8F8F8]">
              {" "}
              Customised Service <br /> Proposal
            </p>
            <p className="font-normal text-[8px] text-white ">
              Based on our assessment, we present a tailored proposal.
            </p>
          </div>
          <div>
            <img src="/services/services-polygon.svg" alt="" />
          </div>
          <div className="flex flex-col gap-2 text-center">
            <p className="font-medium text-5xl  text-white">2</p>
            <p className="font-bold  text-xs  text-[#F8F8F8]">
              {" "}
              Service Delivery and support
            </p>
            <p className="font-normal text-[8px] text-white ">
              Our experts implement the solutions while providing ongoing
              support.{" "}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
