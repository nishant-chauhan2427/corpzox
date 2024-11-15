import { Controller, useForm } from "react-hook-form";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { Input } from "../../../components/inputs";
import { Button } from "../../../components/buttons/button";
import { FaPlus } from "react-icons/fa";
import { ReactModal } from "../../../components/modal/";
import { CheckOffer } from "../../../database/";
import { ImCross } from "react-icons/im";
import { useState } from "react";
import PricingDetail from "./components/pricingDetail";

const MakeAPayment = () => {
  const [couponApplied, setCouponApplied] = useState(false);
  const [showAddIcon, setShowAddIcon] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm({
    mode: "onChange",
  });

  const handleApplyCoupon = () => {
    setCouponApplied(true); // Apply the coupon
    setShowAddIcon(false); // Hide the add icon after applying coupon
    setModalOpen(false); // Close the modal after applying coupon
  };

  const handleRemoveCoupon = () => {
    setCouponApplied(false);
    setShowAddIcon(!showAddIcon);
  };
  return (
    <>
      <div>
        <p className="flex items-center py-6 gap-4 font-semibold text-2xl text-[#0A1C40">
          <Link>
            <span>
              <IoIosArrowRoundBack size={30} />
            </span>
          </Link>
          Make a Payment
        </p>
        <div className="flex sm:flex-row flex-col sm:mt-6 gap-4 mt-2">
          <div className="sm:w-[60%] sm:pr-[50px]">
            <p className="font-medium text-[20px] text-[#000000]">
              Add Coupon Code
            </p>
            <div className=" flex flex-row justify-between items-center gap-2 mt-2">
              {couponApplied ? (
                <div className="flex gap-4 items-center">
                  <p className="text-sm bg-[#34C759] pl-4 pr-20 py-6 font-medium text-white rounded">
                    20% Off Coupon | Corpzo’s Rewards Program
                  </p>
                  <ImCross
                    size={35}
                    color="#abaaaa"
                    className="bg-[#D9D9D9] px-2 py-2 rounded-full cursor-pointer"
                    onClick={handleRemoveCoupon}
                  />
                </div>
              ) : (
                <Controller
                  name="coupon"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      {...field}
                      type={"Coupon"}
                      placeholder={"Add Coupon Code"}
                      containerClassName={"w-full"}
                      className={"border-[#D9D9D9] border"}
                      errorContent={errors?.email?.message}
                    />
                  )}
                />
              )}
              <div>
                <ReactModal
                  isOpen={modalOpen}
                  onRequestClose={() => setModalOpen(false)}
                  button={
                    showAddIcon && (
                      <FaPlus
                        size={25}
                        color="#abaaaa"
                        className="bg-[#D9D9D9] px-1 py-1 rounded-full"
                      />
                    )
                  }
                >
                  <div className="text-start">
                    <p className="text-2xl pl-3 text-[#232323] font-semibold">
                      All Coupons
                    </p>
                    <p className="font-medium pl-3 text-sm pb-2 text-[#595959]">
                      Check all offers!
                    </p>

                    <div className="h-[60vh] overflow-y-scroll">
                      {CheckOffer.map((data, index) => (
                        <div
                          key={index}
                          className="flex flex-row sm:flex-row gap-4 bg-white m-4 rounded-sm"
                        >
                          <p className="text-xl text-center flex justify-center items-center px-3 py-2 font-semibold bg-[#007AFF26] text-[#272727]">
                            {data.off}
                          </p>
                          <div className="py-3 flex flex-col gap-1">
                            <p className="font-medium text-[#080808] text-lg">
                              {data.tittle}
                            </p>
                            <p className="font-normal text-xs text-[#4D4D4D]">
                              {data.description}
                            </p>
                            <Link className="underline text-[#5E63FF] font-normal text-sm">
                              More
                            </Link>
                          </div>
                          <div className="flex flex-col gap-1 text-center items-center px-2 justify-center">
                            <Button primary={true} onClick={handleApplyCoupon}>
                              Apply
                            </Button>

                            <p className="flex font-medium text-sm text-[#000000]">
                              <img
                                src="../../../../public/images/payment/coupon.svg"
                                alt=""
                              />
                              Coupon Applicable
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ReactModal>
              </div>
            </div>
          </div>
          <div className="sm:w-[40%] mb-2 sm:mt-9 flex flex-col px-4 py-3 border rounded gap-3 border-[#C6C6C6]">
            <PricingDetail />

            <div className="flex justify-center items-center pt-4 px-4 gap-2 ">
              {/* <Button primary={true}>Continue</Button> */}
              <ReactModal
                className="border-[#FF3B3B] border-[3px] py-2 "
                button={<Button primary={true}>Continue</Button>}
              >
                <div className="flex flex-col text-center gap-2 py-5 items-center">
                  <img
                    src="../../../../public/images/payment/payment-failed-icon.svg"
                    alt=""
                    width={100}
                  />
                  <p className="text-3xl font-bold text-[#0A1C40]">
                    Payment Failed
                  </p>
                  <p className="font-medium text-lg text-[#595959]">
                    The registration failed due to incomplete or non-compliant
                    documentation
                  </p>
                  <Button className="w-[50%] py-2" primary={true}>
                    {" "}
                    Try Again{" "}
                  </Button>
                </div>
              </ReactModal>
              <ReactModal
                className="border-[#FF3B3B] border-[3px] px-4 py-2 "
                button={<Button primary={true}>Continue</Button>}
              >
                <div className="flex flex-col text-center gap-2 py-5 items-center">
                  <img
                    src="../../../../public/images/payment/payment-done.svg"
                    alt=""
                    width={100}
                  />
                  <p className="text-3xl font-bold text-[#0A1C40]">
                    Payment Done!{" "}
                  </p>
                  <p className="font-medium text-lg text-[#595959]">
                    Thank you for availing this service.
                  </p>
                  <Button primary={true} className="w-full py-2">
                    {" "}
                    Try Again{" "}
                  </Button>
                </div>
              </ReactModal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MakeAPayment;
