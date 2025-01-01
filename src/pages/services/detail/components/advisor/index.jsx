import { useEffect, useState } from "react";
import { Button } from "../../../../../components/buttons";
import { ConfirmationModal } from "../../../../../components/modal/confirmationModal";

export const Advisor = ({
  label = "Not sure about the packages?",
  description = "Talk to our advisors and kickstart your business today.",
  buttonText = "Talk to our Advisors",
  handleRequest,
  isLoading,
  message
}) => {
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const onConfirmationModalClose = () => {
    setConfirmationModal(false);
    setButtonClicked(false);
  };

  const handleButtonClick = () => {
    setButtonClicked(true); // Set the flag when the button is clicked
    handleRequest(); // Trigger the API call
  };

  useEffect(() => {
    if (!isLoading && buttonClicked) {
      // Open the modal only if the button was clicked and the API call is complete
      setConfirmationModal(true);
    }
  }, [isLoading, buttonClicked]);

  return (
    <div className="py-4 flex flex-col justify-center items-center text-center gap-3">
      <div>
        <h4 className="font-bold text-lg">{label}</h4>
        <p className="text-[11px]">{description}</p>
      </div>
      <Button
        isLoading={isLoading}
        onClick={handleButtonClick}
        className="px-6 py-1.5 !font-medium !rounded"
        primary={true}
      >
        {buttonText}
      </Button>
      <ConfirmationModal isOpen={confirmationModal} onClose={onConfirmationModalClose}>
        <div className="flex flex-col gap-2 px-4 py-5 items-center justify-center">
          <img src="/public/icons/payment/callback.svg" width={200} alt="" />
          <p className="text-3xl font-bold text-[#0A1C40]">
            Call Back Requested.
          </p>
          <p className="font-medium text-[14px] text-[#595959]">
            {/* Thank you for requesting a call back. Your Assistant Manager will get in touch with you soon. */}
            {message? message : "Thank you for requesting a call back. Your Assistant Manager will get in touch with you soon."}
          </p>
          <div className="flex justify-center">
            {/* <Button primary={true} onClick={onConfirmationModalClose}>
              Continue
            </Button> */}
          </div>
        </div>
      </ConfirmationModal>
    </div>
  );
};
