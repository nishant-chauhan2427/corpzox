import { Heading } from "../../../components/heading";
import { LinkButton } from "../../../components/link";
import { Steps } from "./components/steps";
import { Details } from "./components/details";
import { Pricing } from "./components/pricing";
import { Features } from "./components/features";
import { Advisor } from "./components/advisor";
import { Testimonials } from "./components/testimonials";
import { FAQs } from "./components/faq";
import { useDispatch, useSelector } from "react-redux";
import { getRatingDetails, getServiceDetails, getStates, talkToAdvisor } from "../../../redux/actions/servicesDetails-actions";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { clearState } from "../../../redux/slices/serviceDetailsSlice";

const ServiceDetail = () => {
  const { serviceId } = useParams()
  const dispatch = useDispatch();
  const { success, statesList,callBackMessage, subscription,stateWiseServiceCharge, isTalkToAdvisorLoading, isQuotationAvailable, isOfferAvailable } = useSelector((state) => state.serviceDetails);

  console.log(success, "from component")
  useEffect(() => {
    
    dispatch(getServiceDetails({ serviceId: serviceId }));
    dispatch(getRatingDetails({ serviceId: serviceId, page : 1}))
  }, [dispatch])

  const handleTalkTouOurAdvisors = () => {
    const requestData = {
      userId: JSON.parse(localStorage.getItem('userInfo'))?.userId,
      serviceId: serviceId,
      status: "negotiation",
      quotationDate: Date.now()
    }
    dispatch(talkToAdvisor(requestData))

  }
  return (
    <>
      <section className="pb-10">
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between gap-4">
            <Heading className="!text-2xl" backButton={true}>Service Detail</Heading>
            <LinkButton primary={true}>Contact</LinkButton>
          </div>
          <Details data={success} stateWiseServiceCharge={stateWiseServiceCharge?.estimatedTotal}  pricing={true} serviceId={serviceId} offer={success?.offerservices?.[0]?.offers?.[0]?.discountPercent} handleRequest={handleTalkTouOurAdvisors} isLoading={isTalkToAdvisorLoading} />
          {/* <Features /> */}
          <Pricing data={subscription} pricing={!isQuotationAvailable} serviceId={serviceId} offer={success?.offerservices?.[0]?.offers?.[0]?.discountPercent}/>
          <Advisor
            handleRequest={handleTalkTouOurAdvisors}
            isLoading={isTalkToAdvisorLoading}
            message={callBackMessage}
            />
          <Testimonials serviceId={serviceId} />
          <Steps data={success?.servicesteps}/>
          <FAQs />
          <Advisor
            label="Still have questions?"
            description="Contact us for more information or assistance."
            handleRequest={handleTalkTouOurAdvisors}
            isLoading={isTalkToAdvisorLoading}
            message={callBackMessage}
          />
        </div>
      </section>
    </>
  );
};

export default ServiceDetail;
