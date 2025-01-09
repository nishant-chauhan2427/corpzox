import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../../../components/buttons/button";
import { Selector } from "../../../../../components/select";
import {
  getStates,
  getStateWiseServiceCharge,
} from "../../../../../redux/actions/servicesDetails-actions";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { stePaymentDetails } from "../../../../../redux/slices/serviceDetailsSlice";
import { formatMillisecondsToDate } from "../../../../../utils";

export const Pricing = ({ pricing = true, data, serviceId, offer }) => {
  const [isInitialDispatchMade, setIsInitialDispatchMade] = useState(false);
  const { subscription, quotationDetails, success } = useSelector(
    (state) => state.serviceDetails
  );
const discountType = success?.offerservices?.[0]?.offers?.[0]?.discountType;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { statesList } = useSelector((state) => state.serviceDetails);
  const formattedStates = statesList?.map((state) => {
    const { _id, name } = state;
    const capitalizeLabel = name?.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
    return {
      label: capitalizeLabel,
      value: name,
      id: _id,
    };
  });


  const handleStateChange = (data) => {
    dispatch(
      getStateWiseServiceCharge({ serviceId: serviceId, stateId: data.id })
    );
  };
  useEffect(() => {
    dispatch(getStates());
  }, []);
  useEffect(() => {
    if (!isInitialDispatchMade && formattedStates?.length > 0) {
      dispatch(
        getStateWiseServiceCharge({
          serviceId,
          stateId: "673b78c549d60c83fdaeb136",
        })
      );
      setIsInitialDispatchMade(true);
    }
  }, [dispatch, formattedStates, serviceId, isInitialDispatchMade]);

  const defaultObject = {
    label: formattedStates ? formattedStates[0]?.label : "",
    id: formattedStates ? formattedStates[0]?.id : ""
  }
  
  return (
    <section>
      <div className="flex flex-col gap-4">
        <h4 className="font-bold uppercase text-[20px] text-[#0A1C40]">
          your business, your price
        </h4>
        {pricing && (
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex sm:w-[50%] flex-col gap-1">
              <p className="font-medium text-sm txt-[#0A1C40]">
                Select your state to view the applicable govt. fees*
              </p>
              <p className="text-xs font-normal text-[#0A1C40]">
                *Subject to fluctuate at the time of application
              </p>
            </div>
            <div className="sm:w-[50%]">
            <Selector
              defaultValue={defaultObject}
              isSearchable={true}
              className={"lg:min-w-60 "}
              placeholder={"Select State"}
              options={formattedStates}
              onChange={handleStateChange}
            />
            </div>
          </div>
        )}
        {pricing ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {subscription?.map((data, index) => (
              <PricingCard
                key={index}
                data={data}
                serviceId={serviceId}
                navigate={navigate}
                dispatch={dispatch}
                offer={offer}
                discountType={discountType}
              />
            ))}
          </div>
        ) : (
          <>
            <Selector
              defaultValue={defaultObject}
              isSearchable={true}
              className={"lg:min-w-60"}
              placeholder={"Select State"}
              options={formattedStates}
              onChange={handleStateChange}
            />
            {quotationDetails?.map((data, index) => (
              <QuotationCard
                serviceId={serviceId}
                key={index}
                navigate={navigate}
                quotation={data}
                dispatch={dispatch}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

const PricingCard = ({ data, serviceId, navigate, dispatch, offer, discountType }) => {
  console.log(offer, "subscription data");
  const handleServicePayment = (cost, stateWiseServiceCharge) => {
    navigate(`/payment/${serviceId}/${data?._id}?paymentType=subscription`);
    // dispatch(
    //   stePaymentDetails({ subscriptionCost: cost + stateWiseServiceCharge ? stateWiseServiceCharge : 0, stateWiseServiceCharge })
    // );
    dispatch(stePaymentDetails({
      subscriptionCost: cost,
      totalCost: cost + (stateWiseServiceCharge || 0),

    }))
    localStorage.setItem("subscriptionId", data?._id)
  };
  return (
    <div className="w-full flex gap-10 justify-center">
      <div className="w-full flex flex-col gap-2 drop-shadow-lg hover:drop-shadow-2xl bg-white px-5 py-6">
        <div>
          <div className="flex font-bold  gap-2 text-[#0A1C40] text-[22px] ">
            {/* {data?.amount} */}
            {offer && <p className="flex items-center justify-center  font-medium rounded-full text-[12px] text-white bg-[#28A745] px-2  ">
              {offer} {discountType && discountType === "fixed" ? "₹" : "%"}
            </p>}
          </div>
          <p className="font-semibold text-xs text-[#038624]">
            {data?.stateWiseServiceCharge
              ? ` ${data?.stateWiseServiceCharge} + applicable govt. fees`
              : `--`}
          </p>
        </div>
        <p className="pt-4 font-bold uppercase text-sm text-[#565657]">
          {data.title}
        </p>
        <div>
          <p className="font-bold text-xs text-[#565657]">Fast Application</p>
          <p className="text-[10px] font-normal text-[#525252]">
            Application within 5 working days or your money back.
          </p>
        </div>
        {data.includes && (
          <div>
            <p className="font-bold text-xs text-[#565657]">Includes:</p>
            <div className="py-2 flex flex-col gap-1 font-medium text-[11px]">
              {data.includes && data?.includes.map((data) => IconLabel(data))}
              2 x DIN and Digital Signatures
            </div>
          </div>
        )}
        <div className="pt-6 flex justify-center items-center">
          <Button
            onClick={() =>
              handleServicePayment(data.amount, data.stateWiseServiceCharge)
            }
            className={"w-fit px-4 py-1 !font-normal"}
            primary={true}
          >
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
};

const IconLabel = (label) => {
  return (
    <div className="flex items-center gap-2">
      <img src="/images/services/pricing-correct.svg" alt="" />
      <p className="font-medium text-[11px] text-[#525252]">{label}</p>
    </div>
  );
};

const QuotationCard = ({ quotation, serviceId, dispatch, navigate }) => {
  const handleServicePayment = (cost, stateWiseServiceCharge) => {
    dispatch(
      stePaymentDetails({ subscriptionCost: cost, stateWiseServiceCharge: stateWiseServiceCharge })
    );
    console.log(quotation, "Quotation hai yaha")
    navigate(`/payment/${serviceId}/${quotation._id}?paymentType=quotation`);
  };
  return (
    <div className="m-6 p-10 border rounded-lg bg-white shadow-md hover:shadow-lg">
      <p className="pt-2 font-bold uppercase text-sm text-[#565657]">
        {(quotation?.quotationTitle)}
      </p>
      <p className="text-sm text-gray-600 mb-2">
        <strong>Date:</strong>{" "}
        {formatMillisecondsToDate(quotation?.quotationDate)}
      </p>
      <p className="text-sm text-gray-600 mb-2">
        <strong>Reference Number:</strong> {quotation?.quotationId}
      </p>
      {/* <h3 className="text-lg font-semibold text-gray-800 mb-4">{`Quotation - ${quotation.service}`}</h3> */}
      <p className="text-gray-700 mb-4">{quotation?.message}</p>
      <div className="text-lg font-semibold text-gray-800 mb-1">{`Plan Price: ${quotation?.amount}`}</div>
      <p className="font-semibold text-xs text-[#038624] mb-6">
        {quotation?.stateWiseServiceCharge
          ? ` ${quotation?.stateWiseServiceCharge} + applicable govt. fees`
          : `--`}
      </p>
      <Button
        onClick={() => handleServicePayment(quotation?.amount)}
        primary={true}
        className="py-2 px-6 rounded !font-medium"
      >
        Avail Service
      </Button>
    </div>
  );
};
