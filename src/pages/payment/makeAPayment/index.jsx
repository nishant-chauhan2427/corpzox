import { Controller, useForm } from "react-hook-form";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { Input } from "../../../components/inputs";

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
        <div className="flex sm:mt-10 mt-2">
          <div className="w-[40%]">
            <p className="font-medium text-[20px]  text-[#000000]">
              Add Coupon Code
            </p>
            <div className="grid grid-cols-1 mt-2">
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
              <img src="plus.svg" alt="" />
            </div>
          </div>
          <div className="w-[60%] ">
            <h1>jus</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default MakeAPayment;
