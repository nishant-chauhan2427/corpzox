import { useState } from "react";
import { Link } from "react-router-dom";
import { GoDotFill, GoTriangleDown } from "react-icons/go";

export const ServicesProgress = ({ data }) => {
  const [servicesDropdown, setServicesDropdown] = useState(false);

  const handleServiceDropdown = () => {
    setServicesDropdown(!servicesDropdown);
  };

  const servicesProgessSteps = [
    { label: "Under Review", date: "Mar 12, 2024", status: "completed" },
    { label: "Service Started", date: "Mar 15, 2024", status: "completed" },
    { label: "Payment Received", date: "Mar 16, 2024", status: "completed" },
    { label: "Documents Uploaded", date: "Mar 17, 2024", status: "completed" },
    { label: "Application Submitted", status: "in-progress" },
    {
      label: "Application In Progress",
      estimated: "Est: 5-6 Days",
      status: "pending",
    },
    {
      label: "Service Completed",
      estimated: "Est: 1-2 Days",
      status: "pending",
    },
  ];

  return (
    <div className="pt-10">
      <div className="flex justify-between gap-4 pb-4">
        <p className="flex items-center font-semibold gap-4 text-xl text-[#0A1C40] ">
          Your Service Progress Updates
          <span>
            <img src="/icons/dashboard/take-a-tour.svg" alt="" />
          </span>
        </p>
        <Link className="font-semibold text-[#606060]">View All</Link>
      </div>
      {data.length > 0 ? (
        <div className="flex flex-col gap-4">
          {data.map((data, index) => (
            <>
              <div className="bg-[#F8FAFF] px-4 py-2 rounded-md">
                <div key={index} className="flex justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2">
                      <img
                        src="/images/dashboard/service-progress.svg"
                        alt=""
                      />
                      <p className="font-bold">{data.name} </p>
                      <img
                        src="/icons/dashboard/service-error.svg"
                        width={15}
                        alt=""
                      />
                    </div>
                    <div className="flex gap-2">
                      <h6 className="font-normal text-sm">
                        Business: {data.detail1}{" "}
                      </h6>
                      <p className="font-normal text-sm ">
                        Step: {data.detail2}{" "}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <p className="flex items-center h-8 px-2 py-0.5 rounded-full font-semibold text-sm text-[#037847] bg-[#03784728]">
                      <span>
                        <GoDotFill />
                      </span>
                      On Time
                    </p>
                    <button onClick={handleServiceDropdown}>
                      <GoTriangleDown size={30} />
                    </button>
                  </div>
                </div>
                {servicesDropdown && (
                  <div className="p-6 bg-gray-100 font-sans">
                    <div className="flex justify-between items-center">
                      {servicesProgessSteps.map((step, index) => (
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
                            <p className="font-normal text-[10px]">
                              {step.label}
                            </p>
                          </div>
                          <div className="w-full h-4">

                          </div>
                          {step.date && (
                            <div className="text-[10px] text-gray-500">
                              {step.date}
                            </div>
                          )}
                          {step.estimated && (
                            <div className="text-[10px] text-gray-500">
                              {step.estimated}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          ))}
        </div>
      ) : (
        <div className="flex justify-center gap-2 items-center flex-col h-[80vh]">
          <img src="/images/service-prgress.svg  " alt="" />
          <p className="font-bold  text-xl text-[#000000] ">No Services </p>
          <p className="font-normal text-[#797979]">
            Create a Business to add your Service{" "}
          </p>
        </div>
      )}
    </div>
  );
};
