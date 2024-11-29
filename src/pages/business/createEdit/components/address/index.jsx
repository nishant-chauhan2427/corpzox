import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Controller } from "react-hook-form";
import { Input } from "../../../../../components/inputs";
import { Selector } from "../../../../../components/select";
import { PhoneNumberInput } from "../../../../../components/inputs/phoneInput";

export const AddressDetails = ({ control, errors, setValue, handleBlur, trigger }) => {
  const { business } = useSelector((state) => state.business);

  useEffect(() => {
    if (business) {
      // Use setValue to set form field values dynamically
      setValue("address.businessAddressL1", business?.address?.businessAddressL1 || "");
      setValue("address.businessAddressL2", business?.address?.businessAddressL2 || "");
      setValue("address.businessAddressPin", business?.address?.businessAddressPin || "");
      setValue("address.businessAddressCity", business?.address?.businessAddressCity || "");
      setValue("address.businessAddressState", business?.address?.businessAddressState || "");
      
      setValue("address.communicationAddressL1", business?.address?.communicationAddressL1 || "");
      setValue("address.communicationAddressL2", business?.address?.communicationAddressL2 || "");
      setValue("address.communicationAddressPin", business?.address?.communicationAddressPin || "");
      setValue("address.communicationAddressCity", business?.address?.communicationAddressCity || "");
      setValue("address.communicationAddressState", business?.address?.communicationAddressState || "");
    }
  }, [business, setValue]);

  const cityOption = [
    { label: "Noida", value: 1 },
    { label: "Gurgaon", value: 0 },
  ];

  const stateOption = [
    { label: "Uttar Pradesh", value: "Uttar Pradesh" },
    { label: "Haryana", value: "Haryana" },
    { label: "Others", value: "others" },
  ];

  const handleFieldChange = (fieldName, field, trigger) => {
    return (e) => {
      field.onChange(e); // Default handling
      trigger(fieldName); // Manually trigger validation for this field
    };
  };

  const handleFieldBlur = (fieldName) => {
    return () => handleBlur(fieldName);
  };

  return (
    <>
      <div className="w-full pt-4 flex flex-col md:flex-row md:justify-between gap-4">
        <div className="w-full">
          <div className="my-4">
            <h5 className="font-semibold text-base text-[#4D4D4F] dark:text-gray-200">
              Complete Business Address
            </h5>
            <p className="text-xs">Provide the necessary address of your own business.</p>
          </div>
          <div className="w-full grid grid-cols-1 gap-4">
            <Controller
              name="address.businessAddressL1"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Line 1"
                  placeholder="Line 1"
                  errorContent={errors?.address?.businessAddressL1?.message}
                  required
                  onBlur={() => handleFieldBlur("address.businessAddressL1")}
                  onChange={(e) => {
                    field.onChange(e); // Default handling
                    trigger("address.businessAddressL1"); // Manually trigger validation
                  }}
                />
              )}
            />
            <Controller
              name="address.businessAddressL2"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Line 2"
                  placeholder="Line 2"
                  errorContent={errors?.address?.businessAddressL2?.message}
                  required
                  onBlur={() => handleFieldBlur("address.businessAddressL2")}
                  onChange={(e) => {
                    field.onChange(e);
                    trigger("address.businessAddressL2");
                  }}
                />
              )}
            />
            <Controller
              name="address.businessAddressPin"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="PIN Code"
                  placeholder="Enter your pincode"
                  errorContent={errors?.address?.businessAddressPin?.message}
                  required
                  onBlur={() => handleFieldBlur("address.businessAddressPin")}
                  onChange={(e) => {
                    field.onChange(e);
                    trigger("address.businessAddressPin");
                  }}
                />
              )}
            />
            <Controller
              name="address.businessAddressCity"
              control={control}
              render={({ field }) => {
                const selectedCity = cityOption.find((option) => option.value === field.value);
                return (
                  <Selector
                    {...field}
                    label="City"
                    placeholder="Select city"
                    errorContent={errors?.address?.businessAddressCity?.message}
                    options={cityOption}
                    required
                    value={selectedCity || {}}
                    onChange={(selectedValue) => {
                      field.onChange(selectedValue.value);
                      setValue("address.businessAddressCity", selectedValue.value);
                      trigger("address.businessAddressCity"); // Manually trigger validation
                    }}
                    onBlur={() => handleFieldBlur("address.businessAddressCity")}
                  />
                );
              }}
            />
            <Controller
              name="address.businessAddressState"
              control={control}
              render={({ field }) => {
                const selectedState = stateOption.find((option) => option.value === field.value);
                return (
                  <Selector
                    {...field}
                    label="State"
                    placeholder="Select state"
                    errorContent={errors?.address?.businessAddressState?.message}
                    options={stateOption}
                    required
                    value={selectedState || {}}
                    onChange={(selectedValue) => {
                      field.onChange(selectedValue.value);
                      setValue("address.businessAddressState", selectedValue.value);
                      trigger("address.businessAddressState"); // Manually trigger validation
                    }}
                    onBlur={() => handleFieldBlur("address.businessAddressState")}
                  />
                );
              }}
            />
          </div>
        </div>

        {/* Communication Address */}
        <div className="w-full">
          <div className="my-4">
            <h5 className="font-semibold text-base text-[#4D4D4F] dark:text-gray-200">Complete Communication Address</h5>
            <p className="text-xs">Provide the necessary address of your own business.</p>
          </div>
          <div className="w-full grid grid-cols-1 gap-4">
            <Controller
              name="address.communicationAddressL1"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Line 1"
                  placeholder="Line 1"
                  errorContent={errors?.address?.communicationAddressL1?.message}
                  required
                  onBlur={() => handleFieldBlur("address.communicationAddressL1")}
                  onChange={(e) => {
                    field.onChange(e);
                    trigger("address.communicationAddressL1");
                  }}
                />
              )}
            />
            <Controller
              name="address.communicationAddressL2"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Line 2"
                  placeholder="Line 2"
                  errorContent={errors?.address?.communicationAddressL2?.message}
                  required
                  onBlur={() => handleFieldBlur("address.communicationAddressL2")}
                  onChange={(e) => {
                    field.onChange(e);
                    trigger("address.communicationAddressL2");
                  }}
                />
              )}
            />
            <Controller
              name="address.communicationAddressPin"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="PIN Code"
                  placeholder="Enter your pincode"
                  errorContent={errors?.address?.communicationAddressPin?.message}
                  required
                  onBlur={() => handleFieldBlur("address.communicationAddressPin")}
                  onChange={(e) => {
                    field.onChange(e);
                    trigger("address.communicationAddressPin");
                  }}
                />
              )}
            />
            <Controller
              name="address.communicationAddressCity"
              control={control}
              render={({ field }) => {
                const selectedCity = cityOption.find((option) => option.value === field.value);
                return (
                  <Selector
                    {...field}
                    label="City"
                    placeholder="Select city"
                    errorContent={errors?.address?.communicationAddressCity?.message}
                    options={cityOption}
                    required
                    value={selectedCity || {}}
                    onChange={(selectedValue) => {
                      field.onChange(selectedValue.value);
                      setValue("address.communicationAddressCity", selectedValue.value);
                      trigger("address.communicationAddressCity"); // Manually trigger validation
                    }}
                    onBlur={() => handleFieldBlur("address.communicationAddressCity")}
                  />
                );
              }}
            />
            <Controller
              name="address.communicationAddressState"
              control={control}
              render={({ field }) => {
                const selectedState = stateOption.find((option) => option.value === field.value);
                return (
                  <Selector
                    {...field}
                    label="State"
                    placeholder="Select state"
                    errorContent={errors?.address?.communicationAddressState?.message}
                    options={stateOption}
                    required
                    value={selectedState || {}}
                    onChange={(selectedValue) => {
                      field.onChange(selectedValue.value);
                      setValue("address.communicationAddressState", selectedValue.value);
                      trigger("address.communicationAddressState");
                    }}
                    onBlur={() => handleFieldBlur("address.communicationAddressState")}
                  />
                );
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
