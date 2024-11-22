export const Testimonials = () => {
  const testimonials = [
    {
      company: "EcoWave Solutions",
      feedback:
        "Working with this team has been an absolute pleasure. They understood our vision perfectly and delivered beyond our expectations.",
      client: "NovaEdge Dynamics",
      image: "/images/insights/insight-user.svg",
    },
    {
      company: "AspireTech Innovations",
      feedback:
        "Working with this team has been an absolute pleasure. They understood our vision perfectly and delivered beyond our expectations.",
      client: "BluePeak Ventures",
      image: "/images/insights/insight-user.svg",
    },
    {
      company: "Horizon Creations",
      feedback:
        "Working with this team has been an absolute pleasure. They understood our vision perfectly and delivered beyond our expectations.",
      client: "PulseCore Innovations",
      image: "/images/insights/insight-user.svg",
    },
  ];

  const ratings = [
    { title: "Service Quality", score: 4.7 },
    { title: "Professional Behaviour", score: 4.7 },
    { title: "On-Time Delivery", score: 4.7 },
    { title: "Transparent Pricing", score: 4.7 },
    { title: "Value For Money", score: 4.7 },
  ];

  const overallRating = { score: 4.6, reviews: 102 };

  return (
    <div className="bg-white py-10 px-5">
      <h4 className="font-bold text-2xl uppercase mb-2">
        Trusted by entrepreneurs Like you
      </h4>

      {/* Rating Section */}
      <div className="bg-[#0E38BD] rounded-md p-5 flex justify-between items-center mb-8">
        {ratings.map((rating, index) => (
          <div key={index} className="flex flex-col items-center mx-4">
            <div className="text-white text-[10px] font-bold">
              {rating.score}
            </div>
            <p className="font-medium text-[11px] text-white">{rating.title}</p>
          </div>
        ))}
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">
            {overallRating.score}/5
          </div>
          <p className="text-sm text-gray-500">{`Based on ${overallRating.reviews} reviews`}</p>
        </div>
      </div>

      {/* Testimonial Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="p-5 rounded-[10px] shadow-sm bg-[#F4F7FF] flex flex-col hover:shadow-lg"
          >
            <img
              src={testimonial.image}
              alt={testimonial.company}
              className="w-10 h-10 rounded-full mb-2"
            />
            <h3 className="text-[11px] font-semibold text-[#0A1C40] mb-1.5">{testimonial.company}</h3>
            <p className="text-[#0A1C40] text-[11px] mb-4">
              "{testimonial.feedback}"
            </p>
            <p className="text-[#004BBC] font-semibold">{testimonial.client}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
