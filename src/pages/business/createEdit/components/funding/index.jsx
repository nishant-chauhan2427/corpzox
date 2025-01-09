import { Controller, useForm } from "react-hook-form";
import { Input } from "../../../../../components/inputs";
import { Selector } from "../../../../../components/select";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fundingSchema } from "../../../../../validation/createBusinessValidationSchema";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../../../../../components/buttons";
import { updateFundingDetails, updateRegistrationDetails } from "../../../../../redux/actions/business-action";
import { isEqualObject } from "../../../../../utils";

export const FundingDetails = ({ isEdit }) => {

  const { business, businessId, loading } = useSelector((state) => state.business);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log("business,businessId", business, businessId);


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
    // resolver: yupResolver(getValidationSchema(currentStep)),
    defaultValues: business || {},
    resolver: yupResolver(fundingSchema), // Apply the validation schema here
  });

  // useEffect(() => {
  //   // Ensure to populate the registration data when business is available
  //   if (business) {
  //     setValue("funding.lookingForFunding", business?.funding?.lookingForFunding);
  //     setValue("funding.existingBusinessName", business?.funding?.existingBusinessName);

  //   }
  // }, [business, setValue]);
  const isFundingRequiredOption = [
    { label: "Yes", value: 1 },
    { label: "No", value: 0 },
  ];
  const existingBusinessOption = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  useEffect(() => {
    // console.log("useeffect");

    setValue("funding.lookingForFunding", business?.funding?.lookingForFunding)
    setValue("funding.existingBusinessName", business?.funding.existingBusinessName)
  }, [])

  const onSubmit = (data) => {
    // console.log("Submitted Data : Funding  :", data);
    const payload = data?.funding

    if (!businessId) {
      // console.log("No businessId exist is in business Store");
      return;
    }


    const { funding } = business;
    const isChanged = funding && !isEqualObject(funding, payload);
    // console.log("isChanged", isChanged);

    if (!isChanged) {
      isEdit ? navigate(-5) : navigate("/business/preview");
      return;
    }

    //  //PUT API to update changes
    payload.businessId = businessId;
    dispatch(updateFundingDetails(payload)).then((response) => {
      //  console.log("Response", response?.payload);
      // const newBusinessId = response.payload;
      // dispatch(setBusinessId(newBusinessId)); 
      isEdit ? navigate(-5) : navigate("/business/preview");
    });


  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 mb-4 rounded-full">
        <div
          className="h-2 bg-blue-500 rounded-full"
          style={{
            // width: `${(currentStep / (steps.length - 1)) * 100}%`,
            width: `100%`,
          }}
        ></div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div>
          <div className="my-4">
            <h5 className="font-semibold text-base text-[#4D4D4F] dark:text-gray-200">
              Funding Requirement
            </h5>
            <p className="text-xs">
              Provide the necessary funding detail of your own business.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <Controller
              name={`funding.lookingForFunding`}
              control={control}
              render={({ field }) => {
                const selectedFund = isFundingRequiredOption.find(
                  (option) => option.value === field.value
                );
                return (
                  <Selector
                    {...field}
                    label={"Funding Required"}
                    placeholder={"Select funding requirement"}
                    errorContent={errors.funding?.lookingForFunding?.message}
                    options={isFundingRequiredOption}
                    required={true}
                    value={selectedFund || {}}
                    // onBlur={() => handleBlur("funding.lookingForFunding")}
                    onChange={(selectedValue) => {
                      field.onChange(selectedValue.value); // Default handling
                      trigger("funding.lookingForFunding"); // Manually trigger validation
                      setValue("funding.lookingForFunding", selectedValue.value); // Update value
                    }}
                  />
                );
              }}
            />
            <Controller
              name="funding.existingBusinessName"
              control={control}
              render={({ field }) => {
                const selectedFund = existingBusinessOption.find(
                  (option) => option.value === field.value
                );
                return (
                  <Selector
                    {...field}
                    label={"Existing Business"}
                    placeholder={"Select existing business"}
                    errorContent={errors.funding?.existingBusinessName?.message}
                    options={existingBusinessOption}
                    required={true}
                    value={selectedFund || {}}
                    // onBlur={() => handleBlur("funding.existingBusinessName")}
                    onChange={(selectedValue) => {
                      field.onChange(selectedValue.value); // Default handling
                      trigger("funding.existingBusinessName"); // Manually trigger validation
                      setValue("funding.existingBusinessName", selectedValue.value); // Update value
                    }}
                  />
                );
              }}
            />
          </div>
        </div>
      </div>
      {/* Navigation Buttons */}
      <div className="flex justify-between items-center gap-4 m-2">
        <Button type="button" className="flex items-center gap-2" onClick={() => navigate(-1)}>
          <span> &lt;&lt; </span>Back
        </Button>

        <Button type="submit" primary disabled={!isValid || loading} isLoading={loading} >
          {loading ? "Saving..." : isEdit ? "Save & Continue" : "Save & Preview"}
        </Button>
      </div>
    </form>
  );
};
