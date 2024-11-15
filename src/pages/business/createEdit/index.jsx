import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/buttons";
import { RegistrationDetails } from "./components/registration";
import { AddressDetails } from "./components/address";
import { FinancialDetails } from "./components/financial";
import { KYCDetails } from "./components/kyc";
import { FundingDetails } from "./components/funding";
import { createBusiness } from "../../../redux/slices/businessSlice";
import { ModalWrapper } from "../../../components/wrappers/modal";
import { useNavigate } from "react-router-dom";
import BusinessListing from "../listing";

const CreateBusiness = () => {
  const [currentStep, setCurrentStep] = useState(0);
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
    } else if (currentStep == 4){
      navigate("/business/preview")
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div>
      <BusinessListing />
      <ModalWrapper title={"Add Business Details"}>
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
          <div className="p-4 h-[60vh] overflow-y-auto">
            {steps[currentStep]}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center gap-4">
            <Button
              type="button"
              outline={true}
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
              {currentStep === steps.length - 1 ? "Preview" : "Next"}
            </Button>
          </div>
        </form>
      </ModalWrapper>
    </div>
  );
};

export default CreateBusiness;
