import { Heading } from "../../../components/heading";
import { LinkButton } from "../../../components/link";
import { Steps } from "./components/steps";
import { Details } from "./components/details";
import { Pricing } from "./components/pricing";
import { Features } from "./components/features";
import { Advisor } from "./components/advisor";
import { Testimonials } from "./components/testimonials";
import { FAQs } from "./components/faq";

const ServiceDetail = () => {
  return (
    <>
      <section className="pb-10">
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between gap-4">
            <Heading backButton={true}>Service Detail</Heading>
            <LinkButton primary={true}>Contact</LinkButton>
          </div>
          <Details />
          <Features />
          <Pricing />
          <Advisor />
          <Testimonials />
          <Steps />
          <FAQs />
          <Advisor
            label="Still have questions?"
            description="Contact us for more information or assistance."
          />
        </div>
      </section>
    </>
  );
};

export default ServiceDetail;
