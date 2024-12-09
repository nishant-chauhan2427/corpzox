import { useState } from "react";

export const Steps = ({data}) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleFAQ = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };
  const stepsData = [
    {
      label: "Initial Consultation and Assessment",
      description:
        "We begin with a detailed discussion to understand your unique needs.",
    },
    {
      label: "Customised Service Proposal",
      description: "Based on our assessment, we present a tailored proposal.",
    },
    {
      label: "Service Delivery and support",
      description:
        "Our experts implement the solutions while providing ongoing support.",
    },
  ];

  const faqData = [
    {
      question: "What Is A Private Limited Company Registration?",
      answer:
        "As per Section 2 (68) of the Companies Act, 2013, a private company is a unique business entity, distinguished by specific characteristics. It limits the right to transfer its shares.",
    },
    {
      question: "Eligibility",
      answer:
        "A journey towards establishing a private limited company is an exciting venture, filled with opportunities and challenges. Private companies have specific eligibility criteria that must be met.",
    },
    {
      question: "Documents Required",
      answer:
        "A journey towards establishing a private limited company is an exciting venture, filled with opportunities and challenges.",
    },
  ];

  return (
    <section>
      <h4 className="pb-4 font-bold uppercase text-2xl text-[#0A1C40]">
        getting started is as simple as 1.. 2.. 3
      </h4>
      <div className="p-4 bg-[#0E38BD] rounded-md flex flex-col sm:flex-row justify-between gap-4">
        {stepsData.map((data, index) => (
          <>
            <Step
              key={index}
              index={index + 1}
              label={data.label}
              description={data.description}
            />
            {index == 2 ? (
              <></>
            ) : (
              <img src="/icons/services/arrow-step.svg" alt="" />
            )}
          </>
        ))}
      </div>
      <div className="pt-10">
        <h4 className="pb-4 font-bold uppercase text-2xl text-[#0A1C40]">
          Everything You Need to Know About Private Limited Company Registration
        </h4>

        <div className="space-y-4">
          {data?.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-5 py-3 text-left text-gray-700 font-bold text-sm hover:bg-gray-100"
              >
                {faq.title}
                <span className="text-gray-500">
                  {expandedIndex === index ? (
                    <img
                      className="rotate-180"
                      src="/icons/services/dropdown.svg"
                    />
                  ) : (
                    <img src="/icons/services/dropdown.svg" />
                  )}
                </span>
              </button>
              {expandedIndex === index && (
                <div className="px-5 py-3 text-xs bg-gray-50 text-gray-600">
                  {faq.details}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Step = ({ label, description, index }) => {
  return (
    <div className="flex flex-col gap-2 text-center">
      <p className="font-medium text-5xl  text-white">{index}</p>
      <p className="font-bold  text-xs  text-[#F8F8F8]">{label}</p>
      <p className="font-normal text-[8px] text-white ">{description}</p>
    </div>
  );
};
