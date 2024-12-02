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
import { getServiceDetails, getStates, talkToAdvisor } from "../../../redux/actions/servicesDetails-actions";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { clearState } from "../../../redux/slices/serviceDetailsSlice";

const ServiceDetail = () => {
  const { serviceId } = useParams()
  const dispatch = useDispatch();
  const { success, statesList, subscription, isTalkToAdvisorLoading } = useSelector((state) => state.serviceDetails);

  console.log(success?.subscription, "from component")
  useEffect(() => {
    // dispatch(getServiceDetails({serviceId : serviceId ||  "66e17336b029b506bdd35f34"}));
    dispatch(getServiceDetails({ serviceId: serviceId }));
    // dispatch(getStates()); 
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
            <Heading backButton={true}>Service Detail</Heading>
            <LinkButton primary={true}>Contact</LinkButton>
          </div>
          <Details data={success} pricing={true} serviceId={serviceId} handleRequest={handleTalkTouOurAdvisors} isLoading={isTalkToAdvisorLoading} />
          <Features />
          <Pricing data={subscription} pricing={true} serviceId={serviceId} />
          <Advisor
            handleRequest={handleTalkTouOurAdvisors}
            isLoading={isTalkToAdvisorLoading} />
          <Testimonials />
          <Steps />
          <FAQs />
          <Advisor
            label="Still have questions?"
            description="Contact us for more information or assistance."
            handleRequest={handleTalkTouOurAdvisors}
            isLoading={isTalkToAdvisorLoading}
          />
        </div>
      </section>
    </>
  );
};

export default ServiceDetail;
