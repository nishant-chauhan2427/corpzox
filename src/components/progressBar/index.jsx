import React, { useState } from "react";

export const ProgressBar = ({ steps }) => {
  const [activeStep, setActiveStep] = useState(1);

  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };

  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };

  const totalSteps = steps?.length;

  const width = `${(100 / (totalSteps - 1)) * (activeStep - 1)}%`;

  return (
    <div className="w-full pr-2">
      <div className="flex justify-between mt-4 relative">
        {/* Background line */}
        <div className="absolute inset-y-1/2 w-full bg-[#F3E7F3] h-[4px] transform -translate-y-1/2"></div>
        {/* Step progress line */}
        <div
          className="absolute inset-y-1/2 w-full bg-[#34A853] h-[4px] transform -translate-y-1/2 transition-all duration-400"
          style={{ width }}
        ></div>

        {/* Steps */}
        {steps?.map(({ step, topLabel, bottomLabel, status }) => (
          <div key={step} className="relative z-10">
            <div
              className={` transition-all duration-400 flex justify-center items-center ${
                activeStep >= step ? "" : ""
              }`}
            >
              {activeStep > step ? (
                <div className="text-[#4A154B] text-xl font-semibold transform scale-x-[-1] rotate-[-46deg]">
                  `
                </div>
              ) : (
                <span className="text-[#F3E7F3] text-[19px] sm:text-[16px]">
                  `
                </span>
              )}
            </div>
            <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span
                className={`w-fit  py-1 px-1 rounded ${
                  status === "completed"
                    ? "bg-[#34A853]"
                    : status === "in-progress"
                    ? "bg-[#FBBC05]"
                    : "bg-[#CCCCCC]"
                } font-normal text-[10px] text-white whitespace-nowrap`}
              >
                {topLabel}
              </span>
            </div>
            <div className="absolute top-[25px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="text-[10px] text-gray-500 whitespace-nowrap">
                {bottomLabel}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="flex justify-between mt-[10px] mx-[-15px]">
        <button
          onClick={prevStep}
          disabled={activeStep === 1}
          className="w-[90px] py-2 bg-[#4A154B] text-white rounded-[4px] cursor-pointer active:scale-95 disabled:bg-[#F3E7F3] disabled:text-black disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={nextStep}
          disabled={activeStep === totalSteps}
          className="w-[90px] py-2 bg-[#4A154B] text-white rounded-[4px] cursor-pointer active:scale-95 disabled:bg-[#F3E7F3] disabled:text-black disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div> */}
    </div>
  );
};
