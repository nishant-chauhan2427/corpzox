import { Button } from "../../../../../components/buttons/button";
import { Selector } from "../../../../../components/select";

export const Pricing = ({ pricing = true }) => {
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

  const quotations = [
    {
      date: "Nov 5, 2024",
      referenceNumber: "CUST-20241108-0015",
      service: "Fractional CFO Services",
      message:
        "Thank you for reaching out to Corpzo. We are pleased to provide you with a revised price for the requested services as per our recent discussion. Please find the details below",
      planPrice: "₹3,999",
      buttonText: "Avail Now",
    },
  ];

  return (
    <section>
      <div className="flex flex-col gap-4">
        <p className="font-bold uppercase text-2xl text-[#0A1C40]">
          your business, your price
        </p>
        {pricing && (
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
        )}
        {pricing ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {packages.map((data, index) => (
              <PricingCard key={index} data={data} />
            ))}
          </div>
        ) : (
          <>
            {quotations.map((data, index) => (
              <QuotationCard key={index} quotation={data} />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

const PricingCard = ({ data }) => {
  return (
    <div className="w-full flex gap-10 justify-center">
      <div className="w-full flex flex-col gap-2 drop-shadow-lg hover:drop-shadow-2xl bg-white px-5 py-6">
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

const QuotationCard = ({ quotation }) => {
  return (
    <div className="m-6 p-10 border rounded-lg bg-white shadow-md hover:shadow-lg">
      <p className="text-sm text-gray-600 mb-2"><strong>Date:</strong> {quotation.date}</p>
      <p className="text-sm text-gray-600 mb-2"><strong>Reference Number:</strong> {quotation.referenceNumber}</p>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{`Quotation - ${quotation.service}`}</h3>
      <p className="text-gray-700 mb-4">{quotation.message}</p>
      <div className="text-lg font-semibold text-gray-800 mb-6">{`Plan Price: ${quotation.planPrice}`}</div>
      <Button primary={true} className="py-2 px-6 rounded !font-medium">
        {quotation.buttonText}
      </Button>
    </div>
  );
};
