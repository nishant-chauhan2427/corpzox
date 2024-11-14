import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/buttons";
import { RegistrationDetails } from "./components/registration";
import { AddressDetails } from "./components/address";
import { FinancialDetails } from "./components/financial";
import { KYCDetails } from "./components/kyc";
import { FundingDetails } from "./components/funding";
import { createBusiness } from "../../../redux/slices/businessSlice";
import { useNavigate } from "react-router-dom";

const CreateBusiness = () => {
  const [currentStep, setCurrentStep] = useState(0); // Track current step
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  const onSubmit = (data) => {
    console.log(data, "data before transformation");
    dispatch(createBusiness(data));
  };

  // Step data to render specific components
  const steps = [
    <RegistrationDetails
      setValue={setValue}
      control={control}
      errors={errors}
    />,
    <AddressDetails setValue={setValue} control={control} errors={errors} />,
    <FinancialDetails setValue={setValue} control={control} errors={errors} />,
    <KYCDetails setValue={setValue} control={control} errors={errors} />,
    <FundingDetails setValue={setValue} control={control} errors={errors} />,
  ];

  // Handle step navigation
  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div>
      <div className="fixed top-0 left-0 bg-black bg-opacity-20 backdrop-blur-sm w-full h-screen flex justify-center items-center z-[1001]">
        <div className="relative bg-white bg-opacity-60 backdrop-blur-lg rounded-3xl w-full max-w-2xl">
          <h3 className="mt-4 font-bold text-2xl text-center">
            Add Business Details
          </h3>
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 right-4"
          >
            ❌
          </button>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-4 my-2 flex flex-col gap-4"
          >
            {/* Progress bar */}
            <div className="w-full h-2 bg-gray-200 mb-4 rounded-full">
              <div
                className="h-2 bg-blue-500 rounded-full"
                style={{
                  width: `${(currentStep / (steps.length - 1)) * 100}%`,
                }}
              ></div>
            </div>

            {/* Step Components */}
            <div className="px-4 h-[60vh] overflow-y-auto">
              {steps[currentStep]}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center gap-4">
              <Button
                type="button"
                outLine={true}
                onClick={handlePrevStep}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              <Button
                type="button"
                primary={true}
                onClick={handleNextStep}
                disabled={!isValid}
              >
                {currentStep === steps.length - 1 ? "Submit" : "Next"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBusiness;
