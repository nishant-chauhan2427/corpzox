import { Controller } from "react-hook-form";
import { Input } from "../../../../../components/inputs";

export const FinancialDetails = ({ control, errors }) => {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4">
        <div>
          <div className="my-4">
            <h5 className="font-semibold text-base text-[#4D4D4F] dark:text-gray-200">
              Financial Details
            </h5>
            <p className="text-xs">
              Provide the necessary financial detail of your own business.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <Controller
              name={`financialDetails.capital`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Capital`}
                  placeholder={`Enter capital`}
                  errorContent={errors.financialDetails?.capital?.message}
                  required={true}
                />
              )}
            />
            <Controller
              name={`financialDetails.revenue`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Revenue`}
                  placeholder={`Enter revenue`}
                  errorContent={errors.financialDetails?.revenue?.message}
                  required={true}
                />
              )}
            />
            <Controller
              name={`financialDetails.profit`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Profit`}
                  placeholder={`Enter profit`}
                  errorContent={errors.financialDetails?.capital?.message}
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
