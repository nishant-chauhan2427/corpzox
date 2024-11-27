import { Controller } from "react-hook-form";
import { Input } from "../../../../../components/inputs";

export const FinancialDetails = ({ control, errors, setValue, handleBlur, trigger }) => {
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
              name={`financial.financialDetails.capital`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Capital`}
                  placeholder={`Enter capital`}
                  errorContent={errors.financial?.financialDetails?.capital?.message}
                  required={true}
                  onBlur={handleFieldBlur(`financial.financialDetails.capital`)} // Trigger validation on blur
                  onChange={handleFieldChange(`financial.financialDetails.capital`, field, trigger)} // Trigger validation on change
                />
              )}
            />
            <Controller
              name={`financial.financialDetails.revenue`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Revenue`}
                  placeholder={`Enter revenue`}
                  errorContent={errors.financial?.financialDetails?.revenue?.message}
                  required={true}
                  onBlur={handleFieldBlur(`financial.financialDetails.revenue`)} // Trigger validation on blur
                  onChange={handleFieldChange(`financial.financialDetails.revenue`, field, trigger)} // Trigger validation on change
                />
              )}
            />
            <Controller
              name={`financial.financialDetails.profit`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Profit`}
                  placeholder={`Enter profit`}
                  errorContent={errors.financial?.financialDetails?.profit?.message}
                  required={true}
                  onBlur={handleFieldBlur(`financial.financialDetails.profit`)} // Trigger validation on blur
                  onChange={handleFieldChange(`financial.financialDetails.profit`, field, trigger)} // Trigger validation on change
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
