// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { Controller, useForm } from "react-hook-form";
// import { Input } from "../../../../../components/inputs";
// import { Selector } from "../../../../../components/select";
// import { PhoneNumberInput } from "../../../../../components/inputs/phoneInput";

// export const AddressDetails = () => {
//   const { business } = useSelector((state) => state.business);

//   const {
//     handleSubmit,
//     control,
//     formState: { errors, isValid, touchedFields },
//     setValue,
//     getValues,
//     watch,
//     trigger,
//   } = useForm({
//     mode: "onChange",
//     // resolver: yupResolver(getValidationSchema(currentStep)),
//       defaultValues: business || {},
//   });

//   // useEffect(() => {
//   //   if (business) {
//   //     // Use setValue to set form field values dynamically
//   //     setValue("address.businessAddressL1", business?.address?.businessAddressL1 || "");
//   //     setValue("address.businessAddressL2", business?.address?.businessAddressL2 || "");
//   //     setValue("address.businessAddressPin", business?.address?.businessAddressPin || "");
//   //     setValue("address.businessAddressCity", business?.address?.businessAddressCity || "");
//   //     setValue("address.businessAddressState", business?.address?.businessAddressState || "");

//   //     setValue("address.communicationAddressL1", business?.address?.communicationAddressL1 || "");
//   //     setValue("address.communicationAddressL2", business?.address?.communicationAddressL2 || "");
//   //     setValue("address.communicationAddressPin", business?.address?.communicationAddressPin || "");
//   //     setValue("address.communicationAddressCity", business?.address?.communicationAddressCity || "");
//   //     setValue("address.communicationAddressState", business?.address?.communicationAddressState || "");
//   //   }
//   // }, [business, setValue]);

//   const cityOption = [
//     { label: "Noida", value: 1 },
//     { label: "Gurgaon", value: 0 },
//   ];

//   const stateOption = [
//     { label: "Uttar Pradesh", value: "Uttar Pradesh" },
//     { label: "Haryana", value: "Haryana" },
//     { label: "Others", value: "others" },
//   ];

//   const handleFieldChange = (fieldName, field, trigger) => {
//     return (e) => {
//       field.onChange(e); // Default handling
//       trigger(fieldName); // Manually trigger validation for this field
//     };
//   };

//   const handleFieldBlur = (fieldName) => {
//     return () => handleBlur(fieldName);
//   };

//   return (
//     <>
//       <div className="w-full pt-4 flex flex-col md:flex-row md:justify-between gap-4">
//         <div className="w-full">
//           <div className="my-4">
//             <h5 className="font-semibold text-base text-[#4D4D4F] dark:text-gray-200">
//               Complete Business Address
//             </h5>
//             <p className="text-xs">Provide the necessary address of your own business.</p>
//           </div>
//           <div className="w-full grid grid-cols-1 gap-4">
//             <Controller
//               name="address.businessAddressL1"
//               control={control}
//               render={({ field }) => (
//                 <Input
//                   {...field}
//                   label="Line 1"
//                   placeholder="Line 1"
//                   errorContent={errors?.address?.businessAddressL1?.message}
//                   required
//                   onBlur={() => handleFieldBlur("address.businessAddressL1")}
//                   onChange={(e) => {
//                     field.onChange(e); // Default handling
//                     trigger("address.businessAddressL1"); // Manually trigger validation
//                   }}
//                   maxLength={50}
//                 />
//               )}
//             />
//             <Controller
//               name="address.businessAddressL2"
//               control={control}
//               render={({ field }) => (
//                 <Input
//                   {...field}
//                   label="Line 2"
//                   placeholder="Line 2"
//                   errorContent={errors?.address?.businessAddressL2?.message}
//                   required
//                   onBlur={() => handleFieldBlur("address.businessAddressL2")}
//                   onChange={(e) => {
//                     field.onChange(e);
//                     trigger("address.businessAddressL2");
//                   }}
//                   maxLength={50}
//                 />
//               )}
//             />

//             <Controller
//               name="address.businessAddressState"
//               control={control}
//               render={({ field }) => {
//                 const selectedState = stateOption.find((option) => option.value === field.value);
//                 return (
//                   <Selector
//                     {...field}
//                     label="State"
//                     placeholder="Select state"
//                     errorContent={errors?.address?.businessAddressState?.message}
//                     options={stateOption}
//                     required
//                     value={selectedState || {}}
//                     onChange={(selectedValue) => {
//                       field.onChange(selectedValue.value);
//                       setValue("address.businessAddressState", selectedValue.value);
//                       trigger("address.businessAddressState"); // Manually trigger validation
//                     }}
//                     onBlur={() => handleFieldBlur("address.businessAddressState")}
//                   />
//                 );
//               }}
//             />

//             <Controller
//               name="address.businessAddressCity"
//               control={control}
//               render={({ field }) => {
//                 const selectedCity = cityOption.find((option) => option.value === field.value);
//                 return (
//                   <Selector
//                     {...field}
//                     label="City"
//                     placeholder="Select city"
//                     errorContent={errors?.address?.businessAddressCity?.message}
//                     options={cityOption}
//                     required
//                     value={selectedCity || {}}
//                     onChange={(selectedValue) => {
//                       field.onChange(selectedValue.value);
//                       setValue("address.businessAddressCity", selectedValue.value);
//                       trigger("address.businessAddressCity"); // Manually trigger validation
//                     }}
//                     onBlur={() => handleFieldBlur("address.businessAddressCity")}
//                   />
//                 );
//               }}
//             />
//             <Controller
//               name="address.businessAddressPin"
//               control={control}
//               render={({ field }) => (
//                 <Input
//                   {...field}
//                   label="PIN Code"
//                   placeholder="Enter your pincode"
//                   errorContent={errors?.address?.businessAddressPin?.message}
//                   required
//                   onBlur={() => handleFieldBlur("address.businessAddressPin")}
//                   onChange={(e) => {
//                     field.onChange(e);
//                     trigger("address.businessAddressPin");
//                   }}
//                 />
//               )}
//             />

//           </div>
//         </div>

//         {/* Communication Address */}
//         <div className="w-full">
//           <div className="my-4">
//             <h5 className="font-semibold text-base text-[#4D4D4F] dark:text-gray-200">Complete Communication Address</h5>
//             <p className="text-xs">Provide the necessary address of your own business.</p>
//           </div>
//           <div className="w-full grid grid-cols-1 gap-4">
//             <Controller
//               name="address.communicationAddressL1"
//               control={control}
//               render={({ field }) => (
//                 <Input
//                   {...field}
//                   label="Line 1"
//                   placeholder="Line 1"
//                   errorContent={errors?.address?.communicationAddressL1?.message}
//                   required
//                   onBlur={() => handleFieldBlur("address.communicationAddressL1")}
//                   onChange={(e) => {
//                     field.onChange(e);
//                     trigger("address.communicationAddressL1");
//                   }}
//                   maxLength={50}
//                 />
//               )}
//             />
//             <Controller
//               name="address.communicationAddressL2"
//               control={control}
//               render={({ field }) => (
//                 <Input
//                   {...field}
//                   label="Line 2"
//                   placeholder="Line 2"
//                   errorContent={errors?.address?.communicationAddressL2?.message}
//                   required
//                   onBlur={() => handleFieldBlur("address.communicationAddressL2")}
//                   onChange={(e) => {
//                     field.onChange(e);
//                     trigger("address.communicationAddressL2");
//                   }}
//                   maxLength={50}
//                 />
//               )}
//             />

//              <Controller
//               name="address.communicationAddressState"
//               control={control}
//               render={({ field }) => {
//                 const selectedState = stateOption.find((option) => option.value === field.value);
//                 return (
//                   <Selector
//                     {...field}
//                     label="State"
//                     placeholder="Select state"
//                     errorContent={errors?.address?.communicationAddressState?.message}
//                     options={stateOption}
//                     required
//                     value={selectedState || {}}
//                     onChange={(selectedValue) => {
//                       field.onChange(selectedValue.value);
//                       setValue("address.communicationAddressState", selectedValue.value);
//                       trigger("address.communicationAddressState");
//                     }}
//                     onBlur={() => handleFieldBlur("address.communicationAddressState")}
//                   />
//                 );
//               }}
//             />
//             <Controller
//               name="address.communicationAddressCity"
//               control={control}
//               render={({ field }) => {
//                 const selectedCity = cityOption.find((option) => option.value === field.value);
//                 return (
//                   <Selector
//                     {...field}
//                     label="City"
//                     placeholder="Select city"
//                     errorContent={errors?.address?.communicationAddressCity?.message}
//                     options={cityOption}
//                     required
//                     value={selectedCity || {}}
//                     onChange={(selectedValue) => {
//                       field.onChange(selectedValue.value);
//                       setValue("address.communicationAddressCity", selectedValue.value);
//                       trigger("address.communicationAddressCity"); // Manually trigger validation
//                     }}
//                     onBlur={() => handleFieldBlur("address.communicationAddressCity")}
//                   />

//                 );
//               }}
//             />
//             <Controller
//               name="address.communicationAddressPin"
//               control={control}
//               render={({ field }) => (
//                 <Input
//                   {...field}
//                   label="PIN Code"
//                   placeholder="Enter your pincode"
//                   errorContent={errors?.address?.communicationAddressPin?.message}
//                   required
//                   onBlur={() => handleFieldBlur("address.communicationAddressPin")}
//                   onChange={(e) => {
//                     field.onChange(e);
//                     trigger("address.communicationAddressPin");
//                   }}
//                 />
//               )}
//             />

//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../../../../../components/inputs";
import { Selector } from "../../../../../components/select";
import { PhoneNumberInput } from "../../../../../components/inputs/phoneInput";
import { Button } from "../../../../../components/buttons";
import { useNavigate } from "react-router-dom";
import {
  updateAddressDetails,
  updateRegistrationDetails,
} from "../../../../../redux/actions/business-action";
import { addressSchema } from "../../../../../validation/createBusinessValidationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox } from "../../../../../components/inputs/checkbox";

export const AddressDetails = ({ isEdit }) => {
  const { business, businessId, loading } = useSelector(
    (state) => state.business
  );
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
    resolver: yupResolver(addressSchema), // Apply the validation schema here
  });

  // useEffect(() => {
  //   if (business) {
  //     // Use setValue to set form field values dynamically
  //     setValue("address.businessAddressL1", business?.address?.businessAddressL1 || "");
  //     setValue("address.businessAddressL2", business?.address?.businessAddressL2 || "");
  //     setValue("address.businessAddressPin", business?.address?.businessAddressPin || "");
  //     setValue("address.businessAddressCity", business?.address?.businessAddressCity || "");
  //     setValue("address.businessAddressState", business?.address?.businessAddressState || "");

  //     setValue("address.communicationAddressL1", business?.address?.communicationAddressL1 || "");
  //     setValue("address.communicationAddressL2", business?.address?.communicationAddressL2 || "");
  //     setValue("address.communicationAddressPin", business?.address?.communicationAddressPin || "");
  //     setValue("address.communicationAddressCity", business?.address?.communicationAddressCity || "");
  //     setValue("address.communicationAddressState", business?.address?.communicationAddressState || "");
  //   }
  // }, [business, setValue]);

  const cityOption = [
    { label: "Noida", value: "noida" },
    { label: "Gurgaon", value: "gurgoan" },
  ];

  const stateOption = [
    { label: "Uttar Pradesh", value: "Uttar Pradesh" },
    { label: "Haryana", value: "Haryana" },
    { label: "Others", value: "others" },
  ];

  const handleFieldChange = (fieldName, field, trigger) => {
    return (e) => {
      field.onChange(e); // Default handling
      trigger(fieldName); // Manually trigger validation for this field
    };
  };

  const handleFieldBlur = (fieldName) => {
    return () => handleBlur(fieldName);
  };

  const onSubmit = (data) => {
    // console.log("Submitted Data:", data);
    const payload = data?.address;
    if (!businessId) {
      console.log("No businessId exist is in business Store");
    }

    //PUT API to update changes
    payload.businessId = businessId;
    dispatch(updateAddressDetails(payload)).then((response) => {
      //  console.log("Response", response?.payload);
      // const newBusinessId = response.payload;
      // dispatch(setBusinessId(newBusinessId));
      isEdit
        ? navigate("/business/edit/financial")
        : navigate("/business/create/financial");
    });

    // navigate("/business/create/financial");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 mb-4 rounded-full">
        <div
          className="h-2 bg-blue-500 rounded-full"
          style={{
            // width: `${(currentStep / (steps.length - 1)) * 100}%`,
            width: `40%`,
          }}
        ></div>
      </div>
      <div className="w-full pt-4 flex flex-col md:flex-row md:justify-between gap-4">
        <div className="w-full">
          <div className="my-4">
            <p
              className=" flex invisible items-center gap-2 font-semibold text-sm text-[#4D4D4F]
            "
            >
              {" "}
              <Checkbox />
              Same as Communication Address{" "}
            </p>

            <h5 className="font-semibold text-base text-[#4D4D4F] dark:text-gray-200">
              Complete Business Address
            </h5>
            <p className="text-xs">
              Provide the necessary address of your own business.
            </p>
          </div>
          <div className="w-full grid grid-cols-1 gap-4">
            <Controller
              name="address.businessAddressL1"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Line 1"
                  placeholder="Line 1"
                  errorContent={errors?.address?.businessAddressL1?.message}
                  required
                  onBlur={() => handleFieldBlur("address.businessAddressL1")}
                  onChange={(e) => {
                    field.onChange(e); // Default handling
                    trigger("address.businessAddressL1"); // Manually trigger validation
                  }}
                  maxLength={50}
                />
              )}
            />
            <Controller
              name="address.businessAddressL2"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Line 2"
                  placeholder="Line 2"
                  errorContent={errors?.address?.businessAddressL2?.message}
                  required
                  onBlur={() => handleFieldBlur("address.businessAddressL2")}
                  onChange={(e) => {
                    field.onChange(e);
                    trigger("address.businessAddressL2");
                  }}
                  maxLength={50}
                />
              )}
            />

            <Controller
              name="address.businessAddressState"
              control={control}
              render={({ field }) => {
                const selectedState = stateOption.find(
                  (option) => option.value === field.value
                );
                return (
                  <Selector
                    {...field}
                    label="State"
                    placeholder="Select state"
                    errorContent={
                      errors?.address?.businessAddressState?.message
                    }
                    options={stateOption}
                    required
                    value={selectedState || {}}
                    onChange={(selectedValue) => {
                      field.onChange(selectedValue.value);
                      setValue(
                        "address.businessAddressState",
                        selectedValue.value
                      );
                      // trigger("address.businessAddressState"); // Manually trigger validation
                    }}
                    // onBlur={() => handleFieldBlur("address.businessAddressState")}
                  />
                );
              }}
            />

            <Controller
              name="address.businessAddressCity"
              control={control}
              render={({ field }) => {
                const selectedCity = cityOption.find(
                  (option) => option.value === field.value
                );
                return (
                  <Selector
                    {...field}
                    label="City"
                    placeholder="Select city"
                    errorContent={errors?.address?.businessAddressCity?.message}
                    options={cityOption}
                    required
                    value={selectedCity || {}}
                    onChange={(selectedValue) => {
                      field.onChange(selectedValue.value);
                      setValue(
                        "address.businessAddressCity",
                        selectedValue.value
                      );
                      trigger("address.businessAddressCity"); // Manually trigger validation
                    }}
                    onBlur={() =>
                      handleFieldBlur("address.businessAddressCity")
                    }
                  />
                );
              }}
            />
            <Controller
              name="address.businessAddressPin"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="PIN Code"
                  maxLength={6}
                  placeholder="Enter your pincode"
                  errorContent={errors?.address?.businessAddressPin?.message}
                  required
                  onBlur={() => handleFieldBlur("address.businessAddressPin")}
                  onChange={(e) => {
                    field.onChange(e);
                    trigger("address.businessAddressPin");
                  }}

                  onInput={(e) => {
                    const value = e.target.value;
                    // Prevent invalid characters and limit input length to 10
                    e.target.value = value
                      .replace(/[^0-9]/g, "") // Allow only digits
                      .slice(0, 6); // Limit to 6 characters
                    field.onChange(e); // Trigger React Hook Form's onChange
                  }}
                />
              )}
            />
          </div>
        </div>

        {/* Communication Address */}
        <div className="w-full">
          <div className="my-4">
            <p
              className="flex items-center gap-2 font-semibold text-sm text-[#4D4D4F]
            "
            >
              {" "}
              <Checkbox />
              Same as Communication Address{" "}
            </p>
            <h5 className="font-semibold text-base text-[#4D4D4F] dark:text-gray-200">
              Complete Communication Address
            </h5>
            <p className="text-xs">
              Provide the necessary address of your own business.
            </p>
          </div>
          <div className="w-full grid grid-cols-1 gap-4">
            <Controller
              name="address.communicationAddressL1"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Line 1"
                  placeholder="Line 1"
                  errorContent={
                    errors?.address?.communicationAddressL1?.message
                  }
                  required
                  onBlur={() =>
                    handleFieldBlur("address.communicationAddressL1")
                  }
                  onChange={(e) => {
                    field.onChange(e);
                    trigger("address.communicationAddressL1");
                  }}
                  maxLength={50}
                />
              )}
            />
            <Controller
              name="address.communicationAddressL2"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Line 2"
                  placeholder="Line 2"
                  errorContent={
                    errors?.address?.communicationAddressL2?.message
                  }
                  required
                  onBlur={() =>
                    handleFieldBlur("address.communicationAddressL2")
                  }
                  onChange={(e) => {
                    field.onChange(e);
                    trigger("address.communicationAddressL2");
                  }}
                  maxLength={50}
                />
              )}
            />

            <Controller
              name="address.communicationAddressState"
              control={control}
              render={({ field }) => {
                const selectedState = stateOption.find(
                  (option) => option.value === field.value
                );
                return (
                  <Selector
                    {...field}
                    label="State"
                    placeholder="Select state"
                    errorContent={
                      errors?.address?.communicationAddressState?.message
                    }
                    options={stateOption}
                    required
                    value={selectedState || {}}
                    onChange={(selectedValue) => {
                      field.onChange(selectedValue.value);
                      setValue(
                        "address.communicationAddressState",
                        selectedValue.value
                      );
                      trigger("address.communicationAddressState");
                    }}
                    onBlur={() =>
                      handleFieldBlur("address.communicationAddressState")
                    }
                  />
                );
              }}
            />
            <Controller
              name="address.communicationAddressCity"
              control={control}
              render={({ field }) => {
                const selectedCity = cityOption.find(
                  (option) => option.value === field.value
                );
                return (
                  <Selector
                    {...field}
                    label="City"
                    placeholder="Select city"
                    errorContent={
                      errors?.address?.communicationAddressCity?.message
                    }
                    options={cityOption}
                    required
                    value={selectedCity || {}}
                    onChange={(selectedValue) => {
                      field.onChange(selectedValue.value);
                      setValue(
                        "address.communicationAddressCity",
                        selectedValue.value
                      );
                      trigger("address.communicationAddressCity"); // Manually trigger validation
                    }}
                    onBlur={() =>
                      handleFieldBlur("address.communicationAddressCity")
                    }
                  />
                );
              }}
            />
            <Controller
              name="address.communicationAddressPin"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="PIN Code"
                  maxLength={6}
                  placeholder="Enter your pincode"
                  errorContent={
                    errors?.address?.communicationAddressPin?.message
                  }
                  required
                  onBlur={() =>
                    handleFieldBlur("address.communicationAddressPin")
                  }
                  onChange={(e) => {
                    field.onChange(e);
                    trigger("address.communicationAddressPin");
                  }}

                  onInput={(e) => {
                    const value = e.target.value;
                    // Prevent invalid characters and limit input length to 10
                    e.target.value = value
                      .replace(/[^0-9]/g, "") // Allow only digits
                      .slice(0, 6); // Limit to 6 characters
                    field.onChange(e); // Trigger React Hook Form's onChange
                  }}
                />
              )}
            />
          </div>
        </div>
      </div>
      {/* Navigation Buttons */}
      <div className="flex justify-between items-center gap-4 m-2">
        <Button type="button" primary onClick={() => navigate(-1)}>
          Prev
        </Button>
        <Button
          type="submit"
          primary
          disabled={!isValid || loading}
          isLoading={loading}
        >
          {loading ? "saving..." : "Save & Next"}
        </Button>
      </div>
    </form>
  );
};
