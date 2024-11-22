import { Controller } from "react-hook-form";
import { Input } from "../../../../../components/inputs";

export const KYCDetails = ({ control, errors, handleBlur, trigger }) => {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4">
        <div>
          <div className="my-4">
            <h5 className="font-semibold text-base text-[#4D4D4F] dark:text-gray-200">
              KYC Details
            </h5>
            <p className="text-xs">
              Provide the necessary KYC detail of your own business.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <Controller
              name={`kyc.kycDetails.kycUser`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Username`}
                  placeholder={`Enter username`}
                  errorContent={errors.kyc?.kycDetails?.kycUser?.message}
                  required={true}
                  onBlur={() => handleBlur(`kyc.kycDetails.kycUser`)}  // Handle blur event
                  onChange={(e) => {
                    field.onChange(e); // Default handling
                    trigger("kyc.kycDetails.kycUser");  // Manually trigger validation for this field
                  }}
                />
              )}
            />
            <Controller
              name={`kyc.kycDetails.id`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`ID proof No.`}
                  placeholder={`Enter identity proof no.`}
                  errorContent={errors.kyc?.kycDetails?.id?.message}
                  required={true}
                  onBlur={() => handleBlur(`kyc.kycDetails.id`)}  // Handle blur event
                  onChange={(e) => {
                    field.onChange(e); // Default handling
                    trigger("kyc.kycDetails.id");  // Manually trigger validation for this field
                  }}
                />
              )}
            />
            <Controller
              name={`kyc.kycDetails.addressProof`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Address Proof No.`}
                  placeholder={`Enter address proof no.`}
                  errorContent={errors.kyc?.kycDetails?.addressProof?.message}
                  required={true}
                  onBlur={() => handleBlur(`kyc.kycDetails.addressProof`)}  // Handle blur event
                  onChange={(e) => {
                    field.onChange(e); // Default handling
                    trigger("kyc.kycDetails.addressProof");  // Manually trigger validation for this field
                  }}
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
