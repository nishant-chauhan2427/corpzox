import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";

export const Input = ({
  name,
  type,
  value,
  label,
  onBlur,
  touched,
  onChange,
  className,
  placeholder,
  infoContent,
  errorContent,
  autoComplete,
  leftIcon,
  rightIcon,
  labelIcon,
  disabled,
  required,
  containerClassName,
  labelClassName,
  ...props
}) => {
  const [passwordType, setPasswordType] = useState("password");
  const [updatedInfoContent, setUpdatedInfoContent] = useState(infoContent);

  const viewPassword = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const handleChange = (e) => {
    // Prevent more than one space consecutively
    let newValue;
    if (e.target.name === "password") {
      newValue = e.target.value.replace(/\s/g, "");
    } else {
      newValue = e.target.value.replace(/\s{2,}/g, " ");
    }
    e.target.value = newValue;
    onChange(e);
  };

  useEffect(() => {
    if (label) {
      setUpdatedInfoContent(label);
    }
  }, [label]);

  return (
    <div className={`${containerClassName} relative`}>
      <div className="w-full flex flex-col">
        <div className="flex items-center">
          {/* <label
            className={`${
              required &&
              "after:content-['*'] after:text-red-500 after:absolute after:-top-1"
            } text-black text-sm dark:text-white`}
          >
            {label}
          </label> */}
          {/* {updatedInfoContent && (
            <IoInformationCircleOutline
              className="text-primary text-[10px] focus:outline-none absolute right-2 top-4 z-40 "
              data-tooltip-id="my-tooltip"
              data-tooltip-content={updatedInfoContent}
            />
          )} */}
        </div>
        <div className="w-full relative ">
          <input
            {...props}
            className={`${className} ${
              errorContent && touched ? "border-error" : "border-[#D9D9D9]"
            } w-full text-black placeholder:text-[#9A9A9A] placeholder:font-normal placeholder:text-sm p-3 bg-white disabled:bg-gray-200 focus:border- h-12 dark:text-white  shadow-sm block text-sm text-bee-black dark:text-bee-white bg-bee-paleGray dark:bg-bee-ebonyGem border-1  appearance-none dark:border-bee-primary dark:focus:border-bee-primary focus:outline-none focus:border-bee-primary peer border-[#D9D9D9] border rounded-[10px] `}
            type={type === "password" ? passwordType : type}
            id={label}
            placeholder={""}
            value={value}
            onChange={handleChange}
            name={name}
            onBlur={onBlur}
            autoComplete={autoComplete}
            disabled={disabled}
          />
          <label
            for={label}
            className={`${leftIcon ? "mx-3" : "px-2"} ${
              leftIcon ? "flex justify-center items-center px-2.5" : "px-2"
            } 
            ${
              required &&
              "after:content-['*'] after:text-red-500 after:absolute after:-top-1"
            } absolute -translate-y-4 scale-75 top-2 origin-[0] rounded-lg text-sm text-gray-400 dark:text-gray-400 duration-300 transform bg-white dark:bg-gray-950 peer-focus:px-2 peer-focus:text-bee-primary peer-focus:dark:text-bee-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3 +${labelClassName}`}
          >
            <span className="mr-2">{labelIcon}</span>
            {label}
          </label>

          {type === "password" && (
            <button
              type="button"
              onClick={viewPassword}
              className={`${
                errorContent ? "right-8" : "right-4"
              } absolute top-1/2 -translate-y-1/2`}
              // ${
              //   errorContent ? "right-10" : "right-4"
              // }
            >
              {passwordType === "password" ? (
                <FaEye className="text-[#858585]" />
              ) : (
                <FaEyeSlash className="text-[#858585]" />
              )}
            </button>
          )}
          {errorContent && (
            <p className="absolute top-1/2 -translate-y-1/2 right-2">
              <img src="/validation-icon.svg" alt="" />
            </p>
          )}
        </div>
      </div>
      <div className="h-1 mb-2">
        {errorContent && (
          <div className="absolute -top-4 right-8 bg-[#F9F9F9] rounded-[3px] px-3 py-2 mb-3">
            <p className=" text-[#FF3B3B] font-medium  text-[10px]">
              {errorContent}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
