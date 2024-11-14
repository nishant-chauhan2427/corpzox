import { Controller } from "react-hook-form";
import { Input } from "../../../../../components/inputs";

export const KYCDetails = ({ control, errors }) => {
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
              name={`kycDetails.username`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Username`}
                  placeholder={`Enter username`}
                  errorContent={errors.kycDetails?.username?.message}
                  required={true}
                />
              )}
            />
            <Controller
              name={`kycDetails.id`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`ID proof No.`}
                  placeholder={`Enter identity proof no.`}
                  errorContent={errors.kycDetails?.id?.message}
                  required={true}
                />
              )}
            />
            <Controller
              name={`kycDetails.addressProof`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Address Proof No.`}
                  placeholder={`Enter address proof no.`}
                  errorContent={errors.kycDetails?.addressProof?.message}
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
