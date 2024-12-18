import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../../../components/buttons";
import { Rating } from "../../../../../components/rating";
import { useNavigate, useParams } from "react-router-dom";

export const Details = ({
  pricing = true,
  data,
  serviceId,
  handleRequest,
  isLoading,
  stateWiseServiceCharge,
  offer,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {subscriptionId} = useParams()
  // const navigateToService = () => {
  //   navigate(`/payment/${serviceId}`);
  // };

  const { success, serviceDetailLoading, quotationDetails } = useSelector(
    (state) => state.serviceDetails
  );

  // Safely retrieve data
  const subscriptionAmount =
   quotationDetails?.[0]?.amount|| success?.subscription?.[0]?.amount || data?.cost || 0;

  const discountPercent =
    success?.offerservices?.[0]?.offers?.[0]?.discountPercent || offer || 0;

  const discountedPrice =
    discountPercent > 0
      ? (
        Number(subscriptionAmount) -
        (Number(subscriptionAmount) * discountPercent) / 100
      ).toFixed(2)
      : Number(subscriptionAmount).toFixed(2);

  // const { id: serviceId } = useParams();

  const subscription = success?.subscription[0] || null

  const navigateToService = () => {
    if(subscription){
      console.log(success?.subscription?.[0], "success?.subscription?.[0]")
      // navigate(`/payment/${serviceId}/${data?._id}?paymentType=subscription`);
      navigate(`/payment/${serviceId}/${subscription._id}?paymentType=subscription`);
    }else{
      navigate(`/payment/${serviceId}?paymentType=regular`);
    }
  };
  return (
    <section className="flex flex-col gap-2">
      <div className="flex flex-col text-start gap-2">
        <p className="font-semibold text-3xl uppercase text-[#0A1C40]">
          {data?.name}
        </p>
        <p className="font-medium text-sm text-[#0A1C40]">{data?.details}</p>
      </div>
      <div className="pt-4 flex flex-col md:flex-row items-center gap-4">
        {!pricing && (
          <div className="w-full md:w-3/5 flex flex-col gap-6">
            <h3 className="font-semibold text-3xl uppercase">
              your business, your price
            </h3>
            <div>
              <p className="font-medium">
                Select your state to view the applicable govt. fees*
              </p>
              <p className="text-sm">
                *Subject to fluctuation at the time of application
              </p>
            </div>
            <Button
              className={"w-fit px-6 py-1.5 !font-semibold !rounded"}
              primary={true}
            >
              Talk to our Advisors
            </Button>
          </div>
        )}
        <div
          style={{
            backgroundImage: `url(/images/services/service-dummy.svg)`,
          }}
          className="w-full min-h-[420px] md:w-3/5 rounded-3xl bg-no-repeat bg-cover"
        ></div>
        {pricing && (
          <div className="w-full md:w-2/5 bg-[#EEEFF3] box-sg rounded-lg px-5 py-6 gap-2 flex flex-col">
            <div>
              {serviceDetailLoading ? (
                "Loading..."
              ) : (
                <div className="font-extrabold text-2xl text-[#0A1C40] flex gap-2">
                  ₹ {subscriptionAmount}
                  {discountPercent > 0 && (
                    <p className="font-medium rounded-full text-[12px] text-[#15580B] bg-[#B5FFBC] px-2">
                      {discountPercent} %
                    </p>
                  )}
                </div>
              )}
              {stateWiseServiceCharge && (
                <p className="text-xs text-[#0A1C40]">
                  {stateWiseServiceCharge} + Applicable govt. fees
                </p>
              )}
            </div>
            <div className="py-2">
              <p className="font-bold text-base text-[#0A1C40]">
                What’s Included
              </p>
              <p className="text-[11px] text-[#0A1C40]">{data?.about}</p>
            </div>
            <div className="py-2">
              <p className="font-bold text-xs text-[#0A1C40]">
                Service Details{" "}
              </p>
              {/* <p className="text-[10px]">
                Guaranteed submission in 3 working days or your money back. T&C
                Apply
              </p> */}
              {
                <p className="text-[11px] text-[#0A1C40]">{data?.details}</p>
              }
            </div>
            <div className="py-4 flex justify-between items-center">
              {data?.rating && (
                <div className="flex flex-col gap-1">
                  <p className="font-extrabold text-xl text-[#0A1C40]">{data?.rating}/5</p>
                  <Rating rating={data?.rating} />
                  <p className="text-[11px]">Based on 102 reviews</p>
                </div>
              )}
              <div className="flex flex-col">
                <div className="flex items-end font-medium text-[13px] text-[#0A1C40]">
                  <strong className="text-lg leading-6">
                    {data?.duration}
                  </strong>
                  <span>Months</span>
                </div>
                <p className="text-xs text-[#0A1C40]">Estimated Time</p>
              </div>
            </div>
            <div className="pt-2 flex justify-between items-center gap-2">
              <Button
                onClick={navigateToService}
                className={"text-xs px-2 py-1 rounded-sm"}
                outline={true}
              >
                Avail services
              </Button>
              <Button
                isLoading={isLoading}
                onClick={handleRequest}
                className={"text-xs px-2 py-1 rounded-sm"}
                primary={true}
              >
                Talk to our Advisors
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
