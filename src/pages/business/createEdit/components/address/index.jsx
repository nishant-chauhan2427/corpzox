import { Controller } from "react-hook-form";
import { Input } from "../../../../../components/inputs";
import { Selector } from "../../../../../components/select";
import { PhoneNumberInput } from "../../../../../components/inputs/phoneInput";

export const AddressDetails = ({ control, errors, setValue, handleBlur, trigger}) => {
  const cityOption = [
    { label: "Active", value: 1 },
    { label: "Inactive", value: 0 },
  ];

  const stateOption = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
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
            <p className="text-xs">
              Provide the necessary address of your own business.
            </p>
          </div>
          <div className="w-full grid grid-cols-1 gap-4">
            <Controller
              name={`address.businessAddress.businessAddressL1`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Line 1`}
                  placeholder={`Line 1`}
                  errorContent={errors.address?.businessAddress?.businessAddressL1?.message}
                  required={true}
                  onBlur={()=>handleBlur(`address.businessAddress.businessAddressL1`)}
                  onChange={(e)=>{ field.onChange(e); trigger(`address.businessAddress.businessAddressL1`)}}
                />
              )}
            />
            <Controller
              name={`address.businessAddress.businessAddressL2`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Line 2`}
                  placeholder={`Line 2`}
                  errorContent={errors?.address?.businessAddress?.businessAddressL2?.message}
                  required={true}
                  onBlur={handleFieldBlur(`address.businessAddress.businessAddressL2`)}
                  onChange={handleFieldChange(`address.businessAddress.businessAddressL2`, field, trigger)}
                />
              )}
            />
            <Controller
              name={`address.businessAddress.businessAddressPin`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`PIN Code`}
                  placeholder={`Enter your pincode`}
                  errorContent={errors?.address?.businessAddress?.businessAddressPin?.message}
                  required={true}
                  onBlur={handleFieldBlur(`address.businessAddress.businessAddressPin`)}
                  onChange={handleFieldChange(`address.businessAddress.businessAddressPin`, field, trigger)}
                />
              )}
            />

            <Controller
              name="address.businessAddress.businessAddressCity"
              control={control}
              render={({ field }) => {
                const selectedFund = cityOption.find(
                  (option) => option.value === field.value
                );
                return (
                  <Selector
                    {...field}
                    label={"City"}
                    placeholder={"Select city"}
                    errorContent={errors?.address?.businessAddress?.businessAddressCity?.message}
                    options={cityOption}
                    required={true}
                    value={selectedFund || {}}
                    onChange={(selectedValue) => {
                      field.onChange(selectedValue.value);
                      setValue("address.businessAddress.businessAddressCity", selectedValue.value);
                      trigger("address.businessAddress.businessAddressCity"); // Manually trigger validation
                    }}
                    onBlur={handleFieldBlur(`address.businessAddress.businessAddressCity`)}
                  />
                );
              }}
            />
            <Controller
              name="address.businessAddress.businessAddressState"
              control={control}
              render={({ field }) => {
                const selectedFund = stateOption.find(
                  (option) => option.value === field.value
                );
                return (
                  <Selector
                    {...field}
                    label={"State"}
                    placeholder={"Select state"}
                    errorContent={errors?.address?.businessAddress?.businessAddressState?.message}
                    options={stateOption}
                    required={true}
                    value={selectedFund || {}}
                    onChange={(selectedValue) => {
                      field.onChange(selectedValue.value);
                      setValue("address.businessAddress.businessAddressState", selectedValue.value);
                      trigger("address.businessAddress.businessAddressState"); // Manually trigger validation
                    }}
                    onBlur={handleFieldBlur(`address.businessAddress.businessAddressState`)}
                  />
                );
              }}
            />
          </div>
        </div>
        <div className="w-1 mx-12 bg-gradient-to-b from-gray-100 via-black to-gray-100"></div>
        <div className="w-full">
          <div className="my-4">
            <h5 className="font-semibold text-base text-[#4D4D4F] dark:text-gray-200">
              Complete Communication Address
            </h5>
            <p className="text-xs">
              Provide the necessary address of your own business.
            </p>
          </div>
          <div className="w-full grid grid-cols-1 gap-4">
            <Controller
              name={`address.communicationAddress.communicationAddressL1`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Line 1`}
                  placeholder={`Line 1`}
                  errorContent={errors?.address?.communicationAddress?.communicationAddressL1?.message}
                  required={true}
                  onBlur={handleFieldBlur(`address.communicationAddress.communicationAddressL1`)}
                  onChange={handleFieldChange(`address.communicationAddress.communicationAddressL1`, field, trigger)}
                />
              )}
            />
            <Controller
              name={`address.communicationAddress.communicationAddressL2`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Line 2`}
                  placeholder={`Line 2`}
                  errorContent={errors?.address?.communicationAddress?.communicationAddressL2?.message}
                  required={true}
                  onBlur={handleFieldBlur(`address.communicationAddress.communicationAddressL2`)}
                  onChange={handleFieldChange(`address.communicationAddress.communicationAddressL2`, field, trigger)}
                />
              )}
            />
            <Controller
              name={`address.communicationAddress.communicationAddressPin`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`PIN Code`}
                  placeholder={`Enter your pincode`}
                  errorContent={errors?.address?.communicationAddress?.communicationAddressPin?.message}
                  required={true}
                  onBlur={handleFieldBlur(`address.communicationAddress.communicationAddressPin`)}
                  onChange={handleFieldChange(`address.communicationAddress.communicationAddressPin`, field, trigger)}
                />
              )}
            />

            <Controller
              name="address.communicationAddress.communicationAddressCity"
              control={control}
              render={({ field }) => {
                const selectedFund = cityOption.find(
                  (option) => option.value === field.value
                );
                return (
                  <Selector
                    {...field}
                    label={"City"}
                    placeholder={"Select city"}
                    errorContent={errors?.address?.communicationAddress?.communicationAddressCity?.message}
                    options={cityOption}
                    required={true}
                    value={selectedFund || {}}
                    onChange={(selectedValue) => {
                      field.onChange(selectedValue.value);
                      setValue("address.communicationAddress.communicationAddressCity", selectedValue.value);
                      trigger("address.communicationAddress.communicationAddressCity"); // Manually trigger validation
                    }}
                    onBlur={handleFieldBlur(`address.communicationAddress.communicationAddressCity`)}
                  />
                );
              }}
            />
            <Controller
              name="address.communicationAddress.communicationAddressState"
              control={control}
              render={({ field }) => {
                const selectedFund = stateOption.find(
                  (option) => option.value === field.value
                );
                return (
                  <Selector
                    {...field}
                    label={"State"}
                    placeholder={"Select state"}
                    errorContent={errors?.address?.communicationAddress?.state?.message}
                    options={stateOption}
                    required={true}
                    value={selectedFund || {}}
                    onChange={(selectedValue) => {
                      field.onChange(selectedValue.value);
                      setValue("address.communicationAddress.communicationAddressState", selectedValue.value);
                      trigger("address.communicationAddress.communicationAddressState"); // Manually trigger validation
                    }}
                    onBlur={handleFieldBlur(`address.communicationAddress.communicationAddressState`)}
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
