import { FaPlayCircle } from "react-icons/fa";
import { Button } from "../../../components/buttons/button";
import { businessCard, recommednedDetail } from "../../../database";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { serviceProgressUpdateDetail } from "../../../database";
import { GoDotFill, GoTriangleDown } from "react-icons/go";

const BusinessDetail = () => {
  return (
    <>
    <section className="pb-10">
      <div className="flex flex-col pt-10 gap-4 ">
        <div className="flex justify-between gap-4 ">
          <p className="flex items-center gap-4 font-semibold text-2xl text-[#0A1C40] ">
            <Link>
              <span>
                <IoIosArrowRoundBack size={30} />
              </span>
            </Link>
            Business Detail
          </p>
          <div className="flex gap-2 items-center">
            <Button />
            <Link>
              {" "}
              <span className="font-semibold text-lg">View All</span>
            </Link>
          </div>
        </div>
        <div className="flex gap-2">
          <img
            src="../../../../public/images/businessig.svg"
            width={180}
            alt=""
          />
          <div>
            <div className="flex gap-2 items-center pt-5">
              <div className="flex gap-1 items-center">
                <img
                  src="../../../public/images/critical-icon.svg "
                  width={20}
                  alt=""
                />
                <p className="font-bold  text-base  text-[#FF3B3B]">CRITICAL</p>
              </div>
            </div>
            <p className="font-semibold text-4xl text-[#171717]">Fastbrigade</p>
            <p className="font-semibold text-lg text-[#343C6A]">Business #4</p>
          </div>
        </div>
        <div>
          <div className="flex flex-col text-start gap-1 w-[40%]">
            <div className="flex justify-between">
              <p className="font-medium text-base text-[#000000B2] ">Type:</p>
              <p className="font-semibold text-base text-black">NBFC</p>
            </div>
            <div className="flex justify-between">
              <p className="font-medium text-base text-[#000000B2] ">
                Registered Office:
              </p>
              <p className="font-semibold text-base text-black">
                Noida, Uttar Pradesh, IN 201301{" "}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-medium text-base text-[#000000B2] ">
                Company Status:
              </p>
              <p className="font-semibold text-base text-black">Active </p>
            </div>
            <div className="flex justify-between">
              <p className="font-medium text-base text-[#000000B2] ">
                Company Age:{" "}
              </p>
              <p className="font-semibold text-base text-black">4y 11m </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col  gap-1 w-[40%]">
          <p className="font-semibold text-2xl text-[#171717] ">
            Contact Detail
          </p>
          <div className="flex justify-between">
            <p className="font-medium text-base text-[#000000B2] ">PhoneNo:</p>
            <p className="font-semibold text-base text-black">9113098768</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-base text-[#000000B2]">Email Id::</p>
            <p className="font-semibold text-base text-black">
              Fastbrigade@gmail.com
            </p>
          </div>
        </div>
        <div>
          <div className="pt-10">
            <div className="flex justify-between gap-4 pb-4">
              <p className="flex items-center font-semibold gap-4 text-2xl text-[#0A1C40] ">
                Your Service Progress Updates{" "}
                <span>
                  <FaPlayCircle size={20} />
                </span>
              </p>
              <p className="font-semibold text-lg text-[#606060]">View All</p>
            </div>
            {serviceProgressUpdateDetail.length > 0 ? (
              <div className="grid grid-rows-1 gap-4">
                {serviceProgressUpdateDetail.map((data, index) => (
                  <div
                    key={index}
                    className="flex justify-between bg-[#F8FAFF] px-4 py-2  rounded-md"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex  gap-2">
                        {" "}
                        <img src="../../../public/images/settings.png" alt="" />
                        <p className="font-bold text-2xl">{data.name} </p>
                        <img
                          src="../../../public/images/errors.png"
                          width={15}
                          alt=""
                        />
                      </div>
                      <div className="flex gap-2">
                        <p className="font-normal text-sm ">{data.detail1} </p>
                        <p className="font-normal text-sm ">{data.detail2} </p>
                      </div>
                    </div>
                    <div className="flex gap-2 ">
                      <p className="flex items-center h-8  px-2 py-1 rounded-full font-semibold text-[#037847] bg-[#03784728]">
                        <GoDotFill />
                        On Time
                      </p>
                      <GoTriangleDown size={30} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center gap-2 items-center flex-col h-[80vh]">
                <img
                  src="../../../public/images/service-prgress.svg  "
                  alt=""
                />
                <p className="font-bold  text-xl text-[#000000] ">
                  No Services{" "}
                </p>
                <p className="font-normal text-[#797979]">
                  Create a Business to add your Service{" "}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      </section>
    </>
  );
};

export default BusinessDetail;
