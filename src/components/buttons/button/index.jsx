import { ImSpinner2 } from "react-icons/im";

export const Button = ({
  to,
  type,
  primary,
  outline,
  simpleLink,
  gradientBtn,
  children,
  className,
  onClick,
  disabled,
  isLoading,
  leftIcon,
  rightIcon,
  ...props
}) => {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${className ? className : "px-4 py-1"}
      ${disabled ? "!bg-[#FFEF9A] hover:bg-slate-500 rounded-[5px]" : null} ${
        isLoading ? "!bg-[#FFEF9A] hover:bg-slate-500 rounded-[5px]" : ""
      } ${
        simpleLink && !disabled && !isLoading
          ? "text-primaryText font-medium text-sm  hover:text-gray-700 rounded-[5px]"
          : ""
      } ${
        outline && !disabled && !isLoading
          ? "text-[#4B5563] rounded-[5px] border text-sm font-medium border-[#4B5563] dark:border-gray-700"
          : ""
      } ${
        primary && !disabled && !isLoading
          ? "bg-[#FFD700] font-medium text-black text-sm hover:bg-[#FFD700] hover:bg-opacity-80 rounded-[5px]"
          : ""
      } ${
        gradientBtn && !disabled && !isLoading
          ? "bg-gradient-to-r from-primaryBg to-secondaryBg text-sm font-medium text-white hover:bg-opacity-80 px-7 hover:bg-gradient-to-l rounded"
          : ""
      } flex justify-center items-center gap-2 transition-all duration-300 ease-in-out hover:transition-all hover:duration-300 hover:ease-in-out disabled:cursor-not-allowed disabled:border-gray-400 `}
    >
      {leftIcon && leftIcon}
      {children}
      {rightIcon && rightIcon}
      {isLoading ? (
        <ImSpinner2 className="animate-spin text-white !text-xl" />
      ) : (
        ""
      )}
    </button>
  );
};
