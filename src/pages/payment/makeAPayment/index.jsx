import { Controller, useForm } from "react-hook-form";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { Input } from "../../../components/inputs";
import { Button } from "../../../components/buttons/button";
import { FaPlus } from "react-icons/fa";
import { ReactModal } from "../../../components/modal/";
import { CheckOffer } from "../../../database/";
import { ImCross } from "react-icons/im";
import { useEffect, useState } from "react";
import PricingDetail from "./components/pricingDetail";
import { Heading } from "../../../components/heading";
import { DebitCard } from "../makeAPayment/components/debitCard";
import { UPI } from "../makeAPayment/components/upi";
import { NetBanking } from "./components/netBanking";
import { useDispatch, useSelector } from "react-redux";
import { availService, getServiceDetails, talkToAdvisor, verifyCoupon } from "../../../redux/actions/servicesDetails-actions";
import { addCoupons, removeCoupon } from "../../../redux/slices/serviceDetailsSlice";
import { ConfirmationModal } from "../../../components/modal/confirmationModal";
import { PricingDetailShimmer } from "../../../components/loader/PricingDetailShimmer";
import { RouteProgressBar } from "../../../components/progressBar/routeBased";

const MakeAPayment = () => {
  const dispatch = useDispatch()
  const { serviceId } = useParams();
  const [couponApplied, setCouponApplied] = useState(false);
  const [showAddIcon, setShowAddIcon] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [activePaymentTab, setActivePaymentTab] = useState("Card");
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [failureModal, setFailureModal] = useState(false);

const navigate = useNavigate()

  const [currentStep, setCurrentStep] = useState(0);
  const { success,serviceDetailLoading,isCouponVerifiedLoading,quotationDetails, cost,originalPrice, appliedCoupons, coupons, availServiceData, isServiceAvailing, totalSavings, serviceCost, serviceCharge } = useSelector((state) => state.serviceDetails);
  console.log(quotationDetails, "cost from slice ")
  useEffect(() => {
    // PASS DYNAMIC ID HERE
    dispatch(getServiceDetails({ serviceId: serviceId }));
    console.log("called")
  }, [dispatch])

  const transformedCouponArray = coupons[0]?.map((item) => {
    const { couponTitle, discount, _id } = item;
    return {
      id: _id,
      title: couponTitle,
      // description : offerDetail, 
      off: discount
    };
  });
  console.log(transformedCouponArray, "transformedCouponArray")
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm({
    mode: "onChange",
  });

  const handleApplyCoupon = ({ id, offerCost, title }) => {
    console.log(id, offerCost, "data id")
    // setCouponsApplied([...couponsApplied, { id, offerCost }]);
    dispatch(verifyCoupon({ couponId: id, cost: offerCost, title }))

    setCouponApplied(true);
    setShowAddIcon(false);
    setModalOpen(false);
  };

  const handleRemoveCoupon = (id) => {
    dispatch(removeCoupon({ id }))
    setCouponApplied(false);
    setShowAddIcon(!showAddIcon);
  };

  useEffect(() => {
    if (!isCouponVerifiedLoading) {
      setModalOpen(false);
    }
  }, [isCouponVerifiedLoading]);
  const PaymentTabs = [
    { id: "Card", icon: "/icons/payment/debit.svg", label: "Card" },
    { id: "UPI", icon: "/icons/payment/upi.svg", label: "UPI" },
    {
      id: "NetBanking",
      icon: "/icons/payment/netbanking.svg",
      label: "Net Banking",
    },
  ];

  const availTheService = () => {
    // if(isServiceAvailing === false){
    //   onConfirmationModalClose()
    // }
    const userData = { ...availServiceData }
    console.log("userdata",userData);
    
    dispatch(availService({userData , navigate}))
  }

  const onConfirmationModalClose = () => {
    setConfirmationModal(!confirmationModal);
  };
  const onFailureModalClose = () => {
    setFailureModal(!failureModal);
  };

  return (
    <>
      {/* <div className="w-full h-2 bg-gray-200 mb-4 rounded-full">
        <div
          className="h-2 bg-blue-500 rounded-full"
          style={{
            width: `${(currentStep / (steps.length - 1)) * 100}%`,
          }}
        ></div>
      </div> */}
      <div>
      <RouteProgressBar currStep={1} totalSteps={3} />
        <div>
          <p className="font-medium text-[20px] text-[#000000] pb-4">
            Select a Method
          </p>
          <div className="flex gap-4 items-center sm:w-[80%]">
            {PaymentTabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => setActivePaymentTab(tab.id)}
                className={`px-3 py-2 rounded-md w-full cursor-pointer ${activePaymentTab === tab.id ? "bg-[#FFD700]" : "bg-[#D9D9D9]"
                  }`}
              >
                <img src={tab.icon} alt={tab.label} />
                <p
                  className={`font-semibold text-[13px] ${activePaymentTab === tab.id
                    ? "text-[#0A1C40]"
                    : "text-gray-600"
                    }`}
                >
                  {tab.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex sm:flex-row flex-col *:gap-4 pt-4">
          <div className="sm:w-[60%] flex  flex-col gap-8">
            <div className="sm:w-[90%]">
              {activePaymentTab === "Card" && (
                <DebitCard control={control} errors={errors} />
              )}
              {activePaymentTab === "UPI" && (
                <UPI control={control} errors={errors} />
              )}
              {activePaymentTab === "NetBanking" && (
                <NetBanking control={control} errors={errors} />
              )}
            </div>

            { !quotationDetails.length > 0 && coupons && coupons?.length > 0 && <div className="sm:w-[70%] pb-5 pt-4">
              <p className="font-normal text-[13px] pb-2 text-[#4F5B76]">
                Coupon Code
              </p>
              <div className=" flex flex-row justify-between items-center gap-2 ">
                {appliedCoupons.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {appliedCoupons.map((coupon, index) => (
                      <div key={coupon.id || index} className="flex !w-full gap-4 items-center">
                        <p className="text-sm bg-[#34C759] pl-4 pr-20 py-6 font-medium text-white rounded">
                          {coupon.cost}% {coupon.title}
                        </p>
                        <ImCross
                          size={35}
                          color="#abaaaa"
                          className="bg-[#D9D9D9] px-2 py-2 rounded-full cursor-pointer"
                          onClick={() => handleRemoveCoupon(coupon.couponId)}
                        />
                      </div>
                    ))}
                  </div>

                  // {

                  // }
                  // <div className="flex !w-full gap-4 items-center">
                  //   <p className="text-sm bg-[#34C759] pl-4 pr-20 py-6 font-medium text-white rounded">
                  //     40% Off Coupon | Corpzo’s Rewards Program
                  //   </p>
                  //   <ImCross
                  //     size={35}
                  //     color="#abaaaa"
                  //     className="bg-[#D9D9D9] px-2 py-2 rounded-full cursor-pointer"
                  //     onClick={handleRemoveCoupon}
                  //   />
                  // </div>
                ) : (
                  <Controller
                    name="coupon"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        {...field}
                        type={"Coupon"}
                        label={"Add Coupon Code"}
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
                    crossButton={true}
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
                      <NavLink to={"/offersDetails"} className="font-medium pl-3 text-sm pb-2 text-[#595959]">
                        Check all offers!
                      </NavLink>
                      <div className="h-[60vh] overflow-y-scroll">
                        {transformedCouponArray?.map((data, index) => (
                          <div
                            key={index}
                            className="flex flex-row  sm:flex-row gap-4 bg-white m-4 rounded-sm"
                          >
                            <p className="text-xl text-center flex justify-cener items-center px-3 py-2 font-semibold bg-[#007AFF26] text-[#272727]">
                             % {data.off}
                            </p>
                            <div className="py-3 flex flex-col gap-1">
                              <p className="font-medium text-[#080808] text-lg">
                                {data.title}
                              </p>
                              <p className="font-normal text-xs text-[#4D4D4D]">
                                {data.description}
                              </p>
                              {/* <Link className="underline text-[#5E63FF] font-normal text-sm">
                                More
                              </Link> */}
                            </div>
                            <div className="flex flex-col gap-1 text-center items-center px-2 justify-center">
                              <Button
                                primary={true}
                                isLoading={isServiceAvailing}
                                onClick={() => handleApplyCoupon({ id: data.id, offerCost: data.off, title: data.title })}
                              >
                                Apply
                              </Button>

                              {/* <p className="flex font-medium text-sm text-[#000000]">
                                <img src="/images/payment/coupon.svg" alt="" />
                                Coupon Applicable
                              </p> */}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ReactModal>
                </div>
              </div>
            </div>}
          </div>
          <div className="sm:w-[40%] mb-2 sm:mt-9 flex flex-col px-4 py-3 border rounded gap-3 border-[#C6C6C6]">
            {serviceDetailLoading ? <PricingDetailShimmer/> : <PricingDetail totalCost={cost} originalPrice={originalPrice} availServiceData={availServiceData} totalSavings={totalSavings} serviceCost={serviceCost} serviceCharge={serviceCharge} data={success}/>}
            <div className="flex justify-center items-center pt-4 px-4 gap-2 ">
              <Button isLoading={isServiceAvailing} onClick={availTheService} primary={true}>Continue</Button>
            </div>
          </div>
        </div>
      </div>
      <ConfirmationModal isOpen={failureModal} onClose={onFailureModalClose}>
        <div className="flex flex-col text-center gap-2 py-5 px-5 items-center">
          <img
            src="/images/payment/payment-failed-icon.svg"
            alt=""
            width={100}
          />
          <p className="text-3xl font-bold text-[#0A1C40]">Failed</p>
          <p className="font-medium text-[16px] text-[#595959]">
            The registration failed due to incomplete <br /> or
            non-compliant documentation
          </p>
          <Button className="w-full py-2" primary={true}>
            {" "}
            Try Again{" "}
          </Button>
        </div>
      </ConfirmationModal>
      <ConfirmationModal isOpen={confirmationModal}
        onClose={onConfirmationModalClose}>
        <div className="flex flex-col text-center gap-2 px-5 py-5 items-center">
          <img
            src="/images/payment/payment-done.svg"
            alt=""
            width={100}
          />
          <p className="text-3xl font-bold text-[#0A1C40]">
            Payment Done!{" "}
          </p>
          <p className="font-medium text-[16px] text-[#595959]">
            Thank you for availing this service.
          </p>
          <Button primary={true} className="w-full py-2">
            {" "}
            Try Again{" "}
          </Button>
        </div>
      </ConfirmationModal>
    </>
  );
};

export default MakeAPayment;