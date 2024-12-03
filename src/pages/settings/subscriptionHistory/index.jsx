import { useEffect, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { Table } from "../../../components/table";
import { Button } from "../../../components/buttons";
import { useDispatch, useSelector } from "react-redux";
import { getSubscriptionHistoryCount, getSubscriptions } from "../../../redux/actions/settings-actions";
import { ImSpinner2 } from "react-icons/im";
import { TableShimmer } from "../../../components/loader/TableShimmer";
import { NoData } from "../../../components/errors/noData";



const columns = [
  { header: "Subscription", accessor: "subscription" },
  { header: "Status", accessor: "status" },
  { header: "Amount", accessor: "amount" },
  { header: "Payment Method", accessor: "paymentMethod" },
  { header: "Renew Date", accessor: "renewDate" },
];

const SubscriptionHistory = () => {
  const [packageType, setPackageType] = useState("");
  const [packageIndex, setPackageIndex] = useState(0);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { activeCount, isActiveLoading, expiredCount, upcomingCount, isExpiredLoading, isUpcommingLoading, subscriptionsData, isSubScriptionLoading } = useSelector((state) => state.settings);
  console.log(subscriptionsData, "subscriptionsData")

  const FormattedSubscriptions = subscriptionsData?.map((subscription) => {
    const { amount, active, paymentMode, subscriptionExpireyDate, service_data, subscriptionDetails
    } = subscription

    return {
      subscription: subscriptionDetails.details,
      status: active ? "Active" : "",
      amount: amount,
      paymentMethod: paymentMode,
      renewDate: subscriptionExpireyDate,
      plan: subscriptionDetails.type
    }
  })
  console.log(FormattedSubscriptions, "ehe")
  useEffect(() => {
    dispatch(getSubscriptionHistoryCount({ type: "active" }))
    dispatch(getSubscriptionHistoryCount({ type: "expired" }))
    dispatch(getSubscriptionHistoryCount({ type: "up-coming" }))
  }, [])
  // const handleNavigation = (button, label) => {
  //   switch (button) {
  //     case "Previous": {
  //       setPackageIndex((prev) =>
  //         prev > 0 ? prev - 1 : subscriptionPackage.length - 1
  //       );
  //       dispatch(dispatch(getSubscriptions({ page: 1, type: label == "Active Subscription" ? "active" : label == "Expired Subscription" ? "expired" : "up-coming" })))
  //     }
  //       break;
  //     case "Next": {

  //       setPackageIndex((prev) =>
  //         prev < subscriptionPackage.length - 1 ? prev + 1 : 0
  //       );
  //       console.log(label, "label")
  //       dispatch(dispatch(getSubscriptions({ page: 1, type: label == "Active Subscription" ? "active" : label == "Expired Subscription" ? "expired" : "up-coming" })))
  //     }
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const handleNavigation = (button) => {
    let newIndex;

    if (button === "Previous") {
      // Move to previous subscription, wrap around if necessary
      newIndex = packageIndex > 0 ? packageIndex - 1 : subscriptionPackage.length - 1;
    } else if (button === "Next") {
      // Move to next subscription, wrap around if necessary
      newIndex = packageIndex < subscriptionPackage.length - 1 ? packageIndex + 1 : 0;
    }

    // Update packageIndex
    setPackageIndex(newIndex);

    // Get the current subscription type (active, expired, upcoming)
    const currentLabel = subscriptionPackage[newIndex].label;

    // Determine the type for the API call based on the current label
    const type =
      currentLabel === "Active Subscription" ? "active" :
        currentLabel === "Expired Subscription" ? "expired" :
          "up-coming";

    // Dispatch with the correct type
    dispatch(getSubscriptions({ page: 1, type }));
  };



  const subscriptionPackage = [
    {
      number: activeCount ? activeCount : 0,
      label: "Active Subscription",
      description: "Manage all your active subscriptions efficiently.",
      loading: isActiveLoading,
      data: FormattedSubscriptions ? FormattedSubscriptions : []
    },
    {
      number: expiredCount ? expiredCount : 0,
      label: "Expired Subscription",
      description: "Manage all your expired subscriptions efficiently.",
      loading: isExpiredLoading,
      data: FormattedSubscriptions ? FormattedSubscriptions : []
    },
    {
      number: upcomingCount ? upcomingCount : 0,
      label: "Upcoming Renewals",
      description: "Manage all your upcoming renewals efficiently.",
      loading: isUpcommingLoading,
      data: FormattedSubscriptions ? FormattedSubscriptions : []
    },
  ];
  const currentPackage = subscriptionPackage[packageIndex];

  const handleCard = (label) => {
    setPackageType(label)
    const index = subscriptionPackage.findIndex(
      (pkg) => pkg.label === label
    );

    setPackageIndex(index);
    dispatch(dispatch(getSubscriptions({ page: 1, type: label == "Active Subscription" ? "active" : label == "Expired Subscription" ? "expired" : "up-coming" })))
  }


  return (
    <div>
      {packageType !== "" ? (
        <>
          {currentPackage ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 font-semibold text-xl text-[#0A1C40]">
                <button onClick={() => navigate(-1)}>
                  <GoArrowLeft />
                </button>
                <p>{currentPackage.label}</p>
              </div>
              <h4 className="font-semibold text-lg">
                {currentPackage.description}
              </h4>
              {/* {isSubScriptionLoading ? (<TableShimmer />) : <Table columns={columns} data={currentPackage.data} />} */}
              {isSubScriptionLoading ? (
                <TableShimmer />
              ) : currentPackage.data.length === 0 ? (
                <NoData/>
              ) : (
                <Table columns={columns} data={currentPackage.data} />
              )}
              <div className="flex justify-between items-center gap-3">
                <p>
                  <b>{currentPackage.data.length}</b> results
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleNavigation("Previous", currentPackage.label)}
                    outline={true}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => handleNavigation("Next", currentPackage.label)}
                    outline={true}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          {" "}
          <h4 className="font-semibold text-lg">
            Handle your subscription packages here
          </h4>
          <div className="py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {subscriptionPackage.map((data, index) => (
              <Card
                key={index}
                number={data.number}
                label={data.label}
                description={data.description}
                onClick={() => handleCard(data.label)}
                loading={data.loading}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SubscriptionHistory;

const Card = ({ number, label, description, onClick, loading }) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-start gap-4 px-5 py-5 border border-[#DFEAF2] hover:bg-[#007AFF] hover:text-white transition-all duration-300 ease-in-out hover:transition-all hover:duration-300 hover:ease-in-out rounded-[25px] cursor-pointer"
    >
      {loading ? <ImSpinner2 className="animate-spin text-gray hover:text-white !text-xl" /> : <h2 className="font-bold text-4xl">{number}</h2>}

      <div>
        <label className="font-bold text-lg">{label}</label>
        <p className="text-sm">{description}</p>
      </div>
      <button>View All</button>
    </div>
  );
};
