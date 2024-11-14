import { Controller } from "react-hook-form";
import { Input } from "../../../../../components/inputs";
import { Selector } from "../../../../../components/select";
import { PhoneNumberInput } from "../../../../../components/inputs/phoneInput";

export const AddressDetails = ({ control, errors }) => {
  const cityOption = [
    { label: "Active", value: 1 },
    { label: "Inactive", value: 0 },
  ];

  const stateOption = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Others", value: "others" },
  ];

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
              name={`businessAddress.lineOne`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Line 1`}
                  placeholder={`Line 1`}
                  errorContent={errors.businessAddress?.lineOne?.message}
                  required={true}
                />
              )}
            />
            <Controller
              name={`businessAddress.lineTwo`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Line 2`}
                  placeholder={`Line 2`}
                  errorContent={errors.businessAddress?.lineTwo?.message}
                  required={true}
                />
              )}
            />
            <Controller
              name={`businessAddress.pinCode`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`PIN Code`}
                  placeholder={`Enter your pincode`}
                  errorContent={errors.businessAddress?.pinCode?.message}
                  required={true}
                />
              )}
            />

            <Controller
              name="businessAddress.city"
              control={control}
              render={({ field }) => (
                <Selector
                  {...field}
                  label={"City"}
                  placeholder={"Select city"}
                  errorContent={errors.businessAddress?.city?.message}
                  options={cityOption}
                  required={true}
                />
              )}
            />
            <Controller
              name="businessAddress.state"
              control={control}
              render={({ field }) => (
                <Selector
                  {...field}
                  label={"State"}
                  placeholder={"Select state"}
                  errorContent={errors.businessAddress?.state?.message}
                  options={stateOption}
                  required={true}
                />
              )}
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
              name={`communicationAddress.lineOne`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Line 1`}
                  placeholder={`Line 1`}
                  errorContent={errors.communicationAddress?.lineOne?.message}
                  required={true}
                />
              )}
            />
            <Controller
              name={`communicationAddress.lineTwo`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Line 2`}
                  placeholder={`Line 2`}
                  errorContent={errors.communicationAddress?.lineTwo?.message}
                  required={true}
                />
              )}
            />
            <Controller
              name={`communicationAddress.pinCode`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`PIN Code`}
                  placeholder={`Enter your pincode`}
                  errorContent={errors.communicationAddress?.pinCode?.message}
                  required={true}
                />
              )}
            />

            <Controller
              name="communicationAddress.city"
              control={control}
              render={({ field }) => (
                <Selector
                  {...field}
                  label={"City"}
                  placeholder={"Select city"}
                  errorContent={errors.communicationAddress?.city?.message}
                  options={cityOption}
                  required={true}
                />
              )}
            />
            <Controller
              name="communicationAddress.state"
              control={control}
              render={({ field }) => (
                <Selector
                  {...field}
                  label={"State"}
                  placeholder={"Select state"}
                  errorContent={errors.communicationAddress?.state?.message}
                  options={stateOption}
                  required={true}
                />
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};
