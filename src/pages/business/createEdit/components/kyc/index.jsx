import { Controller } from "react-hook-form";
import { Input } from "../../../../../components/inputs";

export const KYCDetails = ({ control, errors }) => {
  return (
    <div>
      <div className="pt-4 flex flex-col md:flex-row gap-4">
        <div>
          <div className="my-4">
            <h5 className="font-semibold text-base text-[#4D4D4F] dark:text-gray-200">
            KYC Details
            </h5>
            <p className="text-xs">
              Provide the necessary KYC detail of your own business.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Controller
              name={`username`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Username`}
                  placeholder={`Enter username`}
                  errorContent={errors.username?.message}
                  onChange={(e) => {
                    const value = e.target.value
                      ?.replace(/\s+/g, " ")
                      .replace(/[^A-Za-z\s]/g, ""); // Only allows letters and spaces
                    handleChange("username", value.slice(0, 30)); // Limits to 30 characters
                  }}
                  required={true}
                />
              )}
            />
            <Controller
              name={`id`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`ID proof No.`}
                  placeholder={`Enter identity proof no.`}
                  errorContent={errors.id?.message}
                  onChange={(e) => {
                    const value = e.target.value
                      ?.replace(/\s+/g, " ")
                      .replace(/[^A-Za-z\s]/g, ""); // Only allows letters and spaces
                    handleChange("id", value.slice(0, 30)); // Limits to 30 characters
                  }}
                  required={true}
                />
              )}
            />
            <Controller
              name={`addressProof`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Address Proof No.`}
                  placeholder={`Enter address proof no.`}
                  errorContent={errors.addressProof?.message}
                  onChange={(e) => {
                    const value = e.target.value
                      ?.replace(/\s+/g, " ")
                      .replace(/[^A-Za-z\s]/g, ""); // Only allows letters and spaces
                    handleChange("addressProof", value.slice(0, 30)); // Limits to 30 characters
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
