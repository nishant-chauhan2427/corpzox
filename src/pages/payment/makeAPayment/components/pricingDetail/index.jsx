import React from "react";
import { useSelector } from "react-redux";

const PricingDetail = ({totalCost, offer,serviceCost,totalSavings,data,originalPrice,availServiceData, serviceCharge}) => {
  console.log( availServiceData, "from componenet")
  const { success, serviceDetailLoading, appliedCoupons, couponDiscount } = useSelector(
    (state) => state.serviceDetails
  );

  console.log(appliedCoupons , "appliedCoupons")
  // Safely retrieve data
  const subscriptionAmount =
    success?.subscription?.[0]?.amount || data?.cost || 0;

  const discountPercent =
    success?.offerservices?.[0]?.offers?.[0]?.discountPercent || offer || 0;

  const discountedPrice =
    discountPercent > 0
      ? (
          Number(subscriptionAmount) -
          (Number(subscriptionAmount) * discountPercent) / 100
        ).toFixed(2)
      : Number(subscriptionAmount).toFixed(2);
  return (
    <>
      <div className="flex flex-col gap-3 ">
        <p className="text-xs font-semibold text-center text-[#525252]">
          Select your preferred payment method to proceed with the document
          review and startup assistance process. You'll have the opportunity to
          review and make changes to your order before finalizing it
        </p>
        <hr />
        <div className="flex flex-col ">
          <p className="text-lg font-semibold text-[#0A1C40] pb-4">
            Final Price
          </p>
          <div className="flex justify-between">
            <p className="text-base font-semibold text-[#525252]">Service Price</p>
            <p className="text-base font-semibold  text-[#525252]">₹{originalPrice}</p>
          </div>
          
          {/* {<div className="flex justify-between">
            <p className="text-base font-semibold text-[#525252]">
              Applied Coupons
            </p>
            <p className="text-base font-semibold text-[#525252]">₹{originalPrice - totalCost}</p>
          </div>} */}
          {/* {discountPercent > 0 ? (
            <div className="flex justify-between">
              <p className="text-base font-semibold text-[#525252]">
                Applied Offer
              </p>
              <p className="text-base font-semibold text-[#525252]">
                ₹
                {originalPrice - totalCost}
              </p>
            </div>
          ) : appliedCoupons?.length > 0 ? (
            <div className="flex justify-between">
              <p className="text-base font-semibold text-[#525252]">
                Applied Coupon
              </p>
              <p className="text-base font-semibold text-[#525252]">
             
                ₹  {(originalPrice * appliedCoupons[0].cost) / 100}
              </p>
            </div>
          ) : (
            null
          )} */}
           {discountPercent > 0 && (
            <div className="flex justify-between">
              <p className="text-base font-semibold text-[#525252]">
                Applied Offer
              </p>
              <p className="text-base font-semibold text-[#525252]">
                ₹{offer.toFixed(2)}
              </p>
            </div>
          )}

          {appliedCoupons?.length > 0 && (
            <div className="flex justify-between">
              <p className="text-base font-semibold text-[#525252]">
                Applied Coupon
              </p>
              <p className="text-base font-semibold text-[#525252]">
                ₹{couponDiscount.toFixed(2)}
              </p>
            </div>
          )}
          {appliedCoupons.length == 0 && discountPercent === 0 && null}
        </div>
        <hr />
        <div className="flex justify-between">
          <p className="font-semibold text-xl text-[#029126]">Total Price</p>
          <p className="font-semibold text-xl text-[#029126]">₹{totalCost.toFixed(2)}</p>
        </div>
        <hr />
        {/* <p className="font-semibold text-base text-[#0A1C40]">
          Savings Amount: ₹{totalSavings}
        </p> */}
      </div>
    </>
  );
};

export default PricingDetail;