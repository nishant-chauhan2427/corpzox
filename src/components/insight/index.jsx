import { Link } from "react-router-dom";
import { insightBlog } from "../../database/index";

export const Insight = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center ">
          <p className="font-semibold text-[16px] text-[#004BBC]">Insights</p>
          <Link className="font-medium text-xs text-[#828282]" to={"/Insight"}>
            View All
          </Link>
          {/* <Link className="font-medium text-xs text-[#828282]">View All</Link> */}
        </div>
        <div className="h-[1px] bg-gradient-to-r rounded-lg from-[#E0E1E2] via-[#E0E1E2] to-[#E0E1E2]"></div>
        {insightBlog.map((blog, index) => (
          <div
            key={index}
            className="flex gap-2 px-2 py-2 bg-[#EEEFF3] rounded-lg  hover:shadow-lg  "
          >
            <div
              style={{ backgroundImage: `url(${blog.image})` }}
              className={`w-[40%] rounded-lg bg-cover overflow-hidden`}
            ></div>
            <div className="flex w-[60%] flex-col gap-1">
              <div className="flex ">
                {/* <p className="font-normal rounded-[4px] text-[10px] text-white bg-[#F1359C] px-2 py-1 ">
                  {blog.time}
                </p> */}
              </div>
              <p className="font-semibold text-[13px]  text-[#1A202E]">
                {blog.title}
              </p>
              <p className="font-normal text-[12px] text-[#737373]">
                {blog.description}
              </p>

              <div className="flex flex-col pt-2">
                <p className="font-medium text-[11px] text-[#495367]">
                  Anupriya Banger
                </p>
                <p className="font-medium text-[9px] text-[#96A2BE]">
                  Posted Job Now
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
