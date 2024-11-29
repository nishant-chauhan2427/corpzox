import React from "react";
import { PageHeading } from "../../../components/heading";
import { ServicesProgress } from "../../dashboard/components/services/progress";
import {
    businessListing,
    recommendedServicesListing,
    servicesProgress,
  } from "../../../database";

const ServiceprogressViewAll = ({data}) => {
  return (
    <>
      <PageHeading title={"Your Service Progress Updates"} back={true}>
        Your Service Progress Updates
      </PageHeading>
      {data.length > 0 ? (
        <div className="flex flex-col gap-4">
          {data.map((data, index) => (
            <div key={index} className="bg-[#F8FAFF] px-4 py-2 rounded-md">
              <div className="flex flex-col sm:flex-row items-start justify-between sm:items-center gap-2">
                <div className="flex flex-col gap-1">
                  <div className="flex gap-2">
                    <img src="/images/dashboard/service-progress.svg" alt="" />
                    <p className="font-bold">Service: {data.name} </p>
                    <img
                      src="/icons/dashboard/service-error.svg"
                      width={15}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h6 className="text-sm text-[#7C7D80]">
                      <strong>Business:</strong> {data.detail1}
                    </h6>
                    <p className="text-sm text-[#7C7D80]">
                      <strong>Step:</strong> {data.detail2}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <ReactModal
                    crossButton={true}
                    className="border-[#FF3B3B] border-[3px] py-2 w-[55%]"
                    button={
                      <Link className="flex items-center  px-4 py-[10px] rounded-full font-semibold text-base text-[#0068FF] bg-[#DBE9FE]">
                        Rate Your Experience
                      </Link>
                    }
                  >
                    <>
                      <div>
                        <p className="text-[32px]  text-[#232323] font-bold">
                          Rate Your Experience!
                        </p>
                        <div className="pt-4 pb-5">
                          <label
                            htmlFor="Review"
                            className="flex text-lg font-bold text-[#0A1C40]"
                          >
                            Review
                          </label>
                          <TextArea
                            className="min-h-20 placeholder:text-xl border bg-white border-[#D9D9D9]"
                            placeholder="Add Review"
                          />
                        </div>
                        <div className="flex justify-center items-center pb-20">
                          <Rating size={40} rating={4} />
                        </div>
                        <div className="flex justify-end gap-4">
                          <Button outline={true}>Maybe Later </Button>
                          <Button primary={true} disabled={true}>
                            Submit{" "}
                          </Button>
                        </div>
                      </div>
                    </>
                  </ReactModal>
                  <Button primary={true}>Avail again</Button>
                  <button
                    className={`${
                      dropdownStates === true && "rotate-180"
                    } hidden lg:block`}
                    onClick={() => handleServiceDropdown(index)}
                  >
                    <GoTriangleDown size={30} />
                  </button>
                </div>
              </div>
              <Dropdown
                isOpen={dropdownStates[index]} // Pass the state for this specific dropdown
                servicesProgessSteps={servicesProgessSteps}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center gap-2 items-center flex-col h-[80vh]">
          <img src="/images/service-prgress.svg  " alt="" />
          <p className="font-bold text-xl text-[#000000] ">No Services </p>
          <p className="font-normal text-[#797979]">
            Create a Business to add your Service{" "}
          </p>
        </div>
      )}
    </>
  );
};

export default ServiceprogressViewAll;
