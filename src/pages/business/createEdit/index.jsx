import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/buttons";
import { RegistrationDetails } from "./components/registration";
import { AddressDetails } from "./components/address";
import { FinancialDetails } from "./components/financial";
import { KYCDetails } from "./components/kyc";
import { FundingDetails } from "./components/funding";
import { yupResolver } from "@hookform/resolvers/yup";
import { createBusiness, resetBusiness, setBusinessId } from "../../../redux/slices/businessSlice";
import { ModalWrapper } from "../../../components/wrappers/modal";
import { useNavigate } from "react-router-dom";
import BusinessListing from "../listing";
import { useDispatch, useSelector } from "react-redux";
import { registrationDetails, updateRegistrationDetails } from "../../../redux/actions/business-action";
import { addressSchema, financialSchema, fundingSchema, kycSchema, registrationSchema } from "../../../validation/createBusinessValidationSchema";

const CreateBusiness = ({isEdit}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const {business,businessId} = useSelector((state) => state.business);

  console.log("DATAAA",business);
  const dispatch = useDispatch();
  const getValidationSchema = (step) => {
    switch (step) {
      case 0:
        return registrationSchema;
      case 1:
        return addressSchema;
      case 2:
        return financialSchema;
      case 3:
        return kycSchema;
      case 4:
        return fundingSchema;
      default:
        return null;
    }
  };

  // console.log("Business Data",business);


  const {
    handleSubmit,
    control,
    formState: { errors, isValid, touchedFields },
    setValue,
    getValues,
    watch,
    trigger,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(getValidationSchema(currentStep)),
      defaultValues: business || {},
  });

  const handleBlur = async (field) => {
    console.log("field",field);
    await trigger(field);
  };

  const onSubmit = (data) => {
    console.log(data, "data before transformation");
    //dispatch(createBusiness(data));
  };

    // Function to get the current schema based on the current step
  

  // Step data to render specific components
  const steps = [
    {component: <RegistrationDetails
      setValue={setValue}
      control={control}
      errors={errors}
      touchedFields={touchedFields}
      handleBlur= {handleBlur}
      trigger = {trigger}
      isEdit={isEdit}
    />, key: 'registration'},
    {component: <AddressDetails setValue={setValue} control={control} errors={errors} handleBlur= {handleBlur}
    trigger = {trigger}
    />,key: "address"},
    {component: <FinancialDetails setValue={setValue} control={control} errors={errors} handleBlur= {handleBlur}
    trigger = {trigger} />, key:"financial"},
    {component: <KYCDetails setValue={setValue} control={control} errors={errors} handleBlur= {handleBlur}
    trigger = {trigger}/>, key: "kyc"},
    {component: <FundingDetails setValue={setValue} control={control} errors={errors} handleBlur= {handleBlur}
    trigger = {trigger}/>, key: "funding"},
  ];

  // useEffect(() => {
  //   trigger(); 
  // }, [currentStep, setValue, trigger]);
  
  
  useEffect(() => {
    const currentSection = steps[currentStep]?.key;
   
    if (business && business[currentSection]) {
      setValue(currentSection, business[currentSection]);
    }
  }, [currentStep, business, setValue]);

  // useEffect(() =>{
  //   if(!isEdit && !businessId){
  //     dispatch(resetBusiness());
  //   }
   
  // })

  // Handle step navigation
  const handleNextStep = async () => {
    const isStepValid = await trigger();
    if (!isStepValid) {
      return;
    }
   // Trigger validation for the current step
    if (!isStepValid) {
      return; 
    }
    if(currentStep == 0){
      const currentSection = steps[currentStep].key;
      const data = getValues(currentSection);
      
      
      if (businessId || business?._id) {
        data.businessId = businessId ? businessId : business?._id;
        dispatch(updateRegistrationDetails(data));
      } else {
        dispatch(registrationDetails(data)).then((response) => {
          console.log("Response",response);
          const newBusinessId = response.payload;
          dispatch(setBusinessId(newBusinessId)); 
        });
      }
    }
    if (currentStep <= steps.length - 1) {
      const currentSection = steps[currentStep].key;
      const data = getValues(currentSection);
      console.log("Data to be dispatched for section", currentSection, ":", data);
      console.log("Get Values",getValues('registration'));

      if (data && Object.keys(data).length > 0) {
        dispatch(createBusiness({ section: currentSection, data }));
      }

      
      console.log("Steps",currentStep,steps.length);
    }  
    if (currentStep === steps.length - 1) {
      
      navigate("/business/preview");
    } else {
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
            {steps[currentStep]?.component}
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
