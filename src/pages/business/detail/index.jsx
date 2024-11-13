import { Button } from "../../../components/buttons/button";
import { IoIosArrowRoundBack, IoMdAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { ServicesProgress } from "../../dashboard/components/services/progress";
import { servicesProgress } from "../../../database";

const BusinessDetail = () => {
  return (
    <>
      <section className="pb-10">
        <div className="flex flex-col pt-10 gap-4 ">
          <div className="flex justify-between gap-4 ">
            <div className="flex items-center gap-4 font-semibold text-xl text-[#0A1C40]">
              <Link to={-1}>
                <span>
                  <IoIosArrowRoundBack size={30} />
                </span>
              </Link>
              <p>Business Detail</p>
              <span>
                <img src="/icons/dashboard/take-a-tour.svg" alt="" />
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <Button primary={true} leftIcon={<IoMdAddCircle />}>
                New Business
              </Button>
              <Button primary={true}>Edit</Button>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <img
              src="../../../../public/images/businessig.svg"
              width={125}
              alt=""
            />
            <div>
              <div className="flex gap-2 items-center">
                <div className="flex gap-1 items-center">
                  <img
                    src="../../../public/images/critical-icon.svg "
                    width={20}
                    alt=""
                  />
                  <p className="font-bold text-xs text-[#FF3B3B]">CRITICAL</p>
                </div>
              </div>
              <h3 className="font-semibold text-2xl text-[#171717]">
                Fastbrigade
              </h3>
              <p className="font-semibold text-base text-[#343C6A]">
                Business #4
              </p>
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
          <div className="flex flex-col gap-1 w-[40%]">
            <p className="font-semibold text-lg text-[#171717] ">
              Contact Detail
            </p>
            <div className="flex justify-between">
              <p className="font-medium text-base text-[#000000B2] ">
                PhoneNo:
              </p>
              <p className="font-semibold text-base text-black">9113098768</p>
            </div>
            <div className="flex justify-between">
              <p className="font-medium text-base text-[#000000B2]">
                Email Id::
              </p>
              <p className="font-semibold text-base text-black">
                Fastbrigade@gmail.com
              </p>
            </div>
          </div>

          {/* Service Progress */}
          <ServicesProgress data={servicesProgress}/>
        </div>
      </section>
    </>
  );
};

export default BusinessDetail;
