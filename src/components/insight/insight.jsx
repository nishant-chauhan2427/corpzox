import { insightBlog } from "../../database/index";

const Insight = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center pb-2">
          <p className="font-semibold text-[16px] text-[#004BBC]">Insights</p>
          <p className="font-semibold text-xs text-[#828282]">View All</p>
        </div>
        <div className="h-[0.5px] bg-gradient-to-r from-[#E0E1E2] via-[#E0E1E2] to-[#E0E1E2]"></div>
        {insightBlog.map((blog, index) => (
          <div
            key={index}
            className="flex gap-2 pt-2 rounded-lg  hover:shadow-lg  "
          >
            <div
              className={`w-[40%] bg-[url(${blog.image})] rounded-lg bg-cover overflow-hidden`}
            ></div>
            <div className="flex w-[60%] flex-col gap-1">
              <div className="flex ">
                <p className="font-normal  rounded-[4px] text-[6px] text-white bg-[#F1359C] px-2 py-1 ">
                  3 min read
                </p>
              </div>
              <p className="font-bold text-[12px]  text-[#1A202E]">
                {blog.title}
              </p>
              <p className="font-normal text-[8px] text-[#737373]">
                {blog.description}
              </p>
              <hr />
              <div className="flex gap-2 items-center pt-2">
                <div className="flex">
                  <img
                    src="/images/insights/Avatar.svg"
                    className="w-6 h-6 rounded-full"
                    alt="Author Avatar"
                  />
                </div>
                <div>
                  <p className="font-semibold text-[7px] text-[#495367]">
                    Rahul Mahto
                  </p>
                  <p className="font-normal text-[6px] text-[#96A2BE]">
                    Posted Job Now
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Insight;
