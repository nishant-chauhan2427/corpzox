import { Controller } from "react-hook-form";
import { Input } from "../../../../../components/inputs";
import { Selector } from "../../../../../components/select";
import { PhoneNumberInput } from "../../../../../components/inputs/phoneInput";

export const RegistraionDetails = ({ control, errors }) => {
  const roleOption = [
    { label: "Active", value: 1 },
    { label: "Inactive", value: 0 },
  ];

  const genderOption = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Others", value: "others" },
  ];

  return (
    <div>
      <div>
        <h5 className="mt-4 font-semibold text-base text-[#4D4D4F] dark:text-gray-200">
          Detailed Business Registration Details
        </h5>
        <p className="text-xs">
          Provide the necessary details to add your own business.
        </p>
      </div>
      <div className="pt-4 flex flex-col md:flex-row gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Controller
            name={`type`}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={`Business Type`}
                placeholder={`Enter your business type`}
                errorContent={errors.businessName?.message}
                onChange={(e) => {
                  const value = e.target.value
                    ?.replace(/\s+/g, " ")
                    .replace(/[^A-Za-z\s]/g, ""); // Only allows letters and spaces
                  handleChange("businessName", value.slice(0, 30)); // Limits to 30 characters
                }}
                required={true}
              />
            )}
          />
          <Controller
            name={`name`}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={`Business Name`}
                placeholder={`Enter your business name`}
                errorContent={errors.name?.message}
                onChange={(e) => {
                  const value = e.target.value
                    ?.replace(/\s+/g, " ")
                    .replace(/[^A-Za-z\s]/g, ""); // Only allows letters and spaces
                  handleChange("name", value.slice(0, 30)); // Limits to 30 characters
                }}
                required={true}
              />
            )}
          />
          <Controller
            name={`cINNumber`}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={`CIN No.`}
                placeholder={`Enter your CIN number`}
                errorContent={errors.cINNumber?.message}
                onChange={(e) => {
                  const value = e.target.value
                    ?.replace(/\s+/g, " ")
                    .replace(/[^A-Za-z\s]/g, ""); // Only allows letters and spaces
                  handleChange("cINNumber", value.slice(0, 30)); // Limits to 30 characters
                }}
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

          {/* <Controller
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
        /> */}

          <Controller
            name="dof"
            control={control}
            render={({ field }) => {
              // Calculate the minimum date (100 years ago)
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
                  errorContent={errors.dof?.message}
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
                onChange={(e) => {
                  const value = e.target.value
                    ?.replace(/\s+/g, " ")
                    .replace(/[^A-Za-z\s]/g, ""); // Only allows letters and spaces
                  handleChange("headquarterLocation", value.slice(0, 30)); // Limits to 30 characters
                }}
                required={true}
              />
            )}
          />
          <Controller
            name={`name`}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={`Business Name`}
                placeholder={`Enter your business name`}
                errorContent={errors.name?.message}
                onChange={(e) => {
                  const value = e.target.value
                    ?.replace(/\s+/g, " ")
                    .replace(/[^A-Za-z\s]/g, ""); // Only allows letters and spaces
                  handleChange("name", value.slice(0, 30)); // Limits to 30 characters
                }}
                required={true}
              />
            )}
          />
          <Controller
            name={`cINNumber`}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label={`CIN No.`}
                placeholder={`Enter your CIN number`}
                errorContent={errors.cINNumber?.message}
                onChange={(e) => {
                  const value = e.target.value
                    ?.replace(/\s+/g, " ")
                    .replace(/[^A-Za-z\s]/g, ""); // Only allows letters and spaces
                  handleChange("cINNumber", value.slice(0, 30)); // Limits to 30 characters
                }}
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

          {/* <Controller
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
        /> */}

          <Controller
            name="dof"
            control={control}
            render={({ field }) => {
              // Calculate the minimum date (100 years ago)
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
                  errorContent={errors.dof?.message}
                />
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};
