import React from "react";

const PricingDetail = () => {
  return (
    <>
      <div className="flex flex-col px-4 py-3 gap-3 ">
        <p className="text-xs font-semibold text-center text-[#525252]">
          Select your preferred payment method to proceed with the document
          review and startup assistance process. You'll have the opportunity to
          review and make changes to your order before finalizing it
        </p>
        <hr />
        <div className="flex flex-col w-[80%]">
          <p className="text-lg font-semibold text-[#0A1C40] pb-4">
            Final Price
          </p>
          <div className="flex justify-between">
            <p className="text-base font-semibold text-[#525252]">Fees</p>
            <p className="text-base font-semibold  text-[#525252]">₹4,999</p>
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
          <p className="font-semibold text-xl text-[#029126]">Total Price</p>
          <p className="font-semibold text-xl text-[#029126]">₹7,999</p>
        </div>
        <hr />
        <p className="font-semibold text-base text-[#0A1C40]">
          Savings Amount: ₹1,999
        </p>
      </div>
    </>
  );
};

export default PricingDetail;
