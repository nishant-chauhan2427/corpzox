import { Controller, useForm, useWatch } from "react-hook-form";
import { Input } from "../../../../../components/inputs";
import { Selector } from "../../../../../components/select";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../../../components/buttons";
import { registrationSchema } from "../../../../../validation/createBusinessValidationSchema";
import {
  registrationDetails,
  updateRegistrationDetails,
} from "../../../../../redux/actions/business-action";
import { setBusinessId } from "../../../../../redux/slices/businessSlice";

export const RegistrationDetails = ({ isEdit }) => {
  const [subIndustryOptions, setSubIndustryOptions] = useState([]);
  const { business, businessId, loading } = useSelector(
    (state) => state.business
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log("businessStore", business);
  // console.log("subIndustryOptions", subIndustryOptions);
  // console.log("loading",loading);

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
    getValues,
    getFieldState,
    watch,
    trigger,
  } = useForm({
    mode: "onChange",
    defaultValues: business || {},
    resolver: yupResolver(registrationSchema), // Apply the validation schema here
  });

  // console.log("isValid", isValid, errors);
  // console.log("getValues", getValues());

  const selectedIndustry = useWatch({
    control,
    name: "registration.industry",
    defaultValue: "",
  });

  // console.log("selectedIndustry:", selectedIndustry);

  useEffect(() => {
    if (selectedIndustry && subIndustryOption[selectedIndustry]) {
      // console.log('okokokkok');

      setSubIndustryOptions(subIndustryOption[selectedIndustry]);
      // setValue("registration.subIndustry", ""); // Reset subIndustry when industry changes
    } else {
      setSubIndustryOptions([]);
    }
  }, [selectedIndustry, setValue]);

  const businessType = [
    { label: "Private Limited", value: "private_limited" },
    { label: "Public Limited", value: "public_limited" },
    { label: "Sole Proprietorship", value: "sole_proprietorship" },
    { label: "LLP", value: "llp" },
    { label: "OPC", value: "opc" },
    { label: "Section 8", value: "section_8" },
    { label: "Partnership", value: "partnership" },
    { label: "Cooperative", value: "cooperative" },
    { label: "Producer Company", value: "producer_company" },
    { label: "Foreign Corporation", value: "foreign_corporation" },
  ];

  const roleOption = [
    { label: "Director/Founder/Owner", value: "director" },
    { label: "Authorised Signatory", value: "authorised_signatory" },
    { label: "Employee", value: "employee" },
  ];

  const fundingOption = [
    { label: "Funded", value: "funded" },
    { label: "Bootstrap", value: "bootstrap" },
  ];

  const industryOption = [
    { label: "Technology", value: "tech" },
    { label: "Finance", value: "finance" },
    { label: "Healthcare", value: "healthcare" },
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

  const handleBlur = async (field) => {
    await trigger(field);
  };

  const onSubmit = (data) => {
    // console.log("Submitted Data:", data?.registration);
    const payload = data?.registration;

    if (!businessId) {
      // Perform POST API call here
      dispatch(registrationDetails(payload)).then((response) => {
        // console.log("Response", response?.payload);
        // const newBusinessId = response.payload;
        // dispatch(setBusinessId(newBusinessId));
        navigate("/business/create/address");
      });
    } else {
      //PUT API to update changes
      // console.log("businessId already exist", businessId);

      payload.businessId = businessId;
      dispatch(updateRegistrationDetails(payload)).then((response) => {
        // console.log("Response", response?.payload);
        // const newBusinessId = response.payload;
        // dispatch(setBusinessId(newBusinessId));
        isEdit
          ? navigate("/business/edit/address")
          : navigate("/business/create/address");
      });
    }
  };

  // console.log("registration.subIndustry", "hour", business?.registration.subIndustry);

  useEffect(() => {
    // console.log("useeffect");

    setValue(
      "registration.roleOfCompany",
      business?.registration.roleOfCompany
    );
    // setValue("registration.subIndustry", business?.registration.subIndustry )
  }, []);

  useEffect(() => {
    // console.log("useeffect");

    setValue("registration.industry", business?.registration.industry);
    // setValue("registration.subIndustry", business?.registration.subIndustry )
  }, []);

  useEffect(() => {
    // console.log(business?.registration.subIndustry , 'ok' );

    setValue("registration.subIndustry", business?.registration.subIndustry);
  }, [watch("registration.industry")]);

  // console.log(watch("registration.industry"), getValues("registration.subIndustry"), business?.registration.subIndustry, "watch ok");

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 mb-4 rounded-full">
        <div
          className="h-2 bg-blue-500 rounded-full"
          style={{
            // width: `${(currentStep / (steps.length - 1)) * 100}%`,
            width: `20%`,
          }}
        ></div>
      </div>
      <div>
        <h5 className="font-semibold text-base text-[#4D4D4F] dark:text-gray-200">
          Detailed Business Registration Details
        </h5>
        <p className="text-xs">
          Provide the necessary details to add your own business.
        </p>
      </div>

      <div className="w-full pt-4 flex flex-col md:flex-row md:justify-between gap-4">
        {/* Left Column */}
        <div className="w-full grid grid-cols-1 gap-4">
          {/* Business Type */}

          <Controller
            name="registration.typeOfBusiness"
            control={control}
            render={({ field }) => {
              // Find the selected role option from the list
              const selectedBusinessType = businessType.find(
                (option) => option.value === field.value
              );

              return (
                <Selector
                  {...field}
                  label={"Business Type"}
                  placeholder={"Enter your business type"}
                  errorContent={errors.registration?.typeOfBusiness?.message}
                  options={businessType}
                  required={true}
                  // Ensure only the value is passed to the Selector
                  value={selectedBusinessType || {}}
                  onChange={(selectedValue) => {
                    // On change, set only the selected value (not the full object)
                    field.onChange(selectedValue.value);
                    setValue(
                      "registration.typeOfBusiness",
                      selectedValue.value
                    );
                  }}
                />
              );
            }}
          />

          {/* Business Name */}
          <Controller
            name="registration.businessName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Business Name"
                placeholder="Enter your business name"
                errorContent={errors.registration?.businessName?.message}
                required
                maxLength={50}
              />
            )}
          />

          {/* CIN Number */}
          <Controller
            name="registration.cinNumber"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="CIN No."
                maxLength={21}
                placeholder="Enter your CIN number"
                errorContent={errors.registration?.cinNumber?.message}
                required
              />
            )}
          />

          {/* Role of Company */}
          <Controller
            name="registration.roleOfCompany"
            control={control}
            render={({ field }) => {
              // Find the selected role option from the list
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
                  // Ensure only the value is passed to the Selector
                  value={selectedRole || {}}
                  onChange={(selectedValue) => {
                    // On change, set only the selected value (not the full object)
                    field.onChange(selectedValue.value);
                    setValue("registration.roleOfCompany", selectedValue.value);
                  }}
                />
              );
            }}
          />

          {/* Year of Establishment */}
          <Controller
            name="registration.yearOfStablish"
            control={control}
            render={({ field }) => {
              const initialDate = field.value
                ? new Date(field.value).toISOString().split("T")[0]
                : "";

              const minDate = new Date();
              minDate.setFullYear(minDate.getFullYear() - 100);

              return (
                <Input
                  {...field}
                  value={initialDate}
                  label="Year of Establishment"
                  type="date"
                  min={minDate.toISOString().split("T")[0]}
                  max={new Date().toISOString().split("T")[0]}
                  errorContent={errors.registration?.yearOfStablish?.message}
                  onBlur={() => handleBlur("registration.yearOfStablish")}
                />
              );
            }}
          />
        </div>

        <div className="w-1 mx-12 bg-gradient-to-b from-gray-100 via-black to-gray-100"></div>

        {/* Right Column */}
        <div className="w-full grid grid-cols-1 gap-4">
          {/* Headquarters Location */}
          <Controller
            name="registration.headQuarterLocation"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Headquarter Location"
                placeholder="Enter your headquarter location"
                errorContent={errors.registration?.headQuarterLocation?.message}
                required
                maxLength={50}
              />
            )}
          />

          {/* Industry */}
          <Controller
            name="registration.industry"
            control={control}
            render={({ field }) => {
              const selectedIndustry = industryOption.find(
                (option) => option.value === field.value
              );

              // console.log("registration field", field);

              return (
                <Selector
                  {...field}
                  label="Industry Type"
                  placeholder="Select industry type"
                  errorContent={errors.registration?.industry?.message}
                  options={industryOption} // Ensure industryOption is populated correctly
                  value={selectedIndustry || null} // Ensure value matches the options
                  onChange={(selectedValue) => {
                    // console.log('ok ran');

                    field.onChange(selectedValue.value); // Update the form value
                    setValue("registration.subIndustry", ""); // Reset sub-industry
                    setSubIndustryOptions(
                      subIndustryOption[selectedValue.value] || []
                    ); // Update sub-industry options dynamically
                  }}
                />
              );
            }}
          />

          {/* Sub Industry */}
          <Controller
            name="registration.subIndustry"
            control={control}
            render={({ field }) => {
              const selectedSubIndustry = subIndustryOptions.find(
                (option) => option.value === field.value
              );

              return (
                <Selector
                  {...field}
                  label="Sub Industry Type"
                  placeholder="Select sub industry type"
                  errorContent={errors.registration?.subIndustry?.message}
                  options={subIndustryOptions}
                  value={selectedSubIndustry || null}
                  onChange={(selectedValue) =>
                    field.onChange(selectedValue.value)
                  }
                />
              );
            }}
          />

          {/* Company Size */}
          <Controller
            name="registration.sizeOfCompany"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Size of the company"
                type="number"
                placeholder="Enter size of the company"
                errorContent={errors.registration?.sizeOfCompany?.message}
                required


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

          {/* Funding Status */}
          <Controller
            name="registration.funded"
            control={control}
            render={({ field }) => {
              // Find the selected funding option from the list
              const selectedFund = fundingOption.find(
                (option) => option.value === field.value
              );

              return (
                <Selector
                  {...field}
                  label={"Funding Status"}
                  placeholder={"Select funding status"}
                  errorContent={errors.registration?.funded?.message}
                  options={fundingOption}
                  required={true}
                  // Ensure that only the value is passed to the Selector
                  value={selectedFund || {}}
                  onChange={(selectedValue) => {
                    // On change, set only the selected value (not the full object)
                    field.onChange(selectedValue.value);
                    setValue("registration.funded", selectedValue.value);
                  }}
                />
              );
            }}
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center gap-4">
        <div></div>
        <Button
          type="submit"
          primary
          disabled={!isValid || loading}
          isLoading={loading}
        >
          {loading ? "saving..." : "Save & Next"}
        </Button>
      </div>
    </form>
  );
};
