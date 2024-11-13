import { Controller } from "react-hook-form";
import { Input } from "../../../../../components/inputs";

export const FinancialDetails = ({ control, errors }) => {
  return (
    <div>
      <div className="pt-4 flex flex-col md:flex-row gap-4">
        <div>
          <div className="my-4">
            <h5 className="font-semibold text-base text-[#4D4D4F] dark:text-gray-200">
            Financial Details
            </h5>
            <p className="text-xs">
              Provide the necessary financial detail of your own business.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Controller
              name={`capital`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Capital`}
                  placeholder={`Enter capital`}
                  errorContent={errors.capital?.message}
                  onChange={(e) => {
                    const value = e.target.value
                      ?.replace(/\s+/g, " ")
                      .replace(/[^A-Za-z\s]/g, ""); // Only allows letters and spaces
                    handleChange("capital", value.slice(0, 30)); // Limits to 30 characters
                  }}
                  required={true}
                />
              )}
            />
            <Controller
              name={`revenue`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Revenue`}
                  placeholder={`Enter revenue`}
                  errorContent={errors.revenue?.message}
                  onChange={(e) => {
                    const value = e.target.value
                      ?.replace(/\s+/g, " ")
                      .replace(/[^A-Za-z\s]/g, ""); // Only allows letters and spaces
                    handleChange("revenue", value.slice(0, 30)); // Limits to 30 characters
                  }}
                  required={true}
                />
              )}
            />
            <Controller
              name={`profit`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Profit`}
                  placeholder={`Enter profit`}
                  errorContent={errors.capital?.message}
                  onChange={(e) => {
                    const value = e.target.value
                      ?.replace(/\s+/g, " ")
                      .replace(/[^A-Za-z\s]/g, ""); // Only allows letters and spaces
                    handleChange("profit", value.slice(0, 30)); // Limits to 30 characters
                  }}
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
