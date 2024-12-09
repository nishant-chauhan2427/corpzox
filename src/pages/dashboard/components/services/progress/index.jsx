import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GoDotFill, GoTriangleDown } from "react-icons/go";
import { ProgressBar } from "../../../../../components/progressBar";
import { Heading } from "../../../../../components/heading";
import { ConfirmationModal } from "../../../../../components/modal/confirmationModal";
import { p } from "framer-motion/client";
import { ReactModal } from "../../../../../components/modal";
import { TextArea } from "../../../../../components/inputs/textarea";
import { Rating } from "../../../../../components/rating";
import { Button } from "../../../../../components/buttons";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ratingReviewSchema } from "../../../../../validation/ratingReviewValidationSchema";
import { useDispatch, useSelector } from "react-redux";
import { ratingReview } from "../../../../../redux/actions/servicesDetails-actions";

export const ServicesProgress = ({ data }) => {
  const [dropdownStates, setDropdownStates] = useState(data.map(() => false));
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [otherValue, setOtherVsalue] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
 
  const {isRatingAdding} = useSelector((state)=> state.serviceDetails)
  const handleServiceDropdown = (index) => {
    setDropdownStates((prevState) =>
      prevState.map((state, i) => (i === index ? !state : state))
    );
  };
  const { dataUpdate } = useSelector((state) => state.user);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      serviceQualityRating: 0,
      professionalBehaviourRating: 0,
      onTimeDeliveryRating: 0,
      transparentPricingRating: 0,
      valueForMoneyRating: 0,
      review: "",
    },
    resolver: yupResolver(ratingReviewSchema),
  });
  const onConfirmationModalClose = () => {
    setConfirmationModal(false);
    setServiceId("");
  };

  useEffect(() => {
    if (!isRatingAdding) setConfirmationModal(false);
  }, [isRatingAdding]);

  const onConfirmationModalOpen = (data) => {
    console.log(data, "mo idea");
    setServiceId(data);
    setConfirmationModal(true);
  };
  const onSubmit = (formData) => {
    console.log("Submitted Data: ", formData);
    // Handle form submission logic
    console.log("Submitted Data: ", {
      serviceQualityRating: formData.serviceQualityRating,
      professionalBehaviourRating: formData.professionalBehaviourRating,
      onTimeDeliveryRating: formData.onTimeDeliveryRating,
      transparentPricingRating: formData.transparentPricingRating,
      valueForMoneyRating: formData.valueForMoneyRating,
      review: formData.review,
    });
    dispatch(ratingReview({ ...formData, serviceId }));
    reset(); // Reset the form after submission
  };

  // 

  const servicesProgessSteps = [
    {
      step: 1,
      topLabel: "Under Review",
      bottomLabel: "Mar 12, 2024",
      status: "completed",
    },
    {
      step: 2,
      topLabel: "Service Started",
      bottomLabel: "Mar 15, 2024",
      status: "completed",
    },
    {
      step: 3,
      topLabel: "Payment Received",
      bottomLabel: "Mar 16, 2024",
      status: "completed",
    },
    {
      step: 4,
      topLabel: "Documents Uploaded",
      bottomLabel: "Mar 17, 2024",
      status: "completed",
    },
    { step: 5, topLabel: "App. Submitted", status: "in-progress" },
    {
      step: 6,
      topLabel: "App. In Progress",
      estimated: "Est: 5-6 Days",
      status: "pending",
    },
    {
      step: 7,
      topLabel: "Service Completed",
      estimated: "Est: 1-2 Days",
      status: "pending",
    },
  ];

  return (
    <div>
      <div className="py-2 flex flex-col sm:flex-row justify-between gap-2">
        <Heading className={"py-0"} tourButton={true}>
          Your Service Progress Updates({dataUpdate?.total})
        </Heading>
        <Link
          to={"/services"}
          className="font-semibold text-[#606060]"
        >
          View All
        </Link>
      </div>
      {dataUpdate?.data?.length > 0 ? (
        <div className="flex flex-col gap-4">
          {dataUpdate?.data?.map((data, index) => (
            <div key={index} className="bg-[#F8FAFF] px-4 py-2 rounded-md">
              <div className="flex flex-col sm:flex-row items-start justify-between sm:items-center gap-2">
                <div className="flex flex-col gap-1">
                  <div className="flex gap-2">
                    <img src="/images/dashboard/service-progress.svg" alt="" />

                    <p className="font-bold">
                      Service: {data?.service[0]?.name}{" "}
                    </p>
                    <img
                      src="/icons/dashboard/service-error.svg"
                      width={15}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h6 className="text-sm text-[#7C7D80]">
                      <strong>Business:</strong>{" "}
                      {data?.businessdetails[0]?.businessName}
                    </h6>
                    <p className="text-sm text-[#7C7D80]">
                      <strong>Step:</strong> {data?.status}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      onConfirmationModalOpen(data._id);
                    }}
                    className="flex items-center  px-4 py-[10px] rounded-full font-semibold text-base text-[#0068FF] bg-[#DBE9FE]"
                  >
                    Rate Your Experience
                  </Button>

                  <ConfirmationModal
                    isOpen={confirmationModal}
                    onClose={onConfirmationModalClose}
                  >
                    <>
                      <div>
                        <p className="text-[32px]  text-[#232323] font-bold">
                          Rate Your Experience!
                        </p>
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div>

                            <div className="flex justify-between items-center pb-5">
                              <label className="text-sm font-semibold text-gray-600">
                                Service Quality
                              </label>
                              <Controller
                                name="serviceQualityRating"
                                control={control}
                                render={({ field, fieldState }) => (
                                  <div className="flex flex-col gap-4">
                                    <Rating
                                      {...field}
                                      rating={field.value}
                                      setRating={field.onChange}
                                      size={40}
                                    />
                                    {fieldState.error && (
                                      <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                                    )}
                                  </div>
                                )}
                              />
                            </div>
                            <div className="flex justify-between items-center pb-5">
                              <label className="text-sm font-semibold text-gray-600">
                                Professional Behavior
                              </label>
                              <Controller
                                name="professionalBehaviourRating"
                                control={control}
                                render={({ field, fieldState }) => (
                                  <div className="flex flex-col gap-4">
                                    <Rating
                                      {...field}
                                      rating={field.value}
                                      setRating={field.onChange}
                                      size={40}
                                    />
                                    {fieldState.error && (
                                      <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                                    )}
                                  </div>
                                )}
                              />
                            </div>
                            <div className="flex justify-between items-center pb-5">
                              <label className="text-sm font-semibold text-gray-600">
                                On-Time Delivery
                              </label>
                              <Controller
                                name="onTimeDeliveryRating"
                                control={control}
                                render={({ field, fieldState }) => (
                                  <div className="flex flex-col gap-4">
                                    <Rating
                                      {...field}
                                      rating={field.value}
                                      setRating={field.onChange}
                                      size={40}
                                    />
                                    {fieldState.error && (
                                      <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                                    )}
                                  </div>
                                )}
                              />
                            </div>
                            <div className="flex justify-between items-center pb-5">
                              <label className="text-sm font-semibold text-gray-600">
                                Transparent pricing
                              </label>
                              <Controller
                                name="transparentPricingRating"
                                control={control}
                                render={({ field, fieldState }) => (
                                  <div className="flex flex-col gap-4">
                                    <Rating
                                      {...field}
                                      rating={field.value}
                                      setRating={field.onChange}
                                      size={40}
                                    />
                                    {fieldState.error && (
                                      <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                                    )}
                                  </div>
                                )}
                              />
                            </div>
                            <div className="flex justify-between items-center pb-5">
                              <label className="text-sm font-semibold text-gray-600">
                                Value for Money
                              </label>
                              <Controller
                                name="valueForMoneyRating"
                                control={control}
                                render={({ field, fieldState }) => (
                                  <div className="flex flex-col gap-4">
                                    <Rating
                                      {...field}
                                      rating={field.value}
                                      setRating={field.onChange}
                                      size={40}
                                    />
                                    {fieldState.error && (
                                      <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                                    )}
                                  </div>
                                )}
                              />
                            </div>
                            <div className="pt-4 pb-5">
                              <label
                                htmlFor="Review"
                                className="flex text-lg font-bold text-[#0A1C40]"
                              >
                                Review
                              </label>
                              <Controller
                                name="review"
                                control={control}
                                render={({ field, fieldState }) => (
                                  <>
                                    <TextArea
                                      {...field}
                                      className="min-h-20 placeholder:text-xl border bg-white border-[#D9D9D9]"
                                      placeholder="Add Review"
                                    />
                                    {fieldState.error && (
                                      <p className="text-red-500 text-sm">
                                        {fieldState.error.message}
                                      </p>
                                    )}
                                  </>
                                )}
                              />
                            </div>
                            <div className="flex justify-end gap-4">
                              <Button
                                outline={true}
                                type="button"
                                onClick={() => reset()}
                              >
                                Maybe Later
                              </Button>
                              <Button
                                disabled={!isValid}
                                isLoading={isRatingAdding}
                                primary={true}
                                type="submit"
                              >
                                Submit
                              </Button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </>
                  </ConfirmationModal>
                  <Button primary={true}>Avail again</Button>
                  <button
                    className={`${dropdownStates === true && "rotate-180"
                      } hidden lg:block`}
                    onClick={() => handleServiceDropdown(index)}
                  >
                    <GoTriangleDown size={30} />
                  </button>
                </div>
              </div>
              <Dropdown
                isOpen={dropdownStates[index]} // Pass the state for this specific dropdown
                servicesProgessSteps={servicesProgessSteps}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center gap-2 items-center flex-col h-[80vh]">
          <img src="/images/service-prgress.svg  " alt="" />
          <p className="font-bold text-xl text-[#000000] ">No Services </p>
          <p className="font-normal text-[#797979]">
            Create a Business to add your Service{" "}
          </p>
        </div>
      )}
    </div>
  );
};

const Dropdown = ({ isOpen, servicesProgessSteps }) => {
  return (
    <>
      {isOpen && (
        <div className="p-6">
          <div className="flex justify-between items-center">
            <ProgressBar steps={servicesProgessSteps} />
            {/* {servicesProgessSteps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col items-center relative text-white`}
              >
                <div
                  className={`w-fit px-1 py-0.5 rounded ${
                    step.status === "completed"
                      ? "bg-green-600"
                      : step.status === "in-progress"
                      ? "bg-yellow-600"
                      : "bg-gray-600"
                  }`}
                >
                  <p className="font-normal text-[10px]">{step.label}</p>
                </div>

                <div className="w-full h-4 bg-gray-300"></div>
                {step.date && (
                  <div className="text-[10px] text-gray-500">{step.date}</div>
                )}
                {step.estimated && (
                  <div className="text-[10px] text-gray-500">
                    {step.estimated}
                  </div>
                )}
              </div>
            ))} */}
          </div>
        </div>
      )}
    </>
  );
};
