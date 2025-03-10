import { Controller, useForm } from "react-hook-form";
import { Input } from "../../../../../components/inputs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { isEqualObject, validateNumber, validateProfitValue } from "../../../../../utils";
import { Button } from "../../../../../components/buttons";
import { useNavigate } from "react-router-dom";
import {
  updateFinancialDetails,
  updateRegistrationDetails,
} from "../../../../../redux/actions/business-action";
import { yupResolver } from "@hookform/resolvers/yup";
import { financialSchema } from "../../../../../validation/createBusinessValidationSchema";

export const FinancialDetails = ({ isEdit }) => {
  const { business, businessId, loading } = useSelector(
    (state) => state.business
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log("business,businessId",business,businessId);

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
    resolver: yupResolver(financialSchema), // Apply the validation schema here
  });

  // useEffect(() => {
  //   // Ensure to populate the registration data when business is available
  //   if (business) {
  //     setValue("financial.capital", business?.financial?.capital);
  //     setValue("financial.revenue", business?.financial?.revenue);
  //     setValue("financial.profit", business?.financial?.profit);
  //   }
  // }, [business, setValue]);

  const handleFieldChange = (fieldName, field, trigger) => {
    return (e) => {
      field.onChange(e); // Default handling
      trigger(fieldName); // Manually trigger validation for this field
    };
  };

  // const handleFieldBlur = (fieldName) => {
  //   return () => {
  //     handleBlur(fieldName); // Call the default handleBlur to trigger validation on blur
  //     trigger(fieldName); // Manually trigger validation for the field on blur
  //   };
  // };

  const onSubmit = (data) => {
    // console.log("Submitted Data:", data);
    const payload = data?.financial;
    if (!businessId) {
      // console.log("No businessId exist is in business Store");
      return;
    }

    const { financial } = business;
    const isChanged = financial && !isEqualObject(financial, payload);
    // console.log("isChanged", isChanged);

    if (!isChanged) {
      isEdit ? navigate("/business/edit/kyc") : navigate("/business/create/kyc");
      return;
    }

    //PUT API to update changes
    payload.businessId = businessId;
    dispatch(updateFinancialDetails(payload)).then((response) => {
      //  console.log("Response", response?.payload);
      // const newBusinessId = response.payload;
      // dispatch(setBusinessId(newBusinessId));
      if (!response?.error)
        isEdit ? navigate("/business/edit/kyc") : navigate("/business/create/kyc");
    });

    // navigate("/business/create/kyc");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 mb-4 rounded-full">
        <div
          className="h-2 bg-blue-500 rounded-full"
          style={{
            // width: `${(currentStep / (steps.length - 1)) * 100}%`,
            width: `60%`,
          }}
        ></div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div>
          <div className="my-4">
            <h5 className="font-semibold text-base text-[#4D4D4F] dark:text-gray-200">
              Financial Details
            </h5>
            <p className="text-xs">
              Provide the necessary financial detail of your own business.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <Controller
              name={`financial.capital`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Capital`}
                  placeholder={`Enter capital`}
                  errorContent={errors.financial?.capital?.message}
                  required={true}
                  // onBlur={handleFieldBlur(`financial.capital`)} // Trigger validation on blur
                  onChange={handleFieldChange(
                    `financial.capital`,
                    field,
                    trigger
                  )} // Trigger validation on change
                  onKeyDown={validateNumber}
                  onInput={(e) => {
                    const value = e.target.value;
                    // Prevent invalid characters and limit input length to 10
                    e.target.value = value
                      .replace(/[^0-9]/g, "") // Allow only digits
                      .slice(0, 10); // Limit to 10 characters
                    field.onChange(e); // Trigger React Hook Form's onChange
                  }}
                />
              )}
            />
            <Controller
              name={`financial.revenue`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Revenue`}
                  placeholder={`Enter revenue`}
                  errorContent={errors.financial?.revenue?.message}
                  required={true}
                  // onBlur={handleFieldBlur(`financial.revenue`)} // Trigger validation on blur
                  onChange={handleFieldChange(
                    `financial.revenue`,
                    field,
                    trigger
                  )} // Trigger validation on change
                  onKeyDown={validateNumber}
                  onInput={(e) => {
                    const value = e.target.value;
                    // Prevent invalid characters and limit input length to 10
                    e.target.value = value
                      .replace(/[^0-9]/g, "") // Allow only digits
                      .slice(0, 10); // Limit to 10 characters
                    field.onChange(e); // Trigger React Hook Form's onChange
                  }}
                />
              )}
            />
            <Controller
              name={`financial.profit`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Profit`}
                  placeholder={`Enter profit`}
                  errorContent={errors.financial?.profit?.message}
                  required={true}
                  // onBlur={handleFieldBlur(`financial.profit`)} // Trigger validation on blur
                  onChange={handleFieldChange(
                    `financial.profit`,
                    field,
                    trigger
                  )} // Trigger validation on change
                  onKeyDown={validateProfitValue}
                  // onInput={(e) => {
                  //   let value = e.target.value;

                  //   // Allow negative sign only at the beginning
                  //   if (value.startsWith('-')) {
                  //     value = '-' + value.slice(1).replace(/[^0-9]/g, ''); // Keep digits after the negative sign
                  //   } else {
                  //     value = value.replace(/[^0-9]/g, ''); // Allow only digits
                  //   }

                  //   // Limit to at most 10 characters (including the negative sign)
                  //   if (value.startsWith('-')) {
                  //     value = value.slice(0, 11); // 10 digits + 1 negative sign
                  //   } else {
                  //     value = value.slice(0, 10); // 10 digits max for positive numbers
                  //   }

                  //   e.target.value = value; // Update the input value
                  //   field.onChange(value); // Trigger React Hook Form's onChange
                  // }}

                  onInput={(e) => {
                    const value = e.target.value;
                    e.target.value = value.slice(0, 10); // Enforce max length on paste
                  }}
                />
              )}
            />
          </div>
        </div>
      </div>
      {/* Navigation Buttons */}
      <div className="flex justify-between items-center gap-4 m-2">
        <Button
          className="flex items-center gap-2"
          type="button"
          onClick={() => navigate(-1)}
        >
          <span> &lt;&lt; </span>Back
        </Button>
        <Button
          type="submit"
          primary
          disabled={!isValid || loading}
          isLoading={loading}
        >
          {loading ? "Saving..." : "Save & Next"}
        </Button>
      </div>
    </form>
  );
};
