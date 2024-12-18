import { useState } from "react";
import { Button } from "../../../../../components/buttons";
import { ConfirmationModal } from "../../../../../components/modal/confirmationModal";

export const Advisor = ({
  label = "Not sure about the packages?",
  description = "Talk to our advisors and kickstart your business today.",
  buttonText = "Talk to our Advisors",
  handleRequest,
  isLoading

}) => {

  const [confirmationModal, setConfirmationModal] = useState(false);
  const onConfirmationModalClose = () => {
    setConfirmationModal(false);
  };
  return (
    <div className="py-4 flex flex-col justify-center items-center text-center gap-3">
      <div>
        <h4 className="font-bold text-lg">{label}</h4>
        <p className="text-[11px]">{description}</p>
      </div>
      <Button onClick={() => setConfirmationModal(true)} className="px-6 py-1.5 !font-medium !rounded" primary={true}>
        {buttonText}
      </Button>
      <ConfirmationModal
        isOpen={confirmationModal}
        onClose={onConfirmationModalClose}
      >
        <div className="flex flex-col gap-2 items-center justify-center ">
          <img src="/public/icons/payment/callback.svg" width={200} alt="" />
          <p className="text-3xl font-bold text-[#0A1C40]">
            Request Call back?
          </p>
          <p className="font-medium text-[16px] text-[#595959]">
            Your Assistant Manager will get in touch with you soon.
          </p>
          <div className="flex justify-center">
            <Button
              primary={true}
              isLoading={isLoading}
              onClick={handleRequest}
            >
              {" "}
              Continue
            </Button>
          </div>
        </div>
      </ConfirmationModal>
    </div>
  );
};
