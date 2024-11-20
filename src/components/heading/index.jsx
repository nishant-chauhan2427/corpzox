import { useEffect } from "react";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";

export const Heading = ({ title, children, backButton, tourButton }) => {
  const projectName = "Corpzo";

  const navigate = useNavigate();

  useEffect(() => {
    document.title = ` ${title} - ${projectName}`;
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <h2 className="flex items-center gap-4 font-semibold text-xl text-[#0A1C40]">
      {backButton && (
        <button onClick={() => navigate(-1)}>
          <GoArrowLeft />
        </button>
      )}
      {children}
      {tourButton && (
        <span>
          <img src="/icons/dashboard/take-a-tour.svg" alt="" />
        </span>
      )}
    </h2>
  );
};

export const PageHeading = ({ children, divClassName, className, disable }) => {
  return (
    <div className={`${divClassName} flex items-center gap-2 `}>
      {/* <CrossButton
        className={"p-0"}
        icon={<FaArdivLeftLong className="text-black" />}
        iconClassName={"text-xl"}
        disable={disable}
      /> */}
      <Heading className={className}>{children}</Heading>
    </div>
  );
};
