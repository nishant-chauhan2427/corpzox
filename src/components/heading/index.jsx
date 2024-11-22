import { useEffect } from "react";
import { GoArrowLeft } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";

export const Heading = ({
  title,
  className,
  children,
  backButton,
  tourButton,
}) => {
  const projectName = "Corpzo";

  const navigate = useNavigate();

  useEffect(() => {
    document.title = ` ${title ? title : children} - ${projectName}`;
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <h2
      className={`${
        className ? className : "py-4"
      } flex items-center gap-4 font-semibold text-xl text-[#0A1C40]`}
    >
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

export const PageHeading = ({ children, containerClassName, className }) => {
  return (
    <div className={`${containerClassName} flex justify-between items-center gap-4`}>
      <Heading className={className}>{children}</Heading>
      <Link/>
    </div>
  );
};
