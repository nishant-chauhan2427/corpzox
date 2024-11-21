import { Button } from "../../../../../components/buttons/button";

export const Pricing = () => {
  return (
    <section>
      <div className="flex flex-col gap-4 ">
        <p className="font-semibold uppercase text-5xl  text-[#0A1C40]">
          your business, your price
        </p>
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <p className=" font-medium text-[18px] txt-[#0A1C40] ">
              Select your state to view the applicable govt. fees*
            </p>
            <p className="font-normal text-xs  text-[#0A1C40]">
              *Subject to fluctuate at the time of application
            </p>
          </div>
          <div>
            <label htmlFor="input">
              <input type="search" name="" id="" />
            </label>
          </div>
        </div>
        <div>
          <div className="flex gap-10 justify-center pt-10">
            <div className="flex flex-col gap-2 drop-shadow-2xl bg-white px-5 py-6 ">
              <div>
                <p className="font-semibold text-[#0A1C40] text-4xl ">₹4,999</p>
                <p className="font-normal text-xs text-[#0A1C40]">
                  + applicable govt. fees
                </p>
              </div>
              <p className="font-semibold uppercase  text-lg text-[#0A1C40]">
                Starter Pack
              </p>
              <div>
                <p className="font-semibold text-base">Fast Application</p>
                <p className="font-medium  text-xs  text-[#0A1C40]">
                  Application within 5 working days or your money back.
                </p>
              </div>
              <div>
                <p className="font-semibold text-base text-[#0A1C40]">
                  Includes:
                </p>
                <div className="flex gap-2 text-sm text-[#0A1C40]">
                  <img src="/images/services/pricing-correct.svg" alt="" />
                  <p>2 x DIN and Digital Signatures</p>
                </div>
              </div>
              <Button primary={true}>Apply Now</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
