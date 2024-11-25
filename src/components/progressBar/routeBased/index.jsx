import React from "react";

export const RouteProgressBar = ({ steps }) => {
  const totalSteps = steps?.length;

  // Calculate the width of the completed progress bar
  const completedSteps = steps.filter(
    (step) => step.status === "completed"
  ).length;
  const width = `${(100 / (totalSteps - 1)) * completedSteps}%`;

  return (
    <div className="w-full px-10 pb-10">
      <div className="flex justify-between relative">
        {/* Background line */}
        <div className="absolute inset-y-1/2 w-full bg-[#C6C6C6]  h-[1px] transform -translate-y-1/2"></div>

        {/* Step progress line */}
        <div
          className="absolute inset-y-1/2 w-full bg-[#F1359C] h-[1px] transform -translate-y-1/2 transition-all duration-400"
          style={{ width }}
        ></div>

        {steps?.map(({ step, topLabel, bottomLabel, status }) => (
          <div key={step} className="relative z-10">
            {/* Step Circle with Tick or Number */}
            <div
              className={`w-5 h-5 rounded-full flex  justify-center items-center ${
                status === "completed"
                  ? " border-2   border-[#F1359C] text-white"
                  : status === "current"
                  ? "bg-[#E5E5E5] text-black border-2 border-[#C6C6C6] "
                  : "bg-gray-300 text-gray-600 "
              }`}
            >
              {status === "completed" ? (
                <span className="text-white bg-white font-bold text-xl">
                  <img
                    src="/public/icons/payment/Progress-tick.svg"
                    width={12}
                    alt=""
                  />
                </span>
              ) : (
                <span className="text-sm font-bold"></span>
              )}
            </div>

            {/* Top Label */}
            {topLabel && (
              <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="text-xs font-normal text-gray-500 whitespace-nowrap">
                  {topLabel}
                </span>
              </div>
            )}

            {/* Bottom Label */}
            {bottomLabel && (
              <div className="absolute top-[30px] left-1/2 pt-4 transform -translate-x-1/2 -translate-y-1/2">
                <span className="text-sm font-medium text-gray-500 whitespace-nowrap">
                  {bottomLabel}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
