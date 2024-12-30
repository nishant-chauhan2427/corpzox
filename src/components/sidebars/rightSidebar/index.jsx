import { Insight } from "../../insight";
import { Offers } from "../../offers";

export const RightSidebar = ({ className }) => {
  return (
    <div className={`${className} py-4`}>
      <Offers />
      {/* <Insight /> */}
    </div>
  );
};