import { Controller } from "react-hook-form";
import { Input } from "../../../../../components/inputs";
import { Selector } from "../../../../../components/select";

export const RegistrationDetails = ({ control, errors }) => {
  const roleOption = [
    { label: "Active", value: 1 },
    { label: "Inactive", value: 0 },
  ];

  const fundingOption = [
    { label: "Funded", value: "funded" },
    { label: "Bootstrap", value: "bootstrap" },
  ];

  const industryOption = [
    { label: "Technology", value: "tech" },
    { label: "Finance", value: "finance" },
    { label: "Healthcare", value: "healthcare" },
    { label: "Retail", value: "retail" },
    { label: "Education", value: "education" },
    { label: "Manufacturing", value: "manufacturing" },
    { label: "Entertainment", value: "entertainment" },
    { label: "Construction", value: "construction" },
    { label: "Transportation", value: "transportation" },
    { label: "Other", value: "other" },
  ];

  const subIndustryOption = {
    tech: [
      { label: "Software", value: "software" },
      { label: "Hardware", value: "hardware" },
      { label: "AI & ML", value: "ai_ml" },
      { label: "Cybersecurity", value: "cybersecurity" },
      { label: "Cloud Computing", value: "cloud_computing" },
      { label: "Other", value: "other" },
    ],
    finance: [
      { label: "Banking", value: "banking" },
      { label: "Insurance", value: "insurance" },
      { label: "Investment", value: "investment" },
      { label: "Fintech", value: "fintech" },
      { label: "Other", value: "other" },
    ],
    healthcare: [
      { label: "Medical Devices", value: "medical_devices" },
      { label: "Pharmaceuticals", value: "pharmaceuticals" },
      { label: "Health IT", value: "health_it" },
      { label: "Biotechnology", value: "biotech" },
      { label: "Other", value: "other" },
    ],
  };

  return (
    <div className="w-full">
      <div>
        <h5 className="mt-4 font-semibold text-base text-[#4D4D4F] dark:text-gray-200">
          Detailed Business Registration Details
        </h5>
        <p className="text-xs">
          Provide the necessary details to add your own business.
        </p>
      </div>
      <div className="w-full pt-4 flex flex-col md:flex-row gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Controller
            name={`businessType`}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={`Business Type`}
                placeholder={`Enter your business type`}
                errorContent={errors.businessType?.message}
                required={true}
              />
            )}
          />
          <Controller
            name={`businessName`}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={`Business Name`}
                placeholder={`Enter your business name`}
                errorContent={errors.businessName?.message}
                required={true}
              />
            )}
          />
          <Controller
            name={`cinNo`}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={`CIN No.`}
                placeholder={`Enter your CIN number`}
                errorContent={errors.cinNo?.message}
                required={true}
              />
            )}
          />
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Selector
                {...field}
                label={"Role"}
                placeholder={"Select role of the company"}
                errorContent={errors.role?.message}
                options={roleOption}
                required={true}
              />
            )}
          />

          <Controller
            name="yearOfEstablishment"
            control={control}
            render={({ field }) => {
              const minDate = new Date();
              minDate.setFullYear(minDate.getFullYear() - 100);
              const minDateString = minDate.toISOString().split("T")[0];

              return (
                <Input
                  {...field}
                  label={`Year of Establishment`}
                  type={"date"}
                  placeholder={"Enter DOF"}
                  min={minDateString} // Set the minimum date
                  max={new Date().toISOString().split("T")[0]} // Maximum is today
                  errorContent={errors.yearOfEstablishment?.message}
                />
              );
            }}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Controller
            name={`headquarterLocation`}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={`Headquarter Location`}
                placeholder={`Enter your headquarter location`}
                errorContent={errors.headquarterLocation?.message}
                required={true}
              />
            )}
          />
          <Controller
            name={`industryType`}
            control={control}
            render={({ field }) => (
              <Selector
                {...field}
                label={"Industry Type"}
                placeholder={"Select industry type"}
                errorContent={errors.industryType?.message}
                options={industryOption}
                required={true}
              />
            )}
          />
          <Controller
            name={`subIndustryType`}
            control={control}
            render={({ field, value }) => {
              const selectedIndustry = value?.industryType;
              const subIndustryOptions =
                subIndustryOption[selectedIndustry] || [];
              return (
                <Selector
                  {...field}
                  label={"Sub Industry Type"}
                  placeholder={"Select sub industry type"}
                  errorContent={errors.subIndustryType?.message}
                  options={subIndustryOptions}
                  required={true}
                />
              );
            }}
          />
          <Controller
            name="companySize"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={`Size of the company`}
                placeholder={`Enter size of the company`}
                errorContent={errors.companySize?.message}
                required={true}
              />
            )}
          />
          <Controller
            name="isFunded"
            control={control}
            render={({ field }) => (
              <Selector
                {...field}
                label={"Funding Status"}
                placeholder={"Select funding status"}
                errorContent={errors.isFunded?.message}
                options={fundingOption}
                required={true}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};
