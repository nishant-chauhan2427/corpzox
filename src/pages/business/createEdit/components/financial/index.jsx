import { Controller } from "react-hook-form";
import { Input } from "../../../../../components/inputs";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export const FinancialDetails = ({ control, errors, setValue, handleBlur, trigger }) => {

  
  const {business,businessId} = useSelector((state) => state.business);

  useEffect(() => {
    // Ensure to populate the registration data when business is available
    if (business) {
      setValue("financial.capital", business?.financial?.capital);
      setValue("financial.revenue", business?.financial?.revenue);
      setValue("financial.profit", business?.financial?.profit);
    }
  }, [business, setValue]);

  const handleFieldChange = (fieldName, field, trigger) => {
    return (e) => {
      field.onChange(e); // Default handling
      trigger(fieldName); // Manually trigger validation for this field
    };
  };

  const handleFieldBlur = (fieldName) => {
    return () => {
      handleBlur(fieldName); // Call the default handleBlur to trigger validation on blur
      trigger(fieldName); // Manually trigger validation for the field on blur
    };
  };



  return (
    <div>
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
                  onBlur={handleFieldBlur(`financial.capital`)} // Trigger validation on blur
                  onChange={handleFieldChange(`financial.capital`, field, trigger)} // Trigger validation on change
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
                  onBlur={handleFieldBlur(`financial.revenue`)} // Trigger validation on blur
                  onChange={handleFieldChange(`financial.revenue`, field, trigger)} // Trigger validation on change
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
                  onBlur={handleFieldBlur(`financial.profit`)} // Trigger validation on blur
                  onChange={handleFieldChange(`financial.profit`, field, trigger)} // Trigger validation on change
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
