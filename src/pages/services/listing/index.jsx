import { useState } from "react";
import { Checkbox } from "../../../components/inputs/checkbox";
import { CiHeart } from "react-icons/ci";
import { Button } from "../../../components/buttons";
import { servicesListing } from "../../../database";
import { insightBlog } from "../../../database";
import Insight from "../../../components/insight/insight";

const ServicesListing = () => {
  const [mainactiveTab, setmainActiveTab] = useState(0);
  const [categoryactiveTab, setcategoryActiveTab] = useState(0);
  const mainTabs = [
    { name: "Top Services" },
    { name: "Business Setup" },
    { name: "Finance and Compliance" },
    { name: "Waste Management" },
  ];

  return (
    <section className="flex sm:flex-row flex-col gap-4 sm:pt-6 pt-3 bg-white">
      <div className="flex flex-col sm:w-[70%]">
        <div>
          {/* Tab buttons */}
          <div className="flex space-x-5  overflow-x-auto scrollbar-hide whitespace-nowrap pb-4">
            {mainTabs.map((tab, index) => (
              <button
                key={index}
                className={`sm:m-4 ${
                  mainactiveTab === index
                    ? "text-[#0A1C40] text-base font-bold border-b-2 py-1 border-[#F1359C] rounded px-2 "
                    : "font-normal text-base text-[#7E7E7E]"
                }`}
                onClick={() => setmainActiveTab(index)}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {mainactiveTab === 0 && (
            <>
              {/* Service listing data here  */}
              <div className="grid grid-cols-1  sm:grid-cols-2 xl:grid-cols-2  gap-4">
                {servicesListing.map((service, index) => (
                  <div
                    key={index}
                    className="sm:m-3 flex flex-col gap-2 sm:gap-4 justify-between"
                  >
                    <div className="flex justify-between">
                      <p className="font-bold text-[#0A1C40]">
                        {service.projectName}
                      </p>
                      <Checkbox />
                    </div>
                    <p className="text-base font-normal text-[#7C7C7C]">
                      {service.projectDescription}
                    </p>
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between sm:w-4/5">
                        <p className="font-semibold text-sm text-[#7E7E7E]">
                          Estimated Time
                        </p>
                        <p className="font-bold text-[#000000]">
                          {service.estimatedTime}
                        </p>
                      </div>
                      <div className="flex justify-between sm:w-4/5">
                        <p className="font-semibold text-sm text-[#7E7E7E]">
                          Min Requirement
                        </p>
                        <p className="font-bold text-[#000000]">
                          {service.minRequirement}
                        </p>
                      </div>
                      <div className="flex justify-between sm:w-4/5">
                        <p className="font-semibold text-sm text-[#7E7E7E]">
                          Price
                        </p>
                        <p className="font-bold text-[#000000]">
                          {service.price}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end items-end">
                      <div className="flex items-center gap-2">
                        <CiHeart size={30} color="#777777" />
                        <Button
                          type="submit"
                          v2={true}
                          mainPrimary={true}
                          className="mt-2 py-2 px-4 rounded-lg text-[#0A1C40] font-semibold !border-none"
                        >
                          Avail It Now
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Service listing data here  */}
            </>
          )}
        </div>
      </div>
      <div className=" sm:w-[30%] pt-4">
        <Insight />
      </div>
    </section>
  );
};

export default ServicesListing;
