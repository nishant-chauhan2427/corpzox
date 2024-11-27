import { Controller } from "react-hook-form";
import { Input } from "../../../../../components/inputs";
import { Selector } from "../../../../../components/select";

export const FundingDetails = ({ control, errors, setValue, handleBlur, trigger }) => {
  const isFundingRequiredOption = [
    { label: "Yes", value: 1 },
    { label: "No", value: 0 },
  ];
  const existingBusinessOption = [
    { label: "Active", value: 1 },
    { label: "Inactive", value: 0 },
  ];

  return (
    <div>
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
              name={`funding.fundingRequirement.lookingForFunding`}
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
                    errorContent={errors.funding?.fundingRequirement?.lookingForFunding?.message}
                    options={isFundingRequiredOption}
                    required={true}
                    value={selectedFund || {}}
                    onBlur={() => handleBlur("funding.fundingRequirement.lookingForFunding")}
                    onChange={(selectedValue) => {
                      field.onChange(selectedValue.value); // Default handling
                      trigger("funding.fundingRequirement.lookingForFunding"); // Manually trigger validation
                      setValue("funding.fundingRequirement.lookingForFunding", selectedValue.value); // Update value
                    }}
                  />
                );
              }}
            />
            <Controller
              name="funding.fundingRequirement.existingBusinessName"
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
                    errorContent={errors.funding?.fundingRequirement?.existingBusinessName?.message}
                    options={existingBusinessOption}
                    required={true}
                    value={selectedFund || {}}
                    onBlur={() => handleBlur("funding.fundingRequirement.existingBusinessName")}
                    onChange={(selectedValue) => {
                      field.onChange(selectedValue.value); // Default handling
                      trigger("funding.fundingRequirement.existingBusinessName"); // Manually trigger validation
                      setValue("funding.fundingRequirement.existingBusinessName", selectedValue.value); // Update value
                    }}
                  />
                );
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
