import { Controller, useWatch } from "react-hook-form";
import { Input } from "../../../../../components/inputs";
import { Selector } from "../../../../../components/select";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const RegistrationDetails = ({ control, errors, setValue, touchedFields,handleBlur,trigger }) => {
  const [subIndustryOptions, setSubIndustryOptions] = useState([]);
  const {business,businessId} = useSelector((state) => state.business);

  const dispatch = useDispatch();

  const selectedIndustry = useWatch({
    control,
    name: "registration.industry",
    defaultValue: "",
  });

  useEffect(() => {
    console.log("Selected Industry in useEffect:", selectedIndustry);
    setSubIndustryOptions([]);

   
    

    if (selectedIndustry && subIndustryOption[selectedIndustry]) {
      const updatedOptions = subIndustryOption[selectedIndustry];
      console.log("Updated subIndustryOptions:", updatedOptions);
      setSubIndustryOptions(updatedOptions);
    } else {
      console.log("No subIndustry options found for the selected industry");
      setSubIndustryOptions([]);
    }
  }, [selectedIndustry]); 

  useEffect(() => {
    // Ensure to populate the registration data when business is available
    if (business ) {
      setValue("registration.businessName", business?.registration?.businessName);
      setValue("registration.typeOfBusiness", business?.registration?.typeOfBusiness);
      setValue("registration.cinNumber", business?.registration?.cinNumber);
      setValue("registration.roleOfCompany", business?.registration?.roleOfCompany);
      setValue("registration.yearOfStablish", business?.registration?.yearOfStablish);
      setValue("registration.headQuarterLocation", business?.registration?.headQuarterLocation);
      setValue("registration.industry", business?.registration?.industry);
      setValue("registration.subIndustry", business?.registration?.subIndustry);
      setValue("registration.sizeOfCompany", business?.registration?.sizeOfCompany);
      setValue("registration.funded", business?.registration?.funded);
    }
  }, [business, setValue]);

  useEffect(() => {
    console.log("Errors: ", errors);
    console.log("Touched Fields: ", touchedFields);
  }, [errors, touchedFields]);

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
    { label: "Healthcare", value: "healthcare" }
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
        <h5 className="font-semibold text-base text-[#4D4D4F] dark:text-gray-200">
          Detailed Business Registration Details
        </h5>
        <p className="text-xs">
          Provide the necessary details to add your own business.
        </p>
      </div>
      <div className="w-full pt-4 flex flex-col md:flex-row md:justify-between gap-4">
        <div className="w-full grid grid-cols-1 gap-4">
          <Controller
            name={`registration.typeOfBusiness`}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={`Business Type`}
                placeholder={`Enter your business type`}
                errorContent={errors?.registration?.typeOfBusiness?.message}
                required={true}
                onBlur={()=> handleBlur(`registration.typeOfBusiness`)}
                onChange={(e) => {
                  field.onChange(e);  // Default handling
                  trigger("registration.typeOfBusiness");  // Manually trigger validation for this field
                }}
              />
            )}
          />
          <Controller
            name={`registration.businessName`}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={`Business Name`}
                placeholder={`Enter your business name`}
                errorContent={ errors.registration?.businessName?.message}
                onBlur={()=> handleBlur(`registration.businessName`)}
                required={true}
                onChange={(e) => {
                  field.onChange(e);  // Default handling
                  trigger("registration.businessName");  // Manually trigger validation for this field
                }}
              />
            )}
          />
          <Controller
            name={`registration.cinNumber`}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={`CIN No.`}
                placeholder={`Enter your CIN number`}
                errorContent={errors.registration?.cinNumber?.message}
                required={true}
                onBlur={()=>handleBlur(`registration.cinNumber`)}
                onChange={(e) => {
                  field.onChange(e);  // Default handling
                  trigger("registration.cinNumber");  // Manually trigger validation for this field
                }}
              />
            )}
          />
          <Controller
            name="registration.roleOfCompany"
            control={control}
            render={({ field }) => {
              const selectedRole = roleOption.find(
                (option) => option.value === field.value
              );
              return (
              <Selector
                {...field}
                label={"Role"}
                placeholder={"Select role of the company"}
                errorContent={errors.registration?.roleOfCompany?.message}
                options={roleOption}
                required={true}
                value={selectedRole || {}}
                onBlur={()=>handleBlur("registration.roleOfCompany")}
                onChange={(selectedValue) => {
                 
                  field.onChange(selectedValue.value); 
                  setValue("registration.roleOfCompany", selectedValue.value);
                }}
              />
            )}}
          />

          <Controller
            name="registration.yearOfStablish"
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
                  errorContent={errors.registration?.yearOfStablish?.message}
                  onBlur={()=>handleBlur("registration.yearOfStablish")}
                  onChange={(e) => {
                    field.onChange(e);  // Default handling
                    trigger("registration.yearOfStablish");  // Manually trigger validation for this field
                  }}
                />
              );
            }}
          />
        </div>
        <div className="w-1 mx-12 bg-gradient-to-b from-gray-100 via-black to-gray-100"></div>
        <div className="w-full grid grid-cols-1 gap-4">
          <Controller
            name={`registration.headQuarterLocation`}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={`Headquarter Location`}
                placeholder={`Enter your headquarter location`}
                errorContent={errors.registration?.headQuarterLocation?.message}
                required={true}
                onBlur={()=>handleBlur(`registration.headQuarterLocation`)}
                onChange={(e) => {
                  field.onChange(e);  // Default handling
                  trigger("registration.headQuarterLocation");  // Manually trigger validation for this field
                }}
              />
            )}
          />
          <Controller
            name={`registration.industry`}
            control={control}
            render={({ field }) => {
              const selectedIndustry = industryOption.find(
                (option) => option.value === field.value
              );

              return (
                <Selector
                  {...field}
                  label={"Industry Type"}
                  placeholder={"Select industry type"}
                  errorContent={errors.registration?.industry?.message}
                  options={industryOption}
                  required={true}
                  value={selectedIndustry || {}}
                  onChange={(selectedValue) => {
                    trigger("registration.industry");
                    field.onChange(selectedValue.value); 
                    setValue("registration.industry", selectedValue.value);
                    setValue("registration.subIndustry", ""); 
                  }}
                  onBlur={()=>handleBlur(`registration.industry`)}
                />
              );
            }}
          />

          <Controller
            name={`registration.subIndustry`}
            control={control}
            render={({ field, value }) => {
              console.log(
                "subIndustryOptions inside Controller:",
                subIndustryOptions
              );

              const selectedSubIndustry = subIndustryOptions.find(
                (option) => option.value === value
              );

              return (
                <Selector
                  {...field}
                  label={"Sub Industry Type"}
                  placeholder={"Select sub industry type"}
                  errorContent={errors.registration?.subIndustry?.message}
                  options={subIndustryOptions}
                  value={
                    selectedSubIndustry ? selectedSubIndustry.value : value
                  }
                  required={true}
                  onChange={(selectedSubIndustryValue) => {
                    const valueToSave = selectedSubIndustryValue.value;
                    field.onChange(valueToSave);
                    trigger("registration.subIndustry");
                    setValue("registration.subIndustry", valueToSave);
                  }}
                  onBlur={()=>handleBlur(`registration.subIndustry`)}
                />
              );
            }}
          />

          <Controller
            name="registration.sizeOfCompany"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={`Size of the company`}
                placeholder={`Enter size of the company`}
                errorContent={errors.registration?.sizeOfCompany?.message}
                required={true}
                onChange={(e) => {
                  field.onChange(e);  // Default handling
                  trigger("registration.sizeOfCompany");  // Manually trigger validation for this field
                }}
              />
            )}
          />
          <Controller
            name="registration.funded"
            control={control}
            render={({ field }) => {
              const selectedFund = fundingOption.find(
                (option) => option.value === field.value
              );
              return (
              <Selector
                {...field}
                label={"Funding Status"}
                placeholder={"Select funding status"}
                errorContent={errors.registration?.isFunded?.message}
                options={fundingOption}
                required={true}
                value={selectedFund || {}}
                onChange={(selectedValue) => {
                  trigger("registration.funded");
                 
                  field.onChange(selectedValue.value); 
                  setValue("registration.funded", selectedValue.value);
        
                }}
              />
            )}}
          />
        </div>
      </div>
    </div>
  );
};
