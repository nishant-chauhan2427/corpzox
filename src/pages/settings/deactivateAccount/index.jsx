import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../../../components/inputs";
import { Button } from "../../../components/buttons/button";
import { TextArea } from "../../../components/inputs/textarea";
import { ConfirmationModal } from "../../../components/modal/confirmationModal";

const DeactivateAccount = () => {
  const [confirmationModal, setConfirmationModal] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  const onSubmit = (data) => {
    setConfirmationModal(true);
    console.log(data, "data before transformation");
  };

  const onConfirmationModalClose = () => {
    setConfirmationModal(!confirmationModal);
  };

  return (
    <>
      <div className="mt-4 w-full">
        <p className="font-bold text-xl text-black">Deactivate Account</p>
        <p className="text-sm text-[#4E4E4E]">Deactivate your Account</p>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="mt-4 w-full md:w-1/2 flex flex-col gap-4">
            <Controller
              name={`password`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={`Password`}
                  placeholder={`Enter your password`}
                  errorContent={errors.password?.message}
                  required={true}
                />
              )}
            />

            {/*  */}
            <p className="text-xl">
              Select your reason to deactivate your account
            </p>
            <CheckMarkLabel label={"I don't find CorpZo useful"} />
            <CheckMarkLabel label={"I have a privacy concern."} />
            <CheckMarkLabel label={"I don't understand how to use CorpZo"} />
            <CheckMarkLabel label={"Other"} />
            <TextArea
              className="min-h-20"
              placeholder="We are sorry to see you go! Before you go please lets us know  what happened, so we can avoid losing future users"
            />
            <div className="flex justify-start items-center gap-3">
              <Button
                type={"submit"}
                className={"px-4 py-1.5 rounded-lg"}
                primary={true}
                // isLoading={}
                // disabled={

                // }
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
              Are you sure you want to deactivate your account
            </h5>
            <p className="text-xs text-[#828282]">
              Bear in mind that when you deactivate your account, all your data
              will also be hidden from the platform{" "}
            </p>
          </div>
          <div className="flex justify-center items-center gap-4">
            <Button outline={true}>Cancel</Button>
            <Button primary={true}>Confirm</Button>
          </div>
        </div>
      </ConfirmationModal>
    </>
  );
};

export default DeactivateAccount;

const CheckMarkLabel = ({ label }) => {
  return (
    <div className="flex justify-between">
      <label htmlFor="checkmark">{label}</label>
      <input id="chekmark" type="radio" />
    </div>
  );
};
