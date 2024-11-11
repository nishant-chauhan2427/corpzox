import { useState } from "react";
import { ImCross } from "react-icons/im";

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
        <div
          className={`relative rounded-lg px-5 py-4 bg-[#007AFF] pr-20 bg-[url(public\images\invest-bg-shape.png)] bg-contain bottom-0 right-0 transition-opacity duration-300 ${
            isFadingOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <p className="text-white font-semibold text-lg ">
            Looking for an investment?
          </p>
          <button className="text-white">Avail CORPZO X</button>
          <div
            onClick={handleBannerdisplay}
            className="absolute -right-2 -top-2 cursor-pointer bg-[#FF2323] rounded-full  p-2"
          >
            <ImCross color="white" size={10} />
          </div>
        </div>
      )}
    </>
  );
};
