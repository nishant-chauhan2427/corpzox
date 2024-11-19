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
      className={`${className ? className : "px-8 py-2"}
      ${disabled || (isLoading && "!bg-[#ADADAD] hover:bg-slate-500 rounded")} ${simpleLink &&
        !disabled &&
        !isLoading &&
        "text-primaryText font-medium  hover:text-gray-700 rounded"
        } ${outline && !disabled && !isLoading && "text-primaryText rounded border border-button-border-color dark:border-gray-700"} ${primary &&
        !disabled &&
        !isLoading &&
        "bg-[#FFD700] font-semibold text-black hover:bg-[#FFD700] hover:bg-opacity-80 rounded-[10px]"
        } ${gradientBtn &&
        !disabled &&
        !isLoading &&
        "bg-gradient-to-r from-primaryBg to-secondaryBg text-white hover:bg-opacity-80 px-7 hover:bg-gradient-to-l rounded"
        } flex justify-center items-center gap-2 transition-all duration-300 ease-in-out hover:transition-all hover:duration-300 hover:ease-in-out disabled:cursor-not-allowed disabled:border-gray-400`}
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
