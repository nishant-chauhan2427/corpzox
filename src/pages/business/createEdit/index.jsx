import { ModalWrapper } from "../../../components/wrappers/modal";
import { Outlet, useNavigate } from "react-router-dom";
import BusinessListing from "../listing";
const CreateBusiness = ({ isEdit=false }) => {
  
  return (
    <div>
      <BusinessListing />
      <ModalWrapper title={isEdit?"Edit Business Details":"Add Business Details"}>
        <div
          // onSubmit={handleSubmit(onSubmit)}
          className="px-4 my-2  flex flex-col gap-4"
        >
          {/* Progress bar */}
          {/* <div className="w-full h-2 bg-gray-200 mb-4 rounded-full">
            <div
              className="h-2 bg-blue-500 rounded-full"
              style={{
                // width: `${(currentStep / (steps.length - 1)) * 100}%`,
                width: `20%`,
              }}
            ></div>
          </div> */}

          {/* Step Components */}
          <div className="p-4 h-[60vh] overflow-y-auto">
            <Outlet />
            {/* {steps[currentStep]?.component} */}
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
};

export default CreateBusiness;
