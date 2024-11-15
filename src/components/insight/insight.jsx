import { insightBlog } from "../../database/index";

const Insight = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center pb-2">
          <p className="font-semibold text-2xl text-[#004BBC]">Insights</p>
          <p className="font-semibold text-xs text-[#828282]">View All</p>
        </div>
        <hr />
        {insightBlog.map((blog, index) => (
          <div key={index} className="flex gap-2 pt-2">
            <div>
              <img
                src="/images/insights/insight-dummy.svg"
                alt="Insight Image"
                className="rounded h-full w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="py-1 px-2 w-[40%] bg-[#F1359C] contain-inline-size rounded text-white font-normal text-[10px]">
                3 min read
              </p>
              <p className="font-bold text-[18px] leading-5 text-[#1A202E]">
                {blog.title}
              </p>
              <p className="font-normal text-xs text-[#737373]">
                {blog.description}
              </p>
              <hr />
              <div className="flex gap-2">
                <div className="flex">
                  <img
                    src="/images/insights/insight-dummy.svg"
                    className="w-8 h-8 rounded-full"
                    alt="Author Avatar"
                  />
                </div>
                <div>
                  <p className="font-semibold text-xs text-[#495367]">
                    Rahul Mahto
                  </p>
                  <p className="font-normal text-[10px] text-[#96A2BE]">
                    Posted Job Now
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className="flex justify-between items-center pb-2">
          <p className="font-semibold text-2xl text-[#004BBC]">Offers</p>
          <p className="font-semibold text-xs text-[#828282]">View All</p>
        </div>
        <hr />
        {insightBlog.map((blog, index) => (
          <div key={index} className="flex gap-2 pt-2">
            <div>
              <img
                src="/images/insights/insight-dummy.svg"
                alt="Insight Image"
                className="rounded h-full w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[16px] leading-5 text-[#1A202E]">
                {blog.title}
              </p>
              <p className="font-normal text-[16px] text-[#0A1C40]">
                {blog.description}
              </p>
              <hr />
            </div>
            {/* <div>
                <p>₹49,999</p>
                <big>₹1,999 <small>+ Applicable govt. fees</small> </big>
            </div> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default Insight;
