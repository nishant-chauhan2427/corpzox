import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <section>
        {/* Card */}
        <div className="my-2 flex gap-4">
          <div className="px-4 py-2 w-fit flex gap-2 bg-white border border-[#DFEAF2] rounded-2xl">
            <img className="w-12 h-12 rounded-full bg-red-500" src="" alt="" />
            <div>
              <p className="font-bold text-2xl">45%</p>
              <p className="font-semibold text-sm">Mehul</p>
              <Link className="font-bold text-[10px] text-[#FF4141]">Complete Your Profile</Link>
            </div>
          </div>
          <div className="px-4 py-2 w-fit flex gap-2 bg-white border border-[#DFEAF2] rounded-2xl">
            <img className="w-12 h-12 rounded-full bg-red-500" src="" alt="" />
            <div>
              <p className="font-semibold text-[10px] text-[#FF4141]">Account Manager</p>
              <p className="font-semibold text-lg text-[#232323]">Ashutosh Gupta</p>
              <div>
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
