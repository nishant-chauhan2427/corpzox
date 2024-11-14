import React from "react";

function index() {
  return (
    <>
      <section>
        <div className="flex gap-2 ">
          <div className="w-[70%] flex flex-col text-start gap-2">
            <p className="font-semibold text-3xl uppercase text-[#0A1C40]">
              Private Limited Company Incorporation
            </p>
            <p className="font-medium text-lg  text-[#0A1C40]">
              Register your Private Limited (Pvt. Ltd.) Company with CorpZo for
              ₹4,999 in just 10 days. Enjoy a seamless process as our expert
              team handles all documentation and compliance. Apply now and
              launch your business with complete peace of mind.
            </p>
            <button>Talk to our Advisors</button>

            <div className="grid grid-cols-2 gap-4 pt-5">
              <div className="flex gap-2 items-center">
                <img
                  src="/public/services/setting-icon.svg"
                  width={35}
                  alt=""
                />
                <p className="font-semibold text-lg text-[#0A1C40]">
                  Comprehensive Business Services
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <img src="/public/services/clock-icon.svg" width={35} alt="" />
                <p className="font-semibold text-lg text-[#0A1C40]">
                  On-Time Delivery Quick Turnaround{" "}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <img src="/public/services/target.svg" width={35} alt="" />
                <p className="font-semibold text-lg text-[#0A1C40]">
                  Tailored for MSMEs & Startups{" "}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <img src="/public/services/fourth.svg" width={35} alt="" />
                <p className="font-semibold text-lg text-[#0A1C40]">
                  Professional Team of CAs, CSs and Lawyers{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="w-[30%] bg-[#EEEFF3] box-sg  rounded-lg px-5 py-6 gap-2 flex flex-col">
            <div>
              <p className="font-bold text-4xl text-[#0A1C40]">₹1,999</p>
              <p className="font-normal text-lg text-[#0A1C40]">
                ₹1,999{" "}
                <span className="font-normal text-[#0A1C40]  text-sm">
                  + Applicable govt. fees
                </span>
              </p>
            </div>
            <div>
              <p className="font-semibold text-[#0A1C40]  text-3xl">
                What’s Included
              </p>
              <p className="font-normal *:text-lg text-[#0A1C40]">
                2 x DIN & Digital Signatures, 2 x Name Application for the
                Company, Drafting of MOA, Drafting of AOA, COI, PAN, TAN, EPF
                Registration, ESIC Registration
              </p>
            </div>
            <div>
              <p className="font-bold text-3xl text-[#0A1C40]">
                Money-Back Guarantee:{" "}
              </p>
              <p
                className="font-normal
               text-lg "
              >
                Guaranteed submission in 3 working days or your money back. T&C
                Apply
              </p>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="font-bold text-5xl text-[#0A1C40]">4.6/5</p>
                <p>
                  <span>Based on 102 reviews</span>
                </p>
              </div>
              <div className="flex flex-col gap-2 ">
                <p className="flex font-semibold text-5xl text-[#0A1C40] ">
                  10{" "}
                  <span className="font-normal  text-lg text-[#0A1C40]">
                    Working days
                  </span>
                </p>
                <p className="font-normal text-xs text-[#0A1C40]">
                  Estimated Time
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default index;
