import { Controller, useForm } from "react-hook-form";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { Input } from "../../../components/inputs";
import { Button } from "../../../components/buttons/button";
import { FaPlus } from "react-icons/fa";

const MakeAPayment = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm({
    // resolver: yupResolver(signinValidator),
    mode: "onChange",
  });
  return (
    <>
      <div>
        <p className="flex items-center py-6 gap-4 font-semibold text-2xl text-[#0A1C40] ">
          <Link>
            <span>
              <IoIosArrowRoundBack size={30} />
            </span>
          </Link>
          Make a Payment{" "}
        </p>
        <div className="flex sm:mt-6 gap-4 mt-2">
          <div className="w-[60%]">
            <p className="font-medium text-[20px]  text-[#000000]">
              Add Coupon Code
            </p>
            <div className="flex flex-row items-center gap-2 mt-2">
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    // label={"Email"}
                    type={"email"}
                    placeholder={"Email Id / Phone No."}
                    className={"border-[#D9D9D9] border"}
                    errorContent={errors?.email?.message}
                    onBlur={() => handleBlur("email")}
                  />
                )}
                // rules={{ required: "Email Address is required" }}
              />
              <div>
                <FaPlus size={25} color="#abaaaa" className="bg-[#D9D9D9] px-1 py-1 rounded-full"/>
              </div>{" "}
            </div>
          </div>
          <div className="w-[40%] mt-9 flex flex-col px-4 py-3 border rounded gap-3 border-[#C6C6C6]">
            <p className="text-xs font-semibold text-center text-[#525252] ">
              Select your preferred payment method to proceed with the document
              review and startup assistance process. You'll have the opportunity
              to review and make changes to your order before finalizing it
            </p>
            <hr />
            <div className="flex flex-col w-[70%]">
              <p className="text-lg font-semibold text-[#0A1C40] pb-4">
                Final Price
              </p>
              <div className="flex justify-between">
                <p className="text-base font-semibold text-[#525252]">Fees</p>
                <p className="text-base font-semibold text-[#525252]">₹4,999</p>
              </div>
              <div className="flex justify-between">
                <p className="text-base font-semibold text-[#525252]">
                  Service Charge
                </p>
                <p className="text-base font-semibold text-[#525252]">₹4,99</p>
              </div>
              <div className="flex justify-between">
                <p className="text-base font-semibold text-[#525252]">
                  Applied Coupons
                </p>
                <p className="text-base font-semibold text-[#525252]">___ __</p>
              </div>
            </div>
            <hr />
            <div className="flex justify-between">
              <p className="font-semibold text-xl text-[#029126]">
                {" "}
                Total Price
              </p>
              <p className="font-semibold text-xl text-[#029126]"> ₹7,999</p>
            </div>
            <hr />
            <p className="font-semibold text-base text-[#0A1C40]">
              Savings Amount: ₹ 1,999{" "}
            </p>
            <div className="flex justify-center items-center ">
              {" "}
              <Button primary={true}> Continue</Button>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MakeAPayment;
