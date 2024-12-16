import { useState } from "react";
import { ImCross } from "react-icons/im";
import { Button } from "../../../../components/buttons";

export const Advertisement = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleBannerdisplay = () => {
    setIsFadingOut(true);
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className="relative min-w-[350px]">
          <div
            className={`flex flex-col gap-4 rounded-[18px] px-5 py-4 sm:pr-16 bg-[url("/images/advertisement/advertisement-bg.svg")] bg-no-repeat bg-cover bg-right-bottom  transition-all duration-300 ${
              isFadingOut ? "opacity-0" : "opacity-100"
            }`}
          >
            <p className="text-white font-medium text-base">
              Looking for an investment?
            </p>
            <div>
              <Button primary={true}>Avail CORPZO X</Button>
            </div>
          </div>
          <div
            onClick={handleBannerdisplay}
            className="absolute -right-2 -top-2 cursor-pointer bg-[#FF2323] rounded-full  p-2"
          >
            <ImCross color="white" size={8} />
          </div>
        </div>
      )}
    </>
  );
};
