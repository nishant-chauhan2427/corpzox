import { createSlice, current } from "@reduxjs/toolkit";
import { getServiceDetails, getStates, getStateWiseServiceCharge, talkToAdvisor, verifyCoupon, paymentStatus, availService } from "../actions/servicesDetails-actions";
import toast from "react-hot-toast";
import { act } from "react";
// Slice
const serviceDetailSlice = createSlice({
  name: "serviceDetails",
  initialState: {
    serviceDetailLoading: false,
    isStateLoading: false,
    error: null,
    success: {},
    subscription: [],
    cost: 0,
    statesList: [],
    stateWiseServiceCharge: {},
    isCouponVerifiedLoading: false,
    appliedCoupons: [],
    originalPrice: null,
    coupons: [],
    serviceCharge: 0,
    serviceTestimonials: [],
    isTalkToAdvisorLoading: false,
    averageRating: null,
    quotationDetails: [],
    isQuotationAvailable: false,
    serviceCost: 0,
    availServiceData: {},
    isServiceAvailing: false,
    isPaymentLoading: false,
    isPaymentSuccessful: false,
    totalSavings: 0,
    isQuotationAvailable: false,
    subscriptionId: "",
  },
  reducers: {
    clearState: (state) => {
      state.serviceDetailLoading = false;
      state.error = null;
      state.success = null;
    },
    stePaymentDetails: (state, action) => {
      const { subscriptionCost, stateWiseServiceCharge, totalCost } = action.payload;
      console.log(action.payload)
      state.cost = totalCost;
      state.serviceCost = subscriptionCost
      state.serviceCharge = stateWiseServiceCharge

    },
    addCoupons: (state, action) => {
      const couponData = action.payload;
      console.log(couponData, "couponData");

      // Ensure payload is valid
      if (!couponData) {
        console.error("Invalid coupon data:", couponData);
        return;
      }

      // Ensure state.appliedCoupons is an array
      if (!Array.isArray(state.appliedCoupons)) {
        console.error("appliedCoupons is not an array:", state.appliedCoupons);
        state.appliedCoupons = [];
      }

      const isAlreadyAdded = state.appliedCoupons.some(coupon => coupon.id === couponData.id);
      if (isAlreadyAdded) {
        console.warn(`Coupon with id ${couponData.id} is already applied.`);
        return;
      }

      // Add the coupon at the start of the array
      state.appliedCoupons.unshift(couponData);
    },

    removeCoupon: (state, action) => {
      const { id } = action.payload;
      console.log(current(state.appliedCoupons), id);

      // Find the coupon that needs to be removed
      const couponToRemove = state.appliedCoupons.find((coupon) => coupon.couponId === id);

      // If coupon is not found, just return
      if (!couponToRemove) {
        console.warn("Coupon not found for removal.");
        return;
      }

      // Remove the coupon from appliedCoupons
      state.appliedCoupons = state.appliedCoupons.filter((coupon) => coupon.couponId !== id);

      // Restore the cost to the original price and remove the discount
      let discount = 0;
      if (couponToRemove && couponToRemove.cost && state.originalPrice) {
        discount = (state.originalPrice * couponToRemove.cost) / 100;
      }

      // Add the discount back to the cost to revert to the original price
      state.cost = state.originalPrice; // Restore to the original price
      state.totalSavings = state.totalSavings - discount;
      console.log(`Removed coupon with id ${id}. Discount of ${discount} removed. New cost: ${state.cost}`);
    }


  },
  extraReducers: (builder) => {
    builder
      .addCase(getServiceDetails.pending, (state) => {
        state.serviceDetailLoading = true;
        state.error = null;
        state.success = null;
      })
      //       .addCase(getServiceDetails.fulfilled, (state, action) => {
      //         // toast.success(action.payload.message)
      //         console.log(action.payload, 'service details')
      //         state.serviceDetailLoading = false;
      //         state.success = action.payload;
      //         state.subscription = action.payload.subscription
      //         state.coupons = action.payload.coupons
      //         state.error = null;
      //         state.serviceTestimonials = action.payload.servicetestimonials;

      //         if (!state.cost && action.payload.cost) {
      //           state.cost = action.payload.cost;
      //         }
      //         if (state.serviceCharge) {
      //           state.cost = state.serviceCharge + state.subscription[0].amount
      //         }

      //         console.log(state.serviceCharge, "totalCost")
      //         state.averageRating = action.payload.averageRating
      //         state.quotationDetails = action.payload.quotations
      // console.log(action.payload.quotations.length, "action.payload.quotations.length")
      //         if (action.payload.quotations.length > 0) {
      //           state.isQuotationAvailable = true;
      //         }else{
      //           state.isQuotationAvailable = false; 
      //         }
      //         console.log(state.subscription, "service ")
      //         console.log(action.payload.offerservices[0]?.offers, "offers hehehe")

      //         // if(action.payload.offerservices && action.payload.offerservices.length > 0 ){
      //         //   state.subscription = state.action.payload.offerservices.map((subscription)=>{
      //         //     return {
      //         //       title : subscription.offers[0]?.offerTitle, 
      //         //       amount : subscription.offers[0]?.amount ? subscription.amount : action.payload.subscription[0].amount, 
      //         //       description : subscription.offers[0]?.offerDetail,
      //         //     }
      //         //   })
      //         // }
      //         console.log(action.payload.offerservices[0]?.offers[0]?.discountPercent, "action.payload.offerservices[0].offers[0].discountPercent");
      //         if (action.payload.offerservices[0]?.offers.length > 0) {
      //           const discount = action.payload.offerservices[0]?.offers[0]?.discountPercent; // Get the discount value
      //           state.subscription = state.subscription.map((item) => {
      //               return {
      //                   ...item, // Preserve existing properties
      //                   amount: item.amount - (item.amount * discount) / 100, // Apply the discount to update amount
      //               };
      //           });
      //       }

      //         if (action.payload.quotations && action.payload.quotations.length > 0) {
      //           state.isQuotationAvailable = true
      //           state.cost = action.payload.quotations[0].amount
      //         }
      //         state.availServiceData = {
      //           serviceId: action.payload._id,
      //           formId: action.payload.formId,
      //           serviceDetails: {
      //             name: action.payload.name,
      //             cost: action.payload.cost,
      //             duration: action.payload.duration
      //           },
      //           paymentMode: "Net Banking",
      //           paymentStatus: "PENDING",
      //           paymentDate: Date.now(),
      //         }
      //         state.quotationId = action.payload.quotationId;
      //         state.formId = action.payload.formId
      //       })
      .addCase(getServiceDetails.fulfilled, (state, action) => {
        console.log(action.payload, 'service details');
        state.serviceDetailLoading = false;
        state.success = action.payload;
        state.subscription = action.payload.subscription;
        state.coupons = action.payload.coupons;
        state.error = null;
        // state.serviceTestimonials = action.payload.servicetestimonials;
        // const originalAmount = action.payload.subscription && action.payload.subscription[0]
        //   ? action.payload.subscription[0].amount
        //   : action.payload.amount;

        // state.originalPrice = originalAmount;
        const selectedSubscription = action.payload.subscription?.find(
          (sub) => sub._id === localStorage.getItem("subscriptionId")
        );

        // Set the original amount if a subscription is found, else use the amount in the object
        const initialAmount = selectedSubscription ? selectedSubscription.amount : action.payload.cost;

        state.originalPrice = initialAmount;
        if (!state.cost && action.payload.cost) {
          state.cost = action.payload.cost;
        }

        // if (state.serviceCharge) {
        //   state.cost = state.serviceCharge + state.subscription[0].amount;
        // }

        console.log(state.serviceCharge, "totalCost");
        state.averageRating = action.payload.averageRating;
        state.quotationDetails = action.payload.quotations;

        if (action.payload.quotations.length > 0) {
          state.isQuotationAvailable = true;
        } else {
          state.isQuotationAvailable = false;
        }

        console.log(action.payload.quotations.length, "action.payload.quotations.length");
        console.log(state.subscription, "service");

        // Check if there are offers and apply the discount
        // if (action.payload.offerservices[0]?.offers.length > 0) {
        //   const discount = action.payload.offerservices[0]?.offers[0]?.discountPercent;
        //   state.subscription = state.subscription.map((item) => ({
        //     ...item,
        //     amount: item.amount - (item.amount * discount) / 100,
        //   }));
        // }

        // Check if a quotation is available and set cost
        if (action.payload.quotations && action.payload.quotations.length > 0) {
          state.isQuotationAvailable = true;
          state.cost = action.payload.quotations[0].amount;
          state.originalPrice =  action.payload.quotations[0].amount;
        }

        // Calculate the final price using the reusable function
        const finalPrice = calculateFinalPrice(
          [action.payload], // Wrap payload in an array to match function expectations
          localStorage.getItem("subscriptionId") // Use the first subscription ID or adjust as needed
        );

        if (finalPrice) {
          state.cost = parseFloat(finalPrice); // Update state cost with final price
        }

        state.availServiceData = {
          serviceId: action.payload._id,
          formId: action.payload.formId,
          ...(action.payload.quotations[0]?._id && { quotationId: action.payload.quotations[0]?._id }), // Conditionally add quotationId
          serviceDetails: {
            name: action.payload.name,
            cost: action.payload.cost,
            duration: action.payload.duration,
          },
          amount: action.payload.cost,
          paymentMode: "Net Banking",
          paymentStatus: "PENDING",
          paymentDate: Date.now(),
          totalCouponDiscount : 0
        };
        state.quotationId = action.payload.quotationId;
        state.formId = action.payload.formId;
      })

      .addCase(getServiceDetails.rejected, (state, action) => {
        state.serviceDetailLoading = false;
        state.error = action.payload;
        state.success = null;
        console.log(action.payload, "rejected")
      })
      .addCase(getStates.pending, (state) => {
        state.isStateLoading = true;
        state.error = null;
        state.statesList = null;
      })
      .addCase(getStates.fulfilled, (state, action) => {
        state.isStateLoading = false;
        console.log(action.payload, "statesList")
        state.statesList = action.payload;
        console.log(action.payload, "slce")
        state.error = null;
        state.cost = action.payload.cost
      })
      .addCase(getStates.rejected, (state, action) => {
        state.isStateLoading = false;
        state.error = action.payload;
        state.statesList = null;
      })
      .addCase(getStateWiseServiceCharge.pending, (state) => {
        state.isStateLoading = true;
        state.error = null;
        state.stateWiseServiceCharge = null;
      })
      .addCase(getStateWiseServiceCharge.fulfilled, (state, action) => {
        state.isStateLoading = false;

        console.log(action.payload, "action state wise")
        const { estimatedTotal } = action.payload;


        state.subscription = state.subscription.map((subscription) => ({
          ...subscription,
          stateWiseServiceCharge: estimatedTotal,
        }));


        state.stateWiseServiceCharge = action.payload;
        state.error = null;
        state.cost = action.payload.cost;

        console.log(state.subscription, "Updated subscription with service charge");
      })

      .addCase(getStateWiseServiceCharge.rejected, (state, action) => {
        state.isStateLoading = false;
        state.error = action.payload;
        state.stateWiseServiceCharge = null;
      })
      .addCase(verifyCoupon.pending, (state) => {
        state.isCouponVerifiedLoading = true;
      })
      .addCase(verifyCoupon.fulfilled, (state, action) => {
        state.isCouponVerifiedLoading = false;
        console.log(action.payload, "success full addition")
        const couponData = action.payload
        console.log(couponData, "couponData");

        if (!couponData) {
          console.error("Invalid coupon data:", couponData);
          return;
        }


        if (!Array.isArray(state.appliedCoupons)) {
          console.error("appliedCoupons is not an array:", state.appliedCoupons);
          state.appliedCoupons = [];
        }

        const isAlreadyAdded = state.appliedCoupons.some(coupon => coupon.couponId === couponData.couponId);
        if (isAlreadyAdded) {
          console.warn(`Coupon with id ${couponData.couponId} is already applied.`);
          return;
        }

        state.appliedCoupons.unshift(couponData);
        state.originalPrice = state.cost

        state.tempCost = state.cost;
        let discount = 0
        if (couponData.cost && state.cost) {
          discount = (state.tempCost * couponData.cost / 100);
          state.cost = state.tempCost - discount;
          console.log(`Discount of ${discount} applied. New cost: ${state.cost}`);
        }
        state.totalSavings = state.totalSavings + discount;
        state.coupons = state.coupons.filter((coupon) => coupon._id !== couponData.couponId);
        console.log(state.coupons, "applied coupon")

        state.availServiceData = {
          ...state.availServiceData,
          totalCouponDiscount: couponData.cost,
          appliedCoupan: [{
            couponId: couponData.couponId,
            amount: state.cost, discountType: "percentage", usage: "Multi Use", couponDiscount: couponData.cost
          }] // Use the updated cost after applying the discount
        };
        console.log(
          "Updated availServiceData with coupon ID and cost:",
          state.availServiceData
        );
      })
      .addCase(verifyCoupon.rejected, (state, action) => {
        state.isCouponVerifiedLoading = false;
        state.error = action.payload;

      })
      .addCase(talkToAdvisor.pending, (state) => {
        state.isTalkToAdvisorLoading = true;
      })
      .addCase(talkToAdvisor.fulfilled, (state, action) => {
        state.isTalkToAdvisorLoading = false;
        console.log(action.payload, "talk to")
        toast.success(action.payload.message)

      })
      .addCase(talkToAdvisor.rejected, (state, action) => {
        state.isTalkToAdvisorLoading = false;
        toast.error(action.payload)
        console.log(action.payload, "rejected")
      })
      .addCase(availService.pending, (state) => {
        state.isServiceAvailing = true;
      })
      .addCase(availService.fulfilled, (state, action) => {
        state.isServiceAvailing = false;
        console.log(action.payload, "talk to")
        toast.success(action.payload.message)

      })
      .addCase(availService.rejected, (state, action) => {
        state.isServiceAvailing = false;
        toast.error(action.payload)
        console.log(action.payload, "rejected")
      })
      .addCase(paymentStatus.pending, (state) => {
        state.isServiceAvailing = true;
      })
      .addCase(paymentStatus.fulfilled, (state, action) => {
        state.isServiceAvailing = false;
        console.log(action.payload, "talk to")
        state.isPaymentSuccessful = true

      })
      .addCase(paymentStatus.rejected, (state, action) => {
        state.isServiceAvailing = false;
        toast.error(action.payload)
        state.isPaymentSuccessful = false
        console.log(action.payload, "rejected")
      })
  },
});
function calculateFinalPrice(data, subscriptionId) {
  // Check if data is available
  if (!data || !data.length) {
    console.error("Invalid data");
    return null;
  }

  // Find the subscription based on the provided subscriptionId
  const subscription = data[0]?.subscription?.find(sub => sub._id === subscriptionId);
  if (!subscription) {
    console.error("Subscription ID not found");
    return null;
  }

  let finalPrice = subscription.amount;

  // Find any offers for the service
  const offer = data[0]?.offerservices?.[0]?.offers?.[0];
  if (offer) {
    // Apply discount percentage if available
    if (offer.discountPercent) {
      finalPrice = finalPrice - (finalPrice * (offer.discountPercent / 100));
    }

    // Apply direct discount amount if available
    if (offer.discountPrice) {
      finalPrice = finalPrice - offer.discountPrice;
    }
  }

  // Save the final price to localStorage
  localStorage.setItem("finalPrice", finalPrice.toFixed(2)); // Save with 2 decimal places for precision
  console.log(`Final price calculated and saved: ${finalPrice.toFixed(2)}`);
  return finalPrice.toFixed(2);
}

// Example Usage:
const serviceData = {
  data: [ /* Paste your JSON data here */]
};

export const { clearState, addCoupons, removeCoupon, stePaymentDetails } = serviceDetailSlice.actions;
export default serviceDetailSlice.reducer;