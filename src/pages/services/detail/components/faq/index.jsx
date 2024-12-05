import { useState } from "react";
import { useSelector } from "react-redux";

export const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { success } = useSelector((state) => state.serviceDetails);
  const faqArray = success?.faqservices
  const transformedFaqArray = faqArray?.map((item) => {
    const { question, answer } = item.faq[0];
    return {
      question,
      answer,
      icon: "❓",
    };
  });
  console.log(transformedFaqArray, "faqArrayNew")

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  const faqs = [
    {
      question: "What Services Do You Offer?",
      answer: `
            - Fractional CFO Services
            - Financial Reporting
          `,
      icon: "🛠️",
    },
    {
      question: "Do You Offer Refunds?",
      answer:
        "We are committed to your satisfaction. That's why we offer a money-back guarantee if we're unable to submit your application within 3 working days. We'll issue a full refund. Terms & Conditions apply.",
      icon: "💰",
    },
    {
      question: "What Are Your Fees?",
      answer:
        "Our fees include both government charges and service fees. If you have any questions or concerns about the fees, please don't hesitate to talk with one of our advisors, who will be happy to clarify or assist as needed.",
      icon: "💵",
    },
    {
      question: "How Can I Contact You?",
      answer:
        "You can easily reach us via call or chat to discuss your requirements or address any questions. Our team is here to help guide you through our services and the process to get started.",
      icon: "📞",
    },
  ];
  return (
    <div className="max-w-xl mx-auto py-10 px-5">
      <h2 className="text-2xl font-bold text-center mb-4">
        Frequently Asked Questions
      </h2>
      <p className="font-semibold text-[#0A1C40] text-sm text-center mb-8">
        Find answers to common questions about our corporate services and client
        concerns.
      </p>

      {/* FAQ Items */}
      <div className="space-y-4">
        {/* {transformedFaqArray?.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg shadow-md"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-5 py-4 bg-[#DFEAF2] hover:bg-gray-200 text-left font-medium"
            >
              <span className="flex items-center font-semibold text-sm">
                <span className="text-blue-500 mr-2">{faq.icon}</span>
                {faq.question}
              </span>
              <span className="text-gray-500">
                {openIndex === index ? (
                  <img
                    className="rotate-180"
                    src="/icons/services/dropdown.svg"
                  />
                ) : (
                  <img src="/icons/services/dropdown.svg" />
                )}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-5 py-3 text-gray-600 bg-[#DFEAF2]">
                {faq.answer.split("\n").map((line, idx) => (
                  <p key={idx} className="mb-2">
                    {line.trim()}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))} */}
        {!transformedFaqArray || transformedFaqArray.length === 0 ? (
          <p className="text-center font-medium text-gray-600">
            Coming Soon!
          </p>
        ) : (
          <div className="space-y-4">
            {transformedFaqArray.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg shadow-md"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center px-5 py-4 bg-[#DFEAF2] hover:bg-gray-200 text-left font-medium"
                >
                  <span className="flex items-center font-semibold text-sm">
                    <span className="text-blue-500 mr-2">{faq.icon}</span>
                    {faq.question}
                  </span>
                  <span className="text-gray-500">
                    {openIndex === index ? (
                      <img
                        className="rotate-180"
                        src="/icons/services/dropdown.svg"
                        alt="Collapse"
                      />
                    ) : (
                      <img src="/icons/services/dropdown.svg" alt="Expand" />
                    )}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="px-5 py-3 text-gray-600 bg-[#DFEAF2]">
                    {faq.answer.split("\n").map((line, idx) => (
                      <p key={idx} className="mb-2">
                        {line.trim()}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
