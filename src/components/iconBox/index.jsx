import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowForward, IoIosArrowRoundForward } from "react-icons/io";
import { iconSize } from "../../utils";

export const IconBox = ({
  to,
  icon,
  child,
  title,
  setPin,
  onClick,
  collapse,
}) => {
  const [dropdown, setDropdown] = useState(false);
  const { pathname } = useLocation();

  // Handle toggle of  dropdown
  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  useEffect(() => {
    if (child && child.some((data) => pathname.startsWith(data.to))) {
      setDropdown(true);
    } else {
      setDropdown(false);
    }
  }, [pathname, child]);

  // Function to check if pathname is inside array

  const isPathnameInArray = (pathname, array) => {
    return array?.some((item) => item.to === pathname);
  };

  const isPathnameInArrayResult = isPathnameInArray(pathname, child);

  // 

  return (
    <>
      {to ? (
        <Link
          to={to}
          className={`px-2 py-3 ${
            pathname.includes(to) && "bg-[#FFD700] shadow-lg"
          } hover:bg-[#FFEF9A] hover:shadow-lg rounded-md flex items-center gap-3 text-black group transition-all duration-300 ease-in-out hover:transition-all hover:duration-300 hover:ease-in-out`}
          onClick={onClick}
        >
          {/* <img className={`w-5`} src="/icons/home.svg" alt="" /> */}
          {/* <SVG className="stroke-icon" iconId={icon} /> */}
          <span
            className={`${
              pathname.includes(to) ? "text-black" : "dark:text-white"
            } `}
          >
            {icon && icon}
          </span>
          {title && (
            <span
              className={`${
                pathname.includes(to)
                ? "font-semibold text-black" : "dark:text-white"
              } text-sm group-hover:font-semibold transition-all duration-300 ease-in-out group-hover:transition-all group-hover:duration-300 group-hover:ease-in-out whitespace-nowrap`}
            >
              {title}
            </span>
          )}
        </Link>
      ) : (
        <button
          onClick={handleDropdown}
          className={`${
            dropdown && "bg-[#FFD700] dark:bg-[#FFD700]"
          } w-full px-2 py-2.5 flex items-center justify-between gap-2 `}
        >
          <p className="flex gap-4 dark:text-white">
            {/* <img className="w-5" src={icon} alt="" /> */}
            {/* <SVG className="stroke-icon" iconId={icon} /> */}
            <span
              className={`${
                isPathnameInArrayResult
                  ? "text-primaryBg dark:text-white"
                  : "text-black dark:text-white"
              }`}
            >
              {icon && icon}
            </span>
            {title && (
              <span
                className={`${
                  isPathnameInArrayResult
                    ? "text-primaryText dark:text-white"
                    : "dark:text-white"
                } text-base`}
              >
                {title}
              </span>
            )}
          </p>
          {!collapse && (
            <span className="flex items-center gap-2">
              <IoIosArrowForward
                className={`${dropdown && "rotate-90"} ${
                  isPathnameInArrayResult
                    ? "text-primaryText"
                    : "dark:text-white"
                }`}
              />
              {/* <button onClick={setPin}>
                <SVG className="stroke-icon dark:text-white" iconId="Pin" />
              </button> */}
              {/* <MdOutlinePushPin /> */}
            </span>
          )}
        </button>
      )}
      {!collapse && (
        <>
          {dropdown && (
            <>
              {child && (
                <>
                  <ul className="mt-2.5 ">
                    {child.map((data, index) => (
                      <li className="px-4 list-none ">
                        <Link
                          to={data.to}
                          key={index}
                          className={`py-1 pl-2 pr-1 rounded-xl flex items-center gap-2 `}
                        >
                          <span className="flex items-center gap-2 ">
                            <IoIosArrowRoundForward
                              className={`${
                                pathname == data.to
                                  ? "fill-primaryText"
                                  : "fill-black dark:fill-white "
                              }`}
                              size={iconSize}
                            />
                            {/* <SVG className="svg-menu" iconId="right-3" /> */}
                            {/* {data.icon && data.icon} */}
                            {data.title && (
                              <span
                                className={`${
                                  pathname == data.to
                                    ? "text-primaryText "
                                    : "text-black dark:text-white"
                                } text-sm  `}
                              >
                                {data.title}
                              </span>
                            )}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};
