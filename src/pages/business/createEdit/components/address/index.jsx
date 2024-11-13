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
    <div>
      <div className="pt-4 flex flex-col md:flex-row gap-4">
        <div>
          <div className="my-4">
            <h5 className="font-semibold text-base text-[#4D4D4F] dark:text-gray-200">
              Complete Business Address
            </h5>
            <p className="text-xs">
              Provide the necessary address of your own business.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Controller
              name={`lineOne`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Line 1`}
                  placeholder={`Line 1`}
                  errorContent={errors.lineOne?.message}
                  onChange={(e) => {
                    const value = e.target.value
                      ?.replace(/\s+/g, " ")
                      .replace(/[^A-Za-z\s]/g, ""); // Only allows letters and spaces
                    handleChange("lineOne", value.slice(0, 30)); // Limits to 30 characters
                  }}
                  required={true}
                />
              )}
            />
            <Controller
              name={`lineTwo`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Line 2`}
                  placeholder={`Line 2`}
                  errorContent={errors.lineTwo?.message}
                  onChange={(e) => {
                    const value = e.target.value
                      ?.replace(/\s+/g, " ")
                      .replace(/[^A-Za-z\s]/g, ""); // Only allows letters and spaces
                    handleChange("lineTwo", value.slice(0, 30)); // Limits to 30 characters
                  }}
                  required={true}
                />
              )}
            />
            <Controller
              name={`pinCode`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`PIN Code`}
                  placeholder={`Enter your pincode`}
                  errorContent={errors.pinCode?.message}
                  onChange={(e) => {
                    const value = e.target.value
                      ?.replace(/\s+/g, " ")
                      .replace(/[^A-Za-z\s]/g, ""); // Only allows letters and spaces
                    handleChange("name", value.slice(0, 6)); // Limits to 30 characters
                  }}
                  required={true}
                />
              )}
            />

            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <Selector
                  {...field}
                  label={"City"}
                  placeholder={"Select city"}
                  errorContent={errors.city?.message}
                  options={cityOption}
                  required={true}
                />
              )}
            />
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <Selector
                  {...field}
                  label={"State"}
                  placeholder={"Select state"}
                  errorContent={errors.state?.message}
                  options={stateOption}
                  required={true}
                />
              )}
            />
          </div>
        </div>
        <div>
          <div className="my-4">
            <h5 className="font-semibold text-base text-[#4D4D4F] dark:text-gray-200">
              Complete Communication Address
            </h5>
            <p className="text-xs">
              Provide the necessary address of your own business.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Controller
              name={`lineOne`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Line 1`}
                  placeholder={`Line 1`}
                  errorContent={errors.lineOne?.message}
                  onChange={(e) => {
                    const value = e.target.value
                      ?.replace(/\s+/g, " ")
                      .replace(/[^A-Za-z\s]/g, ""); // Only allows letters and spaces
                    handleChange("lineOne", value.slice(0, 30)); // Limits to 30 characters
                  }}
                  required={true}
                />
              )}
            />
            <Controller
              name={`lineTwo`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Line 2`}
                  placeholder={`Line 2`}
                  errorContent={errors.lineTwo?.message}
                  onChange={(e) => {
                    const value = e.target.value
                      ?.replace(/\s+/g, " ")
                      .replace(/[^A-Za-z\s]/g, ""); // Only allows letters and spaces
                    handleChange("lineTwo", value.slice(0, 30)); // Limits to 30 characters
                  }}
                  required={true}
                />
              )}
            />
            <Controller
              name={`pinCode`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`PIN Code`}
                  placeholder={`Enter your pincode`}
                  errorContent={errors.pinCode?.message}
                  onChange={(e) => {
                    const value = e.target.value
                      ?.replace(/\s+/g, " ")
                      .replace(/[^A-Za-z\s]/g, ""); // Only allows letters and spaces
                    handleChange("name", value.slice(0, 6)); // Limits to 30 characters
                  }}
                  required={true}
                />
              )}
            />

            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <Selector
                  {...field}
                  label={"City"}
                  placeholder={"Select city"}
                  errorContent={errors.city?.message}
                  options={cityOption}
                  required={true}
                />
              )}
            />
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <Selector
                  {...field}
                  label={"State"}
                  placeholder={"Select state"}
                  errorContent={errors.state?.message}
                  options={stateOption}
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
