import { Controller } from "react-hook-form";
import { Input } from "../../../../../components/inputs";
import { Selector } from "../../../../../components/select";

export const FundingDetails = ({ control, errors }) => {
  const isFundingRequiredOption = [
    { label: "Yes", value: 1 },
    { label: "No", value: 0 },
  ];
  const existingBusinessOption = [
    // { label: "Active", value: 1 },
    // { label: "Inactive", value: 0 },
  ];

  return (
    <div>
      <div className="pt-4 flex flex-col md:flex-row gap-4">
        <div>
          <div className="my-4">
            <h5 className="font-semibold text-base text-[#4D4D4F] dark:text-gray-200">
              Funding Requirement
            </h5>
            <p className="text-xs">
              Provide the necessary funding detail of your own business.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Controller
              name={`fundingRequirement.isFundingRequired`}
              control={control}
              render={({ field }) => (
                <Selector
                  {...field}
                  label={"Funding Required"}
                  placeholder={"Select existing business"}
                  errorContent={errors.fundingRequirement?.isFundingRequired?.message}
                  options={isFundingRequiredOption}
                  required={true}
                />
              )}
            />
            <Controller
              name="fundingRequirement.existingBusiness"
              control={control}
              render={({ field }) => (
                <Selector
                  {...field}
                  label={"Existing Business"}
                  placeholder={"Select existing business"}
                  errorContent={errors.fundingRequirement?.existingBusiness?.message}
                  options={existingBusinessOption}
                  required={true}
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
