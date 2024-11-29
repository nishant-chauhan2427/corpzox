import { useState } from "react";
import { Link } from "react-router-dom";
import { GoDotFill, GoTriangleDown } from "react-icons/go";
import { ProgressBar } from "../../../../../components/progressBar";
import { Heading } from "../../../../../components/heading";
import { ConfirmationModal } from "../../../../../components/modal/confirmationModal";
import { p } from "framer-motion/client";
import { ReactModal } from "../../../../../components/modal";

export const ServicesProgress = ({ data }) => {
  const [dropdownStates, setDropdownStates] = useState(data.map(() => false));
  const [confirmationModal, setConfirmationModal] = useState(false);

  const handleServiceDropdown = (index) => {
    setDropdownStates((prevState) =>
      prevState.map((state, i) => (i === index ? !state : state))
    );
  };

  const onConfirmationModalClose = () => {
    setConfirmationModal(!confirmationModal);
  };

  const servicesProgessSteps = [
    {
      step: 1,
      topLabel: "Under Review",
      bottomLabel: "Mar 12, 2024",
      status: "completed",
    },
    {
      step: 2,
      topLabel: "Service Started",
      bottomLabel: "Mar 15, 2024",
      status: "completed",
    },
    {
      step: 3,
      topLabel: "Payment Received",
      bottomLabel: "Mar 16, 2024",
      status: "completed",
    },
    {
      step: 4,
      topLabel: "Documents Uploaded",
      bottomLabel: "Mar 17, 2024",
      status: "completed",
    },
    { step: 5, topLabel: "App. Submitted", status: "in-progress" },
    {
      step: 6,
      topLabel: "App. In Progress",
      estimated: "Est: 5-6 Days",
      status: "pending",
    },
    {
      step: 7,
      topLabel: "Service Completed",
      estimated: "Est: 1-2 Days",
      status: "pending",
    },
  ];

  return (
    <div>
      <div className="py-2 flex flex-col sm:flex-row justify-between gap-2">
        <Heading className={"py-0"} tourButton={true}>
          Your Service Progress Updates
        </Heading>
        <Link className="font-semibold text-[#606060]">View All</Link>
      </div>
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
                      <Link className="flex items-center h-8 px-2 py-0.5 rounded-full font-semibold text-sm text-[#037847] bg-[#03784728]">
                        <span>
                          <GoDotFill />
                        </span>
                        Rate review{" "}
                      </Link>
                    }
                  >
                    <></>
                  </ReactModal>
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
    </div>
  );
};

const Dropdown = ({ isOpen, servicesProgessSteps }) => {
  return (
    <>
      {isOpen && (
        <div className="p-6">
          <div className="flex justify-between items-center">
            <ProgressBar steps={servicesProgessSteps} />
            {/* {servicesProgessSteps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col items-center relative text-white`}
              >
                <div
                  className={`w-fit px-1 py-0.5 rounded ${
                    step.status === "completed"
                      ? "bg-green-600"
                      : step.status === "in-progress"
                      ? "bg-yellow-600"
                      : "bg-gray-600"
                  }`}
                >
                  <p className="font-normal text-[10px]">{step.label}</p>
                </div>

                <div className="w-full h-4 bg-gray-300"></div>
                {step.date && (
                  <div className="text-[10px] text-gray-500">{step.date}</div>
                )}
                {step.estimated && (
                  <div className="text-[10px] text-gray-500">
                    {step.estimated}
                  </div>
                )}
              </div>
            ))} */}
          </div>
        </div>
      )}
    </>
  );
};
