import React from "react";

const PricingDetail = ({totalCost, serviceCost,totalSavings,availServiceData, discountCost, serviceCharge}) => {
  console.log( availServiceData, "from componenet")
  
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
            <p className="text-base font-semibold text-[#525252]">Fees</p>
            <p className="text-base font-semibold  text-[#525252]">₹{serviceCost}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-base font-semibold text-[#525252]">
              Service Charge
            </p>
            <p className="text-base font-semibold text-[#525252]">₹{serviceCharge}</p>
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
          <p className="font-semibold text-xl text-[#029126]">Total Price</p>
          <p className="font-semibold text-xl text-[#029126]">₹{totalCost}</p>
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
