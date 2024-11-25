import { Button } from "../../../../../components/buttons";
import { Rating } from "../../../../../components/rating";

export const Details = ({ pricing = true }) => {
  return (
    <section className="flex flex-col gap-2">
      <div className="flex flex-col text-start gap-2">
        <p className="font-semibold text-3xl uppercase text-[#0A1C40]">
          Private Limited Company Incorporation
        </p>
        <p className="font-medium text-sm text-[#0A1C40]">
          Register your Private Limited (Pvt. Ltd.) Company with CorpZo for
          ₹4,999 in just 10 days. Enjoy a seamless process as our expert team
          handles all documentation and compliance. Apply now and launch your
          business with complete peace of mind.
        </p>
      </div>
      <div className="pt-4 flex flex-col md:flex-row items-center gap-4">
        {!pricing && (
          <div className="w-full md:w-3/5 flex flex-col gap-6">
            <h3 className="font-semibold text-3xl uppercase">
              your business, your price
            </h3>
            <div>
              <p className="font-medium">
                Select your state to view the applicable govt. fees*
              </p>
              <p className="text-sm">
                *Subject to fluctuate at the time of application
              </p>
            </div>
            <Button className={"w-fit px-6 py-1.5 !font-semibold !rounded"} primary={true}>Talk to our Advisors</Button>
          </div>
        )}
        <div
          style={{ backgroundImage: `url(/images/services/service-dummy.svg)` }}
          className="w-full min-h-[420px] md:w-3/5 rounded-3xl bg-no-repeat bg-cover"
        >
          {/* <img src="/images/services/service-dummy.svg" alt="service-image" /> */}
        </div>
        {pricing && (
          <div className="w-full md:w-2/5 bg-[#EEEFF3] box-sg rounded-lg px-5 py-6 gap-2 flex flex-col">
            <div>
              <p className="font-extrabold text-2xl text-[#0A1C40]">₹1,999</p>
              <p className="text-xs text-[#0A1C40]">
                ₹1,999 + Applicable govt. fees
              </p>
            </div>
            <div className="py-2">
              <p className="font-bold text-base text-[#0A1C40]">
                What’s Included
              </p>
              <p className="text-[11px] text-[#0A1C40]">
                2 x DIN & Digital Signatures, 2 x Name Application for the
                Company, Drafting of MOA, Drafting of AOA, COI, PAN, TAN, EPF
                Registration, ESIC Registration
              </p>
            </div>
            <div className="py-2">
              <p className="font-bold text-xs text-[#0A1C40]">
                Money-Back Guarantee:{" "}
              </p>
              <p className="text-[10px]">
                Guaranteed submission in 3 working days or your money back. T&C
                Apply
              </p>
            </div>
            <div className="py-4 flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <p className="font-extrabold text-xl text-[#0A1C40]">4.6/5</p>
                <Rating rating={4} />
                <p className="text-[11px]">Based on 102 reviews</p>
              </div>
              <div className="flex flex-col">
                <div className="flex items-end font-medium text-[13px] text-[#0A1C40]">
                  <strong className="text-lg leading-6">10</strong>
                  <span>Working days</span>
                </div>
                <p className="text-xs text-[#0A1C40]">Estimated Time</p>
              </div>
            </div>
            <div className="pt-2 flex justify-between items-center gap-2">
              <Button className={"text-xs px-2 py-1 rounded-sm"} outline={true}>
                Avail services
              </Button>
              <Button className={"text-xs px-2 py-1 rounded-sm"} primary={true}>
                Talk to our Advisors
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
