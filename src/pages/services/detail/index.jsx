import { Heading } from "../../../components/heading";
import { LinkButton } from "../../../components/link";
import { Steps } from "./components/steps";
import { Details } from "./components/details";
import { Pricing } from "./components/pricing";

const ServiceDetail = () => {
  return (
    <>
      <section className="pb-10">
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between gap-4">
            <Heading backButton={true}>Service Detail</Heading>
            <LinkButton primary={true}>Contact</LinkButton>
          </div>
          <Steps />
          <Details />
          <Pricing />
        </div>
      </section>
    </>
  );
};

export default ServiceDetail;
