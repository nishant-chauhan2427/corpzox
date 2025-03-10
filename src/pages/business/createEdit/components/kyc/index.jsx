import { Controller, useForm } from "react-hook-form";
import { Input } from "../../../../../components/inputs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../../components/buttons";
import { kycSchema } from "../../../../../validation/createBusinessValidationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateKYCDetails, updateRegistrationDetails } from "../../../../../redux/actions/business-action";
import { isEqualObject } from "../../../../../utils";

export const KYCDetails = ({ isEdit }) => {

  const { business, businessId, loading } = useSelector((state) => state.business);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const {
    handleSubmit,
    control,
    formState: { errors, isValid, touchedFields },
    setValue,
    getValues,
    watch,
    trigger,
  } = useForm({
    mode: "onChange",
    // resolver: yupResolver(getValidationSchema(currentStep)),
    defaultValues: business || {},
    resolver: yupResolver(kycSchema), // Apply the validation schema here
  });

  // useEffect(() => {
  //   // Ensure to populate the registration data when business is available
  //   if (business) {
  //     setValue("kyc.kycUser", business?.kyc?.kycUser);
  //     setValue("kyc.id", business?.kyc?.id);
  //     setValue("kyc.addressProof", business?.kyc?.addressProof);
  //   }
  // }, [business, setValue]);

  const onSubmit = (data) => {
    // console.log("Submitted Data : KYC details :", data);
    const payload = data?.kyc
    if (!businessId) {
      // console.log("No businessId exist is in business Store");
      return;
    }

    const { kyc } = business;
    const isChanged = kyc && !isEqualObject(kyc, payload);
    // console.log("isChanged", isChanged);

    if (!isChanged) {
      isEdit ? navigate("/business/edit/funding") : navigate("/business/create/funding")
      return;
    }

    //PUT API to update changes
    payload.businessId = businessId;
    dispatch(updateKYCDetails(payload)).then((response) => {
      //  console.log("Response", response?.payload);
      // const newBusinessId = response.payload;
      // dispatch(setBusinessId(newBusinessId)); 
      if (!response?.error)
        isEdit ? navigate("/business/edit/funding") : navigate("/business/create/funding")
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 mb-4 rounded-full">
        <div
          className="h-2 bg-blue-500 rounded-full"
          style={{
            // width: `${(currentStep / (steps.length - 1)) * 100}%`,
            width: `80%`,
          }}
        ></div>
      </div>
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
                  // onBlur={() => handleBlur(`kyc.kycUser`)}  // Handle blur event
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
                  // onBlur={() => handleBlur(`kyc.id`)}  // Handle blur event
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
                  // onBlur={() => handleBlur(`kyc.addressProof`)}  // Handle blur event
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
      {/* Navigation Buttons */}
      <div className="flex justify-between items-center gap-4 m-2">
        <Button type="button" className="flex items-center gap-2" onClick={() => navigate(-1)}>
          <span> &lt;&lt; </span>Back
        </Button>
        <Button type="submit" primary disabled={!isValid || loading} isLoading={loading} >
          {loading ? "Saving..." : "Save & Next"}
        </Button>
      </div>
    </form>
  );
};
