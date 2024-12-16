import SemiCircleProgressBar from "react-progressbar-semicircle";
import { Rating } from "../../../../../components/rating";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
// import required modules
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRatingReviews } from "../../../../../redux/actions/dashboard-action";
import { ServiceDetailsRatingCard } from "../../../../../components/loader/ServiceDetailsRatingCard";

export const Testimonials = ({ serviceId }) => {
  console.log(serviceId, "serviceIdserviceIdserviceId")
  const { serviceTestimonials, averageRating, success, ratingReviewList } = useSelector((state) => state.serviceDetails);
  console.log(ratingReviewList, "ratingReviewList")
  const {isRatingLoading} = useSelector((state)=> state.dashboard)
  const dispatch = useDispatch();
  const formattedTestimonials = serviceTestimonials?.map((testimonial) => {
    return {
      company: testimonial.authorCompany ? authorCompany : "",
      feedback: testimonial.authorDescription,
      client: testimonial.authorName,
      image: testimonial.authorImage
    }
  })

  const formattedRatting = ratingReviewList?.data?.length > 0 ? ratingReviewList.data[0] : {};

  const ratingDetails = success?.total_rating_count?.length > 0 ? success.total_rating_count[0] : null;
  useEffect(() => {
    dispatch(getRatingReviews(serviceId))
  }, [])
  console.log(formattedTestimonials, "formattedTestimonial")
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
    {
      company: "Horizon Creations",
      feedback:
        "Working with this team has been an absolute pleasure. They understood our vision perfectly and delivered beyond our expectations.",
      client: "PulseCore Innovations",
      image: "/images/insights/insight-user.svg",
    },
    {
      company: "Horizon Creations",
      feedback:
        "Working with this team has been an absolute pleasure. They understood our vision perfectly and delivered beyond our expectations.",
      client: "PulseCore Innovations",
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

  const ratingPercentage = (rating) => {
    if (rating < 0 || rating > 5) {
      throw new Error("Rating must be between 0 and 5.");
    }
    return (rating / 5) * 100;
  };

  const ratings = [
    { title: "Service Quality", score: formattedRatting ? formattedRatting.avgServiceQualityRating : "N/A" },
    { title: "Professional Behaviour", score: formattedRatting ? formattedRatting.avgProfessionalBehaviourRating      : "N/A" },
    { title: "On-Time Delivery", score: formattedRatting ? formattedRatting.avgOnTimeDeliveryRating : "N/A"  },
    { title: "Transparent Pricing", score: formattedRatting ? formattedRatting.avgTransparentPricingRating : "N/A"  },
    { title: "Value For Money", score: formattedRatting ? formattedRatting.avgValueForMoneyRating : "N/A"  },
  ];

  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  return (
    <div className="bg-white py-10">
      <h4 className="font-bold text-2xl uppercase mb-2">
        Trusted by entrepreneurs Like you
      </h4>

      {/* Rating Section */}
      {isRatingLoading  ?<ServiceDetailsRatingCard/>:<div className="bg-[#0E38BD] rounded-md p-5 flex flex-col md:flex-row justify-between gap-4 items-center mb-8">
        <div className="flex flex-wrap justify-center">
          {ratings.map((rating, index) => (
            <div
              key={index}
              className="w-12 flex flex-col items-center text-center mx-4"
            >
              <SemiCircleProgressBar
                diameter={60}
                stroke={"#FFD700"}
                strokeWidth={4}
                percentage={ratingPercentage(rating.score)}
              />
              <div className="-mt-2.5 text-white text-[10px] font-bold">
                {rating.score ? rating.score :"N/A"}
              </div>
              <p className="font-medium text-[11px] text-white">
                {rating.title}
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2 text-xl ">
           { <p className="font-bold text-white">{ratingDetails?.average ? ratingDetails?.average : "--"}/5</p>}
            {ratingDetails?.average && <Rating rating={ratingDetails?.average} />}
          </div>
         { <p className="font-semibold text-[11px] text-white">{`Based on ${ratingDetails?.count ? ratingDetails?.count : 0} reviews`}</p>}
        </div>
      </div>}

      {/* Testimonial Cards */}
      <div className="w-full overflow-hidden">
        <Swiper
          slidesPerView={3}
          spaceBetween={20}
          slidesPerGroup={3}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          loopFillGroupWithBlank={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
          breakpoints={{
            280: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            340: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {formattedTestimonials?.map((testimonial, index) => (
            <SwiperSlide>
              <TestimonialCard key={index} testimonial={testimonial} />
            </SwiperSlide>
          ))}

          <div className="mt-10 autoplay-progress" slot="container-end">
            {/* <svg viewBox="0 0 48 48" ref={progressCircle}>
                <circle cx="24" cy="24" r="20"></circle>
              </svg>
              <span ref={progressContent}></span> */}
          </div>
        </Swiper>
      </div>
    </div>
  );
};

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="p-5 rounded-[10px] shadow-sm bg-[#F4F7FF] flex flex-col hover:shadow-lg">
      <img
        src={testimonial.image}
        alt={testimonial.company}
        className="w-10 h-10 rounded-full mb-2"
      />
      <h3 className="text-[11px] font-semibold text-[#0A1C40] mb-1.5">
        {testimonial.company}
      </h3>
      <p className="text-[#0A1C40] text-[11px] mb-4">
        "{testimonial.feedback}"
      </p>
      <p className="text-[#004BBC] font-semibold">{testimonial.client}</p>
    </div>
  );
};
