import React, { useEffect, useState } from "react";
import { Heading, PageHeading } from "../../../components/heading";
import { ServicesProgress } from "../../dashboard/components/services/progress";
import { TextArea } from "../../../components/inputs/textarea";
import { Rating } from "../../../components/rating";
import { Button } from "../../../components/buttons";
import { useDispatch, useSelector } from "react-redux";
import {
  getMoreService,
  getMoreServiceUpdate,
  updateServiveProgress,
} from "../../../redux/actions/dashboard-action";
import { Controller, useForm } from "react-hook-form";
import { ConfirmationModal } from "../../../components/modal/confirmationModal";
import { LinkButton } from "../../../components/link";
import { GoDotFill, GoTriangleDown } from "react-icons/go";
import InfiniteScroll from "react-infinite-scroll-component";
import { ProgressBar } from "../../../components/progressBar";
import { ImSpinner2 } from "react-icons/im";
import { servicesProgress } from "../../../database";
import { NavLink } from "react-router-dom";

const ServiceprogressViewAll = ({ data }) => {
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [otherValue, setOtherVsalue] = useState("");

  const { dataUpdate, totalCount, loadingMore, page, morePage } = useSelector(
    (state) => state.user
  );
  const [dropdownStates, setDropdownStates] = useState(
    dataUpdate?.data?.map(() => false)
  );
  const dispatch = useDispatch();

  const handleServiceDropdown = (index) => {
    setDropdownStates((prevState) =>
      prevState.map((state, i) => (i === index ? !state : state))
    );
  };

  const onConfirmationModalClose = () => {
    setConfirmationModal(!confirmationModal);
  };

  useEffect(() => {
    if (
      dataUpdate?.data?.length == 0 ||
      dataUpdate?.data?.length == undefined
    ) {
      dispatch(updateServiveProgress({ page: 1 }));
    }
  }, []);

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
  // console.log(totalCount,"12DATTE1");
  // console.log( morePage,"12DATE@");
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
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Heading
          backButton={true}
          title={"Your Service Progress Updates"}
          tourButton={true}
        >
          Your Service Progress Updates{" "}
          {dataUpdate?.total ? `(${dataUpdate?.total})` : ""}
        </Heading>
      </div>

      {dataUpdate?.total > 0 ? (
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
                      {data?.businessdetails[0]?.businessName || "____"}
                    </h6>
                    <p className="text-sm text-[#7C7D80]">
                      <strong>Step:</strong> {data?.status}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                {data?.ratingreviewsSize === 0 && (
                  <Button
                    onClick={() => setConfirmationModal(true)}
                    className="flex items-center px-4 py-[6px] rounded-full font-medium text-[12px] text-[#0068FF] bg-[#DBE9FE]"
                  >
                    Rate Your Experience
                  </Button>
                )}

                      <LinkButton
                        className={
                          "px-4 py-2 font-medium text-xs text-[#0A1C40]"
                        }
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
                          <div className="flex justify-between items-center pb-5">
                            <label className="text-sm font-semibold text-gray-600">
                              On-Time Delivery
                            </label>
                            <Rating size={40} />
                          </div>
                          {console.log(dataUpdate?.data, "DebugdataUpdate5")}
                          <div className="flex justify-between items-center pb-5">
                            <label className="text-sm font-semibold text-gray-600">
                              Transparent Pricing
                            </label>
                            <Rating size={40} />
                          </div>
                          <div className="flex justify-between items-center pb-5">
                            <label className="text-sm font-semibold text-gray-600">
                              Value for Money
                            </label>
                            <Rating size={40} />
                          </div>

                          <div className="pt-4 pb-5">
                            <label
                              htmlFor="Review"
                              className="text-lg font-bold text-[#0A1C40]"
                            >
                              Review
                            </label>
                            <TextArea
                              className="min-h-20 placeholder:text-xl border bg-white border-[#D9D9D9]"
                              placeholder="Add Review"
                            />
                          </div>
                          <div className="flex justify-end gap-4">
                            <Button
                              outline={true}
                              type="button"
                              onClick={onConfirmationModalClose}
                            >
                              Maybe Later
                            </Button>
                            <Button primary={true} type="submit">
                              Submit
                            </Button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </>
                </ConfirmationModal>

                <LinkButton to={`/payment/create/${data._id}`} primary={true}>
                  Avail again
                </LinkButton>

                <div className="flex items-center justify-center">
                  {data?.status === "Delayed" ? (
                    <LinkButton className="flex gap-2 rounded-2xl bg-[#FFDFDF] px-2 py-1 text-sm font-medium !text-[#FF3B3B] text-center">
                      &#9679; Delayed by {data?.delay} days
                    </LinkButton>
                  ) : (
                    <LinkButton className="flex gap-2 rounded-2xl bg-[#DFFFE2] px-2 py-1 text-sm font-medium text-[#037847] text-center">
                      &#9679; On Time
                    </LinkButton>
                  )}
                </div>
                <button
                  className={`${
                    dropdownStates === true && "rotate-180 "
                  } hidden lg:block `}
                  onClick={() => handleServiceDropdown(index)}
                >
                  <GoTriangleDown size={15} />
                </button>
              </div>

              <Dropdown
                isOpen={dropdownStates?.[index]}
                servicesProgessSteps={servicesProgessSteps}
              />
            </div>
          ))}

          <InfiniteScroll
            dataLength={dataUpdate?.data?.length || 0}
            next={() => dispatch(getMoreServiceUpdate({ page: morePage + 1 }))}
            hasMore={dataUpdate?.data?.length < totalCount}
            loader={
              <div className="flex justify-center items-center p-1">
                <ImSpinner2 className="animate-spin text-black !text-xl" />
              </div>
            }
            endMessage={
              dataUpdate?.data?.length &&
              dataUpdate?.data?.length > 0 && (
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              )
            }
          ></InfiniteScroll>
        </div>
      ) : (
        <div className="flex justify-center gap-2 items-center flex-col h-[80vh]">
          <img src="/images/service-prgress.svg" alt="" />
          <p className="font-bold text-xl text-[#000000]">No Services</p>
        </div>
      )}

     
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

export default ServiceprogressViewAll;
