import React from "react";

export const RouteProgressBar = ({ currStep, totalSteps }) => {
  // Calculate progress width percentage
  const progressWidth = `${Math.min(100, Math.max(0, (currStep / totalSteps) * 100))}%`;

  return (
    <div className="w-full px-10 pt-6 pb-2 ">
      <div className="flex justify-between relative">
        {/* Background line */}
        <div className="absolute inset-y-1/2 w-full bg-[#C6C6C6] h-[1px] transform -translate-y-1/2"></div>

        {/* Progress line */}
        <div
          className="absolute inset-y-1/2 bg-[#F1359C] h-[1px] transform -translate-y-1/2 transition-all duration-400"
          style={{ width: progressWidth }}
        ></div>

        {/* Steps */}
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;

          // Determine status for each step
          const status =
            stepNumber < currStep
              ? "completed"
              : stepNumber === currStep
              ? "current"
              : "upcoming";

          return (
            <div key={stepNumber} className="relative z-10">
              {/* Step Circle */}
              <div
                className={`w-5 h-5 rounded-full flex justify-center items-center ${
                  status === "completed"
                    ? "border-2 border-[#F1359C] text-white"
                    : status === "current"
                    ? "bg-[#E5E5E5] text-black border-2 border-[#C6C6C6]"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {status === "completed" ? (
                  <img
                    src="/icons/payment/Progress-tick.svg"
                    width={12}
                    alt="Completed"
                  />
                ) : (
                  <span className="text-sm font-bold">{stepNumber}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
