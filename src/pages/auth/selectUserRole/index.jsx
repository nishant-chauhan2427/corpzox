import React, { useEffect, useState } from "react";
import { ModalWrapper } from "../../../components/wrappers/modal";
import { AuthLayout } from "../../../components/layout/auth";
import { Button } from "../../../components/buttons";
import { useNavigate } from "react-router-dom";

const SelectUserRole = () => {
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [clickedCardIndex, setClickedCardIndex] = useState(null); // Track the clicked card index
  const [isCardClicked, setIsCardClicked] = useState(false); // Track whether a card is clicked
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setConfirmationModal(true);
    }, 1000); // Opens modal after 1 second
    return () => clearTimeout(timer);
  }, []);

  const onConfirmationModalClose = () => {
    setConfirmationModal(false);
  };

  const handleCardClick = (index) => {
    setClickedCardIndex(index);
    setIsCardClicked(true); 
  };

  const handleContinueClick = () => {
    if (clickedCardIndex === 0) {
        localStorage.setItem("specificRole", "Raise Funds");
      navigate('/dashboard');
    } else if (clickedCardIndex === 1) {
        localStorage.setItem("specificRole", "Invest in StartUp");
      navigate('/select-user-type');
    }
  };

  const cardDetails = [
    {
      title: "Raise Funds",
      image: "/images/advertisement/user-first.png",
    },
    {
      title: "Invest in StartUp",
      image: "/images/advertisement/user-second.png",
    },
  ];

  return (
    <>
      <AuthLayout>
        <ModalWrapper isOpen={confirmationModal} onClose={onConfirmationModalClose}>
          <div className="flex flex-col sm:gap-8 gap-4 pt-5 pb-10 px-2 items-center">
            <div className="text-center space-y-2">
              <p className="text-[32px] font-bold text-[#0A1C40]">Select User</p>
              <p className="font-normal text-lg text-[#0A1C40]">
                Select user to choose your specific role.
              </p>
            </div>
            <div className="flex sm:flex-row gap-2 sm:gap-8">
              {cardDetails.map((data, index) => (
                <div
                  key={index} // Add a unique key
                  className={`sm:w-[238px] bg-white px-4 flex flex-col justify-center pt-4 rounded-[7px] ${
                    clickedCardIndex === index ? "border-2 border-[#FFD700]" : ""
                  }`}
                  onClick={() => handleCardClick(index)} // Pass index to handle click
                >
                  <div className="flex font-bold text-base text-center justify-center text-[#000000] items-center gap-2">
                    <p>{data.title}</p>
                    <img src="/icons/authencation/ep_info-filled.svg" alt="" />
                  </div>
                  <img src={data.image} alt="" />
                </div>
              ))}
            </div>
            <Button
              disabled={!isCardClicked} // Disable the button if no card is clicked
              className="w-[45%] py-2 font-semibold rounded-[10px]"
              primary={true}
              onClick={handleContinueClick} 
            >
              Continue
            </Button>
          </div>
        </ModalWrapper>
      </AuthLayout>
    </>
  );
};

export default SelectUserRole;
