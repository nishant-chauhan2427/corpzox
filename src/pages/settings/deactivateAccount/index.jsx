import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../../../components/inputs";
import { Button } from "../../../components/buttons/button";
import { TextArea } from "../../../components/inputs/textarea";
import { ConfirmationModal } from "../../../components/modal/confirmationModal";
import { yupResolver } from "@hookform/resolvers/yup";
import deaqctivateAccountSchema from "./deactivateAccountValidationSchema";
import { useDispatch, useSelector } from "react-redux";
import { deactivateAccount } from "../../../redux/actions/settings-actions";
const DeactivateAccount = () => {
  const dispatch = useDispatch();
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [otherValue, setOtherVsalue] = useState("")
  const [otherError, setOtherError] = useState("");
  const { isDeactivate } = useSelector((state) => state.settings);

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(deaqctivateAccountSchema),
    defaultValues: { reason: "", password: "" },
  });

  const reason = watch("reason");

  const onSubmit = (data) => {
    if (reason === "other" && !otherValue) {
      setOtherError("Please provide a reason for selecting 'Other'");
      return;
    } else {
      setOtherError(""); // Clear error if 'other' is filled or not selected
    }

    const formData = {
      password: data.password,
      reason: reason === "other" ? otherValue : data.reason,
    };
    setConfirmationModal(true);
    console.log(formData);
  };

  const confirmDeactivate = (data) => {
    dispatch(deactivateAccount(data))
  }
  const onConfirmationModalClose = () => {
    setConfirmationModal(!confirmationModal);
  };

  useEffect(() => {
    if (!isDeactivate) {
      onConfirmationModalClose();
    }
  }, [isDeactivate]); 
  return (
    <>
      <div className="mt-4 w-full">
        <p className="font-bold text-xl text-black">Deactivate Account</p>
        <p className="text-sm text-[#4E4E4E]">Deactivate your Account</p>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="mt-4 w-full md:w-1/2 flex flex-col gap-4">
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Password"
                  placeholder="Enter your password"
                  errorContent={errors.password?.message}
                  required={true}
                />
              )}
            />

            <p className="text-xl">
              Select your reason to deactivate your account
            </p>

            {/* Radio Buttons Controlled by Controller */}
            <Controller
              name="reason"
              control={control}
              render={({ field }) => (
                <>
                  <CheckMarkLabel
                    label="I don't find CorpZo useful"
                    value="not_useful"
                    selectedValue={field.value}
                    onChange={field.onChange}
                  />
                  <CheckMarkLabel
                    label="I have a privacy concern."
                    value="privacy_concern"
                    selectedValue={field.value}
                    onChange={field.onChange}
                  />
                  <CheckMarkLabel
                    label="I don't understand how to use CorpZo"
                    value="confused"
                    selectedValue={field.value}
                    onChange={field.onChange}
                  />
                  <CheckMarkLabel
                    label="Other"
                    value="other"
                    selectedValue={field.value}
                    onChange={field.onChange}
                  />
                </>
              )}
            />
            {errors.reason && (
              <p className="text-red-500 text-sm">{errors.reason.message}</p>
            )}
            {/* If 'Other' is selected, show the TextArea */}
            {reason === "other" && (
              <TextArea
                className="min-h-20"
                placeholder="We are sorry to see you go! Before you go, please let us know what happened, so we can avoid losing future users."
                onChange={(e) => { setOtherVsalue(e.target.value) }}
                value={otherValue} // Ensure the value from the form state is used
              />
            )}
            {otherError && (
              <p className="text-red-500 text-sm">{otherError}</p>
            )}
            <div className="flex justify-start items-center gap-3">
              <Button
                type="submit"
                className="px-4 py-1.5 rounded-lg"
                primary={true}
              >
                Deactivate
              </Button>
            </div>
          </div>
        </form>
      </div>
      <ConfirmationModal
        isOpen={confirmationModal}
        onClose={onConfirmationModalClose}
      >
        <div className="flex flex-col text-center gap-4">
          <h4 className="font-bold text-xl">Deactivate Account</h4>
          <div>
            <h5 className="text-lg">
              Are you sure you want to deactivate your account?
            </h5>
            <p className="text-xs text-[#828282]">
              Bear in mind that when you deactivate your account, all your data
              will also be hidden from the platform.
            </p>
          </div>
          <div className="flex justify-center items-center gap-4">
            <Button outline={true} onClick={onConfirmationModalClose}>
              Cancel
            </Button>
            <Button primary={true} onClick={() => confirmDeactivate({ password: watch("password"), reason: reason === "other" ? otherValue : reason })}
              isLoading={isDeactivate}>Confirm</Button>
          </div>
        </div>
      </ConfirmationModal>
    </>
  );
};

export default DeactivateAccount;

const CheckMarkLabel = ({ label, value, selectedValue, onChange }) => {
  return (
    <div className="flex justify-between items-center">
      <label htmlFor={`checkmark-${value}`} className="text-sm">
        {label}
      </label>
      <input
        id={`checkmark-${value}`}
        type="radio"
        value={value}
        checked={selectedValue === value}
        onChange={() => onChange(value)}
      />
    </div>
  );
};
