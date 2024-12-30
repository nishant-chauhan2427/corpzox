import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ProgressBar } from "../../../../../components/progressBar";
import { Heading } from "../../../../../components/heading";
import { ConfirmationModal } from "../../../../../components/modal/confirmationModal";
import { Rating } from "../../../../../components/rating";
import { Button } from "../../../../../components/buttons";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ratingReviewSchema } from "../../../../../validation/ratingReviewValidationSchema";
import { useDispatch, useSelector } from "react-redux";
import { ratingReview } from "../../../../../redux/actions/servicesDetails-actions";
import { LinkButton } from "../../../../../components/link";
import { TextArea } from "../../../../../components/inputs/textarea";
import { GoTriangleDown } from "react-icons/go";
import { GoDotFill } from "react-icons/go";

export const ServiceCard = ({ data }) => {
  //console.log(data,"datadashboard");
  const { dataUpdate } = useSelector((state) => state.user);
  const [dropdownStates, setDropdownStates] = useState(data?.map(() => false));
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [otherValue, setOtherVsalue] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isRatingAdding } = useSelector((state) => state.serviceDetails);

  const handleServiceDropdown = (index) => {
    setDropdownStates((prevState) =>
      prevState.map((state, i) => (i === index ? !state : state))
    );
  };

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
    reset();
  };

  useEffect(() => {
    if (!isRatingAdding) setConfirmationModal(false);
  }, [isRatingAdding]);

  const onConfirmationModalOpen = (data, transactionId) => {
    setServiceId(data);
    setTransactionId(transactionId);
    setConfirmationModal(true);
  };

  const onSubmit = (formData) => {
    // Handle form submission logic
    const payload = {
      serviceQualityRating: formData.serviceQualityRating,
      professionalBehaviourRating: formData.professionalBehaviourRating,
      onTimeDeliveryRating: formData.onTimeDeliveryRating,
      transparentPricingRating: formData.transparentPricingRating,
      valueForMoneyRating: formData.valueForMoneyRating,
      review: formData.review,
    };
    if (formData.review === "") {
      delete payload.review;
    }

    dispatch(
      ratingReview({ ...payload, serviceId, applicationId: transactionId })
    );
    reset(); // Reset the form after submission
  };

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

  const calculateCompletionStatus = (expectedCompletionDate) => {
    const today = new Date();
    const expectedDate = new Date(expectedCompletionDate);
    const differenceInMilliseconds = expectedDate - today;
    const differenceInDays = Math.ceil(
      differenceInMilliseconds / (1000 * 3600 * 24)
    );

    if (differenceInDays > 0) {
      return { status: "On Time", delay: null };
    } else if (differenceInDays < 0) {
      return { status: "Delayed", delay: Math.abs(differenceInDays) };
    } else {
      return { status: "On Time", delay: null };
    }
  };

  return (
    <>
      {data?.map((data, index) => {
        const { status, delay } = calculateCompletionStatus(
          data?.expectedCompletionDate
        );
        return (
          <div
            key={index}
            className="bg-[#f3f7ff] stroke-[#dfeaf2] stroke-1 px-4 py-2 rounded-md "
          >
            <div className="flex flex-col sm:flex-row items-start justify-between sm:items-center gap-2">
              <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                  <img
                    className="w-4"
                    src="/images/dashboard/service-progress.svg"
                    alt=""
                  />
                  <NavLink
                    to={`/payment/create/${data._id}`}
                    className="font-semibold text-sm text-[#0A1C40]"
                  >
                    Service: {data?.service[0]?.name}{" "}
                  </NavLink>
                  {/* <img
                               src="/icons/dashboard/service-error.svg"
                               width={15}
                               alt=""
                             /> */}
                </div>
                <div className="flex flex-row gap-2">
                  <h6 className="font-medium text-sm text-[#7C7D80]">
                    <span className="font-medium text-[#0A1C40]">
                      Business:
                    </span>{" "}
                    {data?.businessdetails[0]?.businessName || "------"}
                  </h6>
                  <p className="font-medium text-sm text-[#7C7D80]">
                    <span className="font-medium text-[#0A1C40]">Step:</span>{" "}
                    {data?.status}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                {data?.ratingreviewsSize === 0 && (
                  <Button
                    onClick={() =>
                      onConfirmationModalOpen(data?.service[0]?._id, data?._id)
                    }
                    className="font-medium text-[12px] text-[#0068FF] underline underline-offset-4"
                  >
                    Rate Your Experience
                  </Button>
                )}

                <LinkButton
                  className={"px-4 py-2 font-medium text-xs text-[#0A1C40]"}
                  to={`/payment/create/${data._id}`}
                  primary={true}
                >
                  Avail again
                </LinkButton>
                <div className="flex items-center justify-center">
                  {status === "Delayed" ? (
                    <div className="flex justify-center items-center gap-1 rounded-2xl bg-[#FFDFDF] px-2 py-1 text-xs font-medium !text-[#FF3B3B] text-center">
                      <GoDotFill />
                      <p>Delayed by {delay} days</p>
                    </div>
                  ) : status === "On Time" ? (
                    <div className="flex justify-center items-center gap-1 rounded-2xl bg-[#DFFFE2] px-2 py-1 text-xs font-medium text-[#037847] text-center">
                      <GoDotFill />
                      <p>On Time</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-center items-center gap-1 rounded-2xl bg-[#DFFFE2] px-2 py-1 text-xs font-medium text-[#037847] text-center">
                        <GoDotFill />
                        <p>On Time</p>
                      </div>
                    </>
                  )}
                </div>
                <button
                  data-tooltip-content={"Service Progress"}
                  data-tooltip-id="my-tooltip"
                  className={`${
                    dropdownStates === true && "rotate-180 "
                  } hidden lg:block `}
                  onClick={() => handleServiceDropdown(index)}
                >
                  <GoTriangleDown size={15} />
                </button>
              </div>
            </div>
            <Dropdown
              isOpen={dropdownStates?.[index]}
              servicesProgessSteps={servicesProgessSteps}
            />
          </div>
        );
      })}
    </>
  );
};

const Dropdown = ({ isOpen, servicesProgessSteps }) => {
  return (
    <>
      {isOpen && (
        <div className="p-6">
          <div className="flex justify-between items-center">
            <ProgressBar steps={servicesProgessSteps} />
          </div>
        </div>
      )}
    </>
  );
};
