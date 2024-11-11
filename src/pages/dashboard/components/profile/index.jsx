import { Link } from "react-router-dom";

export const Profile = () => {

  return (
    <div className="px-4 py-2 w-fit flex gap-2 bg-white border items-center border-[#DFEAF2] rounded-2xl">
      <div className="relative">
        <img
          className="w-12 h-12 rounded-full object-cover object-top border-4 p-1 "
          src="../../../public/images/insight-1.jfif"
          alt=""
        />
        <p className="absolute inset-0 rounded-full border-8 border-[#FFD700] border-t-0 border-l-0  "></p>
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
