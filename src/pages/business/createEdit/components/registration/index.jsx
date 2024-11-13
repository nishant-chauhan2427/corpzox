import { Controller } from "react-hook-form";
import { Input } from "../../../../../components/inputs";
import { Selector } from "../../../../../components/select";
import { PhoneNumberInput } from "../../../../../components/inputs/phoneInput";

export const RegistraionDetails = ({ control, errors }) => {
  const statusOption = [
    { label: "Active", value: 1 },
    { label: "Inactive", value: 0 },
  ];

  const genderOption = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Others", value: "others" },
  ];

  return (
    <>
      <h5 className="my-4 font-semibold text-xl text-[#4D4D4F] dark:text-gray-200">
      Detailed Business Registration Details
      </h5>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        <Controller
          name={`fullName`}
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label={`Full Name`}
              placeholder={`Enter your name`}
              errorContent={errors.fullName?.message}
              onChange={(e) => {
                const value = e.target.value
                  ?.replace(/\s+/g, " ")
                  .replace(/[^A-Za-z\s]/g, ""); // Only allows letters and spaces
                handleChange("fullName", value.slice(0, 30)); // Limits to 30 characters
              }}
              required={true}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type={"email"}
              label={"Email ID"}
              placeholder={"Enter Email"}
              errorContent={errors.email?.message}
              required={true}
            />
          )}
        />
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <PhoneNumberInput
              {...field}
              label={"Mobile No"}
              country={"in"}
              errorContent={errors.phoneNumber?.message}
              required={true}
            />
          )}
        />
      <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Selector
                {...field}
                label={"Gender"}
                placeholder={"Select Gender"}
                errorContent={errors.status?.message}
                options={genderOption}
                required={true}
              />
            )}
          />
        <Controller
          name="dob"
          control={control}
          render={({ field }) => {
            // Calculate the minimum date (100 years ago)
            const minDate = new Date();
            minDate.setFullYear(minDate.getFullYear() - 100);
            const minDateString = minDate.toISOString().split("T")[0];

            return (
              <Input
                {...field}
                label={`Founded Date`}
                type={"date"}
                placeholder={"Enter DOB"}
                min={minDateString} // Set the minimum date
                max={new Date().toISOString().split("T")[0]} // Maximum is today
                errorContent={errors.dob?.message}
              />
            );
          }}
        />
      </div>
    </>
  );
};
