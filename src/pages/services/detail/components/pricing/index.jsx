import { Button } from "../../../../../components/buttons/button";
import { Selector } from "../../../../../components/select";

export const Pricing = () => {
  const packages = [
    {
      title: "STARTER PACK",
      price: "₹5,599",
      additional_cost: "+ applicable govt. ₹500",
      features: [
        "Fast Application",
        "Application within 5 working days or your money back.",
      ],
      includes: [
        "2 x DIN and Digital Signatures",
        "2 x Name Application",
        "Drafting of MoA and AoA",
        "COI, PAN and TAN",
      ],
      button_text: "Apply Now",
    },
    {
      title: "VALUE PACK",
      price: "₹7,499",
      additional_cost: "+ applicable govt. ₹500",
      features: [
        "Fast Application",
        "Application within 5 working days or your money back.",
      ],
      includes: [
        "Everything from starter pack",
        "MSME Registration",
        "Free accounting and filing for 3 months",
      ],
      button_text: "Apply Now",
    },
    {
      title: "VALUE PACK",
      price: "₹9,499",
      additional_cost: "+ applicable govt. ₹500",
      features: [
        "Fast Application",
        "Application within 5 working days or your money back.",
      ],
      includes: [
        "Everything from starter pack",
        "MSME Registration",
        "Free accounting and filing for 3 months",
      ],
      button_text: "Apply Now",
    },
  ];

  return (
    <section>
      <div className="flex flex-col gap-4">
        <p className="font-bold uppercase text-2xl text-[#0A1C40]">
          your business, your price
        </p>
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="font-medium text-sm txt-[#0A1C40]">
              Select your state to view the applicable govt. fees*
            </p>
            <p className="text-xs text-[#0A1C40]">
              *Subject to fluctuate at the time of application
            </p>
          </div>
          <Selector className={"lg:min-w-60"} placeholder={"Select State"} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {packages.map((data, index) => (
            <PricingCard key={index} data={data} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingCard = ({ data }) => {
  return (
    <div className="flex gap-10 justify-center pt-10">
      <div className="flex flex-col gap-2 drop-shadow-lg hover:drop-shadow-2xl bg-white px-5 py-6 ">
        <div>
          <p className="font-bold text-[#0A1C40] text-[22px] ">{data.price}</p>
          <p className="font-semibold text-xs text-[#038624]">
            + applicable govt. fees ₹500
          </p>
        </div>
        <p className="pt-6 font-bold uppercase text-sm text-[#565657]">
          {data.title}
        </p>
        <div>
          <p className="font-bold text-xs text-[#565657]">Fast Application</p>
          <p className="text-[10px] text-[#525252]">
            Application within 5 working days or your money back.
          </p>
        </div>
        <div>
          <p className="font-bold text-xs text-[#565657]">Includes:</p>
          <div className="py-2 flex flex-col gap-1">
            {data?.includes.map((data) => IconLabel(data))}
          </div>
        </div>
        <div className="pt-6 flex justify-center items-center">
          <Button className={"w-fit px-4 py-1 !font-normal"} primary={true}>
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
