import { Link } from "react-router-dom";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const Profile = () => {
  const calculatePercentage = (data) => {
    try {
      const totalProperties = Object.keys(data[0])?.length; // Total number of properties

      const nonNullProperties = Object.keys(data[0]).filter(
        (key) => data[0][key] !== null
      ).length;

      if (totalProperties === 0) {
        throw new Error("No properties found in the data.");
      }

      const percentage = (nonNullProperties / totalProperties) * 100;

      return percentage.toFixed(2); // Return percentage rounded to 2 decimal places
    } catch (error) {
      console.error("Error calculating percentage:", error.message);
      return null; // Return null if there's an error
    }
  };

  const calculateOverallPercentage = (...percentages) => {
    if (percentages.length === 0) return 0;

    const totalPercentage = percentages.reduce(
      (sum, percentage) => sum + percentage,
      0
    );
    const overallPercentage = totalPercentage / percentages.length;
    return overallPercentage.toFixed(2);
  };

  let basicPercentage = 0;
  let financePercentage = 0;

  // if (resumeData && skillData && data && certificationDataAll && userInfo) {
  //   basicPercentage = calculatePercentage(resumeData);
  //   financePercentage = calculatePercentage(skillData);
  // }
  let overallPercentage = calculateOverallPercentage(
    +basicPercentage,
    +financePercentage
  );
  return (
    <div className="px-4 py-2 w-fit flex gap-2 bg-white border items-center border-[#DFEAF2] rounded-2xl">
      <div className="w-16 relative">
        <CircularProgressbarWithChildren
          styles={buildStyles({
            textColor: "red",
            pathColor: "turquoise",
            trailColor: "gray",
          })}
          value={overallPercentage > 0 ? overallPercentage : 60}
        >
          <div className="w-12 h-12 rounded-full">
            <img
              className="w-12 h-12 inset-0 rounded-full ltr:absolute ltr:top-1/2 ltr:left-1/2 ltr:-translate-y-1/2 rtl:-translate-y-[31%] ltr:-translate-x-1/2"
              src="/images/insight-1.jfif"
              alt="profile-pic"
            />
          </div>
          {/* <div className="absolute bottom-4 right-2 text-xs p-1 bg-bee-secondary opacity-80 rounded-xl">
            <strong>{Math.floor(overallPercentage)}%</strong>
          </div> */}
        </CircularProgressbarWithChildren>
      </div>
      
      <div>
        <p className="font-bold text-2xl">45%</p>
        <p className="font-semibold text-sm text-[#232323]">Mehul</p>
        <Link className="font-semibold text-[10px] text-[#FF4141]">
          Complete Your Profile
        </Link>
      </div>
    </div>
  );
};
