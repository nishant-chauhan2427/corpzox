import { Controller } from "react-hook-form";
import { Input } from "../../../../../components/inputs";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export const KYCDetails = ({ control, errors, handleBlur, trigger,setValue }) => {

  const {business,businessId} = useSelector((state) => state.business);

  useEffect(() => {
    // Ensure to populate the registration data when business is available
    if (business) {
      setValue("kyc.kycUser", business?.kyc?.kycUser);
      setValue("kyc.id", business?.kyc?.id);
      setValue("kyc.addressProof", business?.kyc?.addressProof);
    }
  }, [business, setValue]);

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
              name={`kyc.kycUser`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Username`}
                  placeholder={`Enter username`}
                  errorContent={errors.kyc?.kycDetails?.kycUser?.message}
                  required={true}
                  onBlur={() => handleBlur(`kyc.kycUser`)}  // Handle blur event
                  onChange={(e) => {
                    field.onChange(e); // Default handling
                    trigger("kyc.kycUser");  // Manually trigger validation for this field
                  }}
                  maxLength={20}
                />
              )}
            />
            <Controller
              name={`kyc.id`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`ID proof No.`}
                  placeholder={`Enter identity proof no.`}
                  errorContent={errors.kyc?.id?.message}
                  required={true}
                  onBlur={() => handleBlur(`kyc.id`)}  // Handle blur event
                  onChange={(e) => {
                    field.onChange(e); // Default handling
                    trigger("kyc.id");  // Manually trigger validation for this field
                  }}
                  maxLength={15}
                />
              )}
            />
            <Controller
              name={`kyc.addressProof`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Address Proof No.`}
                  placeholder={`Enter address proof no.`}
                  errorContent={errors.kyc?.addressProof?.message}
                  required={true}
                  onBlur={() => handleBlur(`kyc.addressProof`)}  // Handle blur event
                  onChange={(e) => {
                    field.onChange(e); // Default handling
                    trigger("kyc.addressProof");  // Manually trigger validation for this field
                  }}
                  maxLength={30}
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
